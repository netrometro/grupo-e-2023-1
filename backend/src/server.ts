import fastify from 'fastify';
import lojaRoutes from './src/routes/lojaRoutes';

const app = fastify();

app.register(lojaRoutes, { prefix: '/api/lojas' });

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});