// XMLHttpRequest -> gelişmiş hali.

export const getPosts = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts',{method:'GET'});
	const data = response.json(); // fedtch datayı json formatına direkt olarak çeviremez ellimizle yazmız lazım.
	return data;
};

// apidaki sunucunun işlem yapma hızına bağlı olarak ne kadar sürece response döneceğini kestiremediğimiz her şey aslında asekron kod bloğudur.
// JS dünyasında önce sayfa render edilir. Daha sonra veri background ile gelir. Ve ekran yeniden re-render edilir. component domda mounted olarak durur fakat yeniden yeni state değirine göre render.

// servisleştirdiğimiz zaman bir çok componenten bu veriyi istek atarak çapırabilirim.
// servisler sayfalar üzerinden çağrı yapılır.