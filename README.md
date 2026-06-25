# CoverCraft — Cover Letter Generator

A personal Next.js app that lets you generate tailored cover letters in seconds — no database, no backend. Just fill in the fields, pick a template, copy or download as PDF.

## Features
- 3 cover letter templates (Standard, Concise, Technical Depth)
- Customize: company name, position, hiring manager, and why you're interested
- Live preview rendered in serif font like a real letter
- **Copy to clipboard** with one click
- **Download as PDF** (A4, properly formatted via jsPDF)
- Fully client-side — nothing is stored anywhere

## Setup

### 1. Create your Next.js project (if not already done)
```bash
npx create-next-app@latest cover-craft --typescript --tailwind --app --src-dir
cd cover-craft
```

### 2. Install the PDF library
```bash
npm install jspdf
```

### 3. Drop in the source files
Copy the files from this project into your Next.js `src/` folder:

```
src/
├── types/
│   └── index.ts
├── lib/
│   ├── templates.ts
│   └── generatePdf.ts
├── components/
│   └── CoverLetterApp.tsx
└── app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

> **Note:** `lucide-react` is already included with shadcn/UI. If you don't have it:
> ```bash
> npm install lucide-react
> ```

### 4. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customize Your Templates

All templates live in `src/lib/templates.ts`. Each template has a `generate()` function that receives form data and returns the cover letter string. Edit freely — the body copy, the default "why interested" fallback text, etc.

## Adding a New Template

1. Open `src/lib/templates.ts`
2. Add a new entry to the `templates` array:
```ts
{
  id: "startup",
  name: "Startup-Friendly",
  description: "Casual and builder-focused tone.",
  badge: "New",
  badgeColor: "bg-orange-100 text-orange-600",
  generate: ({ companyName, positionName, senderName, ... }) => `...`,
}
```
It automatically appears in the UI — no other changes needed.
