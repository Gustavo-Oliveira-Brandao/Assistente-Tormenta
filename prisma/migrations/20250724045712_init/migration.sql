/*
  Warnings:

  - You are about to drop the `DetalhesAmeaca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalhesPJ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `key` to the `Classe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alinhamentoEtico` to the `Personagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alinhamentoMoral` to the `Personagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classeOriginal` to the `Personagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divindade` to the `Personagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experiencia` to the `Personagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origem` to the `Personagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DetalhesAmeaca_personagemId_key";

-- DropIndex
DROP INDEX "DetalhesPJ_personagemId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DetalhesAmeaca";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DetalhesPJ";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ClasseHabilidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "classeId" INTEGER NOT NULL,
    CONSTRAINT "ClasseHabilidades_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Raca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Raca_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RacaAtributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atributo" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "racaId" INTEGER NOT NULL,
    CONSTRAINT "RacaAtributo_racaId_fkey" FOREIGN KEY ("racaId") REFERENCES "Raca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Classe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "vidaInicial" INTEGER NOT NULL,
    "vidaPorNivel" INTEGER NOT NULL,
    "devotoFiel" BOOLEAN NOT NULL,
    "manaPorNivel" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Classe_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Classe" ("devotoFiel", "id", "manaPorNivel", "nivel", "nome", "personagemId", "vidaInicial", "vidaPorNivel") SELECT "devotoFiel", "id", "manaPorNivel", "nivel", "nome", "personagemId", "vidaInicial", "vidaPorNivel" FROM "Classe";
DROP TABLE "Classe";
ALTER TABLE "new_Classe" RENAME TO "Classe";
CREATE TABLE "new_Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "tamanho" TEXT NOT NULL,
    "classeOriginal" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "divindade" TEXT NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "alinhamentoEtico" TEXT NOT NULL,
    "alinhamentoMoral" TEXT NOT NULL
);
INSERT INTO "new_Personagem" ("categoria", "id", "nivel", "nome", "tamanho", "tipo") SELECT "categoria", "id", "nivel", "nome", "tamanho", "tipo" FROM "Personagem";
DROP TABLE "Personagem";
ALTER TABLE "new_Personagem" RENAME TO "Personagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Raca_personagemId_key" ON "Raca"("personagemId");
