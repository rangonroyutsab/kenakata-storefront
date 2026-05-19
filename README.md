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
