<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click.native="() => showEditModal(props)" style="cursor: pointer;">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td>
            <q-btn round color="primary" icon="edit" @click="infoDialog = true"/>
          </q-td>
           <q-td>
            <q-btn round color="primary" icon="delete" @click="confirmDialog = true" />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top="props">
        <div class="col-2 q-table__title">Cursos</div>

        <q-space />

        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

    </q-table>

    <q-dialog
      v-model="infoDialog"
    >
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="editCategory" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Editar" @click="edit()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Deseja realmente excluir esta categoria ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Não" color="primary" v-close-popup />
          <q-btn label="Sim" color="primary" v-close-popup @click="remove()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SettingsCategory',
  data () {
    return {
      isLoadingCourses: false,
      category: [],
      optionsCourse: [],
      editCategory: '',
      dataTable: '',
      infoDialog: false,
      confirmDialog: false,
      status: '',
      columns: [
        { name: 'name', align: 'left', label: 'Nome da Categoria', field: 'name', sortable: true },
        { name: 'Ações', label: 'Ações', field: 'Ações', sortable: true, style: 'width: 10px' }
      ],
      data: []
    }
  },
  methods: {
    showEditModal (row) {
      console.log({ row })
      this.dataTable = row.row.id
    },
    edit () { // Method for editing of category //
      const url = `http://localhost:3000/auth/editCategory/${this.dataTable}`
      const name = this.editCategory

      axios.put(url, {
        name
      })
        .then(response => {
          console.log('Edited with success! ', response)
        })
        .catch(err => {
          console.log('Error ao edit the category! ', err)
        })
    },
    remove () { // Method for editing of category //
      const url = `http://localhost:3000/auth/deleteCategory/${this.dataTable}`
      const name = this.editCategory

      axios.delete(url, {
        name
      })
        .then(response => {
          console.log('Edited with success! ', response)
        })
        .catch(err => {
          console.log('Error ao edit the category! ', err)
        })
    },
    loadCourses () {
      const url = 'http://localhost:3000/auth/categories'
      this.isLoadingCourses = true

      axios.get(url)
        .then(response => {
          this.category = response.data
          this.data = this.category.map(category => {
            return {
              id: category._id,
              name: category.name
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isLoadingCourses = false
        })
    }
  },
  created () {
    this.loadCourses()
  }
}
</script>

<style>

</style>
