interface CardContractProps {
    id:number;
    titulo: string;
    descricao: string;
    preco: number;
    horarios: string;
    telefoneResponsavel:string;
    contratos?: any[]; 
    solicitacoes?: any[];
  }