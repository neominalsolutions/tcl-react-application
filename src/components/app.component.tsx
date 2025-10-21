import React from 'react';
import { TButton } from './tbutton.component';

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
			<h1>{value}</h1>
			<button onClick={handleClick}>Click Me</button>
			<hr></hr>
			<TButton text="Button1" onButtonClick={handleClick} />

			<TButton
				styles={{ color: 'red', padding: '5px', backgroundColor: 'blue' }}
				text="Button2"
				onButtonClick={handleClick}
			/>
		</div>
	);
};
