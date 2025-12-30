# 🌙 Chrome Extension: Dark Mode & Theme Customizer

A sophisticated, **developer-focused Chrome extension** that gives users complete control over the visual aesthetics of the web.  
This tool allows for **granular, per-domain styling** to improve readability, reduce eye strain, and provide a personalized browsing experience using modern web technologies.

---

## 🚀 What It Does

The Dark Mode & Theme Customizer acts as a **client-side styling engine** that bridges the gap between a user's aesthetic preferences and a website's default design.

- **Universal Application:** Apply dark mode or custom themes to virtually any website.  
- **Per-Domain Granularity:** Choose unique background, text, and link colors for different sites individually.  
- **Instant Feedback:** Provides a Live Preview of color changes in real-time without requiring a page reload.  
- **Persistent Memory:** Settings are stored per domain, ensuring your custom theme is ready the moment you revisit a site.  

---

## ✨ Key Features

- **One-Click Toggle:** Easily enable or disable custom styling for the current site.  
- **Precision Color Picking:** Hex-based color pickers for Background, Text, and Links.  
- **Live Preview Engine:** Changes are reflected instantly on the active tab via asynchronous message passing.  
- **Domain-Specific Storage:** Automatically remembers your favorite combinations for every unique URL.  
- **Optimized Performance:** Implements debouncing to prevent storage quota exhaustion during rapid color selection.  
- **Quick Reset:** A "Reset to Default" option to instantly revert to the website's original design.  

---

## 🛠️ Tech Showcase

This project demonstrates proficiency in modern web development and **Chrome Extension architecture**:

- **React & Vite:** A modern, state-driven Popup UI built with React, bundled with Vite for high-performance builds.  
- **Content Script Injection:** Uses optimized JavaScript to inject dynamic CSS into the DOM, piercing through complex site architectures.  
- **CSS Variable Overrides:** Targets `:root` variables to customize modern Applications like Wikipedia, YouTube and Google.  
- **Chrome Storage API (local):** Implements high-frequency data persistence for per-domain user preferences.  
- **Message Passing:** Utilizes `chrome.runtime` messaging to synchronize the Popup's state with the injected Content Script.  
- **MutationObservers:** Monitors the DOM for dynamic content changes to ensure themes stay applied as sites load new data.  

---

## 🌟 Advanced Enhancements

- **Theme Presets:** Save and switch between `"Midnight"`, `"Solarized"`, and `"High Contrast"` templates.  
- **Accessibility Engine:** Real-time contrast ratio checks to ensure WCAG-compliant color combinations.  
- **Opacity Control:** Integrated alpha-channel support for semi-transparent color overlays.  

---

## 📦 Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/yourusername/dark-mode-customizer.git
cd dark-mode-customizer
npm install
npm run build


**Load into Chrome**

1. Open Chrome and navigate to `chrome://extensions/`.  
2. Enable **Developer Mode** (top-right toggle).  
3. Click **Load Unpacked** and select the `dist` folder generated in your project directory.
