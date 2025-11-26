/**
 * Theme Toggle Script for Retro-Modern Portfolio
 * Handles theme switching and persistence via localStorage
 * Supports: Light, Dark, and Frutiger Aero themes
 */

(function () {
    'use strict';

    const THEME_KEY = 'portfolio-theme';
    const DARK_MODE_CLASS = 'dark-mode';
    const FRUTIGER_AERO_CLASS = 'frutiger-aero';

    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    const THEME_FRUTIGER = 'frutiger';

    /**
     * Get the current theme from localStorage or system preference
     */
    function getSavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference if no saved theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }

        return THEME_LIGHT;
    }

    /**
     * Apply the theme to the document
     */
    function applyTheme(theme) {
        // Reset classes
        document.body.classList.remove(DARK_MODE_CLASS, FRUTIGER_AERO_CLASS);

        if (theme === THEME_DARK) {
            document.body.classList.add(DARK_MODE_CLASS);
        } else if (theme === THEME_FRUTIGER) {
            document.body.classList.add(FRUTIGER_AERO_CLASS);
        }

        // Update all toggle buttons on the page
        updateToggleButtons(theme);

        // Handle Bubbles for Frutiger Aero
        if (theme === THEME_FRUTIGER) {
            createBubbles();
        } else {
            removeBubbles();
        }
    }

    /**
     * Create floating bubbles for Frutiger Aero theme
     */
    function createBubbles() {
        // Check if container already exists
        if (document.getElementById('bubble-container')) return;

        const container = document.createElement('div');
        container.id = 'bubble-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '-1'; // Behind content but in front of background
        container.style.overflow = 'hidden';

        const bubbleCount = 15;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Randomize bubble properties
            const size = Math.random() * 110 + 10; // 10px to 120px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 10; // 0s to 10s

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;

            container.appendChild(bubble);
        }

        document.body.appendChild(container);
    }

    /**
     * Remove bubbles
     */
    function removeBubbles() {
        const container = document.getElementById('bubble-container');
        if (container) {
            container.remove();
        }
    }

    /**
     * Update the theme toggle button icon
     */
    function updateToggleButtons(theme) {
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        let icon, title;

        switch (theme) {
            case THEME_LIGHT:
                icon = '☀️';
                title = 'Switch to Dark Mode';
                break;
            case THEME_DARK:
                icon = '🌙';
                title = 'Switch to Frutiger Aero';
                break;
            case THEME_FRUTIGER:
                icon = '🫧'; // Bubble for Frutiger Aero
                title = 'Switch to Light Mode';
                break;
            default:
                icon = '☀️';
                title = 'Switch to Dark Mode';
        }

        toggleButtons.forEach(button => {
            button.textContent = icon;
            button.setAttribute('title', title);
            button.setAttribute('aria-label', title);
        });
    }

    /**
     * Cycle between themes: Light -> Dark -> Frutiger -> Light
     */
    function toggleTheme() {
        const currentTheme = localStorage.getItem(THEME_KEY) || getSavedTheme();
        let newTheme;

        if (currentTheme === THEME_LIGHT) {
            newTheme = THEME_DARK;
        } else if (currentTheme === THEME_DARK) {
            newTheme = THEME_FRUTIGER;
        } else {
            newTheme = THEME_LIGHT;
        }

        // Save to localStorage
        localStorage.setItem(THEME_KEY, newTheme);

        // Apply the new theme
        applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Add event listeners to all toggle buttons
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        toggleButtons.forEach(button => {
            // Remove old listeners to prevent duplicates if re-initialized (though this runs once usually)
            button.removeEventListener('click', toggleTheme);
            button.addEventListener('click', toggleTheme);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only apply if user hasn't set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }
})();
