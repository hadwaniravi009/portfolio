<?php
/**
 * Admin Meta Boxes Manager for CRUD Operations
 *
 * @package RH_Portfolio_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RH_Portfolio_Meta_Boxes {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'add_meta_boxes', array( $this, 'register_meta_boxes' ) );
        add_action( 'save_post', array( $this, 'save_meta_boxes' ), 10, 2 );
    }

    public function register_meta_boxes() {
        // 1. Project Details Meta Box
        add_meta_box(
            'rh_project_details_mb',
            __( '🚀 Project Specifications & Case Study Data', 'rh-portfolio-core' ),
            array( $this, 'render_project_meta_box' ),
            'portfolio_project',
            'normal',
            'high'
        );

        // 2. Service Details Meta Box
        add_meta_box(
            'rh_service_details_mb',
            __( '⚡ Service Capabilities & Deliverables', 'rh-portfolio-core' ),
            array( $this, 'render_service_meta_box' ),
            'portfolio_service',
            'normal',
            'high'
        );

        // 3. Testimonial Details Meta Box
        add_meta_box(
            'rh_testimonial_details_mb',
            __( '⭐ Client Testimonial & Review Details', 'rh-portfolio-core' ),
            array( $this, 'render_testimonial_meta_box' ),
            'portfolio_testimonial',
            'normal',
            'high'
        );

        // 4. Inquiry Details Meta Box
        add_meta_box(
            'rh_inquiry_details_mb',
            __( '📩 Inquiry Message & Client Contact Info', 'rh-portfolio-core' ),
            array( $this, 'render_inquiry_meta_box' ),
            'portfolio_inquiry',
            'normal',
            'high'
        );
    }

    /**
     * Render Project Meta Box
     */
    public function render_project_meta_box( $post ) {
        wp_nonce_field( 'rh_save_project_meta', 'rh_project_nonce' );

        $category   = get_post_meta( $post->ID, '_rh_category', true ) ?: ( get_post_meta( $post->ID, 'category', true ) ?: 'WordPress' );
        $tags       = get_post_meta( $post->ID, '_rh_tags', true ) ?: ( get_post_meta( $post->ID, 'tags', true ) ?: 'WordPress, PHP, React' );
        $live_url   = get_post_meta( $post->ID, '_rh_live_url', true ) ?: get_post_meta( $post->ID, 'live_url', true );
        $github_url = get_post_meta( $post->ID, '_rh_github_url', true ) ?: get_post_meta( $post->ID, 'github_url', true );
        $challenge  = get_post_meta( $post->ID, '_rh_challenge', true ) ?: get_post_meta( $post->ID, 'challenge', true );
        $solution   = get_post_meta( $post->ID, '_rh_solution', true ) ?: get_post_meta( $post->ID, 'solution', true );
        $featured   = get_post_meta( $post->ID, '_rh_featured', true );

        ?>
        <div class="rh-meta-box-wrapper">
            <p class="rh-mb-subtitle"><?php _e( 'Fill in the structured fields below. These details automatically render across the Next.js portfolio and modal case studies.', 'rh-portfolio-core' ); ?></p>

            <div class="rh-form-grid">
                <!-- Category -->
                <div class="rh-form-group">
                    <label for="rh_category"><strong><?php _e( 'Primary Category / Filter:', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="text" id="rh_category" name="rh_category" value="<?php echo esc_attr( $category ); ?>" list="rh_category_presets" placeholder="e.g. WordPress, Next.js, React" class="widefat" />
                    <datalist id="rh_category_presets">
                        <option value="WordPress" />
                        <option value="Next.js" />
                        <option value="React" />
                        <option value="Full Stack" />
                        <option value="UI/UX Design" />
                    </datalist>
                    <span class="rh-help-text"><?php _e( 'Used for tab filtering on the live frontend (All / WordPress / Next.js / React).', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- Tags / Tech Stack -->
                <div class="rh-form-group">
                    <label for="rh_tags"><strong><?php _e( 'Tech Stack Badges (Comma-separated):', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="text" id="rh_tags" name="rh_tags" value="<?php echo esc_attr( $tags ); ?>" placeholder="e.g. Next.js, React, Tailwind CSS, TypeScript" class="widefat" />
                    <span class="rh-help-text"><?php _e( 'List technologies separated by commas (e.g. "Next.js, TypeScript, Tailwind, Headless WP").', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- Live Project URL -->
                <div class="rh-form-group">
                    <label for="rh_live_url"><strong><?php _e( 'Live Website URL:', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="url" id="rh_live_url" name="rh_live_url" value="<?php echo esc_url( $live_url ); ?>" placeholder="https://yourproject.com" class="widefat" />
                    <span class="rh-help-text"><?php _e( 'Leave empty or "#" if not publicly deployed.', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- GitHub Repo URL -->
                <div class="rh-form-group">
                    <label for="rh_github_url"><strong><?php _e( 'GitHub Repository URL:', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="url" id="rh_github_url" name="rh_github_url" value="<?php echo esc_url( $github_url ); ?>" placeholder="https://github.com/username/repo" class="widefat" />
                    <span class="rh-help-text"><?php _e( 'Public or private GitHub link for source code inspection.', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- Featured Project Toggle -->
                <div class="rh-form-group rh-full-width rh-checkbox-group">
                    <label>
                        <input type="checkbox" name="rh_featured" value="1" <?php checked( $featured, '1' ); ?> />
                        <strong><?php _e( 'Feature on Homepage Hero & Top Showcase', 'rh-portfolio-core' ); ?></strong>
                    </label>
                </div>

                <!-- Business Challenge -->
                <div class="rh-form-group rh-full-width">
                    <label for="rh_challenge"><strong><?php _e( '01. The Business Challenge (Problem Statement):', 'rh-portfolio-core' ); ?></strong></label>
                    <textarea id="rh_challenge" name="rh_challenge" rows="4" class="widefat" placeholder="Describe the client's problem, legacy bottlenecks, or performance requirements..."><?php echo esc_textarea( $challenge ); ?></textarea>
                    <span class="rh-help-text"><?php _e( 'Displayed in the interactive modal popup case study section.', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- Engineering Solution -->
                <div class="rh-form-group rh-full-width">
                    <label for="rh_solution"><strong><?php _e( '02. Engineering & Solution Architecture:', 'rh-portfolio-core' ); ?></strong></label>
                    <textarea id="rh_solution" name="rh_solution" rows="4" class="widefat" placeholder="Describe your architectural solution, technologies chosen, and performance optimizations..."><?php echo esc_textarea( $solution ); ?></textarea>
                    <span class="rh-help-text"><?php _e( 'Details the technical execution and deliverables built for the client.', 'rh-portfolio-core' ); ?></span>
                </div>
            </div>

            <div class="rh-tip-box">
                💡 <strong><?php _e( 'Pro Tip:', 'rh-portfolio-core' ); ?></strong> <?php _e( 'Remember to set the <strong>Featured Image</strong> on the right sidebar. It will be used as the project showcase banner.', 'rh-portfolio-core' ); ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render Service Meta Box
     */
    public function render_service_meta_box( $post ) {
        wp_nonce_field( 'rh_save_service_meta', 'rh_service_nonce' );

        $icon = get_post_meta( $post->ID, '_rh_service_icon', true ) ?: ( get_post_meta( $post->ID, 'icon', true ) ?: 'code' );
        $tags = get_post_meta( $post->ID, '_rh_service_tags', true ) ?: ( get_post_meta( $post->ID, 'tags', true ) ?: 'React, Next.js, Tailwind' );

        ?>
        <div class="rh-meta-box-wrapper">
            <div class="rh-form-grid">
                <!-- Icon Selector -->
                <div class="rh-form-group">
                    <label for="rh_service_icon"><strong><?php _e( 'Service Icon (Keyword or Image URL):', 'rh-portfolio-core' ); ?></strong></label>
                    <div class="rh-input-with-button">
                        <input type="text" id="rh_service_icon" name="rh_service_icon" value="<?php echo esc_attr( $icon ); ?>" list="rh_icon_presets" placeholder="e.g. code, draw, terminal, palette" class="widefat" />
                        <button type="button" class="button rh-media-upload-btn" data-target="#rh_service_icon"><?php _e( 'Upload Icon', 'rh-portfolio-core' ); ?></button>
                    </div>
                    <datalist id="rh_icon_presets">
                        <option value="code"><?php _e( 'Frontend / Code (Code Icon)', 'rh-portfolio-core' ); ?></option>
                        <option value="draw"><?php _e( 'UI/UX Design (Palette / Draw Icon)', 'rh-portfolio-core' ); ?></option>
                        <option value="terminal"><?php _e( 'WordPress / Headless Backend (Terminal Icon)', 'rh-portfolio-core' ); ?></option>
                        <option value="palette"><?php _e( 'Graphic Design / Art', 'rh-portfolio-core' ); ?></option>
                        <option value="zap"><?php _e( 'High Performance / Speed', 'rh-portfolio-core' ); ?></option>
                        <option value="shield"><?php _e( 'Security Hardening', 'rh-portfolio-core' ); ?></option>
                    </datalist>
                    <span class="rh-help-text"><?php _e( 'Choose a preset keyword (draw, code, terminal) or upload a custom SVG/PNG icon via WordPress Media.', 'rh-portfolio-core' ); ?></span>
                </div>

                <!-- Deliverables / Tags -->
                <div class="rh-form-group">
                    <label for="rh_service_tags"><strong><?php _e( 'Deliverables / Tech Tags (Comma-separated):', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="text" id="rh_service_tags" name="rh_service_tags" value="<?php echo esc_attr( $tags ); ?>" placeholder="e.g. Figma, Prototyping, Design Systems" class="widefat" />
                    <span class="rh-help-text"><?php _e( 'Technologies and deliverables associated with this capability.', 'rh-portfolio-core' ); ?></span>
                </div>
            </div>

            <div class="rh-tip-box">
                ℹ️ <strong><?php _e( 'Note:', 'rh-portfolio-core' ); ?></strong> <?php _e( 'The main service description is written in the main WordPress editor above.', 'rh-portfolio-core' ); ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render Testimonial Meta Box
     */
    public function render_testimonial_meta_box( $post ) {
        wp_nonce_field( 'rh_save_testimonial_meta', 'rh_testimonial_nonce' );

        $role    = get_post_meta( $post->ID, '_rh_testimonial_role', true ) ?: ( get_post_meta( $post->ID, 'role', true ) ?: 'Founder & CEO' );
        $company = get_post_meta( $post->ID, '_rh_testimonial_company', true ) ?: ( get_post_meta( $post->ID, 'company', true ) ?: 'Tech Startup' );
        $rating  = get_post_meta( $post->ID, '_rh_testimonial_rating', true ) ?: '5';

        ?>
        <div class="rh-meta-box-wrapper">
            <div class="rh-form-grid">
                <!-- Client Role -->
                <div class="rh-form-group">
                    <label for="rh_testimonial_role"><strong><?php _e( 'Client Role / Title:', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="text" id="rh_testimonial_role" name="rh_testimonial_role" value="<?php echo esc_attr( $role ); ?>" placeholder="e.g. CEO, Product Director, Founder" class="widefat" />
                </div>

                <!-- Company Name -->
                <div class="rh-form-group">
                    <label for="rh_testimonial_company"><strong><?php _e( 'Company / Brand Name:', 'rh-portfolio-core' ); ?></strong></label>
                    <input type="text" id="rh_testimonial_company" name="rh_testimonial_company" value="<?php echo esc_attr( $company ); ?>" placeholder="e.g. Modus Creative, CloudFlow" class="widefat" />
                </div>

                <!-- Rating -->
                <div class="rh-form-group">
                    <label for="rh_testimonial_rating"><strong><?php _e( 'Rating (1 to 5 Stars):', 'rh-portfolio-core' ); ?></strong></label>
                    <select id="rh_testimonial_rating" name="rh_testimonial_rating" class="widefat">
                        <option value="5" <?php selected( $rating, '5' ); ?>>⭐⭐⭐⭐⭐ (5 / 5)</option>
                        <option value="4" <?php selected( $rating, '4' ); ?>>⭐⭐⭐⭐ (4 / 5)</option>
                        <option value="3" <?php selected( $rating, '3' ); ?>>⭐⭐⭐ (3 / 5)</option>
                    </select>
                </div>
            </div>

            <div class="rh-tip-box">
                💬 <strong><?php _e( 'Client Quote:', 'rh-portfolio-core' ); ?></strong> <?php _e( 'Write the client\'s feedback/quote in the main WordPress editor above. The post title is the client\'s Name.', 'rh-portfolio-core' ); ?>
            </div>
        </div>
        <?php
    }

    /**
     * Render Inquiry Meta Box
     */
    public function render_inquiry_meta_box( $post ) {
        $name    = get_post_meta( $post->ID, 'client_name', true );
        $email   = get_post_meta( $post->ID, 'client_email', true );
        $type    = get_post_meta( $post->ID, 'project_type', true );
        $date    = get_the_date( 'F j, Y, g:i a', $post->ID );

        ?>
        <div class="rh-meta-box-wrapper rh-inquiry-box">
            <div class="rh-inquiry-header">
                <div>
                    <span class="rh-badge"><?php echo esc_html( $type ?: 'General Inquiry' ); ?></span>
                    <h3><?php echo esc_html( $name ?: 'Anonymous Client' ); ?></h3>
                </div>
                <div class="rh-inquiry-meta">
                    <strong><?php _e( 'Received on:', 'rh-portfolio-core' ); ?></strong> <?php echo esc_html( $date ); ?>
                </div>
            </div>

            <div class="rh-inquiry-details-table">
                <p><strong><?php _e( 'Email:', 'rh-portfolio-core' ); ?></strong> <a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
                <p><strong><?php _e( 'Requested Service:', 'rh-portfolio-core' ); ?></strong> <?php echo esc_html( $type ); ?></p>
            </div>

            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #e2e8f0;" />

            <div class="rh-inquiry-message">
                <strong><?php _e( 'Message Content:', 'rh-portfolio-core' ); ?></strong>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;"><?php echo esc_html( $post->post_content ); ?></div>
            </div>
        </div>
        <?php
    }

    /**
     * Save Meta Boxes on Post Save (Full CRUD Handling)
     */
    public function save_meta_boxes( $post_id, $post ) {
        // Autosave check
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Permission check
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // 1. Save Project Meta
        if ( isset( $_POST['rh_project_nonce'] ) && wp_verify_nonce( $_POST['rh_project_nonce'], 'rh_save_project_meta' ) ) {
            $category   = sanitize_text_field( $_POST['rh_category'] ?? 'WordPress' );
            $tags       = sanitize_text_field( $_POST['rh_tags'] ?? '' );
            $live_url   = esc_url_raw( $_POST['rh_live_url'] ?? '' );
            $github_url = esc_url_raw( $_POST['rh_github_url'] ?? '' );
            $challenge  = sanitize_textarea_field( $_POST['rh_challenge'] ?? '' );
            $solution   = sanitize_textarea_field( $_POST['rh_solution'] ?? '' );
            $featured   = isset( $_POST['rh_featured'] ) ? '1' : '0';

            // Save standard internal keys
            update_post_meta( $post_id, '_rh_category', $category );
            update_post_meta( $post_id, '_rh_tags', $tags );
            update_post_meta( $post_id, '_rh_live_url', $live_url );
            update_post_meta( $post_id, '_rh_github_url', $github_url );
            update_post_meta( $post_id, '_rh_challenge', $challenge );
            update_post_meta( $post_id, '_rh_solution', $solution );
            update_post_meta( $post_id, '_rh_featured', $featured );

            // Also mirror to legacy public keys for 100% backward REST API compatibility
            update_post_meta( $post_id, 'category', $category );
            update_post_meta( $post_id, 'tags', $tags );
            update_post_meta( $post_id, 'live_url', $live_url );
            update_post_meta( $post_id, 'github_url', $github_url );
            update_post_meta( $post_id, 'challenge', $challenge );
            update_post_meta( $post_id, 'solution', $solution );
        }

        // 2. Save Service Meta
        if ( isset( $_POST['rh_service_nonce'] ) && wp_verify_nonce( $_POST['rh_service_nonce'], 'rh_save_service_meta' ) ) {
            $icon = sanitize_text_field( $_POST['rh_service_icon'] ?? 'code' );
            $tags = sanitize_text_field( $_POST['rh_service_tags'] ?? '' );

            update_post_meta( $post_id, '_rh_service_icon', $icon );
            update_post_meta( $post_id, '_rh_service_tags', $tags );

            update_post_meta( $post_id, 'icon', $icon );
            update_post_meta( $post_id, 'tags', $tags );
        }

        // 3. Save Testimonial Meta
        if ( isset( $_POST['rh_testimonial_nonce'] ) && wp_verify_nonce( $_POST['rh_testimonial_nonce'], 'rh_save_testimonial_meta' ) ) {
            $role    = sanitize_text_field( $_POST['rh_testimonial_role'] ?? '' );
            $company = sanitize_text_field( $_POST['rh_testimonial_company'] ?? '' );
            $rating  = sanitize_text_field( $_POST['rh_testimonial_rating'] ?? '5' );

            update_post_meta( $post_id, '_rh_testimonial_role', $role );
            update_post_meta( $post_id, '_rh_testimonial_company', $company );
            update_post_meta( $post_id, '_rh_testimonial_rating', $rating );

            update_post_meta( $post_id, 'role', $role );
            update_post_meta( $post_id, 'company', $company );
        }
    }
}
