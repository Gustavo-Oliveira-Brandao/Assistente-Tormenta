/*
  Warnings:

  - Added the required column `nivel` to the `Poder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "icone" TEXT,
    "nome" TEXT NOT NULL,
    "tempoExecucao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "publicacao" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "fonte" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Poder_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Poder" ("categoria", "descricao", "fonte", "icone", "id", "key", "nome", "personagemId", "publicacao", "tempoExecucao") SELECT "categoria", "descricao", "fonte", "icone", "id", "key", "nome", "personagemId", "publicacao", "tempoExecucao" FROM "Poder";
DROP TABLE "Poder";
ALTER TABLE "new_Poder" RENAME TO "Poder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
