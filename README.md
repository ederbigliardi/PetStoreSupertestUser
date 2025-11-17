🧪 Testes de API com Supertest – CRUD de Usuários (PetStore Swagger)

Este projeto contém uma suíte de testes automatizados desenvolvida com Supertest e Jest, utilizando a API pública da PetStore Swagger (v2) como base.
O objetivo foi validar o CRUD da entidade User, aplicando boas práticas de automação e utilizando também testes Data-Driven.

🚀 Tecnologias utilizadas

Node.js

Jest – framework de testes

Supertest – requisições HTTP para testes de API

PetStore Swagger API (https://petstore.swagger.io/v2
)

📁 Estrutura dos testes

O projeto inclui:

✔️ Testes funcionais para a entidade User:

POST /user – criação de usuário

GET /user/{username} – consulta por username

PUT /user/{username} – atualização de usuário

DELETE /user/{username} – remoção de usuário

Todos os testes validam status code, campos do body, e valores esperados conforme a documentação da API.

🔄 Testes Data-Driven

Além dos testes individuais, também foi implementado um conjunto de testes Data-Driven, utilizando uma massa de dados externa (massaUsers.json).

Para cada usuário da massa, são executados automaticamente:

POST → criação de usuário com dados customizados

GET → consulta validando todos os campos

DELETE → remoção do usuário criado

Isso permite:

Melhor cobertura

Reutilização da estrutura de testes

Facilidade para adicionar novos cenários

📦 Como instalar e executar
1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

2. Instale as dependências
npm install

3. Execute os testes
npm test

🗂️ Estrutura do projeto
├── tests
│   └── user
│       └── user.test.js        # Arquivo principal de testes
├── vendors
│   └── json
│       ├── user.json           # Modelo base para criação de usuários
│       ├── userput.json        # Massa para teste de PUT
│       └── massaUsers.json     # Massa para testes data-driven
└── package.json

🧠 Principais aprendizados

Estruturação de testes automatizados de API

Uso do Supertest integrado ao Jest

Implementação de testes Data-Driven

Validação completa do corpo da resposta

Fluxo CRUD completo de uma entidade

📌 Observações

A API da PetStore é pública e pode sofrer instabilidades, o que pode ocasionar respostas fora do padrão.
Os testes foram criados considerando o comportamento mais consistente da API.
