# Jogo de Xadrez

Trabalho da disciplina de Gerência de Projeto e Manutenção de Software pelo professor Leonardo Murta em UFF. Grupo composto por Brendo Costa, Gabriel Basilio, Glauber Guimarães. Gusttavo Locatelli, João Victor e Lucas Panaro.

## Sumário

1. [Proposta](#1-proposta)
2. [Dependências](#2-depend%C3%AAncias)
3. [Observações](#3-observa%C3%A7%C3%B5es)
4. [Estrutura de Diretórios](#4-estrutura-de-diret%C3%B3rios)
5. [Licença](#5-licen%C3%A7a)

## 1. Proposta

O trabalho visa o desenvolvimento de um jogo de xadrez versão web distribuido inicialmente diretamente pela plataforma de deploy github pages. Além do desenvolvimento do jogo será realizada e documetada aqui a gestão do projeto.

## 2. Dependências

Ao clonar o repositório para a visualização local do jogo será necessária a instalação do ambiente de execução:

- Node.js 18.16 ou mais recente.
- `npm` separadamente caso necessário.

Após a instalação do ambiente de execução, devem ser instaladas as dependências do projeto. Para isso, execute em seu terminal dentro do diretório raíz desse repositório o seguinte comando:

- $ `npm install`

Após a instalação das dependências, os scripts abaixo podem ser utilizados. Para isso, execute em seu terminal dentro do diretório raíz desse repositório o seguinte comando:

- $ `npm run build` para realizar a build do projeto para o subdiretório `/dist`.
- $ `npm run dev` para executar localmente o jogo em modo de desenvolvimento. Este script também observa modificações no código fonte e atualiza o jogo em execução com as modificações.

## 3. Observações

Para execução da build do projeto em outros ambientes de execução, basta que um servidor HTTP sirva os arquivos da build. Neste projeto, o Vite realiza esta tarefa automaticamente quando o script `npm run dev` é executado.

## 4. Estrutura de Diretórios

- `.github` arquivos de workflow do GitHub.
- `/docs` artefatos de documentação do projeto.
- `/src` código fonte do projeto.

## 5. Licença
Projeto distribuído sob a licença [MIT](/LICENSE).



