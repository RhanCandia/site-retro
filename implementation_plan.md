# Frutiger Aero Theme Implementation Plan

## Goal Description
Implement a third theme option, "Frutiger Aero," inspired by the mid-2000s aesthetic. This will be achieved purely through CSS (gradients, shadows, glassmorphism) without external image assets for the background. The theme toggle will be updated to cycle through three states: Light -> Dark -> Frutiger Aero.

## User Review Required
> [!IMPORTANT]
> The background will be generated using CSS gradients and shapes instead of an image file, as per the user's latest request.

## Proposed Changes

### CSS
#### [MODIFY] [style.css](file:///home/super/Development/AI/Antigravity/public/css/style.css)
-   Define `.frutiger-aero` class on `body`.
-   **Variables**:
    -   `--bg-color`: Linear gradient (Sky Blue to White).
    -   `--card-bg`: Semi-transparent white with blur (`backdrop-filter`).
    -   `--border-color`: White/Silver with gradient.
    -   `--shadow-color`: Soft blue/cyan shadow.
    -   `--text-main`: Dark gray/black.
    -   `--accent-blue`: Bright Cyan/Aqua.
    -   `--accent-green`: Grass Green.
-   **Background**:
    -   Use `background` with multiple radial/linear gradients to simulate a sky and "aurora" or "bokeh" effect.
-   **Components**:
    -   `.window`: Add glassmorphism (transparency + blur), rounded corners, glossy gradient border.
    -   `.btn`: Glossy pill shape (vertical gradient, inner shadow for shine).
    -   `.nav-bar`: Glassmorphism.
    -   `input`/`textarea`: Glossy inset look.

### JavaScript
#### [MODIFY] [theme.js](file:///home/super/Development/AI/Antigravity/public/js/theme.js)
-   Update `THEME_KEY` handling to support 'frutiger'.
-   Update `toggleTheme` to cycle: `light` -> `dark` -> `frutiger` -> `light`.
-   Update `applyTheme` to handle the new class.
-   Update `updateToggleButtons` to show appropriate icon/text for the *next* state (or current state representation).
    -   Light: ☀️ (Switch to Dark)
    -   Dark: 🌙 (Switch to Frutiger)
    -   Frutiger: 🫧 (Switch to Light) - *Using a bubble or leaf icon if available, or text.*

## Verification Plan

### Manual Verification
-   Open `index.html` in browser.
-   Click the theme toggle button.
-   Verify transition from Light -> Dark.
-   Click again.
-   Verify transition from Dark -> Frutiger Aero.
    -   Check background (sky blue gradient).
    -   Check windows (glassy, rounded).
    -   Check buttons (glossy).
-   Click again.
-   Verify transition from Frutiger Aero -> Light.
-   Reload page to verify persistence (localStorage).
