import { FastifyInstance } from 'fastify';
import { cadastrarProduto, editarProduto, deletarProduto,} from '../controllers/produto-controller/produtoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/cadastrar-produto', cadastrarProduto);
  fastify.put('/editar-produto', editarProduto);
  fastify.delete('/deletar-produto/:id', deletarProduto);
  done();
}
