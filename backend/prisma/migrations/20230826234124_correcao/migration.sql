/*
  Warnings:

  - A unique constraint covering the columns `[nomeServico]` on the table `tipos_de_servico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipoServicoId` to the `Postagem` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_Postagem" ("descricao", "faxineiroId", "horarios", "id", "preco", "titulo") SELECT "descricao", "faxineiroId", "horarios", "id", "preco", "titulo" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "tipos_de_servico_nomeServico_key" ON "tipos_de_servico"("nomeServico");
