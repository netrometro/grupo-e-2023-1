import { FastifyInstance } from 'fastify';
import { cadastrarProduto, deletarProduto, listarProdutos, editarProduto} from '../controllers/produto-controller/produtoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/cadastrar-produto', cadastrarProduto);
  fastify.put('/editar-produto/:id', editarProduto);
  fastify.delete('/deletar-produto/:id', deletarProduto);
  fastify.get('/listar-produtos', listarProdutos);
  done();
}
