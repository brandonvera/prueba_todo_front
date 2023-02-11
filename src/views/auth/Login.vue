<template>
	<div class="row justify-content-center">
		<div class="col-md-4">
			<form class="m-2" @submit.stop.prevent="login">
			  <div class="form-group">
			    <label for="exampleInputEmail1">Correo</label>
			    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.email">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Contraseña</label>
			    <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
			  </div>
			  <button type="submit" class="btn btn-primary">Iniciar sesión</button>
			</form>
			<h6>¿No tienes cuenta? <router-link to="/registro">Registrate</router-link></h6>
		</div>
	</div>
</template>

<script>
	import axiosIns from '../../services/auth'
	export default {
		name: 'login',
		data() {
			return {
				user: {
					email: '',
					password: '',
				}
			}
		},

		methods: {
			async login() {
				await axiosIns.post('login', this.user)
				.then(data => {
					localStorage.setItem('jwt', data.data.token)
					this.$swal({
					  icon: 'success',
					  title: 'Inicio de sesión éxitoso',
					})
					this.$router.push('/tareas')
				})
				.catch(e => {
					this.$swal({
					  icon: 'error',
					  title: 'Error, revise sus credenciales',
					})
				})	
			},
		},
	}
</script>