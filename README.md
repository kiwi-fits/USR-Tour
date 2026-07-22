# USR Tours - Travel with us. Create memories.

A modern, responsive, mobile-optimized tourism website built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling.

## Features
- **Beach Color Palette**: Ocean Blue (`#0077B6`), Tropical Teal (`#00B4D8`), Sandy Gold (`#F4A261`), Coral Sunset (`#E76F51`), Pearl White (`#F8F9FA`), Midnight Navy (`#03045E`).
- **7 Fully Responsive Pages**:
  1. **Home (`/`)**: Parallax Hero, Feature Cards, Must-Visit Destinations, CTA Banner, Guest Testimonials.
  2. **Destinations (`/destinations`)**: Interactive filter tabs (Beach, Heritage, History, Nature).
  3. **Experiences (`/experiences`)**: Alternating curated cards with ratings, highlights, prices, and booking links.
  4. **Tour Packages (`/packages`)**: 3-tiered package cards (Explorer, Voyager, Prestige) + Custom tour CTA.
  5. **Gallery (`/gallery`)**: Masonry grid with filter tabs & interactive full-screen Lightbox modal.
  6. **Contact (`/contact`)**: Form validation, contact details & interactive state.
  7. **Booking (`/booking`)**: Interactive multi-step booking wizard (Package → Dates → Details → Confirmation).

## How to Run

1. Open terminal inside this folder:
   ```bash
   cd ~/Desktop/jaffna-tourism
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy AI-generated HD photos into `public/`:
   ```bash
   node setup-images.js
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cloudflare Pages Deployment

Build command:
```bash
npm run build
```
Output directory: `.next` or static export folder.
# USR-Tour
