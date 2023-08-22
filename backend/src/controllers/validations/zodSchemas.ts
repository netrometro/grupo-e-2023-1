import { z } from 'zod';

export const criarLojaSchema = z.object({
  nome: z.string().min(3),
  endereco: z.string().min(5),
  contato: z.string().min(8),
});