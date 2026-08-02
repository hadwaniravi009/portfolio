# Ravi Hadwani Portfolio - WordPress Headless Backend Package

This directory contains the custom WordPress theme and REST API backend configuration for Ravi Hadwani's personal portfolio.

## Setup Instructions

1. **Copy Theme Folder**:
   Copy the `wordpress-theme` directory into your WordPress installation's `wp-content/themes/` directory:
   ```
   wp-content/themes/rh-portfolio/
   ```

2. **Activate Theme**:
   - Go to your WordPress Admin Dashboard -> **Appearance -> Themes**.
   - Activate **Ravi Hadwani Portfolio Theme**.

3. **Custom Post Types**:
   Upon activation, the theme automatically registers:
   - `Projects` (`/wp-json/wp/v2/portfolio_project`)
   - `Services` (`/wp-json/wp/v2/portfolio_service`)
   - `Testimonials` (`/wp-json/wp/v2/portfolio_testimonial`)
   - `Contact API` (`POST /wp-json/rh-portfolio/v1/contact`)

4. **Connecting Frontend**:
   In your Next.js application (`frontend/.env.local`), set:
   ```env
   NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-domain.com
   ```
