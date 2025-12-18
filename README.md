# 🍎 MacBook Pro Landing Page

A stunning, interactive MacBook Pro landing page built with React, Three.js, and GSAP animations. This project showcases advanced web development techniques including 3D model rendering, scroll-triggered animations, and responsive design.

![MacBook Pro Landing Page](https://img.shields.io/badge/React-18.3.1-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.170.0-green) ![GSAP](https://img.shields.io/badge/GSAP-3.12.5-orange) ![Vite](https://img.shields.io/badge/Vite-5.4.11-purple)

## 🚀 Features

- **Interactive 3D MacBook Models**: View MacBook 14" and 16" models with realistic rendering
- **Smooth Scroll Animations**: GSAP-powered scroll-triggered animations throughout
- **Color & Size Customization**: Switch between Space Black and Silver finishes
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Lazy loading, efficient rendering, and optimized assets
- **Apple-Inspired UI**: Clean, modern design following Apple's aesthetic

## 🛠️ Technologies Used

### Core Framework

- **React 18.3.1** - Modern UI library with hooks
- **Vite 5.4.11** - Lightning-fast build tool and dev server

### 3D Graphics & Animation

- **Three.js 0.170.0** - 3D rendering engine
- **@react-three/fiber 8.17.10** - React renderer for Three.js
- **@react-three/drei 9.114.3** - Useful Three.js helpers
- **GSAP 3.12.5** - Professional-grade animation library
- **@gsap/react 2.1.1** - GSAP React hooks

### State Management & Utils

- **Zustand 5.0.1** - Lightweight state management
- **React Responsive 10.0.0** - Media query hooks for responsive design

### Styling

- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **Custom CSS** - Additional styling for complex animations

## 🧠 Key Implementation Logic

### 1. State Management (Zustand)

The app uses Zustand for managing global state:

```javascript
// store/index.js
const useStore = create((set) => ({
  model: "MacBook Pro 14",
  color: "Space Black",
  setModel: (model) => set({ model }),
  setColor: (color) => set({ color }),
}));
```

**Benefits:**

- Simple API with minimal boilerplate
- No provider wrapper needed
- Automatic re-renders on state changes

### 2. 3D Model Rendering

Three.js models are loaded using `@react-three/fiber` and `@react-three/drei`:

```javascript
// ModelSwitcher.jsx
<Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
  <StudioLights />
  <PresentationControls>
    <Float>
      <Model /> {/* MacBook 14" or 16" based on state */}
    </Float>
  </PresentationControls>
</Canvas>
```

**Key Features:**

- `useGLTF` for efficient model loading
- `PresentationControls` for mouse interaction
- `Float` for subtle floating animation
- Custom studio lighting setup

### 3. Scroll-Triggered Animations

GSAP ScrollTrigger creates dynamic scroll experiences:

```javascript
// Showcase.jsx
useGSAP(() => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: showcaseRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,  // Smooth scrubbing
      pin: true,    // Pin section during scroll
    },
  });

  timeline
    .to(".mask img", { scale: 1.1 })
    .to(".content", { opacity: 1, y: 0 });
});
```

**Animation Types:**

- Fade-in effects
- Scale transformations
- Parallax scrolling
- Pinned sections
- Staggered animations

### 4. Responsive Design

Uses `react-responsive` for conditional rendering:

```javascript
const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

// Disable heavy animations on mobile
if (!isTablet) {
  // Complex GSAP animations
}
```

### 5. Performance Optimization

- **Lazy Loading**: Models loaded on-demand
- **useGSAP Hook**: Automatic cleanup of GSAP instances
- **Memoization**: React.memo for expensive components
- **Asset Optimization**: Compressed videos and models
- **Conditional Rendering**: Heavy features disabled on mobile

## 🎨 Component Breakdown

### Hero Section

- Animated text with GSAP
- Call-to-action buttons
- Smooth entrance animations

### Highlights Carousel

- Video carousel with autoplay
- Progress indicators
- Mobile-responsive controls

### ProductViewer (3D Showcase)

- Interactive 3D MacBook models
- Real-time color switching (Space Black / Silver)
- Size selection (14" / 16")
- Mouse-controlled rotation
- Floating animation effect

### Showcase

- Scroll-triggered video scaling
- Content fade-in animations
- Pinned section effect
- M4 chip specifications

### Performance

- Animated performance metrics
- Scroll-triggered counters
- Visual comparisons

### Features

- Grid layout of key features
- Icon animations
- Hover effects

## 🗂️ Project Structure

```
├── public/                 # Static assets served as-is
│   ├── models/             # GLB files for the 14" and 16" MacBook Pro
│   ├── videos/             # MP4 clips used in feature carousel and hero
│   └── *.png / *.svg       # Icons, masks, performance imagery, fonts
├── src/
│   ├── App.jsx             # Page composition + ScrollTrigger registration
│   ├── main.jsx            # React entry point
│   ├── index.css           # Tailwind v4 + custom theme tokens/utilities
│   ├── store/              # Zustand store for color/scale/texture state
│   ├── constants/          # Data for nav, features, performance layout
│   └── components/
│       ├── Hero.jsx        # Intro headline + hero video/cta
│       ├── Navbar.jsx      # Apple-like top navigation
│       ├── ProductViewer.jsx # 3D viewer shell + controls
│       ├── Showcase.jsx    # Scroll-triggered video/mask section
│       ├── Performance.jsx # Floating performance imagery grid
│       ├── Features.jsx    # Feature carousel tied to GSAP sequence
│       ├── Highlights.jsx  # Masonry-style highlight cards
│       ├── Footer.jsx      # Footer links and legal
│       ├── models/         # R3F wrappers for MacBook meshes
│       └── three/          # Canvas scaffolding & lights (ModelSwitcher, StudioLights)
├── package.json            # Scripts and dependency versions
├── vite.config.js          # Vite + React plugin setup
└── eslint.config.js        # Linting rules
```

## ⚙️ Architecture & Data Flow

- **State (Zustand):** `src/store/index.js` tracks the MacBook finish (`color`), size toggle (`scale`), and active feature video (`texture`) for the 3D viewer, with a `reset` helper so components can quickly revert to defaults.
- **3D pipeline:** `ProductViewer` renders `ModelSwitcher` (R3F Canvas) which swaps between 14" and 16" GLTF meshes based on the current `scale`, applies the chosen finish color to changeable mesh parts (`noChangeParts` ignored), and uses `StudioLights` for consistent lighting.
- **Animation orchestration:** GSAP ScrollTrigger timelines live inside each section (e.g., `Showcase`, `Performance`, `Highlights`, `Features`), while global plugin registration happens once in `App.jsx`.
- **Content configuration:** `src/constants/index.js` centralizes nav items, feature metadata, performance image positions, and the feature video sequence so copy or assets can be edited without touching component logic.
- **Styling:** Tailwind v4 utilities are extended in `index.css` with custom fonts, colors, and small utility shorthands (`flex-center`, `h3-semibold`, etc.) plus CSS variables for gradients and scrollbars.

## 🎞️ Animation & Interaction Notes

- **Scroll sections:** Most sections pin or scrub based on GSAP ScrollTrigger; mobile breakpoints reduce or disable heavy effects via media queries and conditional hooks.
- **Feature sequence:** `featureSequence` drives synchronized video swaps and card reveals; delays ensure the hero video finishes before subsequent clips start.
- **3D controls:** Camera framing and float effects are handled by `@react-three/drei` helpers (`PresentationControls`, `Float`), while material updates are driven by Zustand state setters.

## 🖼️ Assets & Performance

- All heavy assets (GLB models, MP4 feature clips, masks, performance PNG/JPGs, and custom OTF fonts under `public/fonts/`) live in `public/` for direct Vite serving.
- Videos are optimized for web playback; models are compressed and selectively recolored to keep GPU work minimal.
- Some animations are intentionally toned down on tablet/mobile to protect frame rate and battery.

## 🧑‍💻 Development Workflow

1. `npm install` — install dependencies.
2. `npm run dev` — start Vite dev server at `http://localhost:5173`.
3. `npm run build` — create production bundle in `dist/`.
4. `npm run preview` — preview the production build locally.
5. `npm run lint` — run ESLint for code quality.

## 🛠️ Customization Tips

- **Change default color/scale/video:** Edit defaults in `src/store/index.js`.
- **Swap feature videos or text:** Update `featureSequence` and `features` entries in `src/constants/index.js`.
- **Tweak 3D lighting:** Adjust intensity/position in `src/components/three/StudioLights.jsx`.
- **Replace assets:** Drop new files in `public/` and update paths in constants or components; Vite will serve them without extra config.

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aditya-2k23/Macbook.git
cd Macbook
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Learning Points

1. **Three.js Integration**: How to integrate 3D models in React applications
2. **GSAP Animations**: Creating professional scroll-triggered animations
3. **State Management**: Using Zustand for lightweight state management
4. **Performance**: Optimizing 3D rendering and animations
5. **Responsive Design**: Building mobile-first, adaptive interfaces
6. **Component Architecture**: Structuring a complex React application

## 🔧 Configuration

### Tailwind CSS

Custom theme configuration in `tailwind.config.js` with Apple-inspired colors and typography.

### Vite

Optimized build configuration in `vite.config.js` for fast development and production builds.

### ESLint

Code quality rules configured in `eslint.config.js`.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** WebGL support required for 3D models.

## 👨‍💻 Author

**Aditya**

- GitHub: [@aditya-2k23](https://github.com/aditya-2k23)

## 🙏 Acknowledgments

- Apple for design inspiration
- Three.js community for excellent documentation
- GSAP team for powerful animation tools
- React Three Fiber contributors

## 🐛 Known Issues

- 3D models may load slowly on slower connections
- Some animations disabled on mobile for performance

---

**Made with ❤️ using React, Three.js, and GSAP**
