/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

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

	const signIn = (jwt: string) => {
		console.log('signIn');
		console.log('jwt', jwt);
		setSessionState({ isAuthenticated: true, sub: 'ali', roles: ['admin'] });
	};

	const signOut = () => {
		console.log('signOut');
		setSessionState({
			isAuthenticated: false,
			sub: '',
			roles: [],
		});
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
