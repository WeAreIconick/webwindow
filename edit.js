/*
 * Retrieves the translation of text.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Notice, Button, Panel } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

const IDEAL_SITE_WIDTH = 1440;
const IDEAL_SITE_HEIGHT = 900;

export default function Edit( { attributes, setAttributes } ) {
	const { src, scaleToFit } = attributes;
	const [ error, setError ] = useState(false);
	const iframeRef = useRef();
	const wrapperRef = useRef();
	const [ scale, setScale ] = useState(1);
	const [ scaledHeight, setScaledHeight ] = useState(IDEAL_SITE_HEIGHT);

	// Dynamically calculate scaled height based on parent width, maintain aspect ratio
	useEffect( () => {
		if ( !scaleToFit ) {
			setScale(1);
			setScaledHeight(IDEAL_SITE_HEIGHT);
			return;
		}
		function calculateScale() {
			if ( !wrapperRef.current ) return;
			const parentWidth = wrapperRef.current.offsetWidth || 600;
			const s = Math.min( 1, parentWidth / IDEAL_SITE_WIDTH );
			setScale(s);
			setScaledHeight(Math.round(IDEAL_SITE_HEIGHT * s));
		}
		calculateScale();
		window.addEventListener('resize', calculateScale);
		return () => window.removeEventListener('resize', calculateScale);
	}, [ scaleToFit ] );

	const handleIframeError = () => {
		setError(true);
	};

	let iframeStyles;
	if ( scaleToFit ) {
		iframeStyles = {
			width: IDEAL_SITE_WIDTH + 'px',
			height: IDEAL_SITE_HEIGHT + 'px',
			border: error ? '2px solid #f00' : '1px solid #ddd',
			background: '#fff',
			transform: `scale(${scale})`,
			transformOrigin: 'top left',
			display: 'block',
			overflow: 'hidden',
		};
	} else {
		iframeStyles = {
			width: '100%',
			minHeight: 400,
			border: error ? '2px solid #f00' : '1px solid #ddd',
			background: '#fff',
			display: 'block',
			overflow: 'auto',
		};
	}

	let frameContainerStyles = {};
	if ( scaleToFit ) {
		frameContainerStyles = {
			width: '100%',
			height: scaledHeight + 'px',
			maxWidth: '100%',
			overflow: 'hidden',
			position: 'relative',
			background: '#fff',
		};
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'WebWindow Settings', 'webwindow-block-wp' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Webpage URL', 'webwindow-block-wp' ) }
						value={ src }
						onChange={ ( value ) => setAttributes( { src: value } ) }
						placeholder="https://demo.iconick.io/twombly/"
					/>
					<ToggleControl
						label={ __( 'Scale to Fit (show full site even when small)', 'webwindow-block-wp' ) }
						checked={ scaleToFit }
						onChange={ ( value ) => setAttributes( { scaleToFit: value } ) }
						help={ __( 'Zooms out the embedded page so more of the full site is visible. May reduce readability & interactivity!', 'webwindow-block-wp' ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Powered by Telex', 'webwindow-block-wp' ) } initialOpen={ false }>
					<p style={{ marginBottom: '10px' }}>
						Telex is basically the J.A.R.V.I.S of WordPress development - an AI that builds blocks so you don't have to.
					</p>
					<a
						href="https://telex.automattic.ai"
						target="_blank"
						rel="noopener noreferrer"
						style={ {
							display: 'inline-block',
							marginTop: '4px',
							marginBottom: '4px',
							color: '#2c77f5',
							fontWeight: 500,
							textDecoration: 'underline',
						} }
					>
						Learn more about Telex
					</a>
				</PanelBody>
			</InspectorControls>

			<div
				className={ `webwindow-block-embed browser-frame` }
				ref={wrapperRef}
			>
				<div className="browser-frame-bar">
					<span className="browser-frame-dot red"></span>
					<span className="browser-frame-dot yellow"></span>
					<span className="browser-frame-dot green"></span>
					<span className="browser-frame-url">
						{ src ? src : '' }
					</span>
					{ src && (
						<Button
							className="browser-frame-open-button"
							icon="external"
							label={ __( 'Open full site in new tab', 'webwindow-block-wp' ) }
							variant="tertiary"
							onClick={ () => window.open( src, '_blank', 'noopener noreferrer' ) }
							style={{ marginLeft: 'auto', marginRight: 0, lineHeight: '1.2', padding: '2px 9px', fontSize: '14px' }}
						/>
					) }
				</div>
				<div className="webwindow-iframe-outer" style={ frameContainerStyles }>
					{ src && (
						<iframe
							ref={iframeRef}
							title={ __( 'Embedded Web Page', 'webwindow-block-wp' ) }
							src={ src }
							onError={ handleIframeError }
							style={ iframeStyles }
							sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
						/>
					) }
				</div>
				{ ( src && error ) && (
					<Notice status="warning" isDismissible={ false }>
						{ __( 'Could not display this page (site does not allow embedding, or it is unavailable).', 'webwindow-block-wp' ) }
					</Notice>
				) }
				{ !src && (
					<div className="webwindow-block-empty" style={ { padding: '20px 0', textAlign: 'center', color: '#6a6e74', background: '#fbfcfd' } } />
				) }
			</div>
		</div>
	);
}