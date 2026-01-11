
# Astro Web App Blueprint

## Project Overview

This project is a multi-functional web application built with Astro.js, designed to serve as a landing page, a timeline/chronogram viewer, an admin panel, an educational courses section, and a route calculator. The architecture leverages Astro's "Islands Architecture" to create a modular and performant user experience.

## Project Outline

### Implemented Features:

*   **File-based Routing:** The application uses Astro's file-based routing to create the following pages:
    *   `/` (Landing Page)
    *   `/admin` (Admin Panel)
    *   `/timeline` (Timeline/Chronogram)
    *   `/courses` (Educational Courses)
    *   `/calculator` (Route Calculator)
*   **Admin Panel:** A fully functional admin panel with a modern UI, built with modular components.
    *   **Components:** `AdminHeader`, `AdminSidebar`, `AdminFooter`, `WelcomeBanner`, and `InfoCard`.
    *   **Styling:** Tailwind CSS is used for a responsive and utility-first approach to styling.

### Design and Styling:

*   **Layout:** A main layout (`MainLayout.astro`) is used to provide a consistent structure to all pages.
*   **Styling:** 
    *   A global stylesheet (`global.css`) is used for basic styling.
    *   Tailwind CSS is integrated for the admin panel.

## Current Task

### Plan:

1.  **Create Admin Panel Page:** Create `src/pages/admin.astro`.
2.  **Create Modular Components:** Create individual `.astro` files for each component of the admin panel (`AdminHeader`, `AdminSidebar`, `AdminFooter`, `WelcomeBanner`, `InfoCard`).
3.  **Add Content to Components:** Populate the components with the necessary HTML and logic.
4.  **Install and Configure Tailwind CSS:** Set up Tailwind CSS to style the admin panel.
5.  **Integrate Components:** Import and use the created components within the `admin.astro` page.
6.  **Add Bonuses Management:** Create `BonusesForm.svelte` and integrate it into `AdminDashboard.svelte` as a new tab.
7.  **Update Blueprint:** Reflect the changes in the `blueprint.md` file.
