# Eagle Wings Digital Cards

Create and share digital business cards and email signatures. Fill a single form, and get a public link where others can view your card and signature.

## How to run

- **Static**: Open `index.html` in a browser (file://). For the card view with `?id=demo`, use the same.
- **Local server** (recommended): Serve the project root with any static server (e.g. `npx serve .`, or your editor’s “Live Server”) so links and assets load correctly.

## Project structure

- **index.html** – Landing: “Create Business Identity” and “View example”.
- **form.html** – Form to enter your details and upload profile photo + logo. Submitting is ready for a backend; for now it shows an alert.
- **card/index.html** – Public view: shows both the **digital business card** and **email signature** for a given identity. Use `?id=demo` to see the demo.
- **css/theme.css** – Shared colors, background, typography.
- **css/form.css** – Form layout and upload zones.
- **css/card.css** – Business card styles.
- **css/signature.css** – Email signature styles.
- **js/form.js** – Form validation, image preview, submit (placeholder for API).
- **js/card.js** – Reads `?id=`, loads data (demo or future API), and fills the card and signature.

The existing **bilal-business-card.html** and **bilal-email-signature.html** are left as-is for backward compatibility. The new flow is: **index → form → card/?id=…**.

## Backend (future)

A backend under `server/` can handle:

- `POST /api/identity` – Accept the form (including image uploads), store identity and image URLs, return an id.
- `GET /api/identity/:id` – Return the identity JSON for the card view.

See `server/README.md` for a short spec.
