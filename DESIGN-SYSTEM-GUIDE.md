# Anime Case - Premium Dark Theme Design System

## 🎨 Design Overview

A modern, Apple-inspired dark theme design system for a premium e-commerce website selling custom anime-style phone cases. The design emphasizes:

- **Dark theme** with high contrast
- **Neon accents** for anime aesthetic
- **Premium, minimal layout** similar to Apple.com
- **Smooth animations** and interactions
- **Mobile-first** responsive design

---

## 🌈 Color Palette

### Primary Backgrounds
```css
--color-bg-primary: #0B0B0D       /* Main background - Deep black */
--color-bg-secondary: #111111     /* Secondary sections */
--color-bg-tertiary: #1A1A1A      /* Card backgrounds */
--color-bg-elevated: #1F1F1F      /* Elevated elements */
```

### Neon Accent Colors
```css
--color-accent-blue: #4DA6FF      /* Primary neon blue */
--color-accent-purple: #8B5CF6    /* Secondary neon purple */
--color-accent-red: #FF4D6D       /* Accent red for anime emphasis */
--color-accent-pink: #FF6BCB      /* Accent pink */
```

### Text Colors
```css
--color-text-primary: #FFFFFF     /* Main text - White */
--color-text-secondary: #B3B3B3   /* Secondary text - Light gray */
--color-text-muted: #808080       /* Muted text */
```

### Gradients
```css
--gradient-blue-purple: linear-gradient(135deg, #4DA6FF 0%, #8B5CF6 100%)
--gradient-purple-pink: linear-gradient(135deg, #8B5CF6 0%, #FF6BCB 100%)
--gradient-anime: linear-gradient(135deg, #FF4D6D 0%, #8B5CF6 50%, #4DA6FF 100%)
```

---

## 📝 Typography

### Font Families
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Sizes
```css
--font-xs: 0.75rem    /* 12px */
--font-sm: 0.875rem   /* 14px */
--font-base: 1rem     /* 16px */
--font-lg: 1.125rem   /* 18px */
--font-xl: 1.25rem    /* 20px */
--font-2xl: 1.5rem    /* 24px */
--font-3xl: 2rem      /* 32px */
--font-4xl: 2.5rem    /* 40px */
--font-5xl: 3.5rem    /* 56px */
--font-6xl: 4.5rem    /* 72px */
```

### Font Weights
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-extrabold: 800
--font-weight-black: 900
```

### Usage Guidelines
- **Hero Titles**: Font size 4xl-6xl, weight black (900)
- **Section Titles**: Font size 3xl-4xl, weight extrabold (800)
- **Card Titles**: Font size xl-2xl, weight bold (700)
- **Body Text**: Font size base-lg, weight normal (400)
- **Secondary Text**: Font size sm-base, color text-secondary

---

## 🎯 UI Components

### Buttons

#### Primary Button
```css
.btn-primary {
    background: var(--gradient-blue-purple);
    color: white;
    padding: 0.875rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 24px rgba(77, 166, 255, 0.4);
}
```

#### Secondary Button
```css
.btn-secondary {
    background: var(--color-bg-elevated);
    color: white;
    border: 1px solid var(--color-border-default);
}
```

#### Outline Button
```css
.btn-outline {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.15);
}
```

### Cards

```css
.card {
    background: var(--color-bg-card);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 1.5rem;
    padding: 2rem;
    transition: all 0.3s;
}
.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.15);
}
```

### Form Inputs

```css
input, textarea, select {
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    color: white;
    padding: 1rem 1.5rem;
}
input:focus {
    border-color: var(--color-accent-blue);
    box-shadow: 0 0 24px rgba(77, 166, 255, 0.4);
    background: var(--color-bg-elevated);
}
```

---

## 📐 Spacing System

```css
--space-xs: 0.5rem    /* 8px */
--space-sm: 1rem      /* 16px */
--space-md: 1.5rem    /* 24px */
--space-lg: 2rem      /* 32px */
--space-xl: 3rem      /* 48px */
--space-2xl: 4rem     /* 64px */
--space-3xl: 6rem     /* 96px */
--space-4xl: 8rem     /* 128px */
```

### Usage
- **Component Padding**: sm-lg
- **Section Padding**: 3xl (96px vertical)
- **Element Gaps**: sm-md
- **Container Max Width**: 1280px

---

## 🎭 Effects & Shadows

### Box Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 32px rgba(0, 0, 0, 0.6);
--shadow-xl: 0 20px 48px rgba(0, 0, 0, 0.7);
```

### Glow Effects
```css
--glow-blue: 0 0 24px rgba(77, 166, 255, 0.4), 0 0 48px rgba(77, 166, 255, 0.2);
--glow-purple: 0 0 24px rgba(139, 92, 246, 0.4), 0 0 48px rgba(139, 92, 246, 0.2);
```

### Border Radius
```css
--radius-sm: 0.5rem   /* 8px */
--radius-md: 0.75rem  /* 12px */
--radius-lg: 1rem     /* 16px */
--radius-xl: 1.5rem   /* 24px */
--radius-2xl: 2rem    /* 32px */
--radius-full: 9999px /* Fully rounded */
```

---

## ✨ Animations

### Transition Speeds
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Scroll Reveal
Elements with `data-scroll-reveal` attribute fade in and slide up when scrolling into view:
```css
[data-scroll-reveal] {
    opacity: 0;
    transform: translateY(30px);
    transition: all 500ms;
}
[data-scroll-reveal].revealed {
    opacity: 1;
    transform: translateY(0);
}
```

