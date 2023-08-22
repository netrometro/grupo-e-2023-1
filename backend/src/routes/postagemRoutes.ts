import { FastifyInstance } from 'fastify';
import { criarPostagem, editarPostagem, deletarPostagem, listarPostagensDoFaxineiro, listarTodasAsPostagens } from '../controllers/postagem-controller/postagemController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {

    fastify.post('/faxineiros/:faxineiroId/postagens', {}, criarPostagem);
    fastify.put('/postagem/:postagemId', editarPostagem);
    fastify.delete('/postagem/:postagemId', deletarPostagem);
    fastify.get('/faxineiro/:faxineiroId/postagens', listarPostagensDoFaxineiro);
    fastify.get('/postagens', listarTodasAsPostagens);

  done();
}