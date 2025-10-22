/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { PostModel } from '../../model/post.model';
import { getPosts } from '../../services/post.client';

export type PostState = {
	data: PostModel[];
	loading: boolean;
	error: any;
	isFetched: boolean;
	fetchTime: Date;
};

// API ile haberleştiğimiz servisler promise tabanlı servisler -> resolved -> verinin çekildiği an -> fullfilled, rejected -> error state -> pending -> state loading
// createAsyncThunk API dan veri çekme işlemleri için Thunk middleware kullanıyoruz.
export const fetchPosts = createAsyncThunk('PostClient', async () => {
	return await getPosts(); // action.payload olarak datanın içini doldurucaz.
});

// api ile çalışırken createAsyncThunk üzerindeki rejected, pending ve fullfilled state takip ederek, client nesnesini güncelliyoruz. Not: api reponse ve api error da action.payload olarak thunk üzerinden geliyor.

const init: PostState = {
	data: [],
	loading: true,
	error: null,
	isFetched: false,
	fetchTime: new Date(),
};

const postSlice = createSlice({
	name: 'POST',
	initialState: init,
	reducers: {
		// senkron çalışır
		// elimizdeki client state veri üzerinde bir işlkem yapılacak ise o kodlar burada tanıumlanır.
	},
	extraReducers(builder) {
		// asenkron api temmeli çalışır
		// server stateden veriyi client state çekiceksek o zaman extraReducer üzerinde işlem yaparız.
		builder.addCase(fetchPosts.pending, (state: PostState) => {
			state.loading = true;
			state.error = null;
			state.data = [];
		});
		builder.addCase(
			fetchPosts.fulfilled,
			(state: PostState, action: PayloadAction<PostModel[]>) => {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
				state.isFetched = true;
				state.fetchTime = new Date();
			}
		);
		builder.addCase(
			fetchPosts.rejected,
			(state: PostState, action: PayloadAction<any>) => {
				state.loading = false;
				state.data = [];
				state.error = action.payload;
			}
		);
	},
});

export const PostReducer = postSlice.reducer;
