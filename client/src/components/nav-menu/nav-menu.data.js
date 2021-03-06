import { routes } from '../../redux/routing/routing.constants';

const { SEARCH, FAVORITES, WORD_OF_THE_DAY, LEARN } = routes;

export default [
	{
		title: 'Dictionary',
		to: SEARCH,
		icon: 'search',
	},
	{
		title: 'Favorites',
		to: FAVORITES,
		icon: 'like-2',
	},
	{
		title: 'Learn',
		to: LEARN,
		icon: 'windows',
	},
	{
		title: 'Word Of The Day',
		to: WORD_OF_THE_DAY,
		icon: 'calendar-7',
	},
];