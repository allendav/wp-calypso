/**
 * External dependencies
 */
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import has from 'lodash/has';

/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';

/**
 * Returns true if currently requesting Reader lists, or
 * false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @return {Boolean}        Whether lists are being requested
 */
export function isRequestingList( state ) {
	return !! state.reader.lists.isRequestingList;
}

/**
 * Returns true if currently requesting Reader lists, or
 * false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @return {Boolean}        Whether lists are being requested
 */
export function isRequestingSubscribedLists( state ) {
	return !! state.reader.lists.isRequestingLists;
}

/**
 * Returns the user's subscribed Reader lists.
 *
 * @param  {Object}  state  Global state tree
 * @return {?Object}        Reader lists
 */
export const getSubscribedLists = createSelector(
	( state ) => sortBy(
		filter( state.reader.lists.items, ( item ) => {
			// Is the user subscribed to this list?
			return includes( state.reader.lists.subscribedLists, item.ID );
		} ), 'slug' ),
	( state ) => [ state.reader.lists.items, state.reader.lists.subscribedLists ]
);

/**
 * Returns information about a single Reader list.
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  owner  List owner
 * @param  {String}  slug  List slug
 * @return {?Object}        Reader list
 */
export function getListByOwnerAndSlug( state, owner, slug ) {
	if ( ! has( state, 'reader.lists.items' ) || ! owner || ! slug ) {
		return;
	}

	const preparedOwner = owner.toLowerCase();
	const preparedSlug = slug.toLowerCase();

	return find( state.reader.lists.items, ( list ) => {
		return list.owner === preparedOwner && list.slug === preparedSlug
	} );
}

/**
 * Check if the user is subscribed to the specified list
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  owner  List owner
 * @param  {String}  slug  List slug
 * @return {Boolean} Is the user subscribed?
 */
export function isSubscribedByOwnerAndSlug( state, owner, slug ) {
	const list = getListByOwnerAndSlug( state, owner, slug );
	if ( ! list ) {
		return false;
	}
	return includes( state.reader.lists.subscribedLists, list.ID );
}
