# Zeogital Consulting website

A React + Vite single-page website with responsive layouts, React Router navigation, animated CSS visuals, scroll reveals, interactive service cards and a contact form.

## Stack
- React 18
- Vite 6
- React Router 6
- Modern CSS (CSS3)

> “CSS5” is not an official web standard. This project uses modern CSS3 features supported by current browsers, including Grid, Flexbox, custom properties, animations, transitions and responsive media queries.

## Run locally
Install Node.js 20 or newer, then open this project folder in your terminal:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```
The production-ready site is generated in `dist/`.

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` configures SPA route fallback so direct visits to `/about`, `/services`, `/contact` and `/privacy` work.

## Contact form
The contact form posts through FormSubmit's AJAX endpoint to `shelterskeysynergy48@gmail.com`. The mailbox owner must complete FormSubmit's first-use email activation. A successful response from FormSubmit means the service accepted the submission; it is not proof that the recipient read or received the email. Test with the mailbox owner before launch.

Phone and WhatsApp enquiries use `0802 717 3644`.

## Before launch
- Replace founder placeholder artwork with an approved portrait.
- Confirm founder biography, credentials, service claims and framework references.
- Add approved social profile links.
- Review and approve the draft privacy policy at `/privacy`.
- Test the contact form after mailbox activation.

## Google Analytics 4 setup
1. Create a Google Analytics 4 property for the Zeogital website.
2. In the GA4 web data stream, copy the Measurement ID. It starts with `G-`.
3. Copy `.env.example` to a new file named `.env` in the project root.
4. Set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` using the real Measurement ID.
5. Restart the development server. For Netlify, add `VITE_GA_MEASUREMENT_ID` under **Site configuration → Environment variables**, then redeploy.

Analytics is disabled when the variable is empty. The React app sends a page view on initial load and when the user navigates between routes, but only after a visitor accepts analytics in the cookie notice. Visitors can change this choice using the Cookie settings link in the footer. Review applicable privacy requirements before enabling analytics for visitors.

## Privacy policy
A draft privacy page is available at `/privacy` and linked in the footer. It is a starting point only. The business should confirm the legal entity details, retention periods, third-party processors, privacy contact process and consent requirements, then obtain appropriate legal review before publishing it as a final policy.
