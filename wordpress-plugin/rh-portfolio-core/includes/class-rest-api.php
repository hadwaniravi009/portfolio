<?php
/**
 * REST API Manager for Headless Next.js Integration
 *
 * @package RH_Portfolio_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RH_Portfolio_REST_API {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
    }

    /**
     * Expose custom meta fields to standard /wp/v2/ endpoints
     */
    public function register_rest_fields() {
        // Project Meta
        $project_metas = array( 'category', 'tags', 'live_url', 'github_url', 'challenge', 'solution', '_rh_category', '_rh_tags', '_rh_live_url', '_rh_github_url', '_rh_challenge', '_rh_solution', '_rh_featured' );
        foreach ( $project_metas as $key ) {
            register_post_meta( 'portfolio_project', $key, array(
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
            ) );
        }

        // Service Meta
        $service_metas = array( 'icon', 'tags', '_rh_service_icon', '_rh_service_tags' );
        foreach ( $service_metas as $key ) {
            register_post_meta( 'portfolio_service', $key, array(
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
            ) );
        }

        // Testimonial Meta
        $testimonial_metas = array( 'role', 'company', '_rh_testimonial_role', '_rh_testimonial_company', '_rh_testimonial_rating' );
        foreach ( $testimonial_metas as $key ) {
            register_post_meta( 'portfolio_testimonial', $key, array(
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
            ) );
        }

        // Rank Math SEO Meta Fields for Blog Posts & Projects
        $seo_post_types = array( 'post', 'portfolio_project' );
        foreach ( $seo_post_types as $pt ) {
            register_rest_field( $pt, 'rank_math_seo', array(
                'get_callback' => function( $post_arr ) {
                    $post_id = $post_arr['id'];
                    $score   = get_post_meta( $post_id, 'rank_math_seo_score', true );
                    return array(
                        'score'         => ! empty( $score ) ? intval( $score ) : null,
                        'focus_keyword' => get_post_meta( $post_id, 'rank_math_focus_keyword', true ) ?: '',
                        'title'         => get_post_meta( $post_id, 'rank_math_title', true ) ?: '',
                        'description'   => get_post_meta( $post_id, 'rank_math_description', true ) ?: '',
                        'canonical_url' => get_post_meta( $post_id, 'rank_math_canonical_url', true ) ?: '',
                    );
                },
                'schema' => array(
                    'description' => 'Rank Math SEO Meta & Score',
                    'type'        => 'object',
                ),
            ) );
        }
    }

    /**
     * Register Dedicated Custom REST Routes (/rh-portfolio/v1/...)
     */
    public function register_rest_routes() {
        $namespace = 'rh-portfolio/v1';

        // 1. Projects Endpoint
        register_rest_route( $namespace, '/projects', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'get_projects' ),
            'permission_callback' => '__return_true',
        ) );

        // 2. Services Endpoint
        register_rest_route( $namespace, '/services', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'get_services' ),
            'permission_callback' => '__return_true',
        ) );

        // 3. Testimonials Endpoint
        register_rest_route( $namespace, '/testimonials', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'get_testimonials' ),
            'permission_callback' => '__return_true',
        ) );

        // 4. Unified All-Data Endpoint (Instant single request)
        register_rest_route( $namespace, '/all', array(
            'methods'             => 'GET',
            'callback'            => array( $this, 'get_all_portfolio_data' ),
            'permission_callback' => '__return_true',
        ) );

        // 5. Contact Submission Endpoint
        register_rest_route( $namespace, '/contact', array(
            'methods'             => 'POST',
            'callback'            => array( $this, 'handle_contact_submission' ),
            'permission_callback' => '__return_true',
        ) );
    }

    /**
     * Get Projects in Clean JSON Format
     */
    public function get_projects() {
        $posts = get_posts( array(
            'post_type'      => 'portfolio_project',
            'posts_per_page' => 100,
            'post_status'    => 'publish',
            'orderby'        => 'menu_order date',
            'order'          => 'DESC',
        ) );

        $data = array();
        foreach ( $posts as $post ) {
            $image_url = get_the_post_thumbnail_url( $post->ID, 'full' ) ?: '';
            $category  = get_post_meta( $post->ID, '_rh_category', true ) ?: ( get_post_meta( $post->ID, 'category', true ) ?: 'WordPress' );
            $raw_tags  = get_post_meta( $post->ID, '_rh_tags', true ) ?: ( get_post_meta( $post->ID, 'tags', true ) ?: 'WordPress, PHP' );
            $tags      = array_values( array_filter( array_map( 'trim', explode( ',', $raw_tags ) ) ) );

            $challenge = get_post_meta( $post->ID, '_rh_challenge', true ) ?: ( get_post_meta( $post->ID, 'challenge', true ) ?: wp_strip_all_tags( $post->post_excerpt ) );
            $solution  = get_post_meta( $post->ID, '_rh_solution', true ) ?: ( get_post_meta( $post->ID, 'solution', true ) ?: wp_strip_all_tags( $post->post_content ) );

            $data[] = array(
                'id'        => $post->ID,
                'title'     => get_the_title( $post ),
                'category'  => $category,
                'tags'      => $tags,
                'image'     => $image_url,
                'challenge' => $challenge,
                'solution'  => $solution,
                'liveUrl'   => get_post_meta( $post->ID, '_rh_live_url', true ) ?: ( get_post_meta( $post->ID, 'live_url', true ) ?: '#' ),
                'githubUrl' => get_post_meta( $post->ID, '_rh_github_url', true ) ?: ( get_post_meta( $post->ID, 'github_url', true ) ?: '#' ),
                'featured'  => '1' === get_post_meta( $post->ID, '_rh_featured', true ),
            );
        }

        return rest_ensure_response( $data );
    }

    /**
     * Get Services in Clean JSON Format
     */
    public function get_services() {
        $posts = get_posts( array(
            'post_type'      => 'portfolio_service',
            'posts_per_page' => 100,
            'post_status'    => 'publish',
            'orderby'        => 'menu_order date',
            'order'          => 'ASC',
        ) );

        $data = array();
        foreach ( $posts as $post ) {
            $image_url = get_the_post_thumbnail_url( $post->ID, 'full' );
            $icon_meta = get_post_meta( $post->ID, '_rh_service_icon', true ) ?: ( get_post_meta( $post->ID, 'icon', true ) ?: 'code' );
            $icon      = $image_url ?: $icon_meta;

            $raw_tags = get_post_meta( $post->ID, '_rh_service_tags', true ) ?: ( get_post_meta( $post->ID, 'tags', true ) ?: 'Design, Development' );
            $tags     = array_values( array_filter( array_map( 'trim', explode( ',', $raw_tags ) ) ) );

            $data[] = array(
                'id'          => $post->ID,
                'icon'        => $icon,
                'title'       => get_the_title( $post ),
                'description' => wp_strip_all_tags( $post->post_content ),
                'tags'        => $tags,
            );
        }

        return rest_ensure_response( $data );
    }

    /**
     * Get Testimonials in Clean JSON Format
     */
    public function get_testimonials() {
        $posts = get_posts( array(
            'post_type'      => 'portfolio_testimonial',
            'posts_per_page' => 100,
            'post_status'    => 'publish',
            'orderby'        => 'date',
            'order'          => 'DESC',
        ) );

        $data = array();
        foreach ( $posts as $post ) {
            $avatar = get_the_post_thumbnail_url( $post->ID, 'thumbnail' ) ?: '';

            $data[] = array(
                'id'      => $post->ID,
                'quote'   => wp_strip_all_tags( $post->post_content ),
                'name'    => get_the_title( $post ),
                'role'    => get_post_meta( $post->ID, '_rh_testimonial_role', true ) ?: ( get_post_meta( $post->ID, 'role', true ) ?: 'Client' ),
                'company' => get_post_meta( $post->ID, '_rh_testimonial_company', true ) ?: ( get_post_meta( $post->ID, 'company', true ) ?: '' ),
                'avatar'  => $avatar,
            );
        }

        return rest_ensure_response( $data );
    }

    /**
     * Get All Data Unified
     */
    public function get_all_portfolio_data() {
        return rest_ensure_response( array(
            'projects'     => $this->get_projects()->get_data(),
            'services'     => $this->get_services()->get_data(),
            'testimonials' => $this->get_testimonials()->get_data(),
        ) );
    }

    /**
     * Contact Form Submission Handler
     */
    public function handle_contact_submission( WP_REST_Request $request ) {
        $params = $request->get_json_params();

        $name    = sanitize_text_field( $params['name'] ?? '' );
        $email   = sanitize_email( $params['email'] ?? '' );
        $type    = sanitize_text_field( $params['projectType'] ?? 'General Inquiry' );
        $message = sanitize_textarea_field( $params['message'] ?? '' );

        if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
            return new WP_Error( 'missing_fields', __( 'Name, email, and message are required fields.', 'rh-portfolio-core' ), array( 'status' => 400 ) );
        }

        // 1. Store in Inquiries Post Type
        $post_id = wp_insert_post( array(
            'post_type'    => 'portfolio_inquiry',
            'post_title'   => sprintf( __( 'Inquiry from %1$s (%2$s)', 'rh-portfolio-core' ), $name, $type ),
            'post_content' => $message,
            'post_status'  => 'publish',
            'meta_input'   => array(
                'client_name'  => $name,
                'client_email' => $email,
                'project_type' => $type,
            ),
        ) );

        // 2. Dispatch Email
        $to      = get_option( 'admin_email' );
        $subject = sprintf( __( 'New Portfolio Client Inquiry: %1$s (%2$s)', 'rh-portfolio-core' ), $name, $type );
        $body    = "You received a new inquiry from your website portfolio:\n\n" .
                   "Client Name: $name\n" .
                   "Email: $email\n" .
                   "Project Category: $type\n\n" .
                   "Message:\n$message\n\n" .
                   "View in WP Admin: " . admin_url( "post.php?post=$post_id&action=edit" );

        $headers = array( 'Content-Type: text/plain; charset=UTF-8', "Reply-To: $name <$email>" );
        @wp_mail( $to, $subject, $body, $headers );

        return rest_ensure_response( array(
            'success' => true,
            'message' => __( 'Thank you! Your message has been safely received. Ravi will contact you shortly.', 'rh-portfolio-core' ),
        ) );
    }
}
