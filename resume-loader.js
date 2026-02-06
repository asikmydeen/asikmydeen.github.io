// Resume Data Loader and Renderer
// This module loads resume data from JSON and dynamically renders the HTML

class ResumeLoader {
    constructor(jsonPath = 'resume.json') {
        this.jsonPath = jsonPath;
        this.data = null;
    }

    async load() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to load resume data: ${response.status}`);
            }
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error loading resume data:', error);
            return null;
        }
    }

    getLinkItemProp(linkType) {
        return (linkType === 'linkedin' || linkType === 'github') ? 'sameAs' : 'url';
    }

    renderHeader(data) {
        const personal = data.personal;
        return `
<header class="header">
    <div class="export-actions no-print">
        <button class="export-btn" onclick="downloadPDF()" aria-label="Download PDF">📄 PDF</button>
        <button class="export-btn" onclick="downloadWord()" aria-label="Download Word">📝 Word</button>
        <button class="export-btn" onclick="window.print()" aria-label="Print Resume">🖨️ Print</button>
    </div>
    
    <div class="header-content">
        <h1 class="name" itemprop="name">${personal.name}</h1>
        <p class="title" itemprop="jobTitle">${personal.title}</p>
        
        <nav class="contact-grid" aria-label="Contact Information">
            <a href="tel:${personal.phone}" class="contact-item" itemprop="telephone">
                <span class="contact-icon">📞</span>
                <span>${this.formatPhone(personal.phone)}</span>
            </a>
            <a href="mailto:${personal.email}" class="contact-item" itemprop="email">
                <span class="contact-icon">✉️</span>
                <span>${personal.email}</span>
            </a>
            ${personal.links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="contact-item" itemprop="${this.getLinkItemProp(link.type)}">
                <span class="contact-icon">${link.icon}</span>
                <span>${link.label}</span>
            </a>`).join('')}
            <span class="contact-item" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                <span class="contact-icon">📍</span>
                <span><span itemprop="addressLocality">${personal.location.city}</span>, <span itemprop="addressRegion">${personal.location.state}</span></span>
            </span>
        </nav>
    </div>
</header>`;
    }

    renderSummary(data) {
        const summary = data.summary;
        return `
<section class="section fade-in-section" id="summary" aria-labelledby="summary-title">
    <h2 class="section-title" id="summary-title">Professional Summary</h2>
    <p class="summary-text" itemprop="description">
        ${summary.text}
    </p>
    <div class="highlight-tags" aria-label="Key Strengths">
        ${summary.highlights.map(h => `<span class="tag">${h.icon} ${h.text}</span>`).join('\n        ')}
    </div>
    <div class="impact-metrics no-print" aria-label="Career Impact at a Glance">
        ${summary.metrics.map(m => `
        <div class="metric-card">
            <div class="metric-value"><span class="counter" data-target="${m.value}">0</span>${m.suffix || '+'}</div>
            <div class="metric-label">${m.label}</div>
        </div>`).join('')}
    </div>
</section>`;
    }

    renderSkills(data) {
        const skills = data.skills;
        return `
<section class="section fade-in-section" id="skills" aria-labelledby="skills-title">
    <h2 class="section-title" id="skills-title">Technical Skills</h2>
    <div class="skills-container">
        ${skills.map(skill => `
        <div class="skill-category">
            <h3 class="skill-category-title">
                <span>${skill.icon}</span>
                <span>${skill.category}</span>
            </h3>
            <div class="skill-list">
                ${skill.items.map(item => `<span class="skill-item">${item}</span>`).join('\n                ')}
            </div>
            <div class="skill-proficiency no-print">
                <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${skill.proficiency}"></div></div>
            </div>
        </div>`).join('')}
    </div>
</section>`;
    }

