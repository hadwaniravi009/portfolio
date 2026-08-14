<?php
/**
 * Admin Columns Customizer for WordPress Post Lists
 *
 * @package RH_Portfolio_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RH_Portfolio_Admin_Columns {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Projects Columns
        add_filter( 'manage_portfolio_project_posts_columns', array( $this, 'set_project_columns' ) );
        add_action( 'manage_portfolio_project_posts_custom_column', array( $this, 'render_project_columns' ), 10, 2 );

        // Services Columns
        add_filter( 'manage_portfolio_service_posts_columns', array( $this, 'set_service_columns' ) );
        add_action( 'manage_portfolio_service_posts_custom_column', array( $this, 'render_service_columns' ), 10, 2 );

        // Testimonials Columns
        add_filter( 'manage_portfolio_testimonial_posts_columns', array( $this, 'set_testimonial_columns' ) );
        add_action( 'manage_portfolio_testimonial_posts_custom_column', array( $this, 'render_testimonial_columns' ), 10, 2 );

        // Inquiries Columns
        add_filter( 'manage_portfolio_inquiry_posts_columns', array( $this, 'set_inquiry_columns' ) );
        add_action( 'manage_portfolio_inquiry_posts_custom_column', array( $this, 'render_inquiry_columns' ), 10, 2 );
    }

    /**
     * 1. Projects Columns
     */
    public function set_project_columns( $columns ) {
        $new_columns = array(
            'cb'         => $columns['cb'],
            'rh_thumb'   => __( 'Preview', 'rh-portfolio-core' ),
            'title'      => __( 'Project Title', 'rh-portfolio-core' ),
            'rh_cat'     => __( 'Category', 'rh-portfolio-core' ),
            'rh_tags'    => __( 'Tech Stack / Tags', 'rh-portfolio-core' ),
            'rh_links'   => __( 'Live / Repo Links', 'rh-portfolio-core' ),
            'date'       => $columns['date'],
        );
        return $new_columns;
    }

    public function render_project_columns( $column, $post_id ) {
        switch ( $column ) {
            case 'rh_thumb':
                $thumb = get_the_post_thumbnail( $post_id, array( 60, 40 ), array( 'style' => 'border-radius: 6px; object-fit: cover;' ) );
                echo $thumb ?: '<span style="color:#a0aec0;">No Image</span>';
                break;

            case 'rh_cat':
                $cat = get_post_meta( $post_id, '_rh_category', true ) ?: ( get_post_meta( $post_id, 'category', true ) ?: '—' );
                echo '<span class="rh-admin-badge">' . esc_html( $cat ) . '</span>';
                break;

            case 'rh_tags':
                $tags = get_post_meta( $post_id, '_rh_tags', true ) ?: get_post_meta( $post_id, 'tags', true );
                echo esc_html( $tags ?: '—' );
                break;

            case 'rh_links':
                $live = get_post_meta( $post_id, '_rh_live_url', true ) ?: get_post_meta( $post_id, 'live_url', true );
                $git  = get_post_meta( $post_id, '_rh_github_url', true ) ?: get_post_meta( $post_id, 'github_url', true );

                if ( $live && '#' !== $live ) {
                    echo '<a href="' . esc_url( $live ) . '" target="_blank" style="margin-right:8px;">🔗 Live Site</a> ';
                }
                if ( $git && '#' !== $git ) {
                    echo '<a href="' . esc_url( $git ) . '" target="_blank">💻 GitHub</a>';
                }
                if ( ( ! $live || '#' === $live ) && ( ! $git || '#' === $git ) ) {
                    echo '—';
                }
                break;
        }
    }

    /**
     * 2. Services Columns
     */
    public function set_service_columns( $columns ) {
        return array(
            'cb'       => $columns['cb'],
            'title'    => __( 'Service Title', 'rh-portfolio-core' ),
            'rh_icon'  => __( 'Icon / Keyword', 'rh-portfolio-core' ),
            'rh_tags'  => __( 'Deliverables / Tags', 'rh-portfolio-core' ),
            'date'     => $columns['date'],
        );
    }

    public function render_service_columns( $column, $post_id ) {
        switch ( $column ) {
            case 'rh_icon':
                $icon = get_post_meta( $post_id, '_rh_service_icon', true ) ?: ( get_post_meta( $post_id, 'icon', true ) ?: 'code' );
                echo '<code style="background:#edf2f7; padding:3px 8px; border-radius:4px;">' . esc_html( $icon ) . '</code>';
                break;

            case 'rh_tags':
                $tags = get_post_meta( $post_id, '_rh_service_tags', true ) ?: get_post_meta( $post_id, 'tags', true );
                echo esc_html( $tags ?: '—' );
                break;
        }
    }

    /**
     * 3. Testimonials Columns
     */
    public function set_testimonial_columns( $columns ) {
        return array(
            'cb'         => $columns['cb'],
            'title'      => __( 'Client Name', 'rh-portfolio-core' ),
            'rh_role'    => __( 'Role & Company', 'rh-portfolio-core' ),
            'rh_rating'  => __( 'Rating', 'rh-portfolio-core' ),
            'date'       => $columns['date'],
        );
    }

    public function render_testimonial_columns( $column, $post_id ) {
        switch ( $column ) {
            case 'rh_role':
                $role    = get_post_meta( $post_id, '_rh_testimonial_role', true ) ?: get_post_meta( $post_id, 'role', true );
                $company = get_post_meta( $post_id, '_rh_testimonial_company', true ) ?: get_post_meta( $post_id, 'company', true );
                echo esc_html( trim( "$role, $company", ', ' ) ?: '—' );
                break;

            case 'rh_rating':
                $rating = (int) ( get_post_meta( $post_id, '_rh_testimonial_rating', true ) ?: 5 );
                echo str_repeat( '⭐', max( 1, min( 5, $rating ) ) );
                break;
        }
    }

    /**
     * 4. Inquiries Columns
     */
    public function set_inquiry_columns( $columns ) {
        return array(
            'cb'         => $columns['cb'],
            'title'      => __( 'Inquiry Subject', 'rh-portfolio-core' ),
            'rh_client'  => __( 'Client Contact', 'rh-portfolio-core' ),
            'rh_type'    => __( 'Project Category', 'rh-portfolio-core' ),
            'date'       => __( 'Received Date', 'rh-portfolio-core' ),
        );
    }

    public function render_inquiry_columns( $column, $post_id ) {
        switch ( $column ) {
            case 'rh_client':
                $name  = get_post_meta( $post_id, 'client_name', true );
                $email = get_post_meta( $post_id, 'client_email', true );
                echo '<strong>' . esc_html( $name ?: '—' ) . '</strong><br/><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
                break;

            case 'rh_type':
                $type = get_post_meta( $post_id, 'project_type', true );
                echo '<span class="rh-admin-badge" style="background:#e0e7ff; color:#3730a3;">' . esc_html( $type ?: 'General' ) . '</span>';
                break;
        }
    }
}