### Hover Effects
- **Buttons**: Translate up 2px + glow effect
- **Cards**: Translate up 4-8px + border color change
- **Links**: Underline animation on hover

---

## 📱 Layout Guidelines

### Navigation
- **Fixed navbar** at top with blur backdrop
- **Height**: ~60px
- **Background**: rgba(11, 11, 13, 0.8) with backdrop-filter blur(20px)
- **Border bottom**: 1px subtle border

### Hero Section
- **Min-height**: 100vh on landing page
- **Padding**: Large top padding (120px) + 3xl-4xl bottom
- **Content**: Centered, max-width 900px
- **Badge**: Small rounded pill above title
- **Title**: Very large (4xl-6xl), gradient text accent
- **CTA Buttons**: Primary + Outline side by side

### Content Sections
- **Padding**: 3xl vertical (96px)
- **Alternating backgrounds**: Primary and secondary
- **Section Title**: 3xl-4xl, centered, black weight
- **Section Subtitle**: lg, secondary color, centered, max-width 700px

### Product Grid
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
```

### Footer
- **Background**: Secondary background
- **Border top**: Subtle 1px border
- **Grid**: 4 columns on desktop, stack on mobile
- **Bottom bar**: Centered copyright text

---

## 📐 Page-Specific Layouts

### Landing Page (index.html)
1. **Hero Section** - Full viewport, centered content
2. **Stats Bar** - 4 stat cards in grid
3. **How It Works** - 3 step cards
4. **Featured Products** - 3 product cards
5. **Features Grid** - 6 feature cards
6. **CTA Section** - Centered call-to-action
7. **Footer**

### Product Page (product.html)
- **Two-column layout**: Preview (sticky) + Form
- **Preview**: Phone mockup with gradient background
- **Form**: Upload zones, phone selector, case type, notes
- **Price Display**: Summary card with total
- **Features**: 4 feature cards below

### FAQ Page (faq.html)
- **Category links** at top (pill-shaped buttons)
- **Accordion items**: Click to expand/collapse
- **5 categories**: Ordering, Artwork, Shipping, Returns, Product
- **Icon rotation**: + rotates to × when active

### Contact Page (contact.html)
- **Two-column layout**: Contact info + Form
- **Contact methods**: 4 method cards (email, chat, social, FAQ)
- **Form**: Name, email, subject, message fields
- **Business hours**: Info card at bottom

---

## 🎨 Anime-Inspired Accents

### Visual Elements
1. **Gradient text** on key phrases (neon blue to purple)
2. **Glow effects** on hover interactions
3. **Emoji icons** throughout (🎨, ✨, 📱, etc.)
4. **Vibrant gradients** as section backgrounds
5. **Badge elements** with neon borders

### Color Usage
- Use **neon blue** (#4DA6FF) for primary actions
- Use **neon purple** (#8B5CF6) for secondary highlights
- Use **red/pink** accents sparingly for emphasis
- Combine in gradients for anime aesthetic

---

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop: Default */
/* Tablet: 1024px and below */
/* Mobile: 768px and below */
/* Small Mobile: 480px and below */
```

### Mobile Adaptations
1. **Navigation**: Hamburger menu, full-screen overlay
2. **Grid Layouts**: Single column on mobile
3. **Font Sizes**: Reduced by 15-30%
4. **Spacing**: Reduced padding/margins
5. **Hero**: Smaller title, stacked CTA buttons
6. **Product Form**: Single column layout
7. **Footer**: Stacked columns

---

## ♿ Accessibility

- **High contrast** white text on dark backgrounds
- **Focus states** with neon blue outline
- **ARIA labels** on interactive elements
- **Semantic HTML** structure
- **Keyboard navigation** support
- **Alt text** on images (placeholder for now)

---

## 🚀 Performance

- **CSS Variables** for easy theming
- **Smooth animations** with cubic-bezier easing
- **Lazy loading** ready structure
- **Optimized transitions** using transform and opacity
- **Minimal JavaScript** for core functionality

---

## 📂 Files Created

### CSS
- `styles-dark-premium.css` - Complete design system

### HTML Pages
- `index-new.html` - Landing page
- `product-new.html` - Product customization page
- `faq-new.html` - FAQ accordion page
- `contact-new.html` - Contact form page

### Integration Notes
To use the new design:
1. Replace old HTML files with new ones (rename `-new` files)
2. Update stylesheet link to `styles-dark-premium.css`
3. Test all interactive features
4. Customize content as needed

---

## 🎯 Design Principles

1. **Clean & Minimal** - Apple-inspired simplicity
2. **High Contrast** - White text on dark backgrounds
3. **Bold Typography** - Large, confident headlines
4. **Smooth Interactions** - Subtle animations on hover/scroll
5. **Consistent Spacing** - 8px base unit system
6. **Neon Accents** - Anime-inspired glowing effects
7. **Premium Feel** - Elevated cards, soft shadows
8. **Mobile First** - Responsive from the ground up

---

## 🔮 Future Enhancements

- Add loading states for forms
- Implement image preview on upload
- Add product image gallery
- Create shopping cart functionality
- Add animation on page load
- Implement dark/light mode toggle (optional)
- Add more micro-interactions

---

**Design System Version**: 1.0  
**Created**: January 2026  
**Theme**: Premium Dark Theme with Anime Accents
