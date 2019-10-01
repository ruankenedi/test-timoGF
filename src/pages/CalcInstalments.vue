<template>
  <div
    class="q-pa-md"
  >
    <q-table
      title="Selecione pelo menos um produto para simular os valores das parcelas"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template
        v-slot:body="props"
      >
        <q-tr
          @click.native="() => showEditModal(props)"
          :props="props"
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
              icon="attach_money"
              @click="calcInstalments()"
            />
          </q-td>
        </q-tr>
      </template>

      <template
        v-slot:top="props"
      >
        <div
          class="col-10 q-table__title"
        >
          Produtos
          <br>
          <span style="font-size: 9pt;">
            Arraste a table para a direita, assim você conseguirá fazer o cálculo.
          </span>
        </div>

        <q-space />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

    </q-table>

    <q-dialog
      v-model="infoDialog"
      maximized
    >
      <q-card
        style="min-width: 400px;"
      >
        <q-card-section>
          <div
            class="text-h6"
          >
            Calcule as parcelas...
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            label="Nome do Produto: *"
            v-model="name"
            @keyup.enter="prompt = false"
            :disable="true"
          />

           <q-input
            label="Descrição: *"
            v-model="description"
            @keyup.enter="prompt = false"
            :disable="true"
          />

           <q-input
            label="Valor: *"
            v-model="value"
            prefix="R$"
            maxlength="10"
            @keyup.enter="prompt = false"
            :disable="true"
          />

          <q-input
            type="number"
            label="Número de Prestações: *"
            v-model="instalments"
            autofocus
            @keyup.enter="prompt = false"
            lazy-rules
            :rules="[
              val => val && val.length >= 1 || 'Campo obrigatório! Este campo só aceita caracteres númericos! Máx. 48 vezes.'
            ]"
          />

          <q-input
            label="Valor das parcelas: *"
            v-model="valueInstalments"
            prefix="R$"
            :disable="true"
            @keyup.enter="prompt = false"
          />

          <q-input
            label="Juros: *"
            v-model="interest"
            :disable="true"
            prefix="R$"
            @keyup.enter="prompt = false"
          />

        </q-card-section>

        <q-card-actions
          align="center"
          class="text-primary"
        >
          <q-btn
            label="Cancelar"
            v-close-popup
          />
          <q-btn
            label="Calcular"
            @click="calc()"
            :disable="isValid"
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
      product: [],
      input: [],
      name: '',
      description: '',
      receiveData: [],
      optionsSelect: [],
      value: '',
      instalments: '',
      interest: '',
      valueInstalments: '',
      infoDialog: false,
      columns: [
        { name: 'name', align: 'left', label: 'Nome do Produto', field: 'name', sortable: true },
        { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
        { name: 'value', align: 'left', label: 'Valor', field: 'value', sortable: true },
        { name: 'category', align: 'left', label: 'Categoria', field: 'category', sortable: true },
        { name: 'Ações', label: 'Ações', field: 'Ações', sortable: true, style: 'width: 10px' }
      ],
      data: []
    }
  },
  methods: {
    showEditModal (row) {
      console.log({ row })
      this.name = row.row.name
      this.description = row.row.description
      this.value = row.row.value
    },
    calcInstalments () {
      this.infoDialog = true
    },
    calc () {
      const totalInstalments = parseFloat(this.value) / parseFloat(this.instalments)
      this.valueInstalments = totalInstalments.toFixed(2)
    },
    loadCategories () {
      const url = 'http://localhost:3000/auth/categories'
      this.isLoadingCategories = true

      axios.get(url)
        .then(response => {
          console.log('CREATED: ', response)

          this.receiveData = response.data
          this.optionsSelect = this.receiveData.map(categories => {
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
    loadProduct () {
      const url = 'http://localhost:3000/auth/products'
      this.isLoadingCategory = true

      axios.get(url)
        .then(response => {
          this.product = response.data
          this.data = this.product.map(product => {
            return {
              id: product._id,
              name: product.name,
              description: product.description,
              value: product.value,
              category: product.category
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
        this.instalments.length === 0 ||
        this.instalments > 48
      ) {
        return true
      }

      return false
    }
  },
  created () {
    this.loadProduct()
    this.loadCategories()
  }
}
</script>
