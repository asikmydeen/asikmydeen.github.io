# Portfolio Themes Documentation

## Overview

This portfolio website now supports **12 professionally designed themes** that can be switched dynamically without page reload. All themes are fully compatible with PDF, Word, and Print exports.

## Available Themes

### 1. Default Blue (default)
- **Colors**: Blue (#2563eb) to Purple (#7c3aed) gradient
- **Style**: Professional, modern gradient theme
- **Best for**: General professional use
- **Export**: ✅ PDF, Word, Print compatible

### 2. Professional Dark (professional-dark)
- **Colors**: Dark slate (#1e293b) to slate gray (#334155)
- **Style**: Sleek dark theme for reduced eye strain
- **Best for**: Evening viewing, modern portfolios
- **Export**: ✅ PDF, Word, Print compatible

### 3. Minimalist (minimalist)
- **Colors**: Pure black (#000000) to dark gray (#333333)
- **Style**: Clean black and white design
- **Best for**: Traditional resumes, print-first design
- **Export**: ✅ PDF, Word, Print compatible

### 4. Corporate (corporate)
- **Colors**: Deep blue (#003d82) to bright blue (#0066cc)
- **Style**: Traditional business theme
- **Best for**: Corporate environments, conservative industries
- **Export**: ✅ PDF, Word, Print compatible

### 5. Creative (creative)
- **Colors**: Bold orange (#f97316) to pink (#ec4899)
- **Style**: Vibrant and eye-catching
- **Best for**: Creative roles, design portfolios
- **Export**: ✅ PDF, Word, Print compatible

### 6. Tech (tech)
- **Colors**: Matrix green (#10b981) to teal (#14b8a6)
- **Style**: Tech-inspired, hacker aesthetic
- **Best for**: Software developers, tech startups
- **Export**: ✅ PDF, Word, Print compatible

### 7. Elegant (elegant)
- **Colors**: Warm gold (#854d0e) to amber (#a16207)
- **Style**: Sophisticated warm tones
- **Best for**: Premium services, consultants
- **Export**: ✅ PDF, Word, Print compatible

### 8. Warm (warm)
- **Colors**: Red (#dc2626) to orange (#ea580c)
- **Style**: Energetic warm palette
- **Best for**: Marketing, sales roles
- **Export**: ✅ PDF, Word, Print compatible

### 9. Nature (nature)
- **Colors**: Forest green (#16a34a) to lime (#65a30d)
- **Style**: Fresh, eco-friendly vibes
- **Best for**: Environmental, sustainability roles
- **Export**: ✅ PDF, Word, Print compatible

### 10. Ocean (ocean)
- **Colors**: Cyan (#0891b2) to aqua (#06b6d4)
- **Style**: Calm, professional blues
- **Best for**: Healthcare, consulting
- **Export**: ✅ PDF, Word, Print compatible

### 11. Sunset (sunset)
- **Colors**: Purple (#9333ea) to magenta (#c026d3)
- **Style**: Creative purple twilight
- **Best for**: Creative professionals, artists
- **Export**: ✅ PDF, Word, Print compatible

### 12. Monochrome (monochrome)
- **Colors**: Neutral gray (#404040) to medium gray (#525252)
- **Style**: Sophisticated grayscale
- **Best for**: Classic, timeless appearance
- **Export**: ✅ PDF, Word, Print compatible

## Using the Theme Switcher

### For Visitors

1. **Access**: Click the 🎨 theme switcher button in the bottom-right corner
2. **Browse**: Scroll through the 12 available themes
3. **Select**: Click any theme to apply it instantly
4. **Persist**: Your choice is automatically saved to localStorage

### Theme Persistence

- Selected themes are saved to browser localStorage
- Themes persist across page refreshes
- Each visitor can have their own preferred theme
- Default theme is used for first-time visitors

## Technical Implementation

### Architecture

The theme system uses CSS custom properties (CSS variables) for dynamic theming:

```css
[data-theme="default"] {
    --primary: #2563eb;
    --secondary: #7c3aed;
    --text-primary: #1f2937;
    --header-gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}
```

### Files

- **themes.css**: Contains all 12 theme definitions and theme switcher UI styles
- **theme-manager.js**: JavaScript module for theme switching and persistence
- **styles.css**: Base styles using CSS variables
- **app.js**: Export functions that respect current theme

### Export Compatibility

All themes work seamlessly with:

- **PDF Export**: Theme colors are preserved in PDF
- **Word Export**: Theme colors embedded in inline styles
- **Print**: Theme applied via print styles
- **Browser Print**: Native print dialog respects theme

### Adding New Themes

To add a new theme:

1. Define CSS variables in `themes.css`:
```css
[data-theme="new-theme"] {
    --primary: #color1;
    --secondary: #color2;
    --header-gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    /* ... other variables */
}
```

2. Add theme info to `theme-manager.js`:
```javascript
{
    id: 'new-theme',
    name: 'New Theme',
    description: 'Description here',
    colors: ['#color1', '#color2']
}
```

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Variables**: Required (supported in all modern browsers)
- **localStorage**: Used for persistence (gracefully degrades if unavailable)
- **Fallback**: Default theme used if localStorage unavailable

## Performance

- **Zero Runtime Cost**: Themes use CSS variables (hardware accelerated)
- **Instant Switching**: No page reload required
- **Small Footprint**: ~11KB for themes.css, ~7KB for theme-manager.js
- **Optimized**: Smooth transitions with CSS transforms

## Accessibility

- **Keyboard Navigation**: Theme options are keyboard accessible (Tab + Enter)
- **ARIA Labels**: Proper ARIA labels for screen readers
- **Color Contrast**: All themes meet WCAG AA standards
- **Print Friendly**: Theme switcher hidden in print media

## Mobile Responsive

- Theme switcher adapts to mobile screens
- Touch-friendly button sizing (48px minimum)
- Panel slides in from the right on mobile
- Smooth animations optimized for mobile

## Future Enhancements

Potential improvements:

- Theme preview mode (hover to preview before selecting)
- Custom theme creator
- Theme export/import
- Organization-wide theme presets
- Dark mode auto-detection
- System theme synchronization

## Troubleshooting

### Theme Not Persisting
- Check if localStorage is enabled in browser
- Ensure cookies/storage not blocked
- Clear browser cache and try again

### Theme Not Applying
- Check browser console for errors
- Ensure themes.css and theme-manager.js are loaded
- Verify JavaScript is enabled

### Export Issues
- Ensure theme is selected before exporting
- Check that theme colors are not being overridden
- Test export in different browsers

## Support

For issues or questions about themes:
- Check browser console for errors
- Verify all theme files are loaded
- Test in an incognito/private window
- Clear localStorage: `localStorage.removeItem('portfolio-theme')`

## Credits

- Theme System: Custom implementation
- Color Palettes: Inspired by Tailwind CSS color system
- Design: Modern, professional portfolio standards
