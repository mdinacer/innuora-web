# Innuora Web

**The public web experience for Innuora — an AI-powered reflective intelligence platform.**

Innuora Web is the public-facing website for the Innuora platform. It is designed to introduce the product, communicate its concepts and resources, and provide localized content experiences across English, French, and Arabic.

The project focuses heavily on **internationalization, RTL support, SEO, content architecture, responsive UI, and web performance**.

---

## Overview

The website acts as the public entry point to the Innuora ecosystem.

It provides:

- Product and platform information
- Educational and informational content
- Structured content pages
- Localized experiences
- Responsive layouts
- SEO-oriented page architecture
- Analytics and performance monitoring

The application is designed to support multiple languages without duplicating the application structure for each locale.

---

## Key Features

- English, French, and Arabic localization
- Right-to-left (RTL) support
- Dynamic localized routes
- Structured content resources
- Markdown-based content rendering
- SEO metadata
- Responsive layouts
- Accessible UI patterns
- Theme support
- Analytics
- Performance monitoring
- Type-safe React/Next.js implementation

---

## Internationalization

Internationalization is a core part of the website architecture.

The application supports:

```text
English
French
Arabic
```

Arabic pages additionally support right-to-left layouts.

The localization architecture uses:

- i18next
- react-i18next
- next-i18n-router
- i18next-resources-to-backend

Translation resources are loaded dynamically rather than hard-coding localized content directly into individual components.

```text
Request
  │
  ▼
Locale Detection
  │
  ├── English
  ├── French
  └── Arabic
          │
          ▼
Localized Resources
          │
          ▼
Next.js Page
```

This allows the same page architecture to serve multiple localized experiences.

---

## Content Architecture

The website uses structured content resources rather than embedding large amounts of editorial content directly into React components.

Content can be parsed from Markdown-based resources using:

```text
gray-matter
markdown-to-jsx
```

This separates content from presentation and makes educational material easier to maintain.

Conceptually:

```text
Content File
     │
     ▼
Front Matter
     │
     ▼
Markdown
     │
     ▼
Content Parser
     │
     ▼
React Rendering
```

---

## SEO

SEO is treated as part of the application architecture rather than as an afterthought.

Pages can provide structured metadata based on the current route and localized content.

The architecture is designed to support:

- Page metadata
- Localized URLs
- Structured content
- Search-engine-friendly rendering
- Semantic page structure

Because the website is built with Next.js App Router, content can be rendered using Next.js's server-oriented page architecture.

---

## Performance

The website includes Vercel performance tooling:

- Vercel Analytics
- Vercel Speed Insights

These provide visibility into real-world usage and frontend performance.

The application also uses Next.js's modern build pipeline and Turbopack during development.

---

## Technology Stack

### Core

- Next.js 15
- React 19
- TypeScript

### Styling

- Tailwind CSS
- Tailwind CSS v4
- `tailwind-merge`
- `tailwindcss-safe-area`

### Internationalization

- i18next
- react-i18next
- next-i18n-router
- i18next-resources-to-backend

### Content

- Markdown
- gray-matter
- markdown-to-jsx

### UI

- Lucide React
- next-themes

### Validation

- Zod

### Monitoring

- Vercel Analytics
- Vercel Speed Insights

### Tooling

- Biome
- TypeScript
- Next.js Turbopack

---

## Project Structure

The application follows a Next.js App Router architecture.

```text
innuora-web
│
├── src
│   ├── app
│   │   └── Next.js routes and layouts
│   │
│   ├── components
│   │   └── Reusable UI components
│   │
│   ├── content
│   │   └── Structured content resources
│   │
│   └── ...
│
├── scripts
│   └── Content validation utilities
│
├── public
│   └── Static assets
│
├── next.config.*
├── package.json
└── tsconfig.json
```

---

## Development

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

The development server runs on:

```text
http://localhost:3000
```

The development build uses Turbopack.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome checks |
| `npm run check:translations` | Validate localized content |
| `npm run format` | Format source files |

---

## Translation Validation

The project includes a dedicated translation validation script:

```bash
npm run check:translations
```

This helps detect inconsistencies in localized resources before they reach production.

---

## Engineering Highlights

Innuora Web demonstrates:

- Next.js App Router
- React 19
- TypeScript
- Internationalized routing
- Dynamic localization
- Arabic RTL support
- Content-driven page architecture
- SEO-oriented rendering
- Responsive UI
- Tailwind CSS
- Markdown content processing
- Performance monitoring
- Production-oriented frontend tooling

The project is particularly focused on solving the practical problems that arise when building a **multilingual, content-heavy public website** rather than simply creating a collection of static marketing pages.

---

## Related Projects

### Innuora Application

The main Innuora application contains the product experience and application/backend functionality.

https://github.com/mdinacer/innuora

### Innuora Mobile

https://github.com/mdinacer/innuora-app

---

## Project Status

This repository contains the public-facing web application for Innuora and is maintained as part of the broader Innuora product ecosystem.

---

## Repository

https://github.com/mdinacer/innuora-web

---

## License

No explicit open-source license is currently defined for this repository.
