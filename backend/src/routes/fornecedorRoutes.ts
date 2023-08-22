import { FastifyInstance } from 'fastify';
import { criarLoja } from '../controllers/loja-controller/lojaController';
import { cadastrarFornecedor, listarFornecedores } from '../controllers/fornecedor-controller/fornecedorController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/cadastrar-fornecedor', cadastrarFornecedor);
  fastify.get('/listar-fornecedores', {}, listarFornecedores);

  //fastify.post('/login', fazerLogin);
  done();
}