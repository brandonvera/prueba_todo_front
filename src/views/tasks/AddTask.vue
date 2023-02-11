<template>
	<div>
		<Nav></Nav>
		<div class="d-flex justify-content-center">
			<div>
				<button class="btn btn-primary m-2" @click="atras">Atras</button>
				<div class="card border-light mb-3" >
				  <div class="card-header">Agregar Tarea</div>
				  <div class="card-body">
				    <form class="m-2" @submit.stop.prevent="add">
						<div class="form-group">
							<label for="InputText1">Título de Tarea</label>
							<input 
								type="text"
								class="form-control"
								id="InputText1"
								v-model="task.title">
						</div>

						<div class="form-group">
							<label for="InputText2">Contenido de Tarea</label>
							<input 
								type="text"
								class="form-control"
								id="InputText2"
								v-model="task.contents">
						</div>

						<button class="btn btn-success" type="submit">Enviar</button>
					</form>
				  </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axiosIns from '../../services/auth'
	import Nav from '@/components/Nav.vue'

	export default {
		name: 'login',
		data() {
			return {
				task: {
					title: '',
					contents: '',
				}
			}
		},

		components: {
			Nav,
		},

		methods: {
			atras(){
				this.$router.push('/tareas')
			},

			async add() {
				await axiosIns.post(`/create/task`, this.task)
				.then(data => {
					this.$swal({
					  icon: 'success',
					  title: 'Datos actualizados',
					})
					this.$router.push('/tareas')
				})	
				.catch(e => {
					this.$swal({
					  icon: 'error',
					  title: 'Ha ocurrido un error',
					})
				})
			}
		},
	}
</script>