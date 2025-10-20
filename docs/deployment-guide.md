# RealVibeAI Realty — Deployment Stability Guide (1‑pager)

This is the “do not break my site” checklist we’ll follow for every local or Vercel deploy. It locks the **look & feel from `dcdacd0`** and keeps **virtual-staging images** working.

---

## 1) Project invariants (don’t change)

* **Design baseline**: visuals from commit **`dcdacd0`**.
* **Images**:

  * Virtual staging lives **only** at: `/public/images/virtual-staging/`
  * Filenames:
    `living-before.jpg`, `living-after.jpg`, `bedroom-before.jpg`, `bedroom-after.jpg`, `kitchen-before.jpg`, `kitchen-after.jpg`
  * **No nested folders** under `virtual-staging/`.
  * **No duplicates** (do **not** keep `/public/images/staging`).
* **Virtual Staging page**:

  * Use **plain `<img>`** tags (not `next/image`) to avoid optimization/`sharp` issues.
  * Paths are absolute from public: `src="/images/virtual-staging/living-before.jpg"`.
* **Tailwind v4**: `@import "tailwindcss";` in `app/globals.css` (keep it).
* **PostCSS**: `postcss.config.js`

  ```js
  module.exports = { plugins: { "@tailwindcss/postcss": {} } };
  ```
* **next.config.js**:

  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    turbopack: { root: __dirname },
    serverExternalPackages: ['nodemailer'],
  };
  module.exports = nextConfig;
  ```

---

## 2) Safe build & run

**Install / build**

```powershell
npm ci
npm run build
npm start
```

**Dev**

```powershell
npm run dev
```

**Windows & `sharp`**
If you ever switch back to `next/image` locally, installs can fail. Either keep `<img>` (preferred) or:

```powershell
npm install --include=optional sharp
```

---

## 3) Vercel settings

* Framework: **Next.js**
* **Install Command**: `npm ci`
* **Build Command**: `npx next build`
* **Output Directory**: `.next`
* Promote only after you **verify the Preview** looks right.

---

## 4) Pre-deploy verification checklist (local)

1. **Images exist & sizes are sane**

   ```powershell
   Get-ChildItem public\images\virtual-staging | Select-Object Name,Length
   ```

   Expect 6 files, non-zero size.

2. **No duplicates**

   ```powershell
   Test-Path public\images\staging
   # If True => remove folder in Git and commit
   ```

3. **No stray `next/image` usage** in:

   * `app/realty/virtual-staging/page.tsx` → must use `<img>`

4. **Run & browse**

   * `/realty` (hero, gradient, typography intact)
   * `/realty/solutions` (icons load, no 404s)
   * `/realty/virtual-staging` (all six images render)

5. **Network tab**: no 404 on `*.jpg` & no 500 from `/_next/image`.

---

## 5) Branch & PR workflow (to protect visuals)

**Create a change safely**

```powershell
git checkout -b feature/scope
# ...edit...
npm run build
```

**Open PR** → Verify **Preview** deploy renders exactly like local:

* Pixel check hero section & fonts
* Solutions page logos load
* Virtual-staging gallery shows all images

**Only then** merge. If visuals regress:

* Close PR or fix on the branch—**never** push broken main.

**Hotfix from stable visual commit**

```powershell
git fetch origin
git checkout -b hotfix/virtual-staging dcdacd0
# reapply virtual-staging images if needed
npm run build
git push -u origin hotfix/virtual-staging
# Open PR, verify Preview, merge
```

---

## 6) Troubleshooting quick wins

* **Images not showing** → Check path: must be `/images/virtual-staging/<file>.jpg`. Confirm file exists in repo & Vercel preview Network tab shows 200.
* **White/blank sections** → Tailwind not applied. Confirm `app/globals.css` imports Tailwind v4 and `import "./globals.css"` is present in `app/layout.tsx` (client root layout).
* **Turbopack build error near a JSX tag** → You likely have an unclosed tag or leftover conflict markers. Fix the JSX, re-build.
* **“Cannot find module ‘next/image’ types” in VS Code** → Run `npm ci` to restore deps; it’s a type hint only and won’t block build if code compiles.

---

## 7) Files to keep an eye on

* `app/layout.tsx` – must include `'use client'` and `import "./globals.css"`
* `app/realty/virtual-staging/page.tsx` – **<img> only**, absolute `/images/...` paths
* `public/images/virtual-staging/*` – the six JPGs
* `postcss.config.js`, `app/globals.css`, `next.config.js` – don’t drift

---

## 8) Command snippets you’ll reuse

**Remove a wrong folder from Git (keep working tree clean)**

```powershell
git rm -r --cached public\images\staging
git commit -m "chore: remove duplicate staging images"
```

**Find `next/image` usage in .tsx**

```powershell
Get-ChildItem -Recurse -Include *.tsx | Select-String -Pattern "from \"next/image\""
```