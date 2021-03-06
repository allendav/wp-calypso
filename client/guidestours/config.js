/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import i18n from 'lib/mixins/i18n';

const config = {
	init: {
		text: i18n.translate( '{{strong}}Need a hand?{{/strong}} We\'d love to show you around the place, and give you some ideas for what to do next.', {
			components: {
				strong: <strong />,
			}
		} ),
		type: 'GuidesFirstStep',
		next: 'my-sites',
	},
	'my-sites': {
		target: 'my-sites',
		type: 'GuidesActionStep',
		icon: 'my-sites',
		placement: 'below',
		text: i18n.translate( "First things first. Up here, you'll find tools for managing your site's content and design." ),
		next: 'posts-pages',
	},
	'posts-pages': {
		text: i18n.translate( "Posts aren't Pages. Would you like to know more?" ),
		type: 'GuidesLinkStep',
		linkLabel: i18n.translate( 'Learn more about Posts and Pages' ),
		linkUrl: 'https://en.support.wordpress.com/post-vs-page/',
		next: 'reader',
	},
	reader: {
		target: 'reader',
		type: 'GuidesActionStep',
		icon: 'reader',
		placement: 'beside',
		text: i18n.translate( "This is the Reader. It shows you fresh posts from other sites you're following." ),
		next: 'finish'
	},
	finish: {
		target: 'me',
		placement: 'beside',
		text: i18n.translate( "{{strong}}That's it!{{/strong}} Now that you know a few of the basics, feel free to wander around. You can get more help by going to the {{gridicon/}} {{strong}}Me{{/strong}} section.", {
			components: {
				strong: <strong />,
				gridicon: <Gridicon icon="user-circle" size={ 18 } />,
			}
		} ),
		type: 'GuidesFinishStep',
		linkLabel: 'Get the Most from WordPress.com',
		linkUrl: 'https://learn.wordpress.com',
	}
}

export default config;
