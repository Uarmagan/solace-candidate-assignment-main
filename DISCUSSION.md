I didn't get to everything I wanted within the two-hour window, so here's what I'd tackle next and why it matters:

- Implement comprehensive test coverage with Jest for unit testing and Playwright for end-to-end validation. Jest tests would target search filtering logic, Tanstack Query hooks, and API error handling, while Playwright would automate user flows (search, specialty filtering, sorting, pagination). Adding this testing infrastructure early would accelerate feature delivery and catch regressions before code review.

- Move the Advocate results filtering into the `/api/advocates` route. The GET handler would accept a `search` query parameter (and later `pagination` and `sort` parameters), run the filter in SQL via Drizzle, and return the smallest possible payload. That keeps the network cost predictable and lets React Query cache per-search results instead of re-filtering the entire list on the client.

- Hook the app up to a Postgres instance for real so we can check it's working with the actual data. I'd finish the Drizzle plumbing (`getDb`, migrations, seeds) and run everything against dockerized Postgres so we can validate query plans, indexes, and data shape before production.

- Add table ergonomics: column sorting, server-driven pagination, and specialty filter pills to start so users can filter by specialty. Using Tanstack Table would make this straightforward to add so I'd probably use that. All the sorting, filtering, and pagination state should also be managed in the query params so we can get shareable URLs and better analytics.

- Polish the presentation layer for the Advocate table. There's quite a bit of content layout shift that I would like to iron out and make the loading state feel more intentional with skeleton rows instead of a bare "Loading advocates..." message. I would also replace the inline "Failed to load advocates" message with a non-blocking toast notification that allows the user to retry the request from the toast, differentiate between real no-result states and server hiccups, and add formatted phone numbers plus responsive layouts for small screens.

There is more room performance optimization things that can be done like prefetching and virtualization, but these are a good start.
