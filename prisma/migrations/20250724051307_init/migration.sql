/*
  Warnings:

  - You are about to drop the column `tipo` on the `Personagem` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `Raca` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "tamanho" TEXT NOT NULL,
    "classeOriginal" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "divindade" TEXT NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "alinhamentoEtico" TEXT NOT NULL,
    "alinhamentoMoral" TEXT NOT NULL
);
INSERT INTO "new_Personagem" ("alinhamentoEtico", "alinhamentoMoral", "categoria", "classeOriginal", "divindade", "experiencia", "id", "nivel", "nome", "origem", "tamanho") SELECT "alinhamentoEtico", "alinhamentoMoral", "categoria", "classeOriginal", "divindade", "experiencia", "id", "nivel", "nome", "origem", "tamanho" FROM "Personagem";
DROP TABLE "Personagem";
ALTER TABLE "new_Personagem" RENAME TO "Personagem";
CREATE TABLE "new_Raca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Raca_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Raca" ("descricao", "id", "key", "nome", "personagemId") SELECT "descricao", "id", "key", "nome", "personagemId" FROM "Raca";
DROP TABLE "Raca";
ALTER TABLE "new_Raca" RENAME TO "Raca";
CREATE UNIQUE INDEX "Raca_personagemId_key" ON "Raca"("personagemId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
