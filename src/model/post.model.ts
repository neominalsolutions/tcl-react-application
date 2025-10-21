// apidan gelencek olan response nesnenin arayüzü
// modeli ekrana veriyi rahat gönderebilmek için oluşturduk
export interface PostModel {
	id: number;
	userId: number;
	title: string;
	body: string;
}
