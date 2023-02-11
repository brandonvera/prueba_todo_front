<template>
	<div>
		<Nav></Nav>
		<button class="btn btn-success m-2" @click="add">Crear Tarea</button>
		<div class="row d-flex justify-content-center">
			<div class="col-md-9">
				<div class="card-plain m-2">
					<div class="table table-responsive-xl">
					  <table class="table table-hover table-dark">
					    <thead class="text-center">
					    <slot>
					      <th>Tarea</th>
					      <th>Titulo</th>
					      <th>Contenido</th>
					      <th>Estado</th>
					      <th>Opciones</th>                           
					    </slot>
					    </thead>
					    <tbody class="table-bordered text-center">    
					    <tr v-for="(item, index) in tasks" :key="index">
					      <slot> 
					        <td>{{item.id}}</td>
					        <td>{{item.title}}</td>
					        <td>{{item.contents}}</td>
					        <td>{{estado(item.status)}}</td>
					        <td>
					          <div>
					            <button class="btn btn-warning text-white m-2" style="cursor: pointer" @click="edit(item.id)">Editar</button>

					            <button class="btn btn-success text-white m-2" style="cursor: pointer" @click="completed(item.id)">Finalizar</button>

					            <button class="btn btn-danger text-white m-2" style="cursor: pointer" @click="deleted(item.id)">Eliminar</button>	           
					          </div>
					        </td>
					      </slot>
					    </tr>            
					    </tbody> 
					  </table>
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
		name: 'tareas',
		data() {
			return {
				tasks: [],
			}
		},

		components: {
			Nav,
		},

		mounted() {
			this.getTasks() 
		},

		methods: {
			async getTasks() {
				await axiosIns.get('all/tasks')
				.then(data => {
					this.tasks = data.data
				})
				.catch(e => {
					console.log(e)
				})
			},

			add() {
				this.$router.push(`/tarea/crear/`)
			},

			edit(id) {
		        this.$router.push(`/tareas/editar/${id}`)
			},

			async deleted(id) {
				try {
					await axiosIns.post(`/delete/task/${id}`)
					this.$swal({
					  icon: 'success',
					  title: 'Tarea eliminada éxitosamente',
					})
					this.getTasks()
				}
				catch(e) {
					this.$swal({
					  icon: 'error',
					  title: 'Ha ocurrido un error',
					})
				}
			},

			async completed(id) {
				try {
					await axiosIns.post(`/complete/task/${id}`)
					this.$swal({
					  icon: 'success',
					  title: 'Tarea culminada éxitosamente',
					})
					this.getTasks()
				}
				catch(e) {
					this.$swal({
					  icon: 'error',
					  title: 'Ha ocurrido un error',
					})
				}
			},

			estado(status) {
				if(status == 0) {
					return 'Activo'
				} else if(status == 1) {
					return 'Terminado'
				}
				this.getTasks()
			}	
		},
	}
</script>