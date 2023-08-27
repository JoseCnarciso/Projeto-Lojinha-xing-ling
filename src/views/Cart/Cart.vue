<template>
  <div>
    <v-table>
      <!-- Cabeçalho da tabela -->
      <thead>
        <tr>
          <th class="text-left">Imagem</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Quantidade</th>
          <th class="text-left">Preço</th>
          <th class="text-left">Subtotal</th>
          <th class="text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop para exibir cada produto no carrinho -->
        <tr v-for="product in produtosCarrinho" :key="product.id">
          <!-- Coluna da imagem do produto -->
          <td><img :src="product.imagem" width="30" /></td>
          <!-- Coluna do nome do produto -->
          <td>{{ product.nome }}</td>
          <!-- Coluna da quantidade do produto -->
          <td>{{ product.quantidade }}</td>
          <!-- Coluna do preço do produto (formatado como moeda) -->
          <td>{{ formatarMoeda(product.preco) }}</td>
          <!-- Coluna do subtotal do produto (quantidade * preço, formatado como moeda) -->
          <td>{{ formatarMoeda(product.quantidade * product.preco)}}</td>
          <!-- Coluna das ações (botões de Excluir e Adicionar) -->
          <td>
            <v-btn color="orange" @click.prevent="removerProdutoCarrinho(product.id)">
              Excluir
            </v-btn>
          </td>
          <td>
            <v-btn color="orange" @click.prevent="adicionarProduto(product)">
              Adicionar
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-divider :thickness="12" class="border-opacity-75"></v-divider>   
    <!-- Exibir informações do carrinho -->
    <div class="d-flex align-end flex-column">
      <!-- Total de itens no carrinho -->
      <p>Total de Itens no Carrinho: {{ totalItensCarrinho }}</p>
      <!-- Valor total do carrinho (formatado como moeda) -->
      <p>Valor Total: {{ formatarMoeda(valorTotalCarrinho) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      products: [],
    }
  },
  computed: {
    // Produtos no carrinho obtidos do Vuex
    produtosCarrinho() {
      return this.$store.state.produtosCarrinho;
    },
    // Valores obtidos do Vuex através de mapGetters
    ...mapGetters(['valorTotalCarrinho', 'totalItensCarrinho'])
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
          alert('Desculpe, não foi possível recuperar os produtos')
        })
    },
    // Função para adicionar um produto ao carrinho
    adicionarProduto(produto) {
      this.$store.dispatch('adicionarProduto', { product: produto });
    },
    // Função para remover um produto do carrinho
    removerProdutoCarrinho(produtoId) {
      this.$store.dispatch('removerProdutoCarrinho', produtoId);
    },
    // Função para formatar um valor como moeda brasileira
    formatarMoeda(valor) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }
  }
}
</script>
