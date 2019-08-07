import { routes } from '../../redux/routing/routing.constants';
const { SEARCH, LEARN, WORD_OF_THE_DAY } = routes;
export default [
	{
		route: SEARCH,
		title: 'Dictionary',
		description: 'Use the dictionary to search for specific words, and keep track of favorites.',
		icon: 'search'
	},
	{
		route: LEARN,
		title: 'Learn',
		description: 'Play vocabulary building games, and keep track of your progress.',
		icon: 'windows'
	},
	{
		route: WORD_OF_THE_DAY,
		title: 'Word of The Day',
		description: 'Learn new words at random by checking our word of the day.',
		icon: 'calendar-7'
	},
]