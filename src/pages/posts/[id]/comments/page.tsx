import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';
import type { CommentModel } from '../../../../model/comment.model';
import { Avatar, Col, List, Row, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { getCommentsByPostId } from '../../../../services/post.client';

function PostComments() {
	// :id -> dinamik değer ile eşleşeni döndürür.
	const params = useParams(); // routedan gönderilen dinamik
	//  değerleri verir.
	console.log('params', params);
	const location = useLocation(); // tüm route path
	console.log('location', location);
	const [searchParams] = useSearchParams(); // querystring ?name=ali
	console.log('searchParams', searchParams.get('limit'));

	const [commmentsState, setCommentsState] = React.useState<CommentModel[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true); // sayfa açılışında yada yüklenişinde fazla bir geçikme olursa biz loading ile yükleme anında pending state anında loading indicator componentleri ekranda göterip, kullanıcya bir veri yüklenme hissi veriyoruz.
	// sayfanın ilk açılında veri çekilirken loading ekranda görünüyor. Veri yüklenip 2.render hatırlı yapılrken loading false oluyor ve gerçek veri ekran render ediliyor.

	// component mounting edilirken
	React.useEffect(() => {
		// biz simüle ettik.
		setTimeout(() => {
			getCommentsByPostId(Number(params.id))
				.then((data) => {
					setCommentsState(data);
					console.log('data', data);
				})
				.finally(() => {
					setLoading(false);
				});
		}, 1000);
	}, []);

	// koşullu render alma

	if (loading)
		return (
			<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
		);

	// bir dizi içerisindeki değerleri ekrana basarken manuel olarak for ile dönüp ekranı nasıl render ederiz.

	// {commmentsState.map((item) => (<></>)} -> eğer kendi görüntümüzü oluşturmak istersek bu durumda sadece map ile itemları tek tek ekrana render edebiliriz

	// Row Satır Col Sutun -> Antd 24 lük satır sütün düzeni var. Bir satır 24 adet parçaya bölünebilir.

	return (
		<Row style={{ padding: 50 }}>
			<Col span={16}>
				<Header>
					<Typography style={{ color: 'white' }} itemType="h1">
						Post Comments
					</Typography>
				</Header>
				<List
					itemLayout="horizontal"
					dataSource={commmentsState}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar
										src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
									/>
								}
								title={<a href="https://ant.design">{item.name}</a>}
								description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
						</List.Item>
					)}
				/>
			</Col>
			<Col span={8}>8 Birim</Col>
		</Row>
	);
}

export default PostComments;
