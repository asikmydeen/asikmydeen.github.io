#!/bin/bash
# Build script to create index.html with dynamic JSON data loading
# The resume data is now loaded from resume.json at runtime

echo "Building index.html with JSON data loading..."

# Create the HTML with minimal structure - data will be loaded from resume.json
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary SEO Meta Tags -->
    <title>Asik Mydeen Syed Ibrahim | Senior Systems Development Engineer | Seattle, WA</title>
    <meta name="title" content="Asik Mydeen Syed Ibrahim | Senior Systems Development Engineer">
    <meta name="description" content="Senior Systems Development Engineer at Amazon with 12+ years of experience in distributed systems, cloud infrastructure, DevOps, and large-scale migrations. Based in Seattle, WA.">
    <meta name="keywords" content="Senior Systems Development Engineer, DevOps, AWS, Amazon, Cloud Infrastructure, Distributed Systems, Software Engineer, Seattle">
    <meta name="author" content="Asik Mydeen Syed Ibrahim">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://asikmydeen.com">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="profile">
    <meta property="og:url" content="https://asikmydeen.com">
    <meta property="og:title" content="Asik Mydeen Syed Ibrahim | Senior Systems Development Engineer">
    <meta property="og:description" content="Senior Systems Development Engineer at Amazon with 12+ years of experience in distributed systems, cloud infrastructure, and DevOps.">
    <meta property="og:site_name" content="Asik Mydeen - Professional Resume">
    <meta property="profile:first_name" content="Asik Mydeen">
    <meta property="profile:last_name" content="Syed Ibrahim">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:url" content="https://asikmydeen.com">
    <meta name="twitter:title" content="Asik Mydeen Syed Ibrahim | Senior Systems Development Engineer">
    <meta name="twitter:description" content="Senior Systems Development Engineer at Amazon with 12+ years of experience in distributed systems and cloud infrastructure.">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Asik Mydeen Syed Ibrahim",
        "jobTitle": "Senior Systems Development Engineer",
        "worksFor": {
            "@type": "Organization",
            "name": "Amazon"
        },
        "url": "https://asikmydeen.com",
        "sameAs": [
            "https://www.linkedin.com/in/asikmydeen",
            "https://github.com/asikmydeen",
            "https://www.aaraa.ai",
            "https://pagenotes.live",
            "https://asikmydeen.com"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Seattle",
            "addressRegion": "WA",
            "addressCountry": "US"
        },
        "alumniOf": [
            {
                "@type": "CollegeOrUniversity",
                "name": "Birla Institute of Technology & Science, Pilani"
            },
            {
                "@type": "CollegeOrUniversity",
                "name": "Anna University"
            }
        ]
    }
    </script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="themes.css">
    
    <!-- htmx for future dynamic features -->
    <script src="https://unpkg.com/htmx.org@1.9.10" 
            integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" 
            crossorigin="anonymous"></script>
</head>
<body>
    <!-- Resume container - content will be dynamically loaded from resume.json -->
    <article class="resume" itemscope itemtype="https://schema.org/Person">
        <!-- Loading indicator -->
        <div style="text-align: center; padding: 50px; font-family: 'Segoe UI', sans-serif;">
            <p>Loading resume data...</p>
        </div>
    </article>

    <!-- Theme Manager - loads first to apply saved theme -->
    <script src="theme-manager.js"></script>
    
    <!-- Resume Data Loader - loads and renders data from resume.json -->
    <script src="resume-loader.js"></script>
    
    <!-- Application JavaScript - handles interactions and exports -->
    <script src="app.js"></script>
</body>
</html>
EOF

echo "✓ Build complete! index.html has been generated."
echo "✓ Resume data is now loaded dynamically from resume.json"
