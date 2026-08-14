# RH Portfolio Core & Headless CMS Manager (WordPress Plugin)

**Version:** 1.0.0  
**Author:** Ravi Hadwani  
**Compatible with:** WordPress 5.8+ | PHP 7.4 - 8.3  

---

## 🌟 Overview
`RH Portfolio Core` transforms your WordPress backend into a decoupled Headless Content Management System for your Next.js portfolio.

It gives you full CRUD (Create, Read, Update, Delete) capability from the WordPress Admin with custom visual meta boxes and exposes fast, clean REST API endpoints for seamless frontend synchronization.

---

## 🚀 Key Features

1. **Portfolio Projects Manager (`portfolio_project`)**:
   - Primary Category filtering (`WordPress`, `Next.js`, `React`, etc.)
   - Tech Stack Badges (Comma-separated)
   - Live Website URL & GitHub Repository Links
   - Business Challenge & Solution Architecture fields
   - Featured Project badge
   - Featured Image support for project cards

2. **Services & Capabilities Manager (`portfolio_service`)**:
   - Service Icon Selector (Keyword presets like `draw`, `code`, `terminal` or direct Media Upload)
   - Deliverables / Tech Tags
   - Service Description editor

3. **Client Testimonials & Reviews (`portfolio_testimonial`)**:
   - Client Name, Designation/Role, and Company Name
   - 1 to 5 Star Rating
   - Client Quote / Feedback

4. **Client Inquiries & Contact Submissions (`portfolio_inquiry`)**:
   - Stores all contact form submissions safely in the WordPress database
   - Dispatches instant email notification to the site administrator

5. **Unified REST API & CORS**:
   - `GET /wp-json/rh-portfolio/v1/projects`
   - `GET /wp-json/rh-portfolio/v1/services`
   - `GET /wp-json/rh-portfolio/v1/testimonials`
   - `GET /wp-json/rh-portfolio/v1/all`
   - `POST /wp-json/rh-portfolio/v1/contact`
   - Also fully compatible with standard `/wp/v2/portfolio_project`, `/wp/v2/portfolio_service`, and `/wp/v2/portfolio_testimonial` routes.

---

## 📦 How to Install on WordPress

1. In WordPress Admin, navigate to **Plugins** -> **Add New Plugin**.
2. Click **Upload Plugin** at the top.
3. Choose the provided **`rh-portfolio-core.zip`** file and click **Install Now**.
4. Click **Activate Plugin**.
5. You will see **Portfolio Projects**, **Services**, **Testimonials**, and **Client Inquiries** right in your WordPress sidebar!
