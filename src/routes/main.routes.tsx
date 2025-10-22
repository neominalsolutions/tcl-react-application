import type { RouteObject } from 'react-router';
import SiteLayout from '../layouts/site/layout';
import App from '../App';
import PostPage from '../pages/posts/page';
import PostComments from '../pages/posts/[id]/comments/page';
import { AuthGuard } from '../guards/auth.guard';
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
			path: '/posts', // oturum açmayan sayfaya erişimez kontrolü yapmış olduk.
			element: (
				<AuthGuard>
					<PostPage />
				</AuthGuard>
			),
		},
		{
			path: '/posts-v2',
			element: <>Makaler V2</>, // Outlet girecek olan kısımlar
		},
		{
			path: '/users',
			element: <>Users Page</>, // element diyince return
		},
		{
			path: '/posts/:id/comments',
			Component: PostComments,
		},
		{
			path: '/unauthorize',
			element: <>Bu Sayfaya giriş yetkiniz kısıtlı !</>,
		},
	],
};

export default mainRoutes;
