Rabiro - Digital Marketing Agency
A modern, high-performance digital agency website showcasing cutting-edge web technologies. Built with Next.js (App Router), Tailwind CSS, GSAP for smooth animations, and Three.js for an immersive 3D particle background.

🚀 Features
Three.js Background: Lightweight particle system in the hero section with glowing orbs, mouse-based parallax, and a dark + electric blue theme. Optimized for performance and disabled on mobile with a gradient fallback.
GSAP Animations: Seamless UI animations and scroll-triggered effects across all sections (hero, about, services, projects, testimonials). Clean timelines for fade-ins, slides, and staggers.
Custom Cursor: Glowing circle that traces the cursor with smooth trailing animation (disabled on mobile).
Responsive Design: Fully responsive layout using Tailwind CSS with dark theme and electric blue accents.
Contact Form: Functional form with validation, API route for submissions, and success/error states.
Performance Optimized: Dynamic imports for heavy components, cleanup on unmount, and efficient render loops.
🛠 Tech Stack
Frontend: Next.js (App Router), React
Styling: Tailwind CSS
Animations: GSAP (with ScrollTrigger)
3D Graphics: Three.js (optional: react-three-fiber)
UI Components: shadcn/ui (Button, Badge, Avatar)
Other: TypeScript, ESLint
📁 Project Structure
rabiro-hero/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind styles + CSS variables
│   └── api/                # API routes (e.g., contact form)
├── components/
│   ├── Navbar.tsx          # Animated navbar
│   └── ui/                 # shadcn components
│       ├── button.tsx
│       ├── badge.tsx
│       └── avatar.tsx
├── lib/
│   └── utils.ts            # cn() utility
├── public/                 # Static assets
└── package.json            # Dependencies
🏁 Getting Started
Clone the repository:

git clone https://github.com/Sarrafaditya/rabiro-hero.git
cd rabiro-hero
Install dependencies:

npm install
Run the development server:

npm run dev
Open http://localhost:3000 in your browser.

🎨 Customization
Theme Colors: Update app/globals.css for dark + electric blue palette.
Animations: Modify GSAP timelines in component files for timing and effects.
Three.js Background: Adjust particle count, colors, and interactions in the hero component.
📄 License
This project is licensed under the MIT License.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

Built with ❤️ for digital marketing excellence.