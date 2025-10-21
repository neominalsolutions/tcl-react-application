import React from 'react';
import { getPosts } from '../../services/post.client';
import type { PostModel } from '../../model/post.model';

function PostPage() {
	// PostModel tipinde bir çekicez. bu durumda bizim api model anlamlı oluyor.
	const [postState, setPostState] = React.useState<PostModel[]>([]);

	// ilk render-> postState.length 0
	// compnentin ilk mount olduğu ve unmonut olana kadar sadece 1 kez doma yüklendği hook.

	React.useEffect(() => {
		// mounting phase ->
		getPosts()
			.then((data) => {
				// resolve
				// set güncellenince -> virtual dom diff -> render
				// re-render da ise ilk render-> postState.length 100
				setPostState(data);
			})
			.catch((err) => {
				// reject
				console.log('err', err);
			});
	}, []); // tek bir mounting işleminde sadece 1 kez tetiklenir.

	return (
		<>
			<div>Toplam Makale Sayısı: {postState.length}</div>
		</>
	);
}

export default PostPage;
