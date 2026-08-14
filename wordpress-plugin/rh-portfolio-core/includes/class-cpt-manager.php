<?php
/**
 * Custom Post Type Manager
 *
 * @package RH_Portfolio_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RH_Portfolio_CPT_Manager {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'init', array( $this, 'register_custom_post_types' ) );
    }

    public function register_custom_post_types() {
        $this->register_projects_cpt();
        $this->register_services_cpt();
        $this->register_testimonials_cpt();
        $this->register_inquiries_cpt();
    }

    /**
     * 1. Projects Custom Post Type
     */
    private function register_projects_cpt() {
        $labels = array(
            'name'                  => _x( 'Projects', 'Post type general name', 'rh-portfolio-core' ),
            'singular_name'         => _x( 'Project', 'Post type singular name', 'rh-portfolio-core' ),
            'menu_name'             => _x( 'Portfolio Projects', 'Admin Menu text', 'rh-portfolio-core' ),
            'name_admin_bar'        => _x( 'Project', 'Add New on Toolbar', 'rh-portfolio-core' ),
            'add_new'               => __( 'Add New Project', 'rh-portfolio-core' ),
            'add_new_item'          => __( 'Add New Portfolio Project', 'rh-portfolio-core' ),
            'new_item'              => __( 'New Project', 'rh-portfolio-core' ),
            'edit_item'             => __( 'Edit Project', 'rh-portfolio-core' ),
            'view_item'             => __( 'View Project', 'rh-portfolio-core' ),
            'all_items'             => __( 'All Projects', 'rh-portfolio-core' ),
            'search_items'          => __( 'Search Projects', 'rh-portfolio-core' ),
            'not_found'             => __( 'No projects found.', 'rh-portfolio-core' ),
            'not_found_in_trash'    => __( 'No projects found in Trash.', 'rh-portfolio-core' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'project' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions' ),
            'show_in_rest'       => true,
            'rest_base'          => 'portfolio_project',
        );

        register_post_type( 'portfolio_project', $args );
    }

    /**
     * 2. Services Custom Post Type
     */
    private function register_services_cpt() {
        $labels = array(
            'name'                  => _x( 'Services', 'Post type general name', 'rh-portfolio-core' ),
            'singular_name'         => _x( 'Service', 'Post type singular name', 'rh-portfolio-core' ),
            'menu_name'             => _x( 'Services', 'Admin Menu text', 'rh-portfolio-core' ),
            'name_admin_bar'        => _x( 'Service', 'Add New on Toolbar', 'rh-portfolio-core' ),
            'add_new'               => __( 'Add New Service', 'rh-portfolio-core' ),
            'add_new_item'          => __( 'Add New Service', 'rh-portfolio-core' ),
            'edit_item'             => __( 'Edit Service', 'rh-portfolio-core' ),
            'all_items'             => __( 'All Services', 'rh-portfolio-core' ),
            'search_items'          => __( 'Search Services', 'rh-portfolio-core' ),
            'not_found'             => __( 'No services found.', 'rh-portfolio-core' ),
            'not_found_in_trash'    => __( 'No services found in Trash.', 'rh-portfolio-core' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'service' ),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 6,
            'menu_icon'          => 'dashicons-superhero',
            'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
            'show_in_rest'       => true,
            'rest_base'          => 'portfolio_service',
        );

        register_post_type( 'portfolio_service', $args );
    }

    /**
     * 3. Testimonials Custom Post Type
     */
    private function register_testimonials_cpt() {
        $labels = array(
            'name'                  => _x( 'Testimonials', 'Post type general name', 'rh-portfolio-core' ),
            'singular_name'         => _x( 'Testimonial', 'Post type singular name', 'rh-portfolio-core' ),
            'menu_name'             => _x( 'Testimonials', 'Admin Menu text', 'rh-portfolio-core' ),
            'name_admin_bar'        => _x( 'Testimonial', 'Add New on Toolbar', 'rh-portfolio-core' ),
            'add_new'               => __( 'Add New Testimonial', 'rh-portfolio-core' ),
            'add_new_item'          => __( 'Add New Testimonial', 'rh-portfolio-core' ),
            'edit_item'             => __( 'Edit Testimonial', 'rh-portfolio-core' ),
            'all_items'             => __( 'All Testimonials', 'rh-portfolio-core' ),
            'search_items'          => __( 'Search Testimonials', 'rh-portfolio-core' ),
            'not_found'             => __( 'No testimonials found.', 'rh-portfolio-core' ),
            'not_found_in_trash'    => __( 'No testimonials found in Trash.', 'rh-portfolio-core' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'testimonial' ),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 7,
            'menu_icon'          => 'dashicons-testimonial',
            'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
            'show_in_rest'       => true,
            'rest_base'          => 'portfolio_testimonial',
        );

        register_post_type( 'portfolio_testimonial', $args );
    }

    /**
     * 4. Client Inquiries (Contact Form Submissions)
     */
    private function register_inquiries_cpt() {
        $labels = array(
            'name'                  => _x( 'Client Inquiries', 'Post type general name', 'rh-portfolio-core' ),
            'singular_name'         => _x( 'Inquiry', 'Post type singular name', 'rh-portfolio-core' ),
            'menu_name'             => _x( 'Client Inquiries', 'Admin Menu text', 'rh-portfolio-core' ),
            'name_admin_bar'        => _x( 'Inquiry', 'Add New on Toolbar', 'rh-portfolio-core' ),
            'all_items'             => __( 'All Inquiries', 'rh-portfolio-core' ),
            'view_item'             => __( 'View Inquiry', 'rh-portfolio-core' ),
            'search_items'          => __( 'Search Inquiries', 'rh-portfolio-core' ),
            'not_found'             => __( 'No inquiries found.', 'rh-portfolio-core' ),
            'not_found_in_trash'    => __( 'No inquiries found in Trash.', 'rh-portfolio-core' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => false,
            'capability_type'    => 'post',
            'capabilities'       => array( 'create_posts' => 'do_not_allow' ), // Prevent manual creation, only via API
            'map_meta_cap'       => true,
            'hierarchical'       => false,
            'menu_position'      => 8,
            'menu_icon'          => 'dashicons-email-alt',
            'supports'           => array( 'title', 'editor', 'custom-fields' ),
            'show_in_rest'       => false,
        );

        register_post_type( 'portfolio_inquiry', $args );
    }
}
