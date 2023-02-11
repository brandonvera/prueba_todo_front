<template>  
    <nav> 
      <button class="btn btn-success" @click="logout">Cerrar Sesión</button>
    </nav>
</template>

<script>
	import axiosIns from '../services/auth'
	export default {
		name: 'nav',
		data() {
			return {
				
			}
		},

		methods: {
			async logout() {
				await axiosIns.post(`/logout`)
				.then(data => {
					this.$swal({
					  icon: 'success',
					  title: 'Cierre de sesión eéxitoso',
					})
					localStorage.removeItem('jwt')
					this.$router.push('/')
				})	
				.catch(e => {
					this.$swal({
					  icon: 'success',
					  title: 'Cierre de sesión eéxitoso',
					})
					localStorage.removeItem('jwt')
					this.$router.push('/')
				})
			}
		},
	}
</script>