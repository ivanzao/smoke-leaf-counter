# Smoke Leaf Counter

Um contador simples e minimalista para monitorar hábitos diários.

## Como usar

O projeto é compilado em um único arquivo HTML (`dist/index.html`) que contém tudo o que é necessário para rodar a aplicação.

Você pode abrir o arquivo `dist/index.html` diretamente no seu navegador.

## Build com Docker

Para gerar o arquivo `dist/index.html` usando Docker (sem precisar instalar Node.js na sua máquina), execute:

```bash
docker build --output type=local,dest=dist .
```

Este comando irá criar (ou sobrescrever) a pasta `dist` no diretório atual com a versão mais recente do app.
