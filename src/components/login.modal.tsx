import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { signIn } from '../contexts/slices/session.slice';
import type { AppDispatch } from '../contexts/store';

type LoginModalProps = {
	open: boolean;
	dissmiss: () => void; // modal close olacağında çalıştırığımız props.
};

function LoginModal(props: LoginModalProps) {
	// and gelen bir form hook. formlar ile çalışmamızı sağlar
	// form instance değişkeni.
	const [loginForm] = Form.useForm();
	// const { signIn } = useContext(SessionContext) as SessionContextType;
	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			<Modal
				onCancel={props.dissmiss}
				width={320}
				title="Login Dialog"
				open={props.open}
				footer={<></>}
			>
				<Form
					labelCol={{ span: 8 }}
					initialValues={{ username: 'ali', password: '1234' }}
					form={loginForm}
					onFinish={(values) => {
						// Formun submit olduğunu yakaladığımız event, values form bilgilerini submit sonrası aldık.
						// api post işlemi yapılacak.
						console.log('formData', values);

						const jwt =
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
						// apidan çekilen jwt -> login sonrası

						// session state başlat
						// signIn(jwt);
						dispatch(signIn({ jwt }));
						props.dissmiss();
					}}
				>
					<Form.Item name="username" labelAlign="left" label="User Name">
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button color="blue" htmlType="submit">
							Login
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default LoginModal;
