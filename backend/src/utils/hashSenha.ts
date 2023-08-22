import * as bcrypt from 'bcrypt';

const saltRounds = 10; 

export const hashSenha = async (senha: string): Promise<string> => {
  const hash = await bcrypt.hash(senha, saltRounds);
  return hash;
};