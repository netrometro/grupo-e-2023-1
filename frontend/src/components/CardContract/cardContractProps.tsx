interface CardContractProps {
    id:number;
    titulo: string;
    descricao: string;
    preco: number;
    horarios: string;
    telefoneResponsavel:string;
    contratos?: any[]; // Altere o tipo "any[]" para o tipo apropriado
    solicitacoes?: any[];
  }