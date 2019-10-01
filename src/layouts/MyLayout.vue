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
          Quasar App
        </q-toolbar-title>

        <div>
          Quasar v{{ $q.version }}
        </div>
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
          icon="mail"
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
          icon="mail"
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

        <!-- <q-expansion-item
          :content-inset-level="0.5"
          expand-separator
          icon="mail"
          label="Usuários"
          caption="5 opções"
        >
          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="settings"
            label="Gerenciar Usuários"
            :to="{ name: 'settingsUser' }"
          >
            <q-card>
              <q-card-section>
                Editar, excluir e administração das permissões e dos status!
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item> -->
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
