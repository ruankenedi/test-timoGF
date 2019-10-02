<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <q-header
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Timo - GF
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          icon="category"
          label="Categorias"
          caption="2 opções"
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="add_circle"
            label="Criar"
            :to="{ name: 'createCategory' }"
          >
            <q-card>
              <q-card-section>
                Campo para a criação de categoria!
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="settings"
            label="Gerenciar Categorias"
            :to="{ name: 'settingsCategory' }"
          >
            <q-card>
              <q-card-section>
                Editar, excluir e administração das categorias!
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="filter_frames"
          label="Produtos"
          caption="2 opções"
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="add_circle"
            label="Criar"
            :to="{ name: 'createProduct' }"
          >
            <q-card>
              <q-card-section>
                Campo para criar produtos!
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="settings"
            label="Gerenciar Produtos"
            :to="{ name: 'settingsProduct' }"
          >
            <q-card>
              <q-card-section>
                Editar, excluir e administração dos produtos!
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="rate_review"
          label="Cálculos"
          caption="1 opções"
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="settings"
            label="Cálculos das Parcelas"
            :to="{ name: 'calcInstalments' }"
          >
            <q-card>
              <q-card-section>
                Definições de valores para as parcelas!
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
