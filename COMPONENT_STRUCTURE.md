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

The `src/components` directory contains all reusable components, organized into subdirectories by feature or type.

### Root Components
- `PageLayout.js` - Main page layout wrapper.
- `PageLayoutClient.js` - Client-side counterpart for the page layout.

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
Common/shared components used throughout the application. All layout is now unified and minimal:

- `AppPageLayout.js` - Exports `AppPageContainer` and `AppPageHeader` (responsive, styled-components)
- `AppClientLayout.js` - Main client-side layout wrapper (site chrome, navigation, footer)
- `ClientLayout.js` - Another client-side layout component.
- `Providers.js` - Theme and context providers (`Providers`, `useTheme`)
- `SidebarContent.js` - Shared sidebar container, also exports `SidebarContentWithDelay` for animation-friendly delayed rendering

**Usage Example:**
```javascript
import { AppPageContainer, AppPageHeader } from '@/components/common'

export default function SomePage() {
  return (
    <AppPageContainer>
      <AppPageHeader $align="left">
        <div className="subtitle">
          <span className="highlight">42</span> items found
        </div>
        <h1>Page Title</h1>
      </AppPageHeader>
      <div>Content goes here</div>
    </AppPageContainer>
  )
}
```

**Sidebar Animation Example:**
```javascript
import { SidebarContentWithDelay } from '@/components/common/SidebarContent'

<SidebarContentWithDelay delay={300}>
  {/* Sidebar children here */}
</SidebarContentWithDelay>
```

**Responsive Breakpoints (Styled-Components):**
- **Desktop**: 150px vertical, 120px horizontal padding
- **Tablet (≤1080px)**: 140px vertical, 100px horizontal
- **Mobile (≤768px)**: 120px vertical, 90px horizontal
- **Small Mobile (≤480px)**: 100px vertical, 35px horizontal
- **Font Sizes**: Use `clamp()` for fluid typography (auto-scales between breakpoints)

**Why Styled-Components?**
- ✅ Responsive media queries built-in
- ✅ Works in both server and client components (client component can wrap server children)
- ✅ Theme integration with `${({ theme }) => ...}`
- ✅ Dynamic props for alignment, spacing, etc.
- ✅ Type-safe with TypeScript
- ✅ Scoped styles (no CSS conflicts)

### `/src/components/icons/`
A collection of SVG icon components.

- `github.js`, `linkedin.js`, `twitter.js`, `instagram.js` - Social media icons.
- `folder.js`, `project.js`, `posting.js` - Icons for different content types.
- `sun.js`, `moon.js` - Theme toggle icons.
- `loader.js` - A loader icon.
- ...and many more.

**Import:** `import { IconGitHub, IconLinkedIn } from '@/components/icons'` (example)


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
- `/components/common/AppClientLayout.js`
- `/components/common/AppPageLayout.js`
- `/components/common/Providers.js`


### Server-Safe Exports
(No longer used; all layout is handled via styled-components for consistency)

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

1. **Client Components**: Use `AppPageContainer` and `AppPageHeader` from `@/components/common` for styled-components
3. **Imports**: Use barrel imports from directories for cleaner code
4. **Styled Components**: All components using `styled-components` MUST have `'use client'` directive
5. **Separation**: Keep server/client boundary clear - don't import client components into server component files

## Migration Notes

- Moved from flat `/components` to organized subdirectories
- Added barrel exports (`index.js`) in each directory
- Separated client-only exports in `/components/common` (all layout is now client-side for consistency)
- All import paths updated to use new structure
- Fixed export/import mismatches (named vs default exports)