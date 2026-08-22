# Cloudflare Pages Deployment

This branch is a **static Cloudflare Pages version** of the R&R Acoustic Duo website. It preserves the public design, media, schedule, and booking fields without relying on the Manus Express server, OAuth, database, or storage proxy.

## What Changed for Cloudflare

| Area | Cloudflare-ready behavior |
|---|---|
| Site pages, design, media, and schedule | Built as static Vite files for Cloudflare Pages. |
| Static assets | Bundled from `cloudflare-public/` into the Cloudflare deployment. |
| Booking form | Opens the visitor's email app with a prefilled message addressed to `rnr_music_duo@icloud.com`; this avoids a server-only email dependency. |
| SPA routes | `_redirects` sends unmatched routes to `index.html`. |

## Deploy from GitHub

1. In Cloudflare, open **Workers & Pages** and choose **Create application** → **Pages** → **Import an existing Git repository**.
2. Select `LocalForgeWeb/rnr-acoustic-duo` and use the **`cloudflare-pages` branch**.
3. Use these build settings:

| Setting | Value |
|---|---|
| Framework preset | None or React (Vite) |
| Build command | `pnpm build:cloudflare` |
| Build output directory | `cloudflare-dist` |
| Node.js version | `22` |

4. Select **Save and Deploy**. Cloudflare will deploy the site to a temporary `pages.dev` address and build new deployments when commits are pushed to this branch.
5. When the preview looks right, add `rnr-music.com` and `www.rnr-music.com` under **Custom domains**. Confirm that DNS records are managed through Cloudflare before changing records.

## Important Notes

The original Manus build remains intact on `main`. This Cloudflare branch intentionally avoids Manus-only API routes. If you later want the booking form to send automatically without opening the visitor's email app, add an email provider such as Resend to a Cloudflare Worker and configure its API key as a Cloudflare secret. Do not commit any API keys or passwords to this repository.

## Local Verification

Run the following from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm build:cloudflare
```

The generated static site is written to `cloudflare-dist/`.

## References

[1]: https://developers.cloudflare.com/pages/configuration/build-configuration/ "Cloudflare Pages build configuration"
[2]: https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/ "Cloudflare Pages Vite deployment guide"

