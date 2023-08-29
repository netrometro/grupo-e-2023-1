/*
  Warnings:

  - You are about to drop the `solicitacoes_contrato` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "solicitacoes_contrato" DROP CONSTRAINT "solicitacoes_contrato_contratanteId_fkey";

-- DropForeignKey
ALTER TABLE "solicitacoes_contrato" DROP CONSTRAINT "solicitacoes_contrato_contratoId_fkey";

-- DropForeignKey
ALTER TABLE "solicitacoes_contrato" DROP CONSTRAINT "solicitacoes_contrato_postagemId_fkey";

-- DropForeignKey
ALTER TABLE "solicitacoes_contrato" DROP CONSTRAINT "solicitacoes_contrato_responsavelId_fkey";

-- DropTable
DROP TABLE "solicitacoes_contrato";

-- CreateTable
CREATE TABLE "SolicitacaoContrato" (
    "id" SERIAL NOT NULL,
    "contratanteId" INTEGER NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "postagemId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contratoId" INTEGER,

    CONSTRAINT "SolicitacaoContrato_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitacaoContrato" ADD CONSTRAINT "SolicitacaoContrato_contratanteId_fkey" FOREIGN KEY ("contratanteId") REFERENCES "Faxineiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoContrato" ADD CONSTRAINT "SolicitacaoContrato_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Faxineiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoContrato" ADD CONSTRAINT "SolicitacaoContrato_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoContrato" ADD CONSTRAINT "SolicitacaoContrato_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;
