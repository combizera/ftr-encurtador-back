# API REST - Encurtador de URLs

Uma API completa para gerenciar encurtamento de URLs, desenvolvida com Node.js, TypeScript, Fastify e Drizzle ORM.

## 📌 Rotas da API

### `POST /`

Cria um novo link encurtado.

**Requisição JSON:**

```json
{
  "originalUrl": "https://exemplo.com",
  "shortCode": "exemplo123"
}
```

**Respostas possíveis:**

- `201 Created`: Link criado com sucesso
- `400 Bad Request`: Dados inválidos
- `409 Conflict`: ShortCode já existe

---

### `GET /`

Lista todas as URLs encurtadas cadastradas.

**Resposta de sucesso:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "originalUrl": "https://exemplo.com",
      "shortCode": "exemplo123",
      "accessCount": 5,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### `PUT /:shortCode`

Incrementa em +1 a contagem de acessos de um link.

**Parâmetro de rota:**

- `shortCode`: string

**Respostas possíveis:**

- `200 OK`: Contador atualizado com sucesso
- `400 Bad Request`: Código inválido
- `404 Not Found`: ShortCode não encontrado

---

### `DELETE /:shortCode`

Remove uma URL encurtada do sistema.

**Parâmetro de rota:**

- `shortCode`: string

**Respostas possíveis:**

- `200 OK`: Link deletado com sucesso
- `400 Bad Request`: Código inválido
- `404 Not Found`: ShortCode não encontrado

---

### `GET /:shortCode`

Obtém a URL original associada ao shortCode (sem redirecionamento).

**Parâmetro de rota:**

- `shortCode`: string

**Resposta de sucesso:**

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://exemplo.com"
  }
}
```

**Respostas possíveis:**

- `400 Bad Request`: Código inválido
- `404 Not Found`: ShortCode não encontrado

> ℹ️ Este endpoint **não redireciona** automaticamente. Apenas retorna os dados da URL original.

## BackEnd - Funcionalidade e Regras

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

- **Node.js**
- **TypeScript**
- **Fastify**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod**
- **Docker**

## Pré-requisitos

- Node.js >= 18
- PostgreSQL
- npm ou yarn

## Licença

Este projeto está sob a licença ISC.
