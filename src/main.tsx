import { createRoot } from 'react-dom/client';

// Not: Short Cut -> Sol menu kapatmak için: Ctrl + B
// Not: ALT + Shift + F -> Kod düzeni
// Not: Açıklama satırı CTRL + K + C
// Not: Açıklama satırını geri almak için CTRL + K + U
// Not: İmport değişkenlerini kısa yolu CTRL + .
// Not: Terminalden çıkma CTRL + C
// Not: CTRL + J -> Terminal açma
// Not: Alt + Shift + O ile unused importsları otomatik kaldırırız.
// Not:
// Kendi APP bileşeninizi buraya ekleyelim
// export başka bir ts dosyasından ilgili kodları import yani çağırmak için kullanıyoruz.
// export = public
// import ise local klasör altındaki ts dosyaların çağırılması veya npm üzerinden yüklenen dosyaların çağırılması ve kullanılması için kullanılır.
// Terminal içerisindeki kodlar -> npm run dev -> Development serve -> npm run build -> prod ortam js derlenmiş hali

import React from 'react';
import SiteLayout from './layouts/site/layout';

// Production build dist klasörüne atılır.
export const App: React.FC = () => {
	// value = {value} -> model binding
	const [value, setValue] = React.useState<string>('Hello, World React!'); // ekrana render aşmasında basılacak olan ilk değer.

	console.log('app rendering...');

	React.useEffect(() => {
		console.log('app mounting');
	}, []); // component mount olduğunda sadece 1 kez tetiklenir. Component unmount olana kadar bir daha tetiklenmez.[] herhangi bir state takibi yok.

	// const user: User = { email: 'test@test.com' };
	// console.log('user', user);

	// butonu tıklayınca çalışacak fonksiyon -> event binding
	const handleClick = () => {
		setValue((Math.random() * 100).toString());
	};

	// yani props değerim güncellenmezse yeni re-render etmeyebilirim.
	{
		/* TBotton Child Component, App ise Parent Component */
	}
	return (
		<div>
			{/* <h1>{value}</h1>
			<button onClick={handleClick}>Click Me</button>
			<hr></hr>
			<TButton text="Button1" onButtonClick={handleClick} />
		
			<TButton
				styles={{ color: 'red', padding: '5px', backgroundColor: 'blue' }}
				text="Button2"
				onButtonClick={handleClick}
			/> */}

			<SiteLayout />
		</div>
	);
};

// UI Custom Button Component
// + APP
// + TButton -> Tree

// type ise component özgü tanımlanan bir model
type TButtonProps = {
	text: string; // required -> string,boolean,number -> primative type -> value change
	onButtonClick?: () => void; // ? olmadığında bu değer required
	styles?: React.CSSProperties; // stil işlemleri için -> stil gönderme ? opsiyonel
};
// Props -> Componente dışarıdan gönderilen özellikler. Component  bu özellikler ile belirli davranışlar gösterir..
export function TButton(props: TButtonProps) {
	// TButton component name ->  props -> Component properties

	console.log('child rendering...');

	React.useEffect(() => {
		console.log('child mouting');
		return () => {
			// clean up function -> component domdan çıkarken tetiklenir.
			console.log('child unmounting');
		};
	}, []); // [] tek sefer tetiklenmeyi sağlar.

	return (
		<>
			<button onClick={props.onButtonClick} style={props.styles}>
				{props.text}
			</button>
		</>
	);
}

//<> Fragment ile return edilecek elementler wraplenir. (sarmallanır.)
// Parent APP -> Child Component TButton
// Parent Component Child Component Nasıl Render eder ? Component Props Nedir ?

// 2. kısım ReactJS Phases -> Component Lifecyles.
createRoot(document.getElementById('root')!).render(
	<>
		<App />
	</>
); // Artık div id root içerisinde APP componenti içindeki return ifadesinin görselini render et.
