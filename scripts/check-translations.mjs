import fs from "node:fs";
import path from "node:path";

const localesDir = path.resolve("src", "locales");
const baseLocale = "en";

function listLocaleDirectories(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function listFiles(root) {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      return listFiles(fullPath);
    }
    if (entry.isFile() && entry.name.endsWith(".json")) {
      return [fullPath];
    }
    return [];
  });
}

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function collectMissingKeys(baseValue, compareValue, currentPath, missing) {
  if (baseValue && typeof baseValue === "object" && !Array.isArray(baseValue)) {
    const keys = Object.keys(baseValue);
    keys.forEach((key) => {
      const nextPath = currentPath ? `${currentPath}.${key}` : key;
      if (
        !Object.hasOwn(compareValue ?? {}, key) ||
        compareValue?.[key] === undefined
      ) {
        missing.push(nextPath);
        return;
      }
      collectMissingKeys(baseValue[key], compareValue[key], nextPath, missing);
    });
  }
}

function main() {
  if (!fs.existsSync(localesDir)) {
    console.error(`Locales directory not found at ${localesDir}`);
    process.exit(1);
  }

  const localeDirs = listLocaleDirectories(localesDir);
  if (!localeDirs.includes(baseLocale)) {
    console.error(`Base locale "${baseLocale}" not found in ${localesDir}`);
    process.exit(1);
  }

  const baseFiles = listFiles(path.join(localesDir, baseLocale)).map((file) =>
    path.relative(path.join(localesDir, baseLocale), file),
  );

  const findings = [];

  localeDirs
    .filter((locale) => locale !== baseLocale)
    .forEach((locale) => {
      baseFiles.forEach((relativeFile) => {
        const baseFilePath = path.join(localesDir, baseLocale, relativeFile);
        const compareFilePath = path.join(localesDir, locale, relativeFile);

        if (!fs.existsSync(compareFilePath)) {
          findings.push({
            locale,
            file: relativeFile,
            missing: ["<entire file missing>"],
          });
          return;
        }

        const baseJson = loadJson(baseFilePath);
        const compareJson = loadJson(compareFilePath);
        const missingKeys = [];

        collectMissingKeys(baseJson, compareJson, "", missingKeys);

        if (missingKeys.length > 0) {
          findings.push({
            locale,
            file: relativeFile,
            missing: missingKeys,
          });
        }
      });
    });

  if (findings.length === 0) {
    console.log("✅ All locale files have the required keys.");
    return;
  }

  console.log("⚠️  Missing translation keys detected:");
  findings.forEach(({ locale, file, missing }) => {
    console.log(`  • ${locale}/${file}`);
    missing.forEach((key) => {
      console.log(`    - ${key}`);
    });
  });
  process.exitCode = 1;
}

main();