    renderProjects(data) {
        const projects = data.projects;
        return `
<section class="section fade-in-section" id="projects" aria-labelledby="projects-title">
    <h2 class="section-title" id="projects-title">Projects & Open Source</h2>
    <div class="projects-grid">
        ${projects.map(project => `
        <div class="project-item" role="button" tabindex="0" aria-expanded="false">
            <div class="project-header">
                <h3 class="project-title">
                    <span>${project.icon}</span>
                    <span>${project.title}</span>
                </h3>
                ${project.link ? `
                <a href="${project.link.url}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation();">
                    🔗 ${project.link.text}
                </a>` : ''}
            </div>
            <p class="project-description">
                ${project.description}
            </p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('\n                ')}
            </div>
            <div class="project-expand-hint no-print"><span class="chevron">▶</span> Click to see technical highlights</div>
            <div class="project-details">
                <ul class="project-detail-list">
                    ${project.details.map(detail => `<li>${detail}</li>`).join('\n                    ')}
                </ul>
            </div>
        </div>`).join('\n\n        ')}
    </div>
</section>`;
    }

    renderExperience(data) {
        const experience = data.experience;
        return `
<section class="section fade-in-section" id="experience" aria-labelledby="experience-title">
    <h2 class="section-title" id="experience-title">Professional Experience</h2>
    <div class="experience-timeline">
    ${experience.map(job => `
    <article class="job"${job === experience[0] ? ' itemprop="worksFor" itemscope itemtype="https://schema.org/Organization"' : ''}>
        <div class="job-header">
            <div class="job-title-wrapper">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-company">${job === experience[0] ? '<span itemprop="name">' + job.company + '</span>' : job.company} • ${job.location}</p>
            </div>
            <span class="job-period" aria-label="${job.ariaLabel}">${job.period}</span>
        </div>
        ${job.highlights ? `
        <div class="job-highlights no-print">
            ${job.highlights.map(h => `<span class="job-highlight">${h.icon} ${h.text}</span>`).join('\n            ')}
        </div>` : ''}
        <ul class="job-details">
            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('\n            ')}
        </ul>
    </article>`).join('\n')}
    </div>
</section>`;
    }

    renderEducation(data) {
        const education = data.education;
        return `
<section class="section fade-in-section" id="education" aria-labelledby="education-title">
    <h2 class="section-title" id="education-title">Education</h2>
    <div class="education-grid">
        ${education.map(edu => `
        <div class="education-item" itemprop="alumniOf" itemscope itemtype="https://schema.org/CollegeOrUniversity">
            <h3 class="degree">${edu.degree}</h3>
            <p class="institution" itemprop="name">${edu.institution}</p>
            <div class="education-meta">
                <span class="cgpa-badge">CGPA: ${edu.cgpa}</span>
                <span class="grad-date">🎓 Graduated: ${edu.graduationDate}</span>
            </div>
        </div>`).join('\n        ')}
    </div>
</section>`;
    }

    renderFooter() {
        const year = new Date().getFullYear();
        return `
<footer class="footer">
    <p>© ${year} ${this.data.personal.name}. All rights reserved.</p>
</footer>`;
    }

    formatPhone(phone) {
        // Format +12067696344 to (206) 769-6344
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `(${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
        }
        return phone;
    }

    async renderAll() {
        if (!this.data) {
            await this.load();
        }

        if (!this.data) {
            console.error('Failed to load resume data');
            return;
        }

        const resume = document.querySelector('.resume');
        if (!resume) {
            console.error('Resume container not found');
            return;
        }

        // Render all sections
        const html = `
            ${this.renderHeader(this.data)}
            <main class="main">
                ${this.renderSummary(this.data)}
                ${this.renderSkills(this.data)}
                ${this.renderProjects(this.data)}
                ${this.renderExperience(this.data)}
                ${this.renderEducation(this.data)}
            </main>
            ${this.renderFooter()}
        `;

        resume.innerHTML = html;

        // Re-initialize animations and interactions after rendering
        this.initializeInteractions();
    }

    initializeInteractions() {
        // Initialize fade-in animations
        if (typeof initializeFadeInAnimations === 'function') {
            initializeFadeInAnimations();
        }

        // Initialize counter animations
        if (typeof initializeCounterAnimations === 'function') {
            initializeCounterAnimations();
        }

        // Initialize skill bar animations
        if (typeof initializeSkillBarAnimations === 'function') {
            initializeSkillBarAnimations();
        }

        // Initialize project card expansions
        if (typeof initializeProjectCardExpansions === 'function') {
            initializeProjectCardExpansions();
        }
    }
}

// Initialize and load resume data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const loader = new ResumeLoader();
        await loader.renderAll();
    });
} else {
    // DOM is already ready
    (async () => {
        const loader = new ResumeLoader();
        await loader.renderAll();
    })();
}
