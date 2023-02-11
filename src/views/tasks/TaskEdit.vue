<template>
	<div>
		<Nav></Nav>
		<div class="d-flex justify-content-center">
			<div>
				<button class="btn btn-primary m-2" @click="atras">Atras</button>
				<div class="card border-light mb-3" >
				  <div class="card-header">Editar Tarea</div>
				  <div class="card-body">
				    <form class="m-2" @submit.stop.prevent="change">
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

		mounted() {
			this.getTask()
		},

		methods: {
			atras(){
				this.$router.push('/tareas')
			},

			async getTask() {
				const id = this.$route.params.id

				await axiosIns.get(`/show/task/${id}`)
				.then(data => {
			        this.task.title = data.data.title
			        this.task.contents = data.data.contents
				})	
				.catch(e => {
					console.log(e)
				})
			},

			async change() {
				const id = this.$route.params.id

				await axiosIns.post(`/update/task/${id}`, this.task)
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