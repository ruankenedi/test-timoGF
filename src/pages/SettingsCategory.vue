<template>
  <div
    class="q-pa-md"
  >
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template
        v-slot:body="props"
      >
        <q-tr
          :props="props"
          @click.native="() => showEditModal(props)"
          style="cursor: pointer;"
        >
          <q-td
            key="name"
            :props="props"
          >
            {{ props.row.name }}
          </q-td>
          <q-td>
            <q-btn
              round
              color="primary"
              icon="edit"
              @click="infoDialog = true"
            />
          </q-td>
           <q-td>
            <q-btn
              round
              color="primary"
              icon="delete"
              @click="confirmDialog = true"
            />
          </q-td>
        </q-tr>
      </template>

      <template
        v-slot:top="props"
      >
        <div
          class="col-2 q-table__title"
        >
          Categorias
        </div>

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
      <q-card
        style="min-width: 400px;"
      >
        <q-card-section>
          <div
            class="text-h6"
          >
            Edite a categoria...
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            label="Nome da categoria:"
            v-model="editCategory"
            autofocus
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[
              val => val && val.length >= 2 || 'O nome da categoria deve ter pelo menos 2 caracteres!'
            ]"
          />
        </q-card-section>

        <q-card-actions
          align="center"
          class="text-primary"
        >
          <q-btn
            label="Cancelar"
            color="primary"
            v-close-popup
          />
          <q-btn
            :disable="isValid"
            label="Editar"
            color="primary"
            @click="edit()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="confirmDialog"
      persistent
    >
      <q-card>
        <q-card-section
          class="row items-center"
        >
          <span
            class="q-ml-sm"
            align="center"
          >
            Deseja realmente excluir esta categoria ?
          </span>
        </q-card-section>

        <q-card-actions
          align="center"
        >
          <q-btn
            label="Não"
            color="primary"
            v-close-popup
          />
          <q-btn
            label="Sim"
            color="primary"
            v-close-popup
            @click="remove()"
          />
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
      isLoadingCategory: false,
      category: [],
      editCategory: '',
      dataTable: '',
      infoDialog: false,
      confirmDialog: false,
      columns: [
        { name: 'name', align: 'left', label: 'Nome da Categoria', field: 'name', sortable: true },
        { name: 'Ações', label: 'Ações', field: 'Ações', sortable: true, style: 'width: 10px' }
      ],
      data: []
    }
  },
  methods: {
    showEditModal (row) { // Get data of row on table after that has clicked //
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

      this.editCategory = ''

      location.reload()
    },
    remove () { // Method for delete category //
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

      location.reload()
    },
    loadCategory () {
      const url = 'http://localhost:3000/auth/categories'
      this.isLoadingCategory = true

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
          this.isLoadingCategory = false
        })
    }
  },
  computed: {
    isValid () { // Field Validation //
      if (
        this.editCategory.length < 2 ||
        this.category === ''
      ) {
        return true
      }

      return false
    }
  },
  created () { // One cycle life of vue, what get the categories of database like this what accessed //
    this.loadCategory()
  }
}
</script>
