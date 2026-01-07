# Nabendu Maiti - Next.js Migration

This project has been migrated from Gatsby to Next.js (App Router).

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Structure

*   `src/app`: App Router pages and layouts.
*   `src/lib`: Utility functions (Markdown processing, Styled Components registry).
*   `src/components`: React components.
*   `content`: Markdown content (posts, projects, etc.).

## Migration Notes

*   **Data Fetching**: `src/lib/api.js` replaces Gatsby's GraphQL layer. It reads markdown files directly from the `content` directory.
*   **Styling**: Styled Components are configured with a registry in `src/lib/registry.js` and `src/app/layout.js`.
*   **Routing**: Dynamic routes for posts are handled in `src/app/posts/[...slug]/page.js`.
*   **Images**: `next/image` should be used for optimized images. (Currently, markdown images are rendered as standard `<img>` tags via `remark-rehype`).

