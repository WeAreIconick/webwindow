
=== WebWindow Block ===
Contributors:      w0 block authoring tool
Tags:              block, embed, webview, browser
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Bring any website into your page with style! Create seamless, app-like experiences that fit perfectly. No more clunky iframes—just smooth, responsive web embedding that actually works.

== Description ==

The WebWindow block allows editors to embed external web pages directly into posts and pages in a stylish, app-like browser frame.

Features:
* Embed an external webpage by URL
* Scale-to-fit option for previewing the full site in small areas
* Offers more control and adaptability than iframes (within web security limitations)
* Simple block inspector for settings

Note: Due to browser security policies, this block cannot bypass cross-origin restrictions. It will only work with websites that allow their content to be embedded (CORS and X-Frame-Options permitting).

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/webwindow` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Frequently Asked Questions ==

= Why not use an iframe? =

This block adds improved visual integration and control for embedding web pages as content, letting you scale them to fit and style your embed with a modern browser look.

= Will this work with any website? =

No, only websites that allow their content to be embedded. Some sites block embedding for security or business reasons.

== Screenshots ==

1. Example of an embedded website.
2. Block controls for changing the URL and scaling.

== Changelog ==

= 0.1.0 =
* Initial release of the WebWindow block.

== Arbitrary section ==

For advanced use-cases, developers may extend this block or add server-side rendering as needed.
