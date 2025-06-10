# Tutorial

Estando na pasta do projeto. Precisamos buildar a imagem do Dockerfile, utilizando o seguinte comando:

```bash
docker build --no-cache -t ftr_app .
```

Após buildar, precisamos rodar o container baseado nessa imagem buildada.

```bash
docker run --name ftr -p 3001:8080 -d ftr_app:latest
```

Para rodar as migrations

```bash
docker exec -it ftr sh -c "npm run db:migrate"
```

Obs: trocar 8080 pela porta que você colocou no .env

O projeto ficará acessível na URL: http://localhost:3001/

## Tutorial - BackEnd

Para mais detalhes sobre o BackEnd, consulte o arquivo [`server/README.md`](server/README.md).

## Tutorial - FrontEnd

Para mais detalhes sobre o FrontEnd, consulte o arquivo [`web/README.md`](web/README.md).
