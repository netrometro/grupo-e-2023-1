export interface Faxineiro {
    id?: number;
    email: string;
    nome: string;
    telefone: string;
    senha:string;
  }
  
export interface Postagem {
    titulo: string;
    descricao: string;
    preco: number;
    horarios: string;
    faxineiroId:number;
    tipoServicoId:number;
    cep:string;
    complemento:string;
    localidade:string;
    logradouro:string;
    uf:string;
    bairro:string;
   }

export interface NovoTipoDeServico {
      nomeServico: string;
    }
    
export interface FilterMaxMin{
  minPrice?: number;
  maxPrice?: number;
}
export interface Contrato {
  id: number;
  contratanteId: number;
  responsavelId: number;
  postagemId: number;
  status: string;
  solicitacoes: boolean;
}
