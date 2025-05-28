# API REST - Encurtador de URLs

Uma API completa para gerenciar encurtamento de URLs, desenvolvida com Node.js, TypeScript, Fastify e Drizzle ORM.

## Funcionalidades e Regras

### Funcionalidades Principais

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [ ] Deve ser possível exportar os links criados em um CSV
  - [ ] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [ ] Deve ser gerado um nome aleatório e único para o arquivo
  - [ ] Deve ser possível realizar a listagem de forma performática
  - [ ] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **Docker** - Containerização

## Pré-requisitos

- Node.js >= 18
- PostgreSQL
- npm ou yarn

## Licença

Este projeto está sob a licença ISC.
