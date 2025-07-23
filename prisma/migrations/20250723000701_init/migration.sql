-- CreateTable
CREATE TABLE "Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "tamanho" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DetalhesPJ" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raca" TEXT NOT NULL,
    "classeOriginal" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "divindade" TEXT NOT NULL,
    "experiencia" TEXT NOT NULL,
    "alinhamentoEtico" TEXT NOT NULL,
    "alinhamentoMoral" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "DetalhesPJ_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DetalhesAmeaca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "papelCombate" TEXT NOT NULL,
    "subTipo" TEXT,
    "tesouro" TEXT,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "DetalhesAmeaca_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "vidaInicial" INTEGER NOT NULL,
    "vidaPorNivel" INTEGER NOT NULL,
    "devotoFiel" BOOLEAN NOT NULL,
    "manaPorNivel" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Classe_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Atributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "valorBase" INTEGER NOT NULL,
    "bonus" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Atributo_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pericia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "ehTreinado" BOOLEAN NOT NULL,
    "categoria" TEXT NOT NULL,
    "atributo" TEXT NOT NULL,
    "requerTreinamento" BOOLEAN NOT NULL,
    "sofrePenalidadeArmadura" BOOLEAN NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Pericia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vidaAtual" INTEGER NOT NULL,
    "vidaMaximaBonus" INTEGER NOT NULL,
    "vidaTemporaria" INTEGER NOT NULL,
    "atributoVidaMaxima" TEXT NOT NULL,
    "manaAtual" INTEGER NOT NULL,
    "manaMaximaBonus" INTEGER NOT NULL,
    "atributoManaMaxima" TEXT NOT NULL,
    "defesaBase" INTEGER NOT NULL,
    "defesaBonus" INTEGER NOT NULL,
    "atributoDefesa" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Status_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deslocamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caminhadaBase" INTEGER NOT NULL,
    "vooBase" INTEGER NOT NULL,
    "natacaoBase" INTEGER NOT NULL,
    "escaladaBase" INTEGER NOT NULL,
    "escavacaoBase" INTEGER NOT NULL,
    "plana" BOOLEAN NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Deslocamento_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Poder" (
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
    CONSTRAINT "Poder_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubEfeito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "poderId" INTEGER NOT NULL,
    CONSTRAINT "SubEfeito_poderId_fkey" FOREIGN KEY ("poderId") REFERENCES "Poder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "poderId" INTEGER NOT NULL,
    CONSTRAINT "Tag_poderId_fkey" FOREIGN KEY ("poderId") REFERENCES "Poder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grimorio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atributoChaveMagias" TEXT NOT NULL,
    "bonusCD" INTEGER NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Grimorio_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Magia" (
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
    CONSTRAINT "Magia_grimorioId_fkey" FOREIGN KEY ("grimorioId") REFERENCES "Grimorio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AprimoramentoMagia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "custo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "magiaId" INTEGER NOT NULL,
    CONSTRAINT "AprimoramentoMagia_magiaId_fkey" FOREIGN KEY ("magiaId") REFERENCES "Magia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proficiencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Proficiencia_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Efeito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estaAtivo" BOOLEAN NOT NULL,
    "fonte" TEXT NOT NULL,
    "personagemId" INTEGER NOT NULL,
    CONSTRAINT "Efeito_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Modificador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "alvo" TEXT NOT NULL,
    "modoBonus" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "estaAtivo" BOOLEAN NOT NULL,
    "escalonamento" TEXT NOT NULL,
    "efeitoId" INTEGER NOT NULL,
    CONSTRAINT "Modificador_efeitoId_fkey" FOREIGN KEY ("efeitoId") REFERENCES "Efeito" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DetalhesPJ_personagemId_key" ON "DetalhesPJ"("personagemId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalhesAmeaca_personagemId_key" ON "DetalhesAmeaca"("personagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_personagemId_key" ON "Status"("personagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Deslocamento_personagemId_key" ON "Deslocamento"("personagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Grimorio_personagemId_key" ON "Grimorio"("personagemId");
