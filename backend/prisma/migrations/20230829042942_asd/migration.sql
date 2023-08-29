/*
  Warnings:

  - You are about to drop the column `status` on the `Postagem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "solicitacoes_contrato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratanteId" INTEGER NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "postagemId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "solicitacoes_contrato_contratanteId_fkey" FOREIGN KEY ("contratanteId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solicitacoes_contrato_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solicitacoes_contrato_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "horarios" TEXT NOT NULL,
    "faxineiroId" INTEGER NOT NULL,
    "tipoServicoId" INTEGER NOT NULL,
    CONSTRAINT "Postagem_faxineiroId_fkey" FOREIGN KEY ("faxineiroId") REFERENCES "Faxineiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Postagem_tipoServicoId_fkey" FOREIGN KEY ("tipoServicoId") REFERENCES "tipos_de_servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Postagem" ("descricao", "faxineiroId", "horarios", "id", "preco", "tipoServicoId", "titulo") SELECT "descricao", "faxineiroId", "horarios", "id", "preco", "tipoServicoId", "titulo" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
