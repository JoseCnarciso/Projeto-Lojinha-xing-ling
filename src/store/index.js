import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {            
      produtosCarrinho: [] // Array que armazena os produtos presentes no carrinho de compras.
    }
  },
  mutations: {      
    // Mutation para adicionar um produto ao carrinho ou incrementar a quantidade se já estiver no carrinho.
    adicionarProdutoAoCarrinho(state, produtoRecebido) {
      const produtoNoCarrinho = state.produtosCarrinho.find(produto => produto.id === produtoRecebido.id);

      if (produtoNoCarrinho) {
        // Se o produto já estiver no carrinho, encontra-o e incrementa a quantidade.
        state.produtosCarrinho = state.produtosCarrinho.map(item => {
          if (item.id === produtoRecebido.id) {
            item.quantidade = item.quantidade + 1;
          }
          return item;
        });
      } else {
        // Caso contrário, adiciona o produto com quantidade 1 no carrinho.
        state.produtosCarrinho = [
          ...state.produtosCarrinho,
          {
            ...produtoRecebido,
            quantidade: 1
          }
        ];
      }
    },

    // Mutation para remover um produto do carrinho ou decrementar a quantidade.
    removerProdutoCarrinho(state, produtoId){
      const index = state.produtosCarrinho.findIndex(produto => produto.id === produtoId);
      
      if(index !== -1){
        if(state.produtosCarrinho[index].quantidade > 1){
          // Se a quantidade for maior que 1, decrementa a quantidade do produto.
          state.produtosCarrinho[index].quantidade -= 1;
        } else {
          // Caso a quantidade seja 1, remove o produto do carrinho.
          state.produtosCarrinho.splice(index, 1);
        }
      }
    }
  },
  actions: {
    // Action para adicionar um produto ao carrinho.
    adicionarProduto(context, value) {
      context.commit("adicionarProdutoAoCarrinho", value.product);
    },
    
    // Action para chamar a mutation de remoção de produto do carrinho.
    removerProdutoCarrinho(context, produtoId){
      context.commit("removerProdutoCarrinho", produtoId);
    }
  },
  getters: {
    // Getter para calcular o valor total no carrinho.
    valorTotalCarrinho(state) {
      return state.produtosCarrinho.reduce((total, produto) => {
        return total + produto.quantidade * produto.preco;
      }, 0);
    },
    // Getter para calcular o total de itens no carrinho.
    totalItensCarrinho(state) {
      return state.produtosCarrinho.reduce((total, produto) => {
        return total + produto.quantidade;
      }, 0);
    }
  }
})

export default store
