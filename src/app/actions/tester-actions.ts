"use server";
import { advancedTesterSchema } from "@/types/tester-form-data";
import { google } from "googleapis";
import z from "zod";

export async function addAdvancedTester(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());
    const parsed = advancedTesterSchema.parse(raw);

    const { email, occupation, struggles, coping, source, notes } = parsed;

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId)
      throw new Error("Missing Google credentials or Sheet ID");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient as any });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "'Form Responses'!A:G", // 7 columns: Timestamp + 6 fields
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            email,
            occupation || "",
            struggles || "",
            coping || "",
            source || "",
            notes || "",
          ],
        ],
      },
    });

    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        issues: err.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      };
    }
    console.error("Google Sheets append failed:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      status: err.status,
      errors: err.errors,
    });
    return { success: false, error: err.message || "Unexpected error" };
  }
}
