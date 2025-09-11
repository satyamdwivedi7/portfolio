# 🚀 Modern Portfolio Website

A stunning, responsive portfolio website built with Next.js, featuring dark theme, advanced animations, and modern UI components.

## ✨ Features

### 🎨 Modern Design
- **Dark Theme**: Sleek dark color scheme with neon accent colors
- **Responsive Design**: Perfect on all devices (mobile, tablet, desktop)
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Animations**: Beautiful animated gradients throughout

### 🎭 Advanced Animations
- **Framer Motion**: Smooth page transitions and component animations
- **Particle System**: Interactive animated background with floating particles
- **Cursor Effects**: Custom cursor with hover interactions
- **Scroll Progress**: Visual scroll progress indicator
- **Typing Animation**: Dynamic typewriter effect for role descriptions

### 🧩 Components
- **Interactive Navbar**: Smooth navigation with active section highlighting
- **Hero Section**: Eye-catching introduction with animated elements
- **About Section**: Personal information with animated stats
- **Skills Section**: Interactive skill categories with progress bars
- **Projects Section**: Filterable project showcase with modals
- **Contact Section**: Functional contact form with validation
- **Footer**: Complete footer with social links and quick navigation

### � Technical Features
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Framer Motion**: Production-ready motion library
- **Lucide React**: Beautiful icon library
- **Responsive Images**: Optimized image loading with Next.js Image component
- **SEO Optimized**: Complete meta tags and structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/satyamdwivedi7/portfolio.git
cd portfolio
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4️⃣ Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization

### Personal Information
Update your personal details in:
- `src/components/Hero.js` - Name, roles, description
- `src/components/About.js` - About section content, stats
- `src/components/Contact.js` - Contact information, social links
- `src/components/Footer.js` - Footer links and information

### Projects
Add your projects in:
- `src/components/Projects.js` - Update the `allProjects` array with your project data

### Colors & Styling
Customize colors in:
- `tailwind.config.js` - Color scheme and custom classes
- `src/app/globals.css` - Global styles and animations

## 🛠 Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Fira Code (Google Fonts)
- **Containerization**: Docker

## 🐳 Docker Deployment

### Build the Docker Image
```bash
docker build -t portfolio-app .
```

### Run the Container
```bash
docker run -p 3000:3000 portfolio-app
```