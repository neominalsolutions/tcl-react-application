import React from 'react';

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
