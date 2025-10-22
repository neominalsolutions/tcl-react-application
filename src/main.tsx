import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import mainRoutes from './routes/main.routes';
import type React from 'react';
import { SessionProvider } from './contexts/session.context';
import { store } from './contexts/store';
import { Provider } from 'react-redux';
// Artık div id root içerisinde APP componenti içindeki return ifadesinin görselini render et.

// Main tsx bütün routeların yülklendiği ve uygulamanın boostrap -> run edildi ana dosya

// Client side routing, tarayıcı tabanlı bir routing yapar
const router = createBrowserRouter([mainRoutes]);

createRoot(document.getElementById('root')!).render(
	<>
		<Provider store={store}>
			<SessionProvider>
				<RouterProvider router={router} />
			</SessionProvider>
		</Provider>
	</>
);

// Not: React children kavramı
// react da özel bir isim
type DemoWrapperProps = { children: React.ReactNode }; // jsx formatında herhangi bir element olabilir.

export const DemoWrapper = (props: DemoWrapperProps) => {
	return <>{props.children}</>;
};

export const DemoChild = () => {
	return <>DemoChild</>;
};

export const DemoApp = () => {
	return (
		<DemoWrapper>
			<DemoChild />
			<p>Deneme1</p>
		</DemoWrapper>
	);
};

// <RouterProvider router={router} /> -> uygulama kodlarını route config dosyaları üzerinden çalışıtır.
