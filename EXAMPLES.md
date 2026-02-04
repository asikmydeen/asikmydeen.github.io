# Future Feature Examples with htmx

This document provides practical examples of features you can easily add to the portfolio using htmx.

## 📊 Example 1: Dynamic Section Loading

Add a "Load More" button to experience section to load additional jobs:

### Create additional experience partial
```html
<!-- partials/experience-additional.html -->
<article class="job">
    <div class="job-header">
        <div class="job-title-wrapper">
            <h3 class="job-title">Previous Position</h3>
            <p class="job-company">Company Name • Location</p>
        </div>
        <span class="job-period">Date Range</span>
    </div>
    <ul class="job-details">
        <li>Achievement 1</li>
        <li>Achievement 2</li>
    </ul>
</article>
```

### Add button to experience.html
```html
<button hx-get="partials/experience-additional.html" 
        hx-target="#experience-list" 
        hx-swap="beforeend"
        hx-trigger="click once"
        class="load-more-btn">
    Load More Experience
</button>
```

## 🔍 Example 2: Live Search/Filter

Add live filtering to skills section:

```html
<!-- Add search input -->
<input type="text" 
       placeholder="Search skills..." 
       hx-get="/api/filter-skills" 
       hx-trigger="keyup changed delay:300ms" 
       hx-target="#skills-container"
       hx-include="[name='skill-filter']">

<!-- Skills will be filtered as you type -->
```

## 📝 Example 3: Contact Form

Add a contact form that submits without page reload:

```html
<!-- partials/contact-form.html -->
<section class="section" id="contact">
    <h2 class="section-title">Get in Touch</h2>
    <form hx-post="/api/contact" 
          hx-target="#form-result"
          hx-indicator="#spinner">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Message" required></textarea>
        <button type="submit">
            Send Message
            <span id="spinner" class="htmx-indicator">⏳</span>
        </button>
    </form>
    <div id="form-result"></div>
</section>
```

## 🎯 Example 4: Interactive Project Gallery

Load project details on demand:

```html
<!-- Modify projects.html -->
<div class="project-item" 
     hx-get="partials/project-details.html?id=pagenotes"
     hx-trigger="click"
     hx-target="#project-modal"
     hx-swap="innerHTML">
    <h3>PageNotes Live</h3>
    <p>Click to view details...</p>
</div>

<!-- Modal container -->
<div id="project-modal" class="modal"></div>
```

## 📈 Example 5: Real-time GitHub Stats

Display live GitHub statistics:

```html
<section class="section">
    <h2 class="section-title">GitHub Activity</h2>
    <div hx-get="https://api.github.com/users/asikmydeen/repos?sort=updated" 
         hx-trigger="load"
         hx-target="this"
         hx-swap="innerHTML">
        Loading GitHub stats...
    </div>
</section>
```

## 🌐 Example 6: Language Switcher

Add multilingual support:

```html
<div class="language-switcher">
    <button hx-get="partials/summary-en.html" 
            hx-target="#summary"
            hx-swap="outerHTML">
        English
    </button>
    <button hx-get="partials/summary-es.html" 
            hx-target="#summary"
            hx-swap="outerHTML">
        Español
    </button>
</div>
```

## 📱 Example 7: Progressive Loading

Load sections progressively for faster initial page load:

```html
<!-- In index.html -->
<div hx-get="partials/summary.html" 
     hx-trigger="load"
     hx-swap="outerHTML"></div>

<div hx-get="partials/skills.html" 
     hx-trigger="load delay:200ms"
     hx-swap="outerHTML"></div>

<div hx-get="partials/projects.html" 
     hx-trigger="load delay:400ms"
     hx-swap="outerHTML"></div>
```

## 🎨 Example 8: Theme Switcher

Add dark/light mode toggle:

```html
<button hx-post="/api/set-theme" 
        hx-vals='{"theme": "dark"}'
        hx-target="body"
        hx-swap="none"
        onclick="document.body.classList.toggle('dark-theme')">
    🌙 Toggle Dark Mode
</button>
```

## 📊 Example 9: Live Visitor Counter

Show real-time visitor count:

```html
<div hx-get="/api/visitor-count" 
     hx-trigger="every 10s"
     hx-swap="innerHTML">
    Visitors: Loading...
</div>
```

## 🔔 Example 10: Notification System

Add toast notifications:

```html
<!-- Add to page -->
<div id="notifications" class="notification-area"></div>

<!-- When triggering actions -->
<button hx-post="/api/subscribe" 
        hx-target="#notifications"
        hx-swap="beforeend">
    Subscribe to Updates
</button>

<!-- Server returns -->
<!-- <div class="notification success">Subscribed!</div> -->
```

## 💡 Tips for Adding Features

### 1. Keep htmx attributes simple:
- `hx-get` - Load content from URL
- `hx-post` - Submit data to URL
- `hx-target` - Where to put the response
- `hx-swap` - How to insert the response
- `hx-trigger` - What triggers the request

### 2. Use loading indicators:
```html
<button hx-post="/api/action" hx-indicator="#spinner">
    Action <span id="spinner" class="htmx-indicator">⏳</span>
</button>
```

### 3. Add transitions:
```css
.htmx-swapping {
    opacity: 0;
    transition: opacity 0.3s ease-out;
}
```

### 4. Handle errors:
```html
<div hx-get="/api/data" 
     hx-on="htmx:responseError: alert('Failed to load')">
</div>
```

### 5. Polling for updates:
```html
<div hx-get="/api/status" 
     hx-trigger="every 5s">
    Status: ...
</div>
```

## 🚀 Next Steps

1. Choose a feature from above
2. Create any necessary partial files
3. Add htmx attributes to trigger the feature
4. Test locally
5. Run `./build.sh` if needed
6. Deploy to GitHub Pages

For more htmx examples, visit: https://htmx.org/examples/

---

**Remember:** htmx works with your existing HTML structure. You don't need to rebuild everything - just add attributes where you want interactivity!
