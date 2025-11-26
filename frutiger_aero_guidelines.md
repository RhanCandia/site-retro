# Frutiger Aero Design Guidelines

## Overview
Frutiger Aero (c. 2004-2013) is an aesthetic characterized by skeuomorphism, glossy textures, vibrant nature-inspired colors (sky blues, grass greens), and a sense of optimism and high-tech humanism.

## Color Palette
- **Primary Background**: Sky Blue Gradient / Clouds
- **Window Background**: Glossy White / Glass (Semi-transparent)
- **Text**: Dark Gray (#333333) for readability against light backgrounds
- **Accents**:
    -   **Cyan/Sky Blue**: #00BFFF (Buttons, Links)
    -   **Grass Green**: #7CFC00 (Success, Highlights)
    -   **Silver/Chrome**: #C0C0C0 (Borders, Trim)

## UI Elements

### Windows / Containers
-   **Glassmorphism**: Semi-transparent white backgrounds with background blur (`backdrop-filter: blur(10px)`).
-   **Borders**: White or light silver with a "shine" effect (linear gradient).
-   **Shadows**: Soft, diffuse drop shadows (blue-tinted).
-   **Corners**: Rounded (border-radius: 12px+).

### Buttons
-   **Shape**: Pill-shaped or highly rounded rectangles.
-   **Texture**: Vertical gradient (lighter on top, darker on bottom) to simulate 3D convexity.
-   **Highlight**: Inner white shadow or "shine" on the top half.
-   **Hover**: Increase brightness/glow.

### Typography
-   **Font**: Humanist Sans-Serif (Inter, Segoe UI, Frutiger).
-   **Style**: Clean, modern, legible.

### Imagery / Texture
-   **Background**: A high-quality image of a blue sky with fluffy clouds and maybe some abstract bubbles or lens flares.
-   **Icons**: Glossy, 3D rendered (if possible, otherwise simulate with CSS).

## CSS Implementation Strategy
-   Use a new class `.frutiger-aero` on the `body`.
-   Override CSS variables for colors.
-   Add specific overrides for `.window`, `.btn`, `.nav-bar` to apply gradients and box-shadows that mimic the glossy look.
-   Use `background-image` for the main body background.
