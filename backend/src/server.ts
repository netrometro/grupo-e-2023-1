import fastify from 'fastify';

import fornecedorRoutes from './routes/fornecedorRoutes';
import lojaRoutes from './routes/lojaRoutes';
import produtoRoutes from './routes/produtoRoutes';
import faxineiroRoutes from './routes/faxineiroRoutes';
import postagemRoutes from './routes/postagemRoutes';
import fastifyCors from '@fastify/cors';

const app = fastify();

app.register(fastifyCors);

//app.register(loginRoutes);
app.register(fornecedorRoutes);
app.register(lojaRoutes);
app.register(produtoRoutes);
app.register(faxineiroRoutes);
app.register(postagemRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
function cors(): any {
  throw new Error('Function not implemented.');
}

