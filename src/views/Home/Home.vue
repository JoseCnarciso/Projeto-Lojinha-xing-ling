<template>
  <!-- Exibe uma lista de produtos -->
  <div class="list-products">
    <!-- Para cada produto na lista, cria um card de exibição -->
    <v-card width="300px" class="pa-2 mb-2" v-for="product in products" :key="product.id">
      <!-- Exibe a imagem do produto com sobreposição gradiente -->
      <v-img
        :src="product.imagem"
        class="bg-white"
        width="300"
        :aspect-ratio="1"
        cover
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <!-- Título do card exibe o nome do produto em texto branco -->
        <v-card-title class="text-white">{{ product.nome }} </v-card-title>
      </v-img>
      <!-- Subtítulo do card exibe a descrição das parcelas do produto -->
      <v-card-subtitle class="pt-4">
        10X de {{ formatarMoeda(product.parcela)}}
      </v-card-subtitle>

      <!-- Ações do card (neste caso, apenas o botão de compra) -->
      <v-card-actions>
        <!-- Botão que adiciona o produto ao carrinho quando clicado -->
        <v-btn color="orange" @click.prevent="() => this.$store.dispatch('adicionarProduto', { product })">
          Comprar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [] // Armazena a lista de produtos
    }
  },
  mounted() {
    // Carrega os produtos da API ao iniciar o componente
    this.loadProducts()
  },
  methods: {
    // Função para carregar os produtos da API
    loadProducts() {
      axios({
        url: 'http://localhost:3333/produtos',
        method: 'GET'
      })
        .then((response) => {
          this.products = response.data
        })
        .catch(() => {
          alert('Desculpe, não foi possivel recuperar os produtos')
        })
    },
    // Função para formatar um valor como moeda brasileira
    formatarMoeda(valor) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }
  }
}
</script>

<style scoped>
.list-products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
