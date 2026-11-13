<?php
/**
 * Analytics & Search Console Dashboard Integration for Headless Portfolio
 *
 * @package RH_Portfolio_Manager
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RH_Portfolio_Analytics_Widget {

    private static $instance = null;
    private $frontend_url    = 'https://ravihadwani.in';
    private $ga_id           = 'G-JR07L7BM0K';
    private $ga_property_id  = '498595777';

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'wp_dashboard_setup', array( $this, 'add_dashboard_widgets' ) );
        add_filter( 'post_row_actions', array( $this, 'add_post_indexing_actions' ), 10, 2 );
        add_filter( 'manage_post_posts_columns', array( $this, 'add_indexing_column' ) );
        add_action( 'manage_post_posts_custom_column', array( $this, 'render_indexing_column' ), 10, 2 );
    }

    /**
     * Add Dashboard Widget to WP Admin
     */
    public function add_dashboard_widgets() {
        wp_add_dashboard_widget(
            'rh_portfolio_analytics_widget',
            '📊 Ravi Hadwani — Live Traffic & Blog Indexing Hub',
            array( $this, 'render_dashboard_widget' )
        );
    }

    /**
     * Render the Dashboard Widget
     */
    public function render_dashboard_widget() {
        $ga_link  = 'https://analytics.google.com/analytics/web/#/p' . esc_attr( $this->ga_property_id ) . '/reports/intelligenthome';
        $gsc_link = 'https://search.google.com/search-console?resource_id=' . rawurlencode( $this->frontend_url . '/' );
        $sitemap_url = $this->frontend_url . '/sitemap.xml';
        ?>
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 6px 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
                <div>
                    <span style="display: inline-block; width: 10px; height: 10px; background-color: #10b981; border-radius: 50%; margin-right: 6px;"></span>
                    <strong style="color: #111827; font-size: 14px;">Next.js Frontend Active</strong>
                </div>
                <span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px;">
                    GA4: <?php echo esc_html( $this->ga_id ); ?>
                </span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                <a href="<?php echo esc_url( $ga_link ); ?>" target="_blank" rel="noopener noreferrer"
                   style="display: flex; flex-direction: column; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; transition: all 0.2s ease;">
                    <span style="font-size: 18px; margin-bottom: 4px;">📈</span>
                    <strong style="font-size: 13px; color: #2563eb;">Live Traffic (GA4)</strong>
                    <span style="font-size: 11px; color: #64748b; margin-top: 2px;">Real-time visitors & sources &rarr;</span>
                </a>

                <a href="<?php echo esc_url( $gsc_link ); ?>" target="_blank" rel="noopener noreferrer"
                   style="display: flex; flex-direction: column; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; transition: all 0.2s ease;">
                    <span style="font-size: 18px; margin-bottom: 4px;">🔍</span>
                    <strong style="font-size: 13px; color: #059669;">Search Indexing</strong>
                    <span style="font-size: 11px; color: #64748b; margin-top: 2px;">Google clicks & indexing &rarr;</span>
                </a>
            </div>

            <div style="background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 3px solid #3b82f6; font-size: 12px; color: #475569;">
                <div style="margin-bottom: 6px;">
                    <strong>Live Frontend:</strong> <a href="<?php echo esc_url( $this->frontend_url ); ?>" target="_blank" style="color: #2563eb; text-decoration: none;"><?php echo esc_html( $this->frontend_url ); ?></a>
                </div>
                <div>
                    <strong>Dynamic Blog Sitemap:</strong> <a href="<?php echo esc_url( $sitemap_url ); ?>" target="_blank" style="color: #2563eb; text-decoration: none;"><?php echo esc_html( $sitemap_url ); ?></a>
                </div>
            </div>

            <p style="margin-top: 12px; margin-bottom: 0; font-size: 11px; color: #94a3b8; text-align: right;">
                RH Portfolio Headless Engine v1.2.0
            </p>
        </div>
        <?php
    }

    /**
     * Add Quick Indexing Row Action to Post List
     */
    public function add_post_indexing_actions( $actions, $post ) {
        if ( 'post' === $post->post_type && 'publish' === $post->post_status ) {
            $live_blog_url = $this->frontend_url . '/blog/' . $post->post_name;
            $inspect_url   = 'https://search.google.com/search-console/inspect?resource_id=' . rawurlencode( $this->frontend_url . '/' ) . '&id=' . rawurlencode( $live_blog_url );

            $actions['rh_view_frontend'] = '<a href="' . esc_url( $live_blog_url ) . '" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 600;">View on Frontend &nearr;</a>';
            $actions['rh_inspect_gsc']   = '<a href="' . esc_url( $inspect_url ) . '" target="_blank" rel="noopener noreferrer" style="color: #059669; font-weight: 600;">Check Indexing on Google &nearr;</a>';
        }
        return $actions;
    }

    /**
     * Add Custom Column in Posts Screen
     */
    public function add_indexing_column( $columns ) {
        $new_columns = array();
        foreach ( $columns as $key => $title ) {
            $new_columns[ $key ] = $title;
            if ( 'title' === $key ) {
                $new_columns['rh_indexing_status'] = 'Google Indexing';
            }
        }
        return $new_columns;
    }

    /**
     * Render Custom Column
     */
    public function render_indexing_column( $column, $post_id ) {
        if ( 'rh_indexing_status' === $column ) {
            $post = get_post( $post_id );
            if ( $post && 'publish' === $post->post_status ) {
                $live_blog_url = $this->frontend_url . '/blog/' . $post->post_name;
                $inspect_url   = 'https://search.google.com/search-console/inspect?resource_id=' . rawurlencode( $this->frontend_url . '/' ) . '&id=' . rawurlencode( $live_blog_url );
                echo '<a href="' . esc_url( $inspect_url ) . '" target="_blank" class="button button-small" style="background: #ecfdf5; border-color: #a7f3d0; color: #065f46; font-weight: 600; text-decoration: none;">🔍 Check Google</a>';
            } else {
                echo '<span style="color: #9ca3af; font-size: 12px;">Draft</span>';
            }
        }
    }
}
