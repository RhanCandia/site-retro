/**
 * SPA Router for Portfolio Site
 * Handles client-side navigation without full page reloads
 */

class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/index.html': 'index.html',
            '/about.html': 'about.html',
            '/experience.html': 'experience.html',
            '/log.html': 'log.html',
            '/contact.html': 'contact.html'
        };

        this.init();
    }

    init() {
        // Intercept all navigation link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');

            // Only intercept internal navigation links
            if (link && this.isInternalLink(link)) {
                e.preventDefault();
                const url = link.getAttribute('href');
                this.navigate(url);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });

        // Set initial state
        const currentPath = window.location.pathname;
        const page = currentPath === '/' ? 'index.html' : currentPath.substring(1);
        history.replaceState({ page }, '', currentPath);
    }

    isInternalLink(link) {
        const href = link.getAttribute('href');

        // Skip external links, anchors, and special links
        if (!href ||
            href.startsWith('http://') ||
            href.startsWith('https://') ||
            href.startsWith('mailto:') ||
            href.startsWith('#') ||
            link.getAttribute('target') === '_blank') {
            return false;
        }

        // Check if it's one of our routes
        return this.routes.hasOwnProperty('/' + href) || this.routes.hasOwnProperty(href);
    }

    async navigate(url) {
        // Normalize the URL
        const page = url.startsWith('/') ? url.substring(1) : url;

        // Load the new page
        await this.loadPage(page, true);
    }

    async loadPage(page, addToHistory = true) {
        try {
            // Add fade out effect to content only
            const content = document.getElementById('page-content');
            if (content) {
                content.style.transition = 'opacity 0.05s ease-out';
                content.style.opacity = '0';
                
                // Wait for fade out (much faster now)
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Fetch the page content
            const response = await fetch(page);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract the new content
            const newContent = doc.getElementById('page-content');
            const newTitle = doc.querySelector('title');
            
            if (newContent) {
                // Replace the content
                const currentContent = document.getElementById('page-content');
                if (currentContent) {
                    currentContent.innerHTML = newContent.innerHTML;
                }
                
                // Update page title
                if (newTitle) {
                    document.title = newTitle.textContent;
                }
                
                // Update active state in navigation
                this.updateActiveLink(page);
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Fade in
                if (currentContent) {
                    currentContent.style.opacity = '0';
                    // Force reflow
                    currentContent.offsetHeight;
                    currentContent.style.opacity = '1';
                }
                
                // Update browser history
                if (addToHistory) {
                    const newPath = page === 'index.html' ? '/' : '/' + page;
                    history.pushState({ page }, '', newPath);
                }
            } else {
                // Fallback if new page doesn't have #page-content (e.g. if it wasn't updated yet)
                // This allows for mixed content during migration or if structure differs
                console.warn('New page does not have #page-content, falling back to full reload');
                window.location.href = page;
            }
            
        } catch (error) {
            console.error('Error loading page:', error);
            // Fallback to traditional navigation on error
            window.location.href = page;
        }
    }

    updateActiveLink(page) {
        // Normalize page name
        const pageName = page === '/' ? 'index.html' : page;
        
        // Find all nav links
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            // Remove bold tag if present
            const text = link.innerText;
            
            if (href === pageName || (href === 'index.html' && pageName === '/')) {
                // Set as active - wrap in bold if not already
                if (link.querySelector('b') === null) {
                    link.innerHTML = `<b>${text}</b>`;
                }
            } else {
                // Remove active state
                if (link.querySelector('b')) {
                    link.innerHTML = text;
                }
            }
        });
    }

    // Theme toggle is now outside the content area, so we don't need to reinitialize it
    // unless the entire nav was replaced (which it isn't anymore)
    reinitializeThemeToggle() {
        // kept for compatibility if needed, but likely unused with new structure
    }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Router());
} else {
    new Router();
}
