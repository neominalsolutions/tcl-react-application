import React from 'react';
import { getPosts } from '../../services/post.client';
import type { PostModel } from '../../model/post.model';
import {
	Button,
	Input,
	Space,
	Table,
	type InputRef,
	type TableColumnsType,
	type TableColumnType,
} from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router';

// Not: npm i sadece yetmiyor
// Not: npm i @types/react-highlight-words indirmemiz gerekiyor.

type DataIndex = keyof PostModel;

function PostPage() {
	// PostModel tipinde bir çekicez. bu durumda bizim api model anlamlı oluyor.
	const [postState, setPostState] = React.useState<PostModel[]>([]);

	const [searchText, setSearchText] = React.useState('');
	const [searchedColumn, setSearchedColumn] = React.useState('');
	// html elementinin referansını almak için kullandığımız bir hook.
	// state değişse bile useRef bir sonraki renderda değerini korur.
	const searchInput = React.useRef<InputRef>(null);

	// state değişse bile arkaplanda değerleri korumak veya bir değerin önceki sonraki durumunu elimizde tutmak için useRefden yaralanıyoruz.
	// Html elementlerin input,button -> trigger focus, click., getValue
	// const filterCountRef = React.useRef<number>(0);

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

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): TableColumnType<PostModel> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record) => {
			//console.log('record', record);
			//console.log('value', value);
			//console.log('dataIndex', dataIndex);
			// herbir arama işleminde
			// filterCountRef.current = filterCountRef.current + 1;
			// console.log('filterCountRef', filterCountRef.current);

			return record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase());
		},
		filterDropdownProps: {
			onOpenChange(open) {
				console.log('open-Chanage');
				if (open) {
					setTimeout(() => searchInput.current?.focus(), 100);
				}
			},
		},
		render: (text) =>
			searchedColumn === dataIndex ? ( // title search column -> dataIndex title
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	// id,userId,title,
	const columns: TableColumnsType<PostModel> = [
		{
			title: 'ID',
			dataIndex: 'id', // data property
			width: '30%',
			...getColumnSearchProps('id'),
		},
		{
			title: 'Title',
			dataIndex: 'title',
			...getColumnSearchProps('title'),
			sorter: (a, b) => a.title.length - b.title.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Body',
			dataIndex: 'body',
			...getColumnSearchProps('body'),
			sorter: (a, b) => a.body.length - b.body.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Comments',
			key: 'action',
			render(value, record, index) {
				return (
					<>
						<Link key={index} to={`/posts/${record.id}/comments`}>
							Makale Yorumları
						</Link>
					</>
				);
			},
		},
	];

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
					dataSource={postState}
				/>
			</div>
		</>
	);
}

export default PostPage;
