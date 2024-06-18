<h1>Lea-Drizzle</h1>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Drizzle-black?style=for-the-badge&logo=Drizzle&logoColor=#c5f74f"/>
</p>

## 📑 Sobre o projeto

Código desenvolvido para estudo do ORM [Drizzle](https://orm.drizzle.team/). O projeto foi desenvolvido utilizando TypeScript e Node.js, com Express.js para a comunicação entre cliente e servidor. O Drizzle foi utilizado para acesso e manipulação de banco de dados PostgreSQL, enquanto JWT (JSON Web Token) foi utilizado para autenticação de usuários. Para documentação visual do banco de dados, foi utilizado [Drizzle DBML Generator](https://github.com/L-Mario564/drizzle-dbml-generator) e [DBML-Renderer](https://github.com/softwaretechnik-berlin/dbml-renderer).

## 📖 Documentação
- [Diagrama de Classes](./DOCS/class_diagram.png)
- [Diagrama de Relação de Entidades](./DOCS/ERD.png)
- [Diagrama de Relação de Entidades SVG](./DOCS/ERD.svg)
- [Esquema DBML](./DOCS/schema.dbml)
<!-- - [Coleção da API para Insomnia](./DOCS/Insomnia_2023-02-27.json) -->

## 📥 Pacotes

O projeto foi desenvolvido utilizando NPM, mas você pode utilizar qualquer um dos gerenciadores abaixo:

- Yarn
- PNPM
- NPM

## 🚀 Começando

### Passo 1: Instalação das dependências

```bash
npm install
```

### Passo 2: Adicionar variáveis de ambiente
Crie um arquivo .env na raiz do projeto com base no .env.example

```bash
DATABASE_URL=postgresql://user:password@localhost:5433/db
SECRET_KEY=your_secret_key_here
PORT=3000
POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

### Passo 3: Executar o Docker
Execute o seguinte comando para executar o docker
```bash
docker-compose up -d
```

### Passo 4: Migrações do Banco de Dados
Execute as migrações para criar a estrutura inicial
```bash
npm run db:migrate
```

### Passo 5: Vizualição do Banco de Dados
Para visualizar e interagir com o banco de dados utilizando o drizzle studio, execute o seguinte comando:
```bash
npm run studio
```

### Passo 6: Executar o servidor:
Para iniciar o servidor Node, execute:
```bash
npm run dev
```### Passo 6: Executar o servidor:
Para iniciar o servidor Node, execute:
```bash
npm run dev
```

### Passo 7: Popular Banco de Dados (Em processo):
Para popular o banco de dados com dados iniciais, execute o seguinte comando:
```bash
npm run db:seed
```