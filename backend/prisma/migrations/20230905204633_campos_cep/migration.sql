/*
  Warnings:

  - Added the required column `bairro` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Postagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Postagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Postagem" ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT NOT NULL,
ADD COLUMN     "localidade" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
