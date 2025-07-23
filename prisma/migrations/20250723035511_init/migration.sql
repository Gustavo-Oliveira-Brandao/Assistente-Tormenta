/*
  Warnings:

  - You are about to alter the column `experiencia` on the `DetalhesPJ` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `manaTemporaria` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DetalhesPJ" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raca" TEXT NOT NULL,
    "classeOriginal" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "divindade" TEXT NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "alinhamentoEtico" TEXT NOT NULL,
    "alinhamentoMoral" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "DetalhesPJ_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DetalhesPJ" ("alinhamentoEtico", "alinhamentoMoral", "classeOriginal", "divindade", "experiencia", "id", "origem", "personagemId", "raca") SELECT "alinhamentoEtico", "alinhamentoMoral", "classeOriginal", "divindade", "experiencia", "id", "origem", "personagemId", "raca" FROM "DetalhesPJ";
DROP TABLE "DetalhesPJ";
ALTER TABLE "new_DetalhesPJ" RENAME TO "DetalhesPJ";
CREATE UNIQUE INDEX "DetalhesPJ_personagemId_key" ON "DetalhesPJ"("personagemId");
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vidaAtual" INTEGER NOT NULL,
    "vidaMaximaBonus" INTEGER NOT NULL,
    "vidaTemporaria" INTEGER NOT NULL,
    "atributoVidaMaxima" TEXT NOT NULL,
    "manaAtual" INTEGER NOT NULL,
    "manaTemporaria" INTEGER NOT NULL,
    "manaMaximaBonus" INTEGER NOT NULL,
    "atributoManaMaxima" TEXT NOT NULL,
    "defesaBase" INTEGER NOT NULL,
    "defesaBonus" INTEGER NOT NULL,
    "atributoDefesa" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Status_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Status" ("atributoDefesa", "atributoManaMaxima", "atributoVidaMaxima", "defesaBase", "defesaBonus", "id", "manaAtual", "manaMaximaBonus", "personagemId", "vidaAtual", "vidaMaximaBonus", "vidaTemporaria") SELECT "atributoDefesa", "atributoManaMaxima", "atributoVidaMaxima", "defesaBase", "defesaBonus", "id", "manaAtual", "manaMaximaBonus", "personagemId", "vidaAtual", "vidaMaximaBonus", "vidaTemporaria" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE UNIQUE INDEX "Status_personagemId_key" ON "Status"("personagemId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
