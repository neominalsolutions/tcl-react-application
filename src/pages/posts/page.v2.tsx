// bu sayfadaki veriler ise redux üzerinden çekilerek sayfaya state olarak nasıl aktarılacak ?

import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table, type TableColumnsType } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../contexts/slices/posts.slice';
import { type AppDispatch, type RootState } from '../../contexts/store';
import type { PostModel } from '../../model/post.model';

function PostV2Page() {
	// artık React.UseEffect ile veri çekmek yerine Redux ile veri çektik.
	const postState = useSelector((root: RootState) => root.postState);
	const dispatch = useDispatch<AppDispatch>();

	React.useEffect(() => {
		// clientState de varsa çekme

		// her 5 dakika bir veriyi güncelle algoritması
		if (new Date().getMinutes() - postState.fetchTime.getMinutes() > 5) {
			dispatch(fetchPosts());
		} else {
			if (!postState.isFetched) dispatch(fetchPosts());
		}
	}, []);

	const columns: TableColumnsType<PostModel> = [
		{
			title: 'ID',
			dataIndex: 'id', // data property
			width: '30%',
		},
		{
			title: 'Title',
			dataIndex: 'title',
		},
		{
			title: 'Body',
			dataIndex: 'body',
		},
	];

	if (postState.loading)
		return (
			<>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
			</>
		);

	if (postState.error) return <>Sayfada bir hata meydana geldi!</>;

	return (
		<>
			<div style={{ padding: 50 }}>
				{/* <p>Search Input {searchedColumn}</p>
				<p>Filtreleme Sayısı: {filterCountRef.current}</p> */}
				<Table<PostModel>
					pagination={{
						showSizeChanger: true,
						pageSizeOptions: [5, 10, 15, 20, 50],
						defaultPageSize: 5,
						locale: { items_per_page: 'adet/sayfa' },
						showTotal(total, range) {
							console.log('range', range);
							return `${range[1]} / ${total} kayıt`; // 100 kayıtta ilk 5 kayıt gösteriyorum.
						},
					}}
					columns={columns}
					dataSource={postState.data}
				/>
			</div>
		</>
	);
}

export default PostV2Page;
