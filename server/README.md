# Server (placeholder)

This folder is reserved for the backend that will power the Eagle Wings Digital Cards flow.

## Intended routes

- **POST /api/identity**  
  Accept multipart form data (all form fields + profile photo and brand logo files).  
  - Validate and normalize input.  
  - Store uploaded images (e.g. to disk or cloud storage) and get public URLs.  
  - Save identity record (form fields + image URLs) keyed by a unique id (e.g. UUID or short slug).  
  - Return the id (and optionally the public URL, e.g. `/card?id=<id>`).

- **GET /api/identity/:id**  
  Return the identity as JSON (same shape as the form / demo data) so the card view can render the business card and email signature.  
  - Respond with 404 if the id is unknown.

## Storage

- **Uploads**: Store image files in a dedicated directory (e.g. `server/storage/` or a bucket) and serve them or expose public URLs.
- **Identity records**: Store in a database or JSON/file store, keyed by id.

Front-end form and card view are already set up to work with this API once implemented.
