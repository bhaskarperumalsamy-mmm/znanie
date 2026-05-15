# Znanie Website    

A modern, responsive Next.js application designed to facilitate educational connections, language courses, and study opportunities between India and Russia.

## 🚀 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Library**: [React 18](https://reactjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Carousel/Sliders**: React Slick
- **Styling**: Vanilla CSS with custom Global Variables (`globals.css`)
- **Typography**: Inter Font

## 📁 Project Structure & Pages

The site is composed of several key pages, built with reusable UI components:

- `/home` — Main Landing Page (Hero, Features, Popular Courses, Testimonials)
- `/about` — About Us & Core Values
- `/career` — Career Opportunities & "Why Choose Us"
- `/courses` — Study in Russia & Educational Pathways
- `/blog` — Language Courses & Articles
- `/contact` — Contact Forms and FAQs

## 🛠️ Getting Started  

First, ensure you have all dependencies installed:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result. The application is configured to run on port `3002`.

## 🎨 Key Features

- **Dynamic Animations**: Scroll-triggered animations and page transitions powered by `framer-motion`.
- **Custom UI Components**: Reusable `Button`, `Card`, `SectionHeader`, and interactive elements like `StatsCounter` and `TestimonialSlider`.
- **Responsive Layouts**: Fully responsive navigation bar (with mobile hamburger menu) and multi-column grid layouts depending on screen sizes.
- **SEO Ready**: Configured using Next.js optimal font loading (`next/font`) and built-in image optimization (`next/image`).

## 📜 Available Scripts

- `npm run dev`: Starts the local development server (Port 3002).
- `npm run build`: Builds the application for production deployment.
- `npm run start`: Starts a production server based on the built application.
- `npm run lint`: Runs ESLint to find and fix problems in the JavaScript/TypeScript code.

---
*This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).*
