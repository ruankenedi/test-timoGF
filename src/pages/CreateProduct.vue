<template>
  <q-page
    padding
  >
    <div
      class="row"
    >
      <q-btn
        class="col-4"
        icon="add"
        label="Adicionar campo"
        :disable="btnAdd"
        @click="add"
      />
      <q-btn
        class="col-4"
        label="Cadastrar Categoria"
        :disable="isValid"
        @click="submit"
      />
      <q-btn
        class="col-4"
        icon="delete"
        label="Diminuir campo"
        :disable="canRemoveInput"
        @click="less"
      />
    </div>
    <div
      v-for="n of index"
      :key="n"
      class="q-mt-md q-mr-sm"
    >
      <q-input
        filled
        v-model="product[n]"
        :label="`Nome do Produto: ${[n]}`"
        lazy-rules
        :rules="[
          val => val && val.length >= 2 || 'O nome do produto deve ter pelo menos 2 caracteres!'
        ]"
        @input="(event) => _emitChange({ inputValue: event, index: n })"
      />

       <q-input
        filled
        v-model="description[n]"
        :label="`Descrição do Produto: ${[n]}`"
        lazy-rules
        :rules="[
          val => val && val.length >= 2 || 'O nome da produto deve ter pelo menos 2 caracteres!'
        ]"
        @input="(event) => _emitChange({ inputValue: event, index: n })"
      />

       <q-input
        filled
        v-model="value[n]"
        :label="`Valor do Produto: ${[n]}`"
        lazy-rules
        :rules="[
          val => val && val.length >= 2 || 'O nome da produto deve ter pelo menos 2 caracteres!'
        ]"
        @input="(event) => _emitChange({ inputValue: event, index: n })"
      />

      <q-select
        class="q-mt-md q-mr-sm"
        filled
        v-model="modelSelect[n]"
        :options="optionsSelect"
        stack-label
        :label="`Categoria: ${[n]}`"
        lazy-rules
        :rules="[
          val => val && val.length !== 1 || 'Selecione pelo menos uma das categorias!'
        ]"
      />
    </div>

    <q-dialog
      v-model="infoDialog"
    >
      <q-card
        style="background-color: blue; color: white;"
      >
        <q-card-section
          class="row items-center"
        >
          <div
            class="text-h6"
          >
            Atenção
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>

        <q-card-section>
          Só será permitido o cadastro de 2 produto por vez!
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      product: [],
      description: [],
      value: [],
      modelSelect: [],
      optionsSelect: [],
      index: 0,
      infoDialog: false,
      btnAdd: false
    }
  },
  methods: {
    add () { // Method for add field //
      ++this.index

      if (this.index === 5) {
        this.btnAdd = true
        this.infoDialog = true
      }

      this.product[this.index] = ''
      this.description[this.index] = ''
      this.value[this.index] = ''
      this.modelSelect[this.index] = ''
    },
    less () { // Method for decrease field //
      if (this.index > 0) {
        this.product[this.index] = undefined

        --this.index
      }

      if (this.index < 5) {
        this.btnAdd = false
      }

      this._emitRemove(this.index)
    },
    submit () {
      this.createProduct()
    },
    async createProduct () { // Method for creating of categorys //
      const url = 'http://localhost:3000/auth/product'

      const [ name, description, value, category ] = [ this.product[this.index], this.description[this.index], this.value[this.index], this.modelSelect[this.index] ]

      axios.post(url, {
        name,
        description,
        value,
        category: category.value
      })
        .then(res => {
          console.log('Success to creating product: ', res)
        })
        .catch(err => {
          console.log('Error to creating product: ', err)
        })

      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Produto cadastrado com sucesso!'
      })

      this.index = 0
      this.product[this.index] = ''
    },
    loadCategories () {
      const url = 'http://localhost:3000/auth/categories'
      this.isLoadingCategories = true

      axios.get(url)
        .then(response => {
          console.log('CREATED: ', response)

          this.modelSelect = response.data
          this.optionsSelect = this.modelSelect.map(categories => {
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
    _emitChange ({ inputValue, index }) { // Method for emit change of fields //
      console.log(`Value: ${inputValue} e Index: ${index}`)

      this.$emit('change', {
        value: inputValue,
        index: index
      })
    },
    _emitRemove (index) {
      console.log(index)

      this.$emit('onRemoveInput', {
        removedIndex: index
      })
    }
  },
  computed: {
    // Remove field //
    canRemoveInput () {
      return this.index === 0
    },
    isValid () {
      // Field Validation //
      if (
        this.index === 0 ||
        this.product[this.index] === '' ||
        this.product[this.index].length <= 1 ||
        this.description[this.index] === '' ||
        this.description[this.index].length <= 1 ||
        this.value[this.index] === '' ||
        this.value[this.index].length <= 1
      ) {
        return true
      }

      return false
    }
  },
  created () {
    this.loadCategories()
  }
}
</script>

<style>

</style>
