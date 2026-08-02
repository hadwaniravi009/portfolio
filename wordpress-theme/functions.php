<?php
/**
 * Theme Functions & Headless REST API Setup
 *
 * @package RH_Portfolio
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 1. Enable CORS for Next.js Frontend
add_action( 'init', function() {
    add_action( 'send_headers', function() {
        header( "Access-Control-Allow-Origin: *" );
        header( "Access-Control-Allow-Methods: GET, POST, OPTIONS" );
        header( "Access-Control-Allow-Credentials: true" );
        header( "Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Origin" );
        if ( 'OPTIONS' == $_SERVER['REQUEST_METHOD'] ) {
            status_header( 200 );
            exit();
        }
    } );
} );

// 2. Setup Theme Supports
function rh_portfolio_setup() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'custom-logo' );
}
add_action( 'after_setup_theme', 'rh_portfolio_setup' );

// 3. Register Custom Post Type: Portfolio Projects & Meta
function rh_register_project_cpt() {
    $labels = array(
        'name'               => 'Projects',
        'singular_name'      => 'Project',
        'add_new_item'       => 'Add New Project',
        'edit_item'          => 'Edit Project',
        'all_items'          => 'All Projects',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'has_archive'        => true,
        'show_in_rest'       => true, // Enable REST API
        'rest_base'          => 'portfolio_project',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'menu_icon'          => 'dashicons-portfolio',
    );

    register_post_type( 'portfolio_project', $args );

    // Register Meta Fields for REST API
    register_post_meta( 'portfolio_project', 'category', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
    register_post_meta( 'portfolio_project', 'tags', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
    register_post_meta( 'portfolio_project', 'live_url', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
    register_post_meta( 'portfolio_project', 'github_url', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
}
add_action( 'init', 'rh_register_project_cpt' );

// 4. Register Custom Post Type: Services & Meta
function rh_register_service_cpt() {
    $labels = array(
        'name'               => 'Services',
        'singular_name'      => 'Service',
        'add_new_item'       => 'Add New Service',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'portfolio_service',
        'supports'           => array( 'title', 'editor', 'custom-fields' ),
        'menu_icon'          => 'dashicons-superhero',
    );

    register_post_type( 'portfolio_service', $args );

    register_post_meta( 'portfolio_service', 'icon', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
    register_post_meta( 'portfolio_service', 'tags', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
}
add_action( 'init', 'rh_register_service_cpt' );

// 5. Register Custom Post Type: Testimonials & Meta
function rh_register_testimonial_cpt() {
    $labels = array(
        'name'               => 'Testimonials',
        'singular_name'      => 'Testimonial',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'portfolio_testimonial',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
        'menu_icon'          => 'dashicons-testimonial',
    );

    register_post_type( 'portfolio_testimonial', $args );

    register_post_meta( 'portfolio_testimonial', 'role', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
    register_post_meta( 'portfolio_testimonial', 'company', array( 'show_in_rest' => true, 'single' => true, 'type' => 'string' ) );
}
add_action( 'init', 'rh_register_testimonial_cpt' );

// 6. Register Custom Post Type: Client Inquiries (Form Submissions Database Storage)
function rh_register_inquiry_cpt() {
    $labels = array(
        'name'               => 'Inquiries',
        'singular_name'      => 'Inquiry',
        'all_items'          => 'Client Inquiries',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-email-alt',
        'supports'           => array( 'title', 'editor', 'custom-fields' ),
    );

    register_post_type( 'portfolio_inquiry', $args );
}
add_action( 'init', 'rh_register_inquiry_cpt' );

// 7. Custom REST API Contact Route
add_action( 'rest_api_init', function () {
    register_rest_route( 'rh-portfolio/v1', '/contact', array(
        'methods'  => 'POST',
        'callback' => 'rh_handle_contact_submission',
        'permission_callback' => '__return_true',
    ) );
} );

function rh_handle_contact_submission( WP_REST_Request $request ) {
    $params = $request->get_json_params();

    $name    = sanitize_text_field( $params['name'] ?? '' );
    $email   = sanitize_email( $params['email'] ?? '' );
    $type    = sanitize_text_field( $params['projectType'] ?? '' );
    $message = sanitize_textarea_field( $params['message'] ?? '' );

    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        return new WP_Error( 'missing_fields', 'Name, email, and message are required.', array( 'status' => 400 ) );
    }

    // 1. Save Inquiry inside WordPress Admin Database
    wp_insert_post( array(
        'post_type'    => 'portfolio_inquiry',
        'post_title'   => "Inquiry from $name ($type)",
        'post_content' => "Client Name: $name\nEmail: $email\nProject Type: $type\n\nMessage:\n$message",
        'post_status'  => 'publish',
        'meta_input'   => array(
            'client_name'  => $name,
            'client_email' => $email,
            'project_type' => $type,
        ),
    ) );

    // 2. Dispatch Email to Admin
    $to      = get_option( 'admin_email' );
    $subject = "New Portfolio Inquiry from $name ($type)";
    $body    = "Name: $name\nEmail: $email\nProject Type: $type\n\nMessage:\n$message";
    $headers = array( 'Content-Type: text/plain; charset=UTF-8', "Reply-To: $name <$email>" );

    @wp_mail( $to, $subject, $body, $headers );

    return rest_ensure_response( array(
        'success' => true,
        'message' => 'Thank you for reaching out! Your message has been sent successfully.',
    ) );
}
