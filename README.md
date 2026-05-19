# KenaKata Storefront

A Terra-styled e-commerce MVP built with Next.js App Router, TypeScript,
Tailwind CSS, and the Platzi Fake Store API.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Platzi Fake Store API
- lucide-react icons

## Features Completed

- Polished storefront visual system using Literata and Nunito Sans
- API-backed homepage, shop pagination, categories, and product detail pages
- Product slug/id support with related products by category
- Search, sort, category, price filtering, desktop filters, and mobile filter sheet
- Persistent cart with desktop drawer, mobile sheet, and full cart page
- Fake API login, profile fetch, signup, and email availability validation
- Account page with fake API profile and demo order context
- Local mock checkout, order confirmation, and cart clearing
- Store locator backed by `GET /locations`
- Page metadata, dynamic product/category metadata, loading, error, empty, and 404 states
- Explicit ISR, fetch revalidation, and cache tags for public catalog data

## Architecture

The app uses the Next.js App Router under `src/app`. Route files stay focused on
page composition and data loading, while reusable UI lives in `src/components`,
commerce helpers live in `src/lib`, API access lives in `src/services`, shared
types live in `src/types`, and platform constants live in `src/constants`.

Server components are used for catalog pages that can fetch before rendering:
home, shop, collections, category pages, product details, and store locator.
Client components are used where browser state or interaction is required:
cart persistence, auth persistence, checkout form validation, search/filter UI,
theme switching, and add-to-cart controls.

## Rendering Strategy

- Static rendering: informational pages such as about, contact, privacy, and
  shipping/returns are prerendered because they do not depend on request-time
  data.
- SSG for known catalog paths: `generateStaticParams` prebuilds the initial
  product and category detail paths.
- ISR for public catalog data: home, shop, collections, product, category, and
  store locator routes export `revalidate` values so public API data remains
  cached but refreshes regularly.
- SSR/on-demand rendering: paginated shop routes and uncached dynamic catalog
  paths are rendered on demand and then reused according to the revalidation
  window.
- Client-only protection: account and checkout render static shells, then check
  local auth state in the browser. Middleware protection is a planned hardening
  step.

## Caching and Revalidation

Public product/category fetches use Next.js fetch caching with
`next.revalidate`. Product and category requests are tagged with `products` and
`categories`; store locations are tagged with `locations`. Auth, profile, user,
signup, and email-availability calls use `cache: "no-store"` because they are
user-specific or mutation-oriented.

Current public cache windows:

- Catalog data: 30 minutes
- Store locations: 60 minutes

## Tradeoffs Made

- Cart, auth, and checkout order state are stored locally because the fake API
  does not provide order or payment resources.
- Search and sorting run on the currently loaded page of products, while
  category and pagination use API-backed routes.
- Client-side auth persistence keeps the demo simple, but middleware-based route
  protection should be added before treating this as production auth.

## Performance Considerations

- Server components reduce client JavaScript on catalog pages.
- `next/image` is used for product and category imagery.
- Public catalog data is cached with ISR to avoid fetching the fake API on every
  request.
- Data requests are parallelized with `Promise.all` where pages need multiple
  resources.

## Challenges Faced

- The fake API has inconsistent image sources, so image handling filters invalid
  placeholder values and allows several remote hosts.
- The API does not include real cart, order, or payment resources, so checkout
  is intentionally mocked.
- Auth tokens are available only in the browser for this MVP, which limits true
  server-side route protection.

## Future Improvements

- Add middleware-backed protected routes with cookie-based auth.
- Add Vitest or Playwright coverage for cart, checkout, and product filtering.
- Add admin CRUD for products, categories, and users.
- Add wishlist/reviews and API-backed product search across the full catalog.
- Add deployment documentation after the production URL is created.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
```

## API

This project uses the Platzi Fake Store API:

```text
https://api.escuelajs.co/api/v1
```

Used endpoints include:

- `GET /products?offset=&limit=`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `GET /categories`
- `GET /categories/:id/products`
- `POST /auth/login`
- `GET /auth/profile`
- `POST /users`
- `POST /users/is-available`
- `GET /locations`

## Demo Auth

The login page is prefilled with the Platzi demo user:

```text
john@mail.com
changeme
```

## Deployment

The app is Vercel-ready as a standard server-rendered Next.js app.

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

No required environment variables are needed for the current MVP. Checkout and
orders are mock/local because the fake API does not provide order or payment
resources.
