/**
 * React hook that is used to mark the block wrapper element.
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the final markup, attributes are hydrated by the view.js for interactivity.
 */
export default function save( { attributes } ) {
	const { src, scaleToFit } = attributes;
	return (
		<div
			{ ...useBlockProps.save() }
			data-src={ src }
			data-scale-to-fit={ scaleToFit ? '1' : '0' }
		>
			<div className={ `webwindow-block-embed browser-frame` }>
				<div className="browser-frame-bar">
					<span className="browser-frame-dot red"></span>
					<span className="browser-frame-dot yellow"></span>
					<span className="browser-frame-dot green"></span>
					<span className="browser-frame-url">
						{ src ? src : '' }
					</span>
					{ src && (
						// eslint-disable-next-line jsx-a11y/anchor-has-content
						<a
							href={ src }
							className="browser-frame-open-button"
							target="_blank"
							rel="noopener noreferrer"
							title="Open full site in new tab"
						>
							&#8599;
						</a>
					) }
				</div>
				{/* The JS-based enhancement and scaling will be handled on frontend by view.js */}
				<noscript>
					{ src ? (
						<iframe
							title="Embedded Web Page (noscript fallback)"
							src={ src }
							style={ { width: '100%', minHeight: 400, border: '1px solid #ccc' } }
							sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
						/>
					) : null }
				</noscript>
				<div className="webwindow-iframe-outer"></div>
				{ !src && (
					<div className="webwindow-block-empty" style={ { padding: '20px 0', textAlign: 'center', color: '#6a6e74', background: '#fbfcfd' } } />
				) }
			</div>
		</div>
	);
}