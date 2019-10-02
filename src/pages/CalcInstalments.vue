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
              @click="openDialog()"
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
          <span style="font-size: 9pt; color: grey;">
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
            label="Categoria do Produto: *"
            v-model="category"
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
            label="Juros por mês: *"
            v-model="interestForMonth"
            :disable="true"
            prefix="R$"
            @keyup.enter="prompt = false"
          />

          <q-input
            :label="`Juros total de ${instalments} ${instalments > 1 ? 'parcelas' : 'parcela' }: *`"
            v-model="interestTotal"
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
            color="primary"
            label="Fechar"
            v-close-popup
          />
          <q-btn
            color="primary"
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
      name: '',
      description: '',
      receiveData: [],
      optionsSelect: [],
      value: '',
      category: '',
      instalments: '',
      interestForMonth: '',
      interestTotal: '',
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
    showEditModal (row) { // Get data of row on table after that has clicked //
      this.name = row.row.name
      this.description = row.row.description
      this.value = row.row.value
      this.category = row.row.category
    },
    openDialog () { // Open dialog to calculate instalments //
      this.infoDialog = true
    },
    calc () { // Calculate the values of instalments and interest too //
      const totalInstalments = parseFloat(this.value) / parseFloat(this.instalments)
      this.valueInstalments = totalInstalments.toFixed(2)
      switch (this.category) {
        case 'Informática':
          this.interestForMonth = ((5 * this.value) / 100).toFixed(2)
          break
        case 'Automotivo':
          this.interestForMonth = ((2.5 * this.value) / 100).toFixed(2)
          break
        case 'Móveis':
          this.interestForMonth = ((1 * this.value) / 100).toFixed(2)
          break

        default:
          break
      }

      this.interestTotal = this.instalments * this.interestForMonth
    },
    loadCategories () { // Search categories on database //
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
    loadProduct () { // Search products on database //
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
              category: this.optionsSelect.map(cat => cat.label).toString()
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
  created () { // One cycle life of vue, what get the products and categories of database like this what accessed //
    this.loadCategories()
    this.loadProduct()
  }
}
</script>
