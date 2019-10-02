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
        v-model="category[n]"
        :label="`Nome da Categoria: ${[n]}`"
        lazy-rules
        :rules="[
          val => val && val.length >= 2 || 'O nome da categoria deve ter pelo menos 2 caracteres!'
        ]"
        @input="(event) => _emitChange({ inputValue: event, index: n })"
      />
    </div>

    <q-dialog
      v-model="infoDialog"
    >
      <q-card
        style="color: grey;"
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
          Só será permitido o cadastro de 5 categoria por vez!
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
      category: [],
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

      this.category[this.index] = ''
    },
    less () { // Method for decrease field //
      if (this.index > 0) {
        this.category[this.index] = undefined

        --this.index
      }

      if (this.index < 5) {
        this.btnAdd = false
      }

      this._emitRemove(this.index)
    },
    submit () {
      this.createCategory()
    },
    async createCategory () { // Method for creating of categorys //
      const url = 'http://localhost:3000/auth/category'
      const [ name ] = [ this.category[this.index] ]

      axios.post(url, {
        name: name
      })
        .then(res => {
          console.log('Success to creating category: ', res)
        })
        .catch(err => {
          console.log('Error to creating category: ', err)
        })

      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Categoria cadastrada com sucesso!'
      })

      this.index = 0
      this.category[this.index] = ''
    },
    _emitChange ({ inputValue, index }) { // Method for emit change of fields //
      console.log(`Value: ${inputValue} e Index: ${index}`)

      this.$emit('change', {
        value: inputValue,
        index: index
      })
    },
    _emitRemove (index) { // Method for emit event when any fields is removed //
      console.log(index)

      this.$emit('onRemoveInput', {
        removedIndex: index
      })
    }
  },
  computed: {
    canRemoveInput () { // Remove field //
      return this.index === 0
    },
    isValid () { // Field Validation //
      if (
        this.index === 0 ||
        this.category[this.index] === '' ||
        this.category[this.index].length <= 1
      ) {
        return true
      }

      return false
    }
  }
}
</script>
