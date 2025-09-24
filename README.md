# Daevik Jain - Portfolio Website

A modern, interactive portfolio website showcasing software engineering projects and experience. Built with Next.js 14, TypeScript, and featuring 3D animations, interactive skill trees, and responsive design.

## 🚀 Features

- **3D Interactive Hero Section** - Mouse-tracking 3D name animation with particle effects
- **Experience Timeline** - Interactive journey through professional experience
- **Skills Tree Visualization** - Graph-based skill representation with gradient nodes
- **Project Gallery** - Filterable showcase with hover effects and detailed project cards
- **Dark/Light Theme** - Smooth theme transitions with system preference detection
- **Responsive Design** - Optimized for all device sizes
- **Performance Optimized** - Memoized components and throttled animations

## 🛠️ Tech Stack

### Core Framework
- **Next.js** 14.2.25 (App Router)
- **React** 18.3.1
- **TypeScript** 5
- **Node.js** >=18.0.0

### Styling & UI
- **Tailwind CSS** 4.1.9
- **Shadcn/ui** Components
- **Framer Motion** 11.15.0 (Animations)
- **Lucide React** 0.454.0 (Icons)
- **Geist Font** 1.3.1

### 3D & Graphics
- **Three.js** 0.169.0
- **@react-three/fiber** 8.17.10
- **@react-three/drei** 9.114.3

### Forms & Validation
- **React Hook Form** 7.60.0
- **Zod** 3.25.67
- **@hookform/resolvers** 3.10.0

### Additional Libraries
- **next-themes** 0.4.6 (Theme switching)
- **date-fns** 4.1.0 (Date formatting)
- **sonner** 1.7.4 (Toast notifications)
- **@vercel/analytics** 1.3.1

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (or **yarn** 1.22.0+ / **pnpm** 8.0.0+)
- **Git** for version control

### Check Your Versions
\`\`\`bash
node --version  # Should be >=18.0.0
npm --version   # Should be >=8.0.0
\`\`\`

## 🚀 Quick Start

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd daevik-portfolio
\`\`\`

### 2. Install Dependencies
Choose your preferred package manager:

\`\`\`bash
# Using npm (recommended)
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
\`\`\`

### 3. Run Development Server
\`\`\`bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
\`\`\`

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

\`\`\`
daevik-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout with fonts and providers
│   └── page.tsx           # Main portfolio page
├── components/            # React components
│   ├── ui/               # Shadcn/ui components (40+ components)
│   ├── hero-section.tsx  # 3D animated hero with particles
│   ├── experience-timeline.tsx  # Professional experience
│   ├── projects-gallery.tsx     # Project showcase
│   ├── skills-section.tsx       # Interactive skills tree
│   ├── contact-form.tsx         # Contact form with validation
│   ├── theme-toggle.tsx         # Dark/light mode toggle
│   └── ...               # Additional components
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utility functions
│   └── utils.ts          # Tailwind class merging utilities
├── public/               # Static assets
│   └── images/           # Project images and assets
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.mjs       # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
└── components.json       # Shadcn/ui configuration
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build the application for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint for code linting
\`\`\`

## 🎨 Customization

### Updating Personal Information
1. **Hero Section**: Edit `components/hero-section.tsx` to update name and tagline
2. **Experience**: Modify `components/experience-timeline.tsx` for work history
3. **Projects**: Update `components/projects-gallery.tsx` with your projects
4. **Skills**: Customize `components/skills-section.tsx` with your technical skills
5. **Contact**: Edit `components/contact-form.tsx` for contact information

### Theme Customization
- **Colors**: Modify CSS variables in `app/globals.css`
- **Fonts**: Update font imports in `app/layout.tsx`
- **Animations**: Adjust Framer Motion configs in component files

### Adding New Sections
1. Create new component in `components/`
2. Import and add to `app/page.tsx`
3. Update navigation in `components/hero-section.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Other Platforms
\`\`\`bash
# Build for production
npm run build

# The `out` folder contains the static files
# Upload to any static hosting service
\`\`\`

## 🐛 Troubleshooting

### Common Issues

**Node.js Version Error**
\`\`\`bash
# Update Node.js to version 18+
# Use nvm (recommended):
nvm install 18
nvm use 18
\`\`\`

**Package Installation Fails**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
npm run fresh-install
\`\`\`

**React Three Fiber Compatibility Issues**
\`\`\`bash
# If you get "Cannot read properties of undefined" errors:
# 1. Ensure React 18.3.1 is installed (not React 19)
# 2. Clear all dependencies and reinstall
npm run fresh-install

# 3. If issues persist, manually install compatible versions:
npm install react@18.3.1 react-dom@18.3.1 @react-three/fiber@8.17.10 @react-three/drei@9.114.3 three@0.169.0
\`\`\`

**Build Errors**
\`\`\`bash
# Check TypeScript errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

**3D Animations Not Working**
- Ensure WebGL is enabled in your browser
- Check browser console for Three.js errors
- Try disabling browser extensions
- Verify React and React Three Fiber versions are compatible

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Daevik Jain**
- Email: daevikjain@gmail.com
- Phone: 647-615-7812
- LinkedIn: [linkedin.com/in/daevikjain](https://linkedin.com/in/daevikjain)
- GitHub: [github.com/daevikjain](https://github.com/daevikjain)

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
