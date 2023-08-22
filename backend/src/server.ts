import fastify from 'fastify';
import { criarPostagem, editarPostagem, deletarPostagem, listarPostagensDoFaxineiro, listarTodasAsPostagens } from './controllers/postagem-controller/postagemController';
import { criarFaxineiro } from './controllers/faxineiro-controller/faxineiroController';

const app = fastify();

app.post('/faxineiros/:faxineiroId/postagens', {}, criarPostagem);
app.post('/faxineiros', {}, criarFaxineiro);
app.put('/postagem/:postagemId', editarPostagem);
app.delete('/postagem/:postagemId', deletarPostagem);
app.get('/faxineiro/:faxineiroId/postagens', listarPostagensDoFaxineiro);
app.get('/postagens', listarTodasAsPostagens);



const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
