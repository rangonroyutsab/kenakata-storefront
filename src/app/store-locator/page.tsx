import { MapPin, Navigation } from "lucide-react";

import { getLocations } from "@/services/products";
import type { StoreLocation } from "@/types/product";

export default async function StoreLocatorPage() {
  let locations: StoreLocation[] = [];

  try {
    locations = await getLocations();
  } catch {
    locations = [];
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
            <MapPin size={18} />
            Store Locator
          </p>
          <h1 className="font-headline text-4xl font-bold lg:text-5xl">
            Find a KenaKata pickup point
          </h1>
          <p className="mt-4 text-lg text-[var(--on-surface-variant)]">
            Explore fake API-backed locations for local pickup, returns, and
            showroom inspiration.
          </p>
        </div>

        {locations.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-8 text-center">
            <h2 className="font-headline text-2xl font-bold">
              No locations available
            </h2>
            <p className="mt-2 text-[var(--on-surface-variant)]">
              The fake API did not return location data right now.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => {
              const name =
                typeof location.name === "string"
                  ? location.name
                  : `KenaKata Location ${index + 1}`;
              const city =
                typeof location.city === "string" ? location.city : "Local pickup";
              const country =
                typeof location.country === "string" ? location.country : "Earth";
              const address =
                typeof location.address === "string"
                  ? location.address
                  : "Address details provided by the fake API.";

              return (
                <article
                  className="rounded-xl bg-[var(--surface-container-lowest)] p-6 shadow-soft"
                  key={location.id ?? index}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-container)] text-[var(--primary)]">
                    <Navigation size={22} />
                  </div>
                  <h2 className="font-headline text-2xl font-bold">{name}</h2>
                  <p className="mt-2 font-semibold text-[var(--tertiary)]">
                    {city}, {country}
                  </p>
                  <p className="mt-4 text-[var(--on-surface-variant)]">
                    {address}
                  </p>
                  {"latitude" in location || "longitude" in location ? (
                    <p className="mt-4 text-sm text-[var(--on-surface-variant)]">
                      Coordinates: {String(location.latitude ?? "n/a")},{" "}
                      {String(location.longitude ?? "n/a")}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
