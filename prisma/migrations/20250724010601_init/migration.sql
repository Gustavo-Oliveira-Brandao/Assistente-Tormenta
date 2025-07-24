/*
  Warnings:

  - Added the required column `key` to the `Pericia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pericia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "ehTreinado" BOOLEAN NOT NULL,
    "categoria" TEXT NOT NULL,
    "atributo" TEXT NOT NULL,
    "requerTreinamento" BOOLEAN NOT NULL,
    "sofrePenalidadeArmadura" BOOLEAN NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Pericia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pericia" ("atributo", "bonus", "categoria", "ehTreinado", "id", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura") SELECT "atributo", "bonus", "categoria", "ehTreinado", "id", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura" FROM "Pericia";
DROP TABLE "Pericia";
ALTER TABLE "new_Pericia" RENAME TO "Pericia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
