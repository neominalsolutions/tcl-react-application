import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import mainRoutes from './routes/main.routes';

// Artık div id root içerisinde APP componenti içindeki return ifadesinin görselini render et.

// Main tsx bütün routeların yülklendiği ve uygulamanın boostrap -> run edildi ana dosya

// Client side routing, tarayıcı tabanlı bir routing yapar
const router = createBrowserRouter([mainRoutes]);

createRoot(document.getElementById('root')!).render(
	<>
		<RouterProvider router={router} />
	</>
);

// <RouterProvider router={router} /> -> uygulama kodlarını route config dosyaları üzerinden çalışıtır.
