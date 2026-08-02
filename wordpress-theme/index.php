<?php
/**
 * Main Template File
 *
 * This theme is designed for Headless WordPress architecture serving Next.js frontend.
 *
 * @package RH_Portfolio
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

header( 'Content-Type: application/json; charset=utf-8' );
echo json_encode( array(
    'status'   => 'success',
    'message'  => 'Ravi Hadwani Headless WordPress API active.',
    'version'  => '1.0.0',
    'endpoints' => array(
        'projects' => get_rest_url( null, 'wp/v2/portfolio_project' ),
        'services' => get_rest_url( null, 'wp/v2/portfolio_service' ),
        'contact'  => get_rest_url( null, 'rh-portfolio/v1/contact' ),
    ),
) );
