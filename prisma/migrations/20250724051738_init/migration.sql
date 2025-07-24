/*
  Warnings:

  - Added the required column `descricao` to the `Atributo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Pericia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "valorBase" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Atributo_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atributo" ("bonus", "id", "key", "nome", "personagemId", "valorBase") SELECT "bonus", "id", "key", "nome", "personagemId", "valorBase" FROM "Atributo";
DROP TABLE "Atributo";
ALTER TABLE "new_Atributo" RENAME TO "Atributo";
CREATE TABLE "new_Pericia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "ehTreinado" BOOLEAN NOT NULL,
    "categoria" TEXT NOT NULL,
    "atributo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "requerTreinamento" BOOLEAN NOT NULL,
    "sofrePenalidadeArmadura" BOOLEAN NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Pericia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pericia" ("atributo", "bonus", "categoria", "ehTreinado", "id", "key", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura") SELECT "atributo", "bonus", "categoria", "ehTreinado", "id", "key", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura" FROM "Pericia";
DROP TABLE "Pericia";
ALTER TABLE "new_Pericia" RENAME TO "Pericia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
