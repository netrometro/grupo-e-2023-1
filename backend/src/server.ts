import fastify from 'fastify';
//import loginRoutes from './routes/loginRoutes';
import fornecedorRoutes from './routes/fornecedorRoutes';
import lojaRoutes from './routes/lojaRoutes';
import produtoRoutes from './routes/produtoRoutes';

const app = fastify();
//app.register(loginRoutes);
app.register(fornecedorRoutes);
app.register(lojaRoutes);
app.register(produtoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
