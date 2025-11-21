/**
 * Theme Toggle Script for Retro-Modern Portfolio
 * Handles dark mode switching and persistence via localStorage
 */

(function () {
    'use strict';

    const THEME_KEY = 'portfolio-theme';
    const DARK_MODE_CLASS = 'dark-mode';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';

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
        if (theme === THEME_DARK) {
            document.body.classList.add(DARK_MODE_CLASS);
        } else {
            document.body.classList.remove(DARK_MODE_CLASS);
        }

        // Update all toggle buttons on the page
        updateToggleButtons(theme);
    }

    /**
     * Update the theme toggle button icon
     */
    function updateToggleButtons(theme) {
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        const icon = theme === THEME_DARK ? '☀️' : '🌙';
        const title = theme === THEME_DARK ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        toggleButtons.forEach(button => {
            button.textContent = icon;
            button.setAttribute('title', title);
            button.setAttribute('aria-label', title);
        });
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.body.classList.contains(DARK_MODE_CLASS) ? THEME_DARK : THEME_LIGHT;
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

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
