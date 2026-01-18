# Component Structure (Updated for SSR/Client Division and *Client.js Naming)

This document describes the organized component and app structure of the Next.js application, with explicit notes on server and client components and the new *Client.js naming convention.

---

## App Directory Structure

### `/src/app/`
Next.js App Router pages and API routes.

```
src/app/
├── api/                      # API routes (server)
│   ├── featured/            # Featured projects API + cover image handler
│   ├── jobs/                # Jobs API
│   ├── posts/               # Posts API
│   ├── projects/            # Projects API + cover image handler
│   └── uploads/             # Static file serving for content uploads
├── archive/                 # Archive page (server + client split)
│   ├── page.js              # Server component (fetches data, passes to client)
│   └── ArchiveClient.js     # Client component (interactive table, 'use client')
├── blogs/                   # All blogs listing page (server + client split)
│   ├── page.js              # Server component (renders BlogsClient)
│   └── BlogsClient.js       # Client component ('use client', fetches data client-side)
├── categories/[slug]/       # Dynamic category pages (SSG)
│   ├── page.js              # Server component (fetches data, passes to client)
│   └── CategoryClient.js    # Client component (interactive, 'use client')
├── posts/[...slug]/         # Dynamic post pages (SSG)
│   ├── page.js              # Server component (fetches data, passes to client)
│   └── PostClient.js        # Client component (renders post, comments, 'use client')
├── profile/                 # Profile page (server + client split)
│   ├── page.js              # Server component (renders ProfileClient)
│   └── ProfileClient.js     # Client component ('use client')
├── search/                  # Search results page (server + client split)
│   ├── page.js              # Server component (renders SearchClient)
│   └── SearchClient.js      # Client component ('use client', fetches data client-side)
├── tags/[slug]/             # Dynamic tag pages (SSG)
│   ├── page.js              # Server component (fetches data, passes to client)
│   └── TagClient.js         # Client component (interactive, 'use client')
├── homeClient.js            # Client component for homepage ('use client')
├── homePage.js              # Server component (renders HomeClient)
├── fonts.js                 # Font configuration (local fonts)
├── layout.js                # Root layout (server component, wraps Providers/Nav/AppClientLayout)
└── page.js                  # Homepage (server component, renders HomeClient)
```

**Key SSR/Client Notes:**
- All `page.js` files in dynamic routes (categories, tags, posts, archive, blogs, search, profile) are **server components**: they fetch data and pass it as props to their respective client components.
- All `*Client.js` files are **client components** (`'use client'`), handling interactivity, search, and UI state.
- `/posts/[...slug]/PostContent.js` has been removed; use `PostClient.js` directly for post rendering.
- `/layout.js` is a **server component** but wraps the entire app in Providers and layout components (which are client components).

---

## Component Directory Structure

The `src/components` directory contains all reusable components, organized into subdirectories by feature or type.

### `/src/components/layout/`
- All components are **client components** (`'use client'`), using styled-components.
- Includes: `nav.js`, `menu.js`, `footer.js`, `side.js`, `social.js`, `email.js`, `loader.js`

### `/src/components/blog/`
- All components are **client components** (`'use client'`), using styled-components.
- Includes: `Post.js`, `Posts.js`, `PostSidebar.js`, `BlogSidebar.js`, `SidebarLayout.js`, `SearchWidget.js`

### `/src/components/common/`
- All layout and provider components are **client components** (`'use client'`).
- Includes: `AppPageLayout.js`, `AppClientLayout.js`, `ClientLayout.js`, `Providers.js`, `SidebarContent.js`

### `/src/components/icons/`
- All icon components are **client components**.

### `/src/components/sections/`
- All section components are **client components** (`'use client'`), using styled-components.
- Includes: `hero.js`, `about.js`, `jobs.js`, `projects.js`, `featured.js`, `contact.js`

---

## Server vs Client Components

### Server Components
- All `page.js` files in `/src/app/` (except those named `*Client.js`) are **server components**.
- These fetch data and pass it to client components as props.

### Client Components
- All files with `'use client'` at the top (including all `/components/`, all `*Client.js`).
- All interactive, stateful, or styled-components-based UI.

---

## Best Practices

- **Data Fetching:** Always fetch data in server components (`page.js`), then pass to client components for interactivity.
- **Client Components:** Use `'use client'` for all interactive, styled, or stateful components. Name all interactive app directory components as `*Client.js` for consistency.
- **Imports:** Use barrel exports from directories for cleaner code.
- **Styled Components:** All components using styled-components must be client components.
- **Separation:** Never import client components into server component files except as children (i.e., pass as props).

---