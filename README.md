🐾 PetStore User API – Testes com Supertest (Versão Atualizada)

Este repositório contém uma suíte de testes automatizados criada com Jest + Supertest, validando as operações de CRUD da entidade User na API pública PetStore Swagger.
Inclui também testes Data-Driven, permitindo validar múltiplos usuários utilizando diferentes massas de dados.

📌 Tecnologias Utilizadas

Node.js

Jest

Supertest

PetStore Swagger API

Massa de dados (JSON)

📁 Estrutura do Projeto (Simplificada)
├── Test
│   └── api
│       └── user.spec.js
├── vendors
│   └── json
│       ├── user.json
│       ├── userput.json
│       └── massaUsers.json
├── package.json
└── README.md

🚀 Como Executar o Projeto
1️⃣ Instale as dependências
npm install

2️⃣ Execute os testes
npm test

🧪 Escopo dos Testes
✔ Testes Individuais (Usuário Principal)

A suíte testa o CRUD completo do usuário principal, incluindo:

POST → Criação do usuário

GET → Consulta por username

PUT → Atualização dos dados

DELETE → Exclusão do usuário

Antes dos testes serem executados, o usuário principal é recriado automaticamente via beforeAll(), garantindo que GET e DELETE sempre funcionem sem erros 404.

✔ Testes Data-Driven

O projeto inclui testes repetidos automaticamente para vários usuários definidos em massaUsers.json, cobrindo:

Criação

Consulta

Exclusão

Esses cenários geram maior cobertura e reduzem duplicação de código.

🔧 Pontos Melhorados nesta Versão

Código refatorado e mais enxuto

Suite mais estável com beforeAll()

Correção do problema de 404 nos métodos GET/DELETE

Organização das massas de dados

Reuso de payload base (user.json)

Maior padronização das asserções

🌐 Referência da API

API utilizada:
https://petstore.swagger.io/

📄 Licença

Este projeto é somente para estudo e prática.
Livre para uso educacional.
