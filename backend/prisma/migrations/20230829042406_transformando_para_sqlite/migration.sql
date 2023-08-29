-- CreateTable
CREATE TABLE "Faxineiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "experiencia" TEXT,
    "disponibilidade" TEXT,
    "area_atuacao" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Postagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "horarios" TEXT NOT NULL,
    "faxineiroId" INTEGER NOT NULL,
    "tipoServicoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Postagem_faxineiroId_fkey" FOREIGN KEY ("faxineiroId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_tipoServicoId_fkey" FOREIGN KEY ("tipoServicoId") REFERENCES "tipos_de_servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "fornecedorId" INTEGER,
    CONSTRAINT "Loja_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "lojaId" INTEGER NOT NULL,
    CONSTRAINT "Produto_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tipos_de_servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeServico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratanteId" INTEGER NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "postagemId" INTEGER NOT NULL,
    CONSTRAINT "Contrato_contratanteId_fkey" FOREIGN KEY ("contratanteId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Faxineiro_email_key" ON "Faxineiro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_de_servico_nomeServico_key" ON "tipos_de_servico"("nomeServico");
