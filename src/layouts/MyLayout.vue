<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Categoria</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list bordered class="rounded-borders">
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
