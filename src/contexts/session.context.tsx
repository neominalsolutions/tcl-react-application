/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';

// oturum yönetim state
export type SessionState = {
	sub: string; // token daki oturum açan kullanıcı ismi
	isAuthenticated: boolean;
	roles: string[]; // kullanıcı hesabına atanmış olan roller
};

// 2. aşama session State yönetecek bir context'e ihtiyacımız var
export type SessionContextType = {
	state: SessionState; // oturum bilgileri
	signIn: (jwt: string) => void; // oturum açma
	signOut: () => void; // oturum sonlandırma
};

// Session Context Component içerisinde güncel session bilgilerine erişim ve signIn signOut işlemlerini yönetebilmek için kullanılacak.
export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [sessionState, setSessionState] = useState<SessionState>({
		isAuthenticated: false,
		sub: '',
		roles: [],
	});

	React.useEffect(() => {
		console.log('session reload');
		// sayfa reload olursa benim oturumumu token üzerinden yenideb getir.

		const token = localStorage.getItem('token');

		if (token) {
			const payload = jwtDecode(token);
			if (payload) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const payloadData = payload as any;
				const role = payloadData['admin'] == true ? 'admin' : 'user';

				setSessionState({
					isAuthenticated: true,
					sub: payloadData.name,
					roles: [role],
				});
			}
		}
	}, []);

	const signIn = (jwt: string) => {
		console.log('signIn');
		console.log('jwt', jwt);
		localStorage.setItem('token', jwt);
		const payload = jwtDecode(jwt);
		console.log('payload', payload);

		if (payload) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const payloadData = payload as any;
			const role = payloadData['admin'] == true ? 'admin' : 'user';

			setSessionState({
				isAuthenticated: true,
				sub: payloadData.name,
				roles: [role],
			});
		}
	};

	const signOut = () => {
		console.log('signOut');
		setSessionState({
			isAuthenticated: false,
			sub: '',
			roles: [],
		});
		localStorage.removeItem('token');
	};

	// dışarıdan bu değerlere erişim sağlamamız lazım.
	const exposes = {
		state: sessionState,
		signIn,
		signOut,
	};

	return (
		<SessionContext.Provider value={exposes}>
			{children}
		</SessionContext.Provider>
	);
};
