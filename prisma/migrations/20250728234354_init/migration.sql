/*
  Warnings:

  - You are about to drop the `SubEfeito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nivel` on the `Poder` table. All the data in the column will be lost.
  - You are about to drop the column `preRequisitos` on the `Poder` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubEfeito";
PRAGMA foreign_keys=on;

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
    "fonte" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Poder_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Poder" ("categoria", "descricao", "fonte", "icone", "id", "key", "nome", "personagemId", "publicacao", "tempoExecucao") SELECT "categoria", "descricao", "fonte", "icone", "id", "key", "nome", "personagemId", "publicacao", "tempoExecucao" FROM "Poder";
DROP TABLE "Poder";
ALTER TABLE "new_Poder" RENAME TO "Poder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
