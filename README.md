

# Karen Infanta — Data Analyst Portfolio

A responsive personal portfolio website for Data Analyst and
Business Intelligence Analyst opportunities.

Built with HTML5, CSS3, vanilla JavaScript, and Chart.js.

## Features

- Responsive dark dashboard-inspired design
- Mobile navigation with keyboard support
- Project category filters
- Interactive bar and doughnut charts
- Illustrative data with working dataset and period filters
- Accessible data table accompanying the charts
- Configurable email and LinkedIn links
- Resume availability check and download
- Education, experience, skills, and certifications sections
- Compatible with GitHub Pages
- No backend, Node.js, npm, or build tools required

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js via CDN

Google Fonts and Chart.js require an internet connection.

## Project structure

data-analyst-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── resume.pdf

The resume PDF is optional until you add your real resume.

## 1. Run locally

### Option A: Visual Studio Code

1. Open Visual Studio Code.
2. Select File > Open Folder.
3. Open the data-analyst-portfolio folder.
4. Install the Live Server extension if it is not already installed.
5. Right-click index.html.
6. Select Open with Live Server.
7. Open the local address displayed by the extension.

The address commonly resembles:

http://127.0.0.1:5500/

The exact address and port may differ.

### Option B: Python HTTP server

If Python is installed:

1. Open a terminal.
2. Navigate to the project folder.
3. Run:

   python -m http.server 8000

4. Open:

   http://localhost:8000

5. To stop the server, press Ctrl+C in the terminal.

Serving the site over HTTP allows the resume availability
check to work correctly.

## 2. Configure contact information

Open script.js and locate PORTFOLIO_CONFIG.

Replace the empty LinkedIn and email values with your actual details.

Example format:

linkedin: "https://www.linkedin.com/in/your-actual-profile/",
email: "your-actual-email@example.com"

These are format examples only. Replace them before publishing.

Do not invent or publish contact details that do not belong to you.

## 3. Add your resume

1. Open the project folder.
2. Create a folder named assets if it does not exist.
3. Export your real resume as a PDF.
4. Save it as assets/resume.pdf.
5. Test the Download Resume button.

Do not upload a fake resume or another person's resume.

If the PDF is missing, the website should display a message.

## 4. Replace the project templates

The six project cards are templates, not claims of completed projects.

For each actual project:

1. Replace the title and business problem.
2. Document the real analytical approach.
3. Add the actual tools used.
4. Report only findings supported by your dataset and analysis.
5. Create a GitHub repository.
6. Replace the profile URL on the corresponding project card
   with that repository's actual URL.
7. Remove or rename projects that you have not worked on.

Keep the placeholder label until the project has been completed
and its content has been verified.

## 5. Replace demonstration analytics data

Open script.js and locate DEMO_DATA.

Replace the example periods and values with data appropriate
for your project.

Update the category labels and units where necessary.

Make sure:

- All values are numeric.
- Each period has two values for the two configured categories.
- Labels match the data.
- Chart titles and units accurately describe the data.
- The source of real data is documented.
- No confidential or personally identifiable data is published.

The default data is fictional and must not be presented as
actual company performance or healthcare outcomes.

## 6. Add education, experience, and certifications

Update the education section with your actual institution.

Replace the experience placeholder only with verified experience.

Add certifications only after completing them. Include the
credential name, issuing organization, and verification link
where available.

## 7. Publish using GitHub Pages

1. Sign in to GitHub.
2. Open your profile:
   https://github.com/KarenInfanta
3. Create a new public repository named:

   data-analyst-portfolio

4. Keep the repository empty initially, or avoid generating
   conflicting README files if you will upload your own.
5. Upload index.html, style.css, script.js, and README.md
   to the repository root.
6. Create the assets folder in the repository.
7. Upload your real resume PDF into assets/resume.pdf when ready.
8. Open the repository's Settings.
9. Select Pages in the Code and automation section.
10. Under Build and deployment, select Deploy from a branch.
11. Choose the main branch and the / (root) folder.
12. Save the configuration.
13. Wait for GitHub Pages to publish the site.
14. Open the published URL shown in Settings > Pages.

For a repository named data-analyst-portfolio, the URL will
normally be:

https://kareninfanta.github.io/data-analyst-portfolio/

If you use a different repository name, the URL will differ.

## 8. Important GitHub Pages notes

- Keep index.html at the repository root.
- Preserve the exact filenames and folder names.
- Use relative paths for local assets.
- Ensure the resume PDF is committed to the repository.
- GitHub Pages is static hosting and does not run a backend.
- Chart.js and Google Fonts are loaded externally.
- External CDN failures may affect charts or typography.

## 9. Testing checklist

### Layout
- [ ] Hero section displays correctly.
- [ ] All sections have readable spacing.
- [ ] No horizontal overflow on mobile.
- [ ] Cards align correctly on desktop and mobile.
- [ ] Footer navigation is visible.

### Navigation
- [ ] All navigation links point to existing section IDs.
- [ ] Mobile menu opens and closes.
- [ ] Selecting a mobile navigation link closes the menu.
- [ ] Escape closes the mobile menu.
- [ ] Keyboard focus is visible.

### Projects
- [ ] All projects appear when All projects is selected.
- [ ] Healthcare shows only healthcare projects.
- [ ] Business shows only business projects.
- [ ] Data analysis shows only data-analysis projects.
- [ ] The project count updates correctly.
- [ ] Repository links open the intended destinations.

### Analytics
- [ ] Both charts render.
- [ ] Both datasets can be selected.
- [ ] All reporting-period filters work.
- [ ] Reset Filters restores the default selection.
- [ ] The data table matches the selected dataset and period.
- [ ] Demonstration data is clearly labelled.

### Resume and contact
- [ ] The resume button reports a missing PDF correctly.
- [ ] A real resume PDF downloads when present.
- [ ] LinkedIn is configured with the actual profile URL.
- [ ] Email opens the actual configured email address.
- [ ] GitHub links point to the correct profile.

### Browser checks
- [ ] No JavaScript errors appear in DevTools Console.
- [ ] No missing local resources appear in DevTools Network.
- [ ] All section IDs and internal links are valid.
- [ ] The site works after GitHub Pages deployment.
- [ ] Reduced-motion preferences are respected.

## License and attribution

This portfolio template is intended for personal customization.

Chart.js is loaded from jsDelivr. Consult Chart.js documentation
for library details and licensing information.

https://www.chartjs.org/
