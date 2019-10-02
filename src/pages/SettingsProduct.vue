<template>
  <div
    class="q-pa-md"
  >
    <q-table
      title="Treats"
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
          <q-td
            key="description"
            :props="props"
          >
            {{ props.row.description }}
          </q-td>
          <q-td
            key="value"
            :props="props"
          >
            {{ props.row.value }}
          </q-td>
          <q-td
            key="category"
            :props="props"
          >
            {{ props.row.category }}
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
          Produtos
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
            Edite o produto...
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            label="Nome do Produto"
            v-model="editName"
            autofocus
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[
              val => val && val.length >= 2 || 'O nome do produto deve ter pelo menos 2 caracteres!'
            ]"
          />
          <q-input
            label="Descrição do produto"
            v-model="editDescription"
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[
              val => val && val.length >= 5 || 'A descrição do produto deve ter pelo menos 2 caracteres!'
            ]"
          />
          <q-input
            label="Valor do Produto"
            v-model="editValue"
            mask="###.##"
            reverse-fill-mask
            maxlength="6"
            prefix="R$"
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[
              val => val && val > 0 || 'O valor do produto deve ser maior que 0 reais! E todos caracteres tem que ser números.'
            ]"
          />
          <q-select
            label="Selecione uma categoria"
            v-model="editCategory"
            :options="optionsSelect"
            stack-label
            lazy-rules
            :rules="[
              val => val && val.length !== 1 || 'Selecione pelo menos uma das categorias!'
            ]"
          />
        </q-card-section>

        <q-card-actions
          align="center"
          class="text-primary"
        >
          <q-btn
            color="primary"
            label="Cancelar"
            v-close-popup
          />
          <q-btn
            color="primary"
            label="Editar"
            :disable="isValid"
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
          <q-avatar
            icon="signal_wifi_off"
            color="primary"
            text-color="white"
          />
          <span
            class="q-ml-sm"
          >
            Deseja realmente excluir esta categoria ?
          </span>
        </q-card-section>

        <q-card-actions
          align="right"
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
      isLoadingProduct: false,
      isLoadingCategories: false,
      product: [],
      options: [],
      optionsSelect: [],
      editName: '',
      editDescription: '',
      editValue: '',
      editCategory: '',
      dataTable: '',
      infoDialog: false,
      confirmDialog: false,
      columns: [
        { name: 'name', align: 'left', label: 'Produto', field: 'name', sortable: true },
        { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
        { name: 'value', align: 'left', label: 'Valor em R$', field: 'value', sortable: true },
        { name: 'category', align: 'left', label: 'Categoria', field: 'category', sortable: true },
        { name: 'Ações', label: 'Ações', field: 'Ações', sortable: true, style: 'width: 10px' }
      ],
      data: []
    }
  },
  methods: {
    showEditModal (row) { // Get data of row on table after that has clicked //
      console.log({ row })
      this.dataTable = row.row.id
      this.editName = row.row.name
      this.editDescription = row.row.description
      this.editValue = row.row.value
      this.editCategory = row.row.category
      console.log('ççççççççççç: ', this.editCategory)
    },
    edit () { // Method for editing of product //
      const url = `http://localhost:3000/auth/editProduct/${this.dataTable}`
      const name = this.editName
      const description = this.editDescription
      const value = this.editValue
      const category = this.editCategory

      axios.put(url, {
        name,
        description,
        value,
        category: category.value
      })
        .then(response => {
          console.log('Edited with success! ', response)
        })
        .catch(err => {
          console.log('Error ao edit the category! ', err)
        })

      this.editName = ''
      this.editDescription = ''
      this.editValue = ''
      this.editCategory = ''

      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Produto editado com sucesso!'
      })

      location.reload()
    },
    remove () { // Method for delete product //
      const url = `http://localhost:3000/auth/deleteProduct/${this.dataTable}`
      const name = this.editName
      const description = this.editDescription
      const value = this.editValue
      const category = this.editCategory

      axios.delete(url, {
        name,
        description,
        value,
        category
      })
        .then(response => {
          console.log('Edited with success! ', response)
        })
        .catch(err => {
          console.log('Error ao edit the category! ', err)
        })

      location.reload()
    },
    loadCategories () { // Method for search categories //
      const url = 'http://localhost:3000/auth/categories'
      this.isLoadingCategories = true

      axios.get(url)
        .then(response => {
          console.log('CREATED: ', response)

          this.options = response.data
          this.optionsSelect = this.options.map(categories => {
            return {
              label: categories.name,
              value: categories._id
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isLoadingCategories = false
        })
    },
    loadProduct () { // Method for search product //
      const url = 'http://localhost:3000/auth/products'
      this.isLoadingProduct = true

      axios.get(url)
        .then(response => {
          this.product = response.data
          this.data = this.product.map(product => {
            return {
              id: product._id,
              name: product.name,
              description: product.description,
              value: product.value,
              category: this.optionsSelect.map(cat => cat.label).toString()
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.isLoadingProduct = false
        })
    }
  },
  computed: {
    isValid () { // Field Validation //
      if (
        this.editName.length < 2 ||
        this.editDescription.length < 5 ||
        this.editValue === null ||
        this.editCategory.length === 0
      ) {
        return true
      }

      return false
    }
  },
  created () { // One cycle life of vue, what get the products and categories of database like this what accessed //
    this.loadCategories()
    this.loadProduct()
  }
}
</script>

<style>

</style>
