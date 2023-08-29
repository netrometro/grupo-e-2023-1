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
