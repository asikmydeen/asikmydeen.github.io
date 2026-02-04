# Portfolio Website - htmx Architecture

This portfolio website has been rewritten with htmx to provide a modular, maintainable structure that makes it easy to add new features in the future.

## 🏗️ Architecture

The site uses a modular component-based structure:

```
asikmydeen.github.io/
├── index.html          # Main HTML file (generated from partials)
├── styles.css          # Stylesheet with all styles
├── app.js              # JavaScript for export functions and htmx events
├── build.sh            # Build script to combine partials into index.html
└── partials/           # Modular HTML components
    ├── header.html     # Header with contact info and export buttons
    ├── summary.html    # Professional summary section
    ├── skills.html     # Technical skills section
    ├── projects.html   # Projects & open source section
    ├── experience.html # Professional experience section
    ├── education.html  # Education section
    └── footer.html     # Footer
```

## 🚀 How to Build

The site uses a simple build process that combines modular partials into a single HTML file:

```bash
./build.sh
```

This generates `index.html` from all the partial components.

## 🎨 Features

### Current Features
- ✅ Modular component structure
- ✅ PDF export functionality
- ✅ Word document export
- ✅ Print-optimized layout
- ✅ Fully responsive design
- ✅ SEO optimized with structured data
- ✅ htmx ready for dynamic features

### Future Extensibility
With htmx integrated, you can easily add:
- 🔮 Dynamic content loading
- 🔮 Live search/filter functionality
- 🔮 Interactive forms
- 🔮 Real-time updates
- 🔮 Lazy loading of sections
- 🔮 AJAX-powered features without writing JavaScript

## 📝 How to Add New Sections

1. Create a new partial file in `partials/` directory:
   ```html
   <!-- partials/certifications.html -->
   <section class="section" id="certifications" aria-labelledby="certifications-title">
       <h2 class="section-title" id="certifications-title">Certifications</h2>
       <!-- Your content here -->
   </section>
   ```

2. The build script automatically includes all partials, or you can manually add it to `build.sh`

3. Run `./build.sh` to rebuild the site

4. Deploy to GitHub Pages

## 🔧 How to Modify Content

### Edit a Section
Simply edit the corresponding file in the `partials/` directory and run `./build.sh`:

```bash
vim partials/experience.html  # Make your changes
./build.sh                     # Rebuild index.html
```

### Update Styles
Edit `styles.css` directly - no build step needed for CSS changes.

### Modify Export Functions
Edit `app.js` to customize PDF or Word export behavior.

## 🌐 Deployment

The site is designed for GitHub Pages. Simply push changes to your repository:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages will automatically serve the updated `index.html`.

## 🔮 Adding htmx Dynamic Features

With htmx already integrated, you can add dynamic features easily:

### Example: Add a "Load More" Button
```html
<button hx-get="partials/more-experience.html" 
        hx-target="#experience-list" 
        hx-swap="beforeend">
    Load More Experience
</button>
```

### Example: Dynamic Search
```html
<input type="search" 
       hx-get="/search" 
       hx-trigger="keyup changed delay:500ms" 
       hx-target="#search-results">
```

## 📦 Dependencies

- **htmx** (v1.9.10) - Loaded from CDN for dynamic features
- No build tools required
- No npm dependencies
- Pure HTML, CSS, and vanilla JavaScript

## 🎯 Benefits of This Architecture

1. **Maintainability**: Each section is isolated in its own file
2. **Reusability**: Partials can be reused across pages
3. **Scalability**: Easy to add new sections without touching other code
4. **Performance**: Single HTML file loads fast
5. **Future-Ready**: htmx enables adding dynamic features without complex frameworks
6. **Developer-Friendly**: Simple build process, no complex tooling

## 🔒 Security

- No external dependencies at runtime (except htmx CDN)
- All code is static and reviewable
- No server-side processing required
- Safe for GitHub Pages hosting

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Desktop: > 768px
- Tablet: 481px - 768px  
- Mobile: < 480px

## 🖨️ Print Support

Special print styles ensure the resume looks professional when printed or exported to PDF.

---

**Made with ❤️ using htmx for a modern, modular web experience**
