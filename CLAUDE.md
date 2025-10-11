# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Innuora is an AI-assisted CBT (Cognitive Behavioral Therapy) platform delivering personalized, culturally localized mental health support in English, French, and Arabic. This repository (`innuora-web`) is the **marketing website only** - it contains landing pages, content libraries, legal pages, and signup flows. No diagnostic logic or app functionality lives here.

## Core Tech Stack

- **Framework**: Next.js 15.5.4 (App Router) with React 19.1.0 and TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Internationalization**: i18next + next-i18n-router (EN/FR/AR with RTL support for Arabic)
- **Content**: Markdown files with gray-matter frontmatter parsing
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics + Speed Insights (production only)

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build with Turbopack
pnpm build

# Start production server
pnpm start

# Lint and format code
pnpm lint
pnpm format
```

## Project Structure & Architecture

### Routing & Localization

- App Router structure: `src/app/[locale]/...`
- Supported locales: `en` (default), `ar`, `fr`
- Locale config: `src/lib/i18n/config.ts`
- Translation files: `src/locales/{locale}/{namespace}.json`
- Translation namespaces: `common`, `content`, `legal`, `seo`, `pages`
- RTL handling: Arabic uses custom fonts (`arabicTitle`, `arabicBody`) and `dir="rtl"` attribute
- Locale prefixing: Default locale (EN) has no prefix; AR/FR are prefixed (`/ar/...`, `/fr/...`)

### Content System

Content lives in `src/content/articles/{locale}/{category}/{slug}.md` with frontmatter metadata:

```yaml
---
title: Article Title
description: Meta description
slug: article-slug
category: cognitive-behavioral-therapy  # Must match ContentCategory type
contentType: article
intent: informational | actionable | supportive | therapeutic | emergency
keywords: [array, of, keywords]
readingTime: 8
publishedAt: 2025-01-01
draft: false
featured: false
---
```

**Content categories** (8 total):
- `cognitive-behavioral-therapy`
- `anxiety-management`
- `depression-support`
- `stress-management`
- `relationship-patterns`
- `self-compassion`
- `mindfulness-techniques`
- `mood-tracking`

**Content Loading Flow**:
1. `initializeContentRegistry()` reads all English markdown files at build time
2. Registers metadata in `contentRegistry` (singleton pattern)
3. Loads localized titles/descriptions from AR/FR markdown files
4. Falls back to EN if locale-specific file missing
5. Runtime: `loadLocalizedContent()` serves markdown based on locale

**Key files**:
- `src/lib/content/content-loader.ts` - File system loading + frontmatter parsing
- `src/lib/content/content-registry.ts` - In-memory registry (singleton)
- `src/lib/content/seo-generator.ts` - Generates metadata for content pages
- `src/content/content-taxonomy.json` - Content hierarchy and SEO taxonomy

### Page Routes

| Route Pattern | Purpose | Layout |
|--------------|---------|--------|
| `/[locale]` | Homepage | Standard |
| `/[locale]/join` | Signup/onboarding funnel | Standard |
| `/[locale]/demo` | Product demo/walkthrough | Standard |
| `/[locale]/faq` | FAQ page | Standard |
| `/[locale]/content` | Content library hub | `content/layout.tsx` |
| `/[locale]/content/[category]` | Category hub | `content/layout.tsx` |
| `/[locale]/content/[category]/[slug]` | Article page | `content/layout.tsx` |
| `/[locale]/terms` | Terms of service | `(legal)/layout.tsx` |
| `/[locale]/privacy` | Privacy policy | `(legal)/layout.tsx` |
| `/[locale]/eula` | End-user license agreement | `(legal)/layout.tsx` |

### SEO Configuration

- Global metadata: `src/config/metadata.ts`
- Viewport config: `src/config/viewport.ts`
- Per-page metadata: Use `seo-generator.ts` for content pages
- Localized SEO strings: `src/locales/{locale}/seo.json`
- Open Graph + Twitter Card support
- Sitemap generation includes all published (non-draft) content
- Structured data (e.g., FAQ schema) where applicable

### Theming & Styling

- Dark mode: `next-themes` provider in root layout
- Theme toggle: `src/components/theme-toggle.tsx`
- Color palette: Calm greens/blues with accessible contrast
- Typography:
  - Sans: Geist Sans (LTR)
  - Serif: Geist Mono (LTR)
  - Arabic: Noto Sans Arabic (title) + Noto Naskh Arabic (body)
- Font definitions: `src/lib/fonts.ts`
- Responsive breakpoints: Follow Tailwind defaults
- Mobile detection: `src/hooks/use-mobile.ts`

### Components Architecture

**Layout Components**:
- `src/components/layout/header.tsx` - Site header with locale/theme switchers
- `src/components/layout/footer.tsx` - Site footer

**Content Components**:
- `src/components/content/content-library-layout.tsx` - Content hub layout
- `src/components/content/category-layout.tsx` - Category page layout
- `src/components/content/article-layout.tsx` - Article rendering (markdown-to-jsx)

**Utility Components**:
- `src/components/language-dropdown.tsx` - Locale switcher
- `src/components/theme-toggle.tsx` - Dark/light mode toggle
- `src/components/translation-provider.tsx` - i18next client wrapper

## Content Authoring Guidelines

When creating or editing content:

1. **Tone**: Compassionate, validating, hopeful. Clinically accurate but plain-language. Trauma-aware and culturally sensitive.
2. **Structure**:
   - Intro with context
   - Therapeutic rationale
   - Step-by-step actionable guidance
   - "When to seek help" section
   - Disclaimer (avoid medical advice framing)
3. **Localization Parity**: All three locales must have the same slugs/frontmatter. Adapt idioms, respect RTL for Arabic.
4. **SEO**:
   - Target keyword in H1 and intro
   - Structured headings (H1 → H2 → H3)
   - Internal links to related content
   - Meta description under 160 chars
5. **Accessibility**: Alt text for images, semantic HTML, ARIA labels where needed

## Configuration Files

- `next.config.ts` - Next.js config (trailingSlash enabled, redirects)
- `biome.json` - Linting/formatting rules (Next + React recommended)
- `tsconfig.json` - TypeScript config (path alias `@/*` → `./src/*`)
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `pnpm-workspace.yaml` - Monorepo setup (if expanded)

## External Redirects

- `/testers` → Google Form (beta tester signup)

## Important Notes

- **No app logic**: This repo is marketing-facing only. Do not add diagnostics, chat, or therapy modules here.
- **Content registry initialization**: Must run at build time via `initializeContentRegistry()` - errors fall back to taxonomy.
- **Arabic handling**: Always check RTL layout and ensure Arabic fonts load correctly.
- **Analytics**: Vercel Analytics/Speed Insights only in production (`NODE_ENV === "production"`).
- **Trailing slashes**: All routes end with `/` per Next.js config.
- **Draft content**: Articles with `draft: true` are excluded from sitemap and public registry.

## Adding New Content

1. Create markdown file in `src/content/articles/{locale}/{category}/{slug}.md`
2. Include complete frontmatter (see template above)
3. Write content following authoring guidelines
4. Repeat for all three locales (EN, FR, AR)
5. Rebuild to register in content registry
6. Verify sitemap inclusion and metadata generation

## Troubleshooting

- **Content not showing**: Check `draft: false` in frontmatter and ensure file is in correct locale directory
- **Locale fallback**: If AR/FR missing, system falls back to EN automatically
- **Biome errors**: Run `pnpm lint` to check, `pnpm format` to auto-fix
- **Build fails**: Check for invalid frontmatter or missing required fields
