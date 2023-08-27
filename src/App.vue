<template>
  <v-layout>
    <v-app-bar color="#d6249f">
      <v-app-bar-title>Funko Lab</v-app-bar-title>

      <v-btn icon>
        <router-link to="/carrinho">
        {{ this.$store.state.produtosCarrinho.length}}
          <v-icon color="#FFF">mdi-cart</v-icon>
        </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>