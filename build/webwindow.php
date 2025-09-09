<?php
/**
 * Plugin Name:       WebWindow Block
 * Description:       Bring any website into your page with style! Create seamless, app-like experiences that fit perfectly. No more clunky iframes—just smooth, responsive web embedding that actually works.
 * Version:           0.1.0
 * Author:            w0 block authoring tool
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       webwindow-block-wp
 *
 * @package Webwindow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function w0_webwindow_block_init() {
	register_block_type( __DIR__ . '/build/' );
}
add_action( 'init', 'w0_webwindow_block_init' );