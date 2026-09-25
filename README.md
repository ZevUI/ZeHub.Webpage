# ZeHub Website

A static ZeHub script hub designed for GitHub Pages.

## Files

- `index.html` — website layout
- `css/style.css` — all styling
- `js/scripts.js` — script list and loadstrings
- `js/app.js` — search, filters and copy buttons
- `assets/logo.png` — ZeHub logo
- `assets/banner.jpeg` — ZeHub banner

## Adding / changing a script

Open:

`js/scripts.js`

Each script looks like:

```js
{
  name: "My Script",
  description: "My script description.",
  category: "utility",
  icon: "M",
  status: "Live",
  features: ["Feature 1", "Feature 2"],
  loadstring: `YOUR EXACT LOADSTRING HERE`
}
```

The **Copy Loadstring** button automatically copies the value of `loadstring` to the user's clipboard.

## GitHub Pages

1. Create a GitHub repository.
2. Upload all files while keeping the folder structure.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.

The site is fully static and does not need a server or database.

Discord: https://discord.gg/zehub
