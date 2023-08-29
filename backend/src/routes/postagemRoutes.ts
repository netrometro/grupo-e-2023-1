import { FastifyInstance } from 'fastify';
import {listarPostagensNaoAssociadas,listarPostagensSolicitacaoContrato,  listarPostagensComContratoDoUsuario,listarPostagensSemContrato,listarPostagensComContrato,  criarPostagem, editarPostagem, deletarPostagem, listarPostagensDoFaxineiro, listarTodasAsPostagens, obterDetalhesPostagem } from '../controllers/postagem-controller/postagemController';
import { listarPostagensPorPreco } from '../controllers/postagem-controller/precoPostagemController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {

    fastify.post('/faxineiros/:faxineiroId/postagens', {}, criarPostagem);
    fastify.put('/postagem/:postagemId', editarPostagem);
    fastify.delete('/postagem/:postagemId', deletarPostagem);
    fastify.get('/faxineiro/:faxineiroId/postagens', listarPostagensDoFaxineiro);
    fastify.get('/postagens', listarTodasAsPostagens);
    fastify.get('/postagens/:postagemId', obterDetalhesPostagem);
    fastify.get('/postagens/filter-price', listarPostagensPorPreco);
    fastify.get('/postagens/semContrato', listarPostagensSemContrato);
    fastify.get('/postagens/comContrato', listarPostagensComContrato);
    fastify.get('/postagens/comContrato/:faxineiroId', listarPostagensComContratoDoUsuario);
    fastify.get('/postagens/comSolicitacaoContrato/:faxineiroId', listarPostagensSolicitacaoContrato);
    fastify.get('/postagens/livres/:faxineiroId', listarPostagensNaoAssociadas);


    



  done();
}