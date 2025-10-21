import type { RouteObject } from 'react-router';
import SiteLayout from '../layouts/site/layout';
import App from '../App';
// route config dosyası, sadece route tanımı yaparız.
const mainRoutes: RouteObject = {
	path: '/',
	Component: SiteLayout,
	children: [
		{
			index: true,
			Component: App,
		},
		{
			path: '/posts',
			element: <>Makaleler</>,
		},
		{
			path: '/posts-v2',
			element: <>Makaler V2</>, // Outlet girecek olan kısımlar
		},
		{
			path: '/users',
			element: <>Users Page</>, // element diyince return
		},
	],
};

export default mainRoutes;
