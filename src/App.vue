<template>
  <!-- Layout principal da aplicação -->
  <v-layout>
    <!-- Barra de aplicativo (navbar) com título e ícones -->
    <v-app-bar color="black">
      <!-- Título da barra de aplicativo -->
      <v-app-bar-title>Lojinha Xing-Ling</v-app-bar-title>

      <!-- Botão de ícone que redireciona para a página inicial -->
      <v-btn icon>
        <router-link to="/">
          <!-- Ícone "mdi-home" na cor branca -->
          <v-icon color="#FFF">mdi-home</v-icon>
        </router-link>
      </v-btn>

      <!-- Botão de ícone que redireciona para a página do carrinho de compras -->
      <v-btn icon>
        <router-link to="/carrinho">
          <!-- Ícone "mdi-cart" na cor branca -->
          <v-icon color="#FFF">mdi-cart</v-icon>
          <!-- Exibe a quantidade total de itens no carrinho -->
          {{ totalItensCarrinho }}
        </router-link>
      </v-btn>
    </v-app-bar>

    <!-- Conteúdo principal -->
    <v-main>
      <!-- Exibe o componente da rota atual -->
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // Mapeia a propriedade totalItensCarrinho do Vuex para esta instância
    ...mapGetters(['totalItensCarrinho'])
  }
}
</script>
