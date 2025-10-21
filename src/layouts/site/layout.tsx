// servis katmanında herbir servis functiona özel export yazarız. import {serviceA,serviceB} = from './services';
// import SiteLayout from './layout.tsx'

import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, type MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Outlet, useNavigate } from 'react-router';

const layoutStyle = {
	padding: 5,
	overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	height: 64,
	paddingInline: 48,
	lineHeight: '64px',
	width: '100',
	borderColor: '0958d9',
	backgroundColor: 'rgb(13 42 91)',
};

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	minHeight: 120,
	lineHeight: '120px',
	color: 'black',
	borderColor: '#0958d9',
	border: '1px solid 0958d9',
};

const siderStyle: React.CSSProperties = {
	textAlign: 'center',
	lineHeight: '120px',
	borderColor: '0958d9',
	minHeight: '97vh',
	maxWidth: '20%',
	backgroundColor: '#8497e9',
};

const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: 'rgb(13 42 91)',
	border: '1px solid 0958d9',
};

export const SiteLayout: React.FC = () => {
	// button click sonrası sayfa redirect işlemlerinden sorumlu özel function, hook.
	// func componentlerde component içerisi bir çok durum yönetim hook değimiz, özel functionlar ile yazılıyor.
	// hooklar componente fonkisyonellik kazandıran kod parçacıkları.
	// yönlendirme yapma hook
	const navigate = useNavigate();

	type MenuItem = Required<MenuProps>['items'][number];

	// tekli olunca key kendini değer olarak key değeri olarak döndürür ama children yani altmenu varsa alt menu key döndürür.
	// useNavigate hook -> menü ve button component ile çok sık kullanılır.
	// kayıttan sonra yönlendir senaryoları için useNavigate çok ideal.
	const items: MenuItem[] = [
		{
			key: '1',
			icon: <PlusCircleOutlined />,
			label: 'Makaleler',
			children: [
				{ key: '/posts', label: 'Makale Listesi' },
				{ key: '/posts-v2', label: 'Makale Listesi-V2' },
			],
			onClick: ({ key }) => {
				// linke yönlen
				console.log('key', key);
				navigate(key);
			},
		},
		{
			key: '/users',
			icon: <UserOutlined />,
			label: 'Kullanıcılar',
			onClick: ({ key }) => {
				// like yönlen
				console.log('key', key);
				navigate(key);
			},
		},
	];

	return (
		<>
			<Layout style={layoutStyle}>
				<Sider width="20%" style={siderStyle}>
					<Menu
						mode="vertical"
						style={{ padding: 10, margin: 20 }}
						inlineCollapsed={false}
						items={items}
					/>
				</Sider>
				<Layout>
					<Header style={headerStyle}>Header</Header>
					<Content style={contentStyle}>
						<Outlet />
						{/* Page Componentler bu kısma girip çıkıcak route ile açılacak componentleri işaretlediğimiz yer. */}
					</Content>
					<Footer style={footerStyle}>Footer</Footer>
				</Layout>
			</Layout>
		</>
	);
};

//eğer bir doysadan sadece tek bir component dışırı çıkarmak yeterli ise export default formatını kullanırız.
export default SiteLayout;
