// Theme Manager Module
// Handles theme switching, persistence, and UI

class ThemeManager {
    constructor() {
        this.themes = [
            {
                id: 'default',
                name: 'Default Blue',
                description: 'Professional blue gradient',
                colors: ['#2563eb', '#7c3aed']
            },
            {
                id: 'professional-dark',
                name: 'Professional Dark',
                description: 'Sleek dark theme',
                colors: ['#1e293b', '#334155']
            },
            {
                id: 'minimalist',
                name: 'Minimalist',
                description: 'Clean black & white',
                colors: ['#000000', '#333333']
            },
            {
                id: 'corporate',
                name: 'Corporate',
                description: 'Traditional business blue',
                colors: ['#003d82', '#0066cc']
            },
            {
                id: 'creative',
                name: 'Creative',
                description: 'Bold orange & pink',
                colors: ['#f97316', '#ec4899']
            },
            {
                id: 'tech',
                name: 'Tech',
                description: 'Matrix-style green',
                colors: ['#10b981', '#14b8a6']
            },
            {
                id: 'elegant',
                name: 'Elegant',
                description: 'Warm gold tones',
                colors: ['#854d0e', '#a16207']
            },
            {
                id: 'warm',
                name: 'Warm',
                description: 'Red & orange warmth',
                colors: ['#dc2626', '#ea580c']
            },
            {
                id: 'nature',
                name: 'Nature',
                description: 'Fresh green vibes',
                colors: ['#16a34a', '#65a30d']
            },
            {
                id: 'ocean',
                name: 'Ocean',
                description: 'Calm cyan waters',
                colors: ['#0891b2', '#06b6d4']
            },
            {
                id: 'sunset',
                name: 'Sunset',
                description: 'Purple twilight',
                colors: ['#9333ea', '#c026d3']
            },
            {
                id: 'monochrome',
                name: 'Monochrome',
                description: 'Grayscale elegance',
                colors: ['#404040', '#525252']
            }
        ];

        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Wait for DOM to be ready before creating UI
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createThemeSwitcherUI();
            });
        } else {
            this.createThemeSwitcherUI();
        }
    }

    loadTheme() {
        // Load theme from localStorage, default to 'default'
        return localStorage.getItem('portfolio-theme') || 'default';
    }

    saveTheme(themeId) {
        localStorage.setItem('portfolio-theme', themeId);
    }

    applyTheme(themeId) {
        // Apply theme to document root
        document.documentElement.setAttribute('data-theme', themeId);
        this.currentTheme = themeId;
        this.saveTheme(themeId);
    }

    createThemeSwitcherUI() {
        // Create theme switcher button and panel
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-switcher-btn no-print" aria-label="Change Theme" title="Change Theme">
                🎨
            </button>
            <div class="theme-panel no-print">
                <h3 class="theme-panel-title">Choose Your Theme</h3>
                <div class="theme-grid">
                    ${this.themes.map(theme => `
                        <div class="theme-option ${theme.id === this.currentTheme ? 'active' : ''}" 
                             data-theme="${theme.id}"
                             role="button"
                             tabindex="0"
                             aria-label="Select ${theme.name} theme">
                            <div class="theme-preview">
                                <div class="theme-preview-color" style="background: ${theme.colors[0]}"></div>
                                <div class="theme-preview-color" style="background: ${theme.colors[1]}"></div>
                            </div>
                            <div class="theme-info">
                                <div class="theme-name">${theme.name}</div>
                                <div class="theme-description">${theme.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(switcher);

        // Add event listeners
        const btn = switcher.querySelector('.theme-switcher-btn');
        const panel = switcher.querySelector('.theme-panel');
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('active');
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                panel.classList.remove('active');
            }
        });

        // Theme option click handlers
        switcher.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const themeId = option.getAttribute('data-theme');
                this.switchTheme(themeId);
            });

            // Keyboard support
            option.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const themeId = option.getAttribute('data-theme');
                    this.switchTheme(themeId);
                }
            });
        });
    }

    switchTheme(themeId) {
        // Apply new theme
        this.applyTheme(themeId);

        // Update active state in UI
        document.querySelectorAll('.theme-option').forEach(option => {
            if (option.getAttribute('data-theme') === themeId) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Add a subtle animation effect
        const resume = document.querySelector('.resume');
        if (resume) {
            resume.style.transition = 'all 0.3s ease';
            resume.style.opacity = '0.8';
            setTimeout(() => {
                resume.style.opacity = '1';
            }, 150);
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemeInfo(themeId) {
        return this.themes.find(t => t.id === themeId);
    }
}

// Initialize theme manager when script loads
const themeManager = new ThemeManager();

// Expose globally for use in other scripts
window.themeManager = themeManager;
