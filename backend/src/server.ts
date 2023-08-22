import fastify from 'fastify';
//import loginRoutes from './routes/loginRoutes';
import fornecedorRoutes from './routes/fornecedorRoutes';
import lojaRoutes from './routes/lojaRoutes';
import produtoRoutes from './routes/produtoRoutes';
import faxineiroRoutes from './routes/faxineiroRoutes';
import postagemRoutes from './routes/postagemRoutes';

const app = fastify();
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
