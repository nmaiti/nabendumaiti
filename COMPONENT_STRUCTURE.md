# Component Structure

This document describes the organized component and app structure of the Next.js application.

## App Directory Structure

### `/src/app/`
Next.js App Router pages and API routes.

```
src/app/
├── api/                      # API routes
│   ├── featured/            # Featured projects API + cover image handler
│   ├── jobs/                # Jobs API
│   ├── posts/               # Posts API
│   ├── projects/            # Projects API + cover image handler
│   └── uploads/             # Static file serving for content uploads
├── archive/                 # Archive page (server + client split)
│   ├── page.js              # Server component (fetches data)
│   └── ArchiveClient.js     # Client component (interactive table)
├── blogs/                   # All blogs listing page (client-side)
│   └── page.js              # Client component with data fetching
├── categories/[slug]/       # Dynamic category pages (SSG)
│   └── page.js              # Server component with generateStaticParams
├── posts/[...slug]/         # Dynamic post pages (SSG)
│   ├── page.js              # Server component with generateStaticParams
│   └── PostContent.js       # Client component for post content
├── search/                  # Search results page (client-side)
│   └── page.js              # Client component with search params
├── tags/[slug]/             # Dynamic tag pages (SSG)
│   └── page.js              # Server component with generateStaticParams
├── fonts.js                 # Font configuration (local fonts)
├── layout.js                # Root layout with metadata
└── page.js                  # Homepage (client component)
```

**Key Features:**
- **93 Static Pages Generated** - Optimized with `generateStaticParams` for categories, tags, and posts
- **API Routes** - Optimized with shared image handler and caching
- **Server/Client Split** - Strategic use of server components for data fetching
- **SEO Optimized** - Metadata exports for all static pages

## Component Directory Structure

### `/src/components/layout/`
Layout-related components used across the entire application.

- `nav.js` - Main navigation bar
- `menu.js` - Mobile menu component
- `footer.js` - Site footer
- `side.js` - Side navigation elements
- `social.js` - Social media links
- `email.js` - Email contact link
- `loader.js` - Loading spinner/animation

**Import:** `import { Nav, Menu, Footer, Side, Social, Email, Loader } from '@/components/layout'`

### `/src/components/blog/`
Blog-specific components for posts, listings, and sidebars.

- `Post.js` - Single post card/preview component
- `Posts.js` - Post listing container with grid/list layouts
- `PostSidebar.js` - Sidebar for individual post pages
- `BlogSidebar.js` - General blog sidebar with categories/tags
- `SidebarLayout.js` - Layout wrapper for pages with sidebars
- `SearchWidget.js` - Search functionality widget

**Exports:**
- Named: `Post`, `Posts`, `PostSidebar`, `SidebarLayout`
- Named from BlogSidebar: `BlogSidebar`, `SidebarCard`, `Tag`, `Category`
- Default: `SearchWidget`

**Import Examples:**
```javascript
import { Posts, Post, SidebarLayout } from '@/components/blog'
import { BlogSidebar, Tag, Category } from '@/components/blog'
import SearchWidget from '@/components/blog'
```

### `/src/components/common/`
Common/shared components used throughout the application.

- `PageLayout.js` - Server-safe inline style objects for layouts
- `PageLayoutClient.js` - Client-side styled-components for layouts
- `Providers.js` - Theme and context providers
- `ClientLayout.js` - Main client-side layout wrapper

**Server Component Imports:**
```javascript
import { pageContainerStyle, pageHeaderStyle } from '@/components/common'
```

**Client Component Imports:**
```javascript
import { ClientPageContainer, PageHeader } from '@/components/common'
import { Providers, useTheme } from '@/components/common'
import ClientLayout from '@/components/common'
```

### `/src/components/sections/`
Page section components (hero, about, projects, etc.)

- `hero.js` - Homepage hero section
- `about.js` - About section
- `jobs.js` - Work experience section
- `projects.js` - Projects showcase
- `featured.js` - Featured projects section
- `contact.js` - Contact section

**Import:** `import { Hero, About, Jobs, Projects, Featured, Contact } from '@/components/sections'`

## Server vs Client Components

### Client Components ('use client')
All components in the following directories require 'use client' directive:
- `/components/layout/*` - All use styled-components
- `/components/blog/*` - All use styled-components
- `/components/sections/*` - All use styled-components
- `/components/common/ClientLayout.js`
- `/components/common/PageLayoutClient.js`
- `/components/common/Providers.js`

### Server-Safe Exports
- `/components/common/PageLayout.js` - Exports plain JavaScript objects for inline styles
  - `pageContainerStyle` - Container style object
  - `pageHeaderStyle()` - Header style function

## Barrel Exports

Each directory has an `index.js` that exports all components. This allows cleaner imports:

```javascript
// Instead of:
import Nav from '@/components/layout/nav'
import Menu from '@/components/layout/menu'

// You can use:
import { Nav, Menu } from '@/components/layout'
```

## Best Practices

1. **Server Components**: Use `pageContainerStyle` and `pageHeaderStyle` from `@/components/common` for inline styles
2. **Client Components**: Use `ClientPageContainer` and `PageHeader` from `@/components/common` for styled-components
3. **Imports**: Use barrel imports from directories for cleaner code
4. **Styled Components**: All components using `styled-components` MUST have `'use client'` directive
5. **Separation**: Keep server/client boundary clear - don't import client components into server component files

## Migration Notes

- Moved from flat `/components` to organized subdirectories
- Added barrel exports (`index.js`) in each directory
- Separated server-safe and client-only exports in `/components/common`
- All import paths updated to use new structure
- Fixed export/import mismatches (named vs default exports)
