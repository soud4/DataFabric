// Helper to prefix links with Astro's base path
// Usage in .astro frontmatter: import { link } from '@/lib/links'
// Then in template: href={link('/servicios/vps')}

const base = import.meta.env.BASE_URL.replace(/\/$/, "")

export function link(path: string): string {
  // Anchor-only links stay as-is
  if (path.startsWith("#")) return path
  // Already prefixed
  if (path.startsWith(base + "/") || path === base) return path
  // Prefix the path
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
