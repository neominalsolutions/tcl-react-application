import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// oturum yönetim state
export type SessionState = {
	sub: string; // token daki oturum açan kullanıcı ismi
	isAuthenticated: boolean;
	roles: string[]; // kullanıcı hesabına atanmış olan roller
};

const initialState: SessionState = {
	sub: '',
	isAuthenticated: false,
	roles: [],
};

const sessionSlice = createSlice({
	name: 'UserSession', // STate ismi -> Redux Devtooltan stateleri ayırmak için
	initialState: initialState,
	reducers: {
		// burası biraz değişik reducer içerisindeki functionlar -> action üzerinden gönderilen veri payload -> componentten veri gönderilen kısım
		// state ise şuan güncelleyeceğimiz sessionState
		signIn: (state: SessionState, action: PayloadAction<{ jwt: string }>) => {
			console.log('signIn');
			console.log('jwt', action.payload.jwt);
			localStorage.setItem('token', action.payload.jwt);
			const payload = jwtDecode(action.payload.jwt);
			console.log('payload', payload);

			if (payload) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const payloadData = payload as any;
				const role = payloadData['admin'] == true ? 'admin' : 'user';
				state.isAuthenticated = true;
				state.roles = [role];
				state.sub = payloadData['name'];
			}
		},
		signOut: (state: SessionState) => {
			state.isAuthenticated = false;
			state.roles = [];
			state.sub = '';
		},
	},
});

// dispatch(signIn({jwt})) useDispatch // const {sign} = useContext
// useSelector(s -> state); // useContext();

export const { signIn, signOut } = sessionSlice.actions; // componentlerden action dispatch etmek için lazım
export const SessionReducer = sessionSlice.reducer; // store için reducer lazım, state dışarı çıkarıp store tanımlayacağız.
