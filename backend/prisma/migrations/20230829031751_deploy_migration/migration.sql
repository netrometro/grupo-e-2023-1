-- CreateTable
CREATE TABLE "Faxineiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "experiencia" TEXT,
    "disponibilidade" TEXT,
    "area_atuacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faxineiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postagem" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "horarios" TEXT NOT NULL,
    "faxineiroId" INTEGER NOT NULL,
    "tipoServicoId" INTEGER NOT NULL,

    CONSTRAINT "Postagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "fornecedorId" INTEGER,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "lojaId" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_de_servico" (
    "id" SERIAL NOT NULL,
    "nomeServico" TEXT NOT NULL,

    CONSTRAINT "tipos_de_servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faxineiro_email_key" ON "Faxineiro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_de_servico_nomeServico_key" ON "tipos_de_servico"("nomeServico");

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_faxineiroId_fkey" FOREIGN KEY ("faxineiroId") REFERENCES "Faxineiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_tipoServicoId_fkey" FOREIGN KEY ("tipoServicoId") REFERENCES "tipos_de_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loja" ADD CONSTRAINT "Loja_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
