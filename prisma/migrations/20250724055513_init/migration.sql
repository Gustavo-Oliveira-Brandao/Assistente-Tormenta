/*
  Warnings:

  - Added the required column `descricao` to the `Classe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AprimoramentoMagia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "custo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "magiaId" INTEGER NOT NULL,
    CONSTRAINT "AprimoramentoMagia_magiaId_fkey" FOREIGN KEY ("magiaId") REFERENCES "Magia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AprimoramentoMagia" ("custo", "descricao", "id", "magiaId") SELECT "custo", "descricao", "id", "magiaId" FROM "AprimoramentoMagia";
DROP TABLE "AprimoramentoMagia";
ALTER TABLE "new_AprimoramentoMagia" RENAME TO "AprimoramentoMagia";
CREATE TABLE "new_Atributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "valorBase" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Atributo_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Atributo" ("bonus", "descricao", "id", "key", "nome", "personagemId", "valorBase") SELECT "bonus", "descricao", "id", "key", "nome", "personagemId", "valorBase" FROM "Atributo";
DROP TABLE "Atributo";
ALTER TABLE "new_Atributo" RENAME TO "Atributo";
CREATE TABLE "new_Classe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "vidaInicial" INTEGER NOT NULL,
    "vidaPorNivel" INTEGER NOT NULL,
    "devotoFiel" BOOLEAN NOT NULL,
    "manaPorNivel" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Classe_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Classe" ("devotoFiel", "id", "key", "manaPorNivel", "nivel", "nome", "personagemId", "vidaInicial", "vidaPorNivel") SELECT "devotoFiel", "id", "key", "manaPorNivel", "nivel", "nome", "personagemId", "vidaInicial", "vidaPorNivel" FROM "Classe";
DROP TABLE "Classe";
ALTER TABLE "new_Classe" RENAME TO "Classe";
CREATE TABLE "new_ClasseHabilidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "classeId" INTEGER NOT NULL,
    CONSTRAINT "ClasseHabilidades_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClasseHabilidades" ("classeId", "id", "key", "nivel") SELECT "classeId", "id", "key", "nivel" FROM "ClasseHabilidades";
DROP TABLE "ClasseHabilidades";
ALTER TABLE "new_ClasseHabilidades" RENAME TO "ClasseHabilidades";
CREATE TABLE "new_Deslocamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caminhadaBase" INTEGER NOT NULL,
    "vooBase" INTEGER NOT NULL,
    "natacaoBase" INTEGER NOT NULL,
    "escaladaBase" INTEGER NOT NULL,
    "escavacaoBase" INTEGER NOT NULL,
    "plana" BOOLEAN NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Deslocamento_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Deslocamento" ("caminhadaBase", "escaladaBase", "escavacaoBase", "id", "natacaoBase", "personagemId", "plana", "vooBase") SELECT "caminhadaBase", "escaladaBase", "escavacaoBase", "id", "natacaoBase", "personagemId", "plana", "vooBase" FROM "Deslocamento";
DROP TABLE "Deslocamento";
ALTER TABLE "new_Deslocamento" RENAME TO "Deslocamento";
CREATE UNIQUE INDEX "Deslocamento_personagemId_key" ON "Deslocamento"("personagemId");
CREATE TABLE "new_Efeito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estaAtivo" BOOLEAN NOT NULL,
    "fonte" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Efeito_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Efeito" ("estaAtivo", "fonte", "id", "nome", "personagemId") SELECT "estaAtivo", "fonte", "id", "nome", "personagemId" FROM "Efeito";
DROP TABLE "Efeito";
ALTER TABLE "new_Efeito" RENAME TO "Efeito";
CREATE TABLE "new_Grimorio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atributoChaveMagias" TEXT NOT NULL,
    "bonusCD" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Grimorio_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grimorio" ("atributoChaveMagias", "bonusCD", "id", "personagemId") SELECT "atributoChaveMagias", "bonusCD", "id", "personagemId" FROM "Grimorio";
DROP TABLE "Grimorio";
ALTER TABLE "new_Grimorio" RENAME TO "Grimorio";
CREATE UNIQUE INDEX "Grimorio_personagemId_key" ON "Grimorio"("personagemId");
CREATE TABLE "new_Magia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "alvo" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "efeito" TEXT NOT NULL,
    "execucao" TEXT NOT NULL,
    "resistencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "nivelCirculo" INTEGER NOT NULL,
    "alcance" TEXT NOT NULL,
    "tradicao" TEXT NOT NULL,
    "publicacao" TEXT NOT NULL,
    "escola" TEXT NOT NULL,
    "grimorioId" INTEGER NOT NULL,
    CONSTRAINT "Magia_grimorioId_fkey" FOREIGN KEY ("grimorioId") REFERENCES "Grimorio" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Magia" ("alcance", "alvo", "area", "descricao", "duracao", "efeito", "escola", "execucao", "grimorioId", "id", "key", "nivelCirculo", "nome", "publicacao", "resistencia", "tradicao") SELECT "alcance", "alvo", "area", "descricao", "duracao", "efeito", "escola", "execucao", "grimorioId", "id", "key", "nivelCirculo", "nome", "publicacao", "resistencia", "tradicao" FROM "Magia";
DROP TABLE "Magia";
ALTER TABLE "new_Magia" RENAME TO "Magia";
CREATE TABLE "new_Modificador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "alvo" TEXT NOT NULL,
    "modoBonus" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "estaAtivo" BOOLEAN NOT NULL,
    "escalonamento" TEXT NOT NULL,
    "efeitoId" INTEGER NOT NULL,
    CONSTRAINT "Modificador_efeitoId_fkey" FOREIGN KEY ("efeitoId") REFERENCES "Efeito" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Modificador" ("alvo", "efeitoId", "escalonamento", "estaAtivo", "id", "modoBonus", "tipo", "valor") SELECT "alvo", "efeitoId", "escalonamento", "estaAtivo", "id", "modoBonus", "tipo", "valor" FROM "Modificador";
DROP TABLE "Modificador";
ALTER TABLE "new_Modificador" RENAME TO "Modificador";
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
    CONSTRAINT "Pericia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pericia" ("atributo", "bonus", "categoria", "descricao", "ehTreinado", "id", "key", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura") SELECT "atributo", "bonus", "categoria", "descricao", "ehTreinado", "id", "key", "nome", "personagemId", "requerTreinamento", "sofrePenalidadeArmadura" FROM "Pericia";
DROP TABLE "Pericia";
ALTER TABLE "new_Pericia" RENAME TO "Pericia";
CREATE TABLE "new_Poder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "icone" TEXT,
    "nome" TEXT NOT NULL,
    "tempoExecucao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "preRequisitos" TEXT NOT NULL,
    "publicacao" TEXT NOT NULL,
    "fonte" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Poder_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Poder" ("categoria", "descricao", "fonte", "icone", "id", "key", "nivel", "nome", "personagemId", "preRequisitos", "publicacao", "tempoExecucao") SELECT "categoria", "descricao", "fonte", "icone", "id", "key", "nivel", "nome", "personagemId", "preRequisitos", "publicacao", "tempoExecucao" FROM "Poder";
DROP TABLE "Poder";
ALTER TABLE "new_Poder" RENAME TO "Poder";
CREATE TABLE "new_Proficiencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Proficiencia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Proficiencia" ("categoria", "id", "nome", "personagemId") SELECT "categoria", "id", "nome", "personagemId" FROM "Proficiencia";
DROP TABLE "Proficiencia";
ALTER TABLE "new_Proficiencia" RENAME TO "Proficiencia";
CREATE TABLE "new_Raca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Raca_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Raca" ("descricao", "id", "key", "nome", "personagemId", "tipo") SELECT "descricao", "id", "key", "nome", "personagemId", "tipo" FROM "Raca";
DROP TABLE "Raca";
ALTER TABLE "new_Raca" RENAME TO "Raca";
CREATE UNIQUE INDEX "Raca_personagemId_key" ON "Raca"("personagemId");
CREATE TABLE "new_RacaAtributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atributo" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "racaId" INTEGER NOT NULL,
    CONSTRAINT "RacaAtributo_racaId_fkey" FOREIGN KEY ("racaId") REFERENCES "Raca" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RacaAtributo" ("atributo", "id", "racaId", "valor") SELECT "atributo", "id", "racaId", "valor" FROM "RacaAtributo";
DROP TABLE "RacaAtributo";
ALTER TABLE "new_RacaAtributo" RENAME TO "RacaAtributo";
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
    CONSTRAINT "Status_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Status" ("atributoDefesa", "atributoManaMaxima", "atributoVidaMaxima", "defesaBase", "defesaBonus", "id", "manaAtual", "manaMaximaBonus", "manaTemporaria", "personagemId", "vidaAtual", "vidaMaximaBonus", "vidaTemporaria") SELECT "atributoDefesa", "atributoManaMaxima", "atributoVidaMaxima", "defesaBase", "defesaBonus", "id", "manaAtual", "manaMaximaBonus", "manaTemporaria", "personagemId", "vidaAtual", "vidaMaximaBonus", "vidaTemporaria" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE UNIQUE INDEX "Status_personagemId_key" ON "Status"("personagemId");
CREATE TABLE "new_SubEfeito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "poderId" INTEGER NOT NULL,
    CONSTRAINT "SubEfeito_poderId_fkey" FOREIGN KEY ("poderId") REFERENCES "Poder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubEfeito" ("descricao", "id", "nome", "poderId") SELECT "descricao", "id", "nome", "poderId" FROM "SubEfeito";
DROP TABLE "SubEfeito";
ALTER TABLE "new_SubEfeito" RENAME TO "SubEfeito";
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "poderId" INTEGER NOT NULL,
    CONSTRAINT "Tag_poderId_fkey" FOREIGN KEY ("poderId") REFERENCES "Poder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "label", "poderId") SELECT "id", "label", "poderId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
