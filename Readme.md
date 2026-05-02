# MeawWind

<p align="center">
  <img src="assets/demo.png" width="800"/>
</p>

**MeawWind** is a lightweight, runtime utility-class engine for the browser — no build tools, no config files, no CSS to write. Just add `chai-` classes to your HTML and styles are applied instantly.

🌐 **Live Demo:** [meawwind.vercel.app](https://meawwind.vercel.app)

---

## How it works

MeawWind scans your HTML for classes prefixed with `chai-` and applies the corresponding inline styles at runtime using JavaScript. It also watches for DOM changes via `MutationObserver`, so dynamically added elements are styled automatically.

---

## Installation

```bash
npm install meawwind
```

---

## Quick Start

**Step 1** — Import once in your entry file (or a `<script type="module">` tag):

```js
import "meawwind";
```

**Step 2** — Use `chai-` classes directly in your HTML:

```html
<div class="chai-bg-red-500 chai-p-4 chai-rounded-xl chai-text-white">
  Hello, MeawWind!
</div>
```

That's it. No build step needed.

---

## Explicit Initialization (Optional)

MeawWind auto-initializes on `DOMContentLoaded`. If you need to trigger it manually:

```js
import { initMeawWind } from "meawwind";

initMeawWind();
```

---

## Supported Utilities

| Category       | Classes |
|----------------|---------|
| Width / Height | `chai-w-*`, `chai-h-*` |
| Padding        | `chai-p-*`, `chai-px-*`, `chai-py-*`, `chai-pt-*`, `chai-pr-*`, `chai-pb-*`, `chai-pl-*` |
| Margin         | `chai-m-*`, `chai-mx-*`, `chai-my-*`, `chai-mt-*`, `chai-mr-*`, `chai-mb-*`, `chai-ml-*` |
| Gap            | `chai-gap-*`, `chai-gap-x-*`, `chai-gap-y-*` |
| Colors         | `chai-bg-*`, `chai-text-*`, `chai-border-*` |
| Borders        | `chai-b-*`, `chai-rounded-*` |
| Typography     | `chai-font-*`, `chai-text-left\|center\|right\|justify` |
| Layout         | `chai-flex`, `chai-flex-col`, `chai-items-*`, `chai-justify-*` |
| Positioning    | `chai-static`, `chai-relative`, `chai-absolute`, `chai-fixed`, `chai-sticky`, `chai-top-*`, `chai-right-*`, `chai-bottom-*`, `chai-left-*` |
| Display        | `chai-block`, `chai-inline`, `chai-inline-block`, `chai-hidden` |
| Shadows        | `chai-shadow-*` |
| Opacity        | `chai-opacity-*` |
| Z-Index        | `chai-z-*` |
| Cursor         | `chai-cursor-*` |

### Arbitrary Values

Use bracket notation for custom values:

```html
<div class="chai-bg-[#1a1a2e] chai-w-[320px] chai-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
  Custom styles
</div>
```

> Use underscores `_` in place of spaces inside brackets.

### Hover & Focus States

```html
<button class="chai-bg-white hover:chai-bg-gray-100">Hover me</button>
<input class="chai-border focus:chai-border-blue-500">
```

---

## Module Formats

MeawWind ships both ESM and CJS outputs:

```js
// ESM (default)
import "meawwind";

// CJS
require("meawwind");
```

| Format | File |
|--------|------|
| ESM    | `dist/index.js` |
| CJS    | `dist/index.cjs` |

---

## Local Development

```bash
# Install dependencies
npm install

# Build once
npm run build

# Build and watch for changes
npm run build:watch

# Serve the docs locally
npx serve docs
```

---

## Publishing

Running `npm publish` automatically triggers `prepublishOnly`, which runs a fresh production build. Only the files listed in the `files` field of `package.json` are included in the published package (`dist/` and `README.md`).

---

## License

MIT © [Sidratul Muntaha](https://github.com/Sidratul02)
