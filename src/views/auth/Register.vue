<template>
	<div class="row justify-content-center">
		<div class="col-md-4">
			<div class="card">
			<h3 class="m-2">Registro</h3>
			<form class="m-2" @submit.stop.prevent="register">
			  <div class="form-group">
			    <label for="exampleInputEmail2">Nombre de Usuario</label>
			    <input type="text" class="form-control" id="exampleInputEmail2" v-model="user.user_name">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputEmail1">Correo</label>
			    <input type="email" class="form-control" id="exampleInputEmail1" v-model="user.email">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">Contraseña</label>
			    <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword2">Confirmar Contraseña</label>
			    <input type="password" class="form-control" id="exampleInputPassword2" v-model="user.password_confirmation">
			  </div>
			  <button type="submit" class="btn btn-primary">Registrarse</button>
			</form>
			<h6>¿Ya tienes cuenta? <router-link to="/">Iniciar sesión</router-link></h6>
			</div>
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
					user_name: '',
					email: '',
					password: '',
					password_confirmation: '',
				}
			}
		},

		methods: {
			async register() {
				await axiosIns.post('register', this.user)
				.then(data => {
					this.$router.push('/')
					this.$swal({
					  icon: 'success',
					  title: 'Registro Exitoso',
					})
				})
				.catch(e => {
					this.$swal({
					  icon: 'error',
					  title: 'Error, verífique sus datos',
					})
				})	
			},
		},
	}
</script>