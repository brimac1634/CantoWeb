import { routes } from '../../Routing/constants';

const { SEARCH, FAVORITES, WORD_OF_THE_DAY, LEARN } = routes;

export default [
	{
		title: 'Search',
		to: SEARCH,
		icon: 'search',
	},
	{
		title: 'Favorites',
		to: FAVORITES,
		icon: 'like-2',
	},
	{
		title: 'Word Of The Day',
		to: WORD_OF_THE_DAY,
		icon: 'calendar-7',
	},
	{
		title: 'Learn',
		to: LEARN,
		icon: 'windows',
	},
];