export default {
	auth(to, from, next) {
		const token = localStorage.getItem('jwt');
		if(!token){
			next('/');
		}
		next();
	},
}