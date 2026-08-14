<?php
/**
 * Plugin Name:       RH Portfolio Manager
 * Plugin URI:        https://ravihadwani.in
 * Description:       Dedicated Headless CMS Manager for Ravi Hadwani Portfolio. Provides full CRUD administration for Projects, Services, Testimonials, Inquiries, and ultra-fast REST API endpoints.
 * Version:           1.1.0
 * Author:            Ravi Hadwani
 * Author URI:        https://ravihadwani.in
 * Text Domain:       rh-portfolio-manager
 * Requires at least: 5.8
 * Requires PHP:      7.4
 *
 * @package           RH_Portfolio_Manager
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

define( 'RH_PORTFOLIO_MGR_VERSION', '1.1.0' );
define( 'RH_PORTFOLIO_MGR_PATH', plugin_dir_path( __FILE__ ) );
define( 'RH_PORTFOLIO_MGR_URL', plugin_dir_url( __FILE__ ) );

// Include Modular Classes
require_once RH_PORTFOLIO_MGR_PATH . 'includes/class-cpt-manager.php';
require_once RH_PORTFOLIO_MGR_PATH . 'includes/class-meta-boxes.php';
require_once RH_PORTFOLIO_MGR_PATH . 'includes/class-rest-api.php';
require_once RH_PORTFOLIO_MGR_PATH . 'includes/class-admin-columns.php';

/**
 * Main Plugin Initialization Class
 */
class RH_Portfolio_Manager {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->init_hooks();
        $this->init_modules();
    }

    private function init_hooks() {
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
        add_action( 'init', array( $this, 'enable_cors_headers' ) );
        register_activation_hook( __FILE__, array( $this, 'on_activate' ) );
    }

    private function init_modules() {
        RH_Portfolio_CPT_Manager::get_instance();
        RH_Portfolio_Meta_Boxes::get_instance();
        RH_Portfolio_REST_API::get_instance();
        RH_Portfolio_Admin_Columns::get_instance();
    }

    public function enqueue_admin_assets( $hook ) {
        global $post_type;
        $allowed_cpts = array( 'portfolio_project', 'portfolio_service', 'portfolio_testimonial', 'portfolio_inquiry' );

        if ( in_array( $post_type, $allowed_cpts, true ) || false !== strpos( $hook, 'portfolio' ) ) {
            wp_enqueue_media();
            wp_enqueue_style(
                'rh-portfolio-mgr-css',
                RH_PORTFOLIO_MGR_URL . 'assets/css/admin-style.css',
                array(),
                RH_PORTFOLIO_MGR_VERSION
            );
            wp_enqueue_script(
                'rh-portfolio-mgr-js',
                RH_PORTFOLIO_MGR_URL . 'assets/js/admin-script.js',
                array( 'jquery' ),
                RH_PORTFOLIO_MGR_VERSION,
                true
            );
        }
    }

    public function enable_cors_headers() {
        add_action( 'send_headers', function() {
            header( 'Access-Control-Allow-Origin: *' );
            header( 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS' );
            header( 'Access-Control-Allow-Credentials: true' );
            header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Origin, Accept' );
            if ( 'OPTIONS' === ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
                status_header( 200 );
                exit();
            }
        } );
    }

    public function on_activate() {
        RH_Portfolio_CPT_Manager::get_instance()->register_custom_post_types();
        flush_rewrite_rules();
    }
}

// Instantiate Plugin
function rh_portfolio_manager_init() {
    return RH_Portfolio_Manager::get_instance();
}
add_action( 'plugins_loaded', 'rh_portfolio_manager_init' );
