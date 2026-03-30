# Znaine Website Implementation Checklist

## 1. Project Setup
- [x] Initialize Next.js project
- [x] Copy images to public directory
- [x] Install framer-motion

## 2. Design System
- [x] Configure `globals.css` with colors, typography, spacing variables
- [x] Set up Inter font in `layout.tsx`

## 3. UI Primitives
- [x] `Button` component
- [x] `SectionHeader` component (Red tag + Main Heading)
- [x] `Card` base component

## 4. Layout Components
- [x] `TopBar` (Red strip with contact info & offer text)
- [x] `Navbar` (Sticky, active link highlight, mobile hamburger)
- [x] `Footer` (Dark background, 4 columns, social links)

## 5. Section Components
- [x] `HeroSection` (Full-width BG image, dark overlay, left-aligned text)
- [x] `FeatureStrip` (3-column strip that overlaps hero bottom)
- [x] `CategoryCards` (Red circle icons, 4-column grid)
- [x] `CourseGrid` (Filter tabs + 3-col card grid)
- [x] `SplitContent` (Image + text, left/right swap, feature list)
- [x] `StatsCounter` (Dark BG, animated count-up on scroll)
- [x] `TestimonialSlider` (Prev/next + dot navigation)
- [x] `CTABanner` (Dark card with heading + CTA button)

## 6. Assemble Pages
- [x] `/home-one` — Home (Hero, Features, Categories, Courses, Split, Stats, Testimonials, CTA)
- [x] `/about-two` — About Us (Hero, Split, Learning Paths, Values, Mentor CTA, Testimonials)
- [x] `/career` — Why Choose Us (Hero, Split, Reasons grid, Job listings, CTA)
- [x] `/courses-one` — Study in Russia (Hero, Split, Courses grid, Stats, Advisors, CTA)
- [x] `/blog-metro` — Language Courses (Hero, Featured post, Metro grid, CTA)
- [x] `/contact-three` — Contact (Hero, Form, Info cards, FAQ accordion)

## 7. Polish
- [x] Fix missing CSS variable (`--transition-base`)
- [x] Fix broken image paths
- [x] Start dev server & verify all 6 pages render ✅
- [ ] Add Framer Motion scroll animations (optional enhancement)
- [ ] Add `sizes` prop to Next.js Image components (minor warning fix)
