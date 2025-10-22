import type React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import {
	SessionContext,
	type SessionContextType,
} from '../contexts/session.context';

export function AuthGuard({ children }: { children: React.ReactNode }) {
	// bu 2 yöntemde sadece client da kontrol yapmış oluyor.
	const session = useContext(SessionContext) as SessionContextType;
	const token = localStorage.getItem('token');
	// sadece burada token üzerinden kontrol yapmak doğru değil!. Sunucudan da oturumu açık olan kullanıcının oturum kontrolu yapıılır

	console.log('auth-guard...');

	if (token && session.state.isAuthenticated) {
		return <>{children}</>;
	} else {
		return <Navigate to="/unauthorize" />;
	}
}
