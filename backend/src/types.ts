export interface Faxineiro {
    id?: number;
    email: string;
    nome: string;
    telefone: string;
  }
  
export interface Postagem {
    titulo: string;
    descricao: string;
    preco: number;
    horarios: string;
    faxineiroId:number  }

export interface NovoTipoDeServico {
      nomeServico: string;
    }
    