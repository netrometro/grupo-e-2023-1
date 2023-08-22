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
    CONSTRAINT "Postagem_faxineiroId_fkey" FOREIGN KEY ("faxineiroId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Faxineiro_email_key" ON "Faxineiro"("email");
