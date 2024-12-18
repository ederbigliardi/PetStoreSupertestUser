// Importação das bibliotecas necessárias
const supertest = require('supertest');

// Configuração da base URL
const request = supertest('https://petstore.swagger.io/v2');
const massa1 = require('../../vendors/json/massaUsers')

// Identificação do usuário específico para testes simples
const userId = 906898810; // ID único fornecido no JSON
const username = 'Tom'; // Nome de usuário fornecido no JSON

describe('API PetStore Swagger - Entidade User', () => {

    // Teste: POST - Criar usuário
    it('POST User', async () => {
        const user = require('../../vendors/json/user.json')

        // Função de teste em si
        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe(user.id.toString());
            });
    });

    // Teste: GET - Obter usuário por username
    it('GET User', async () => {
        return request
            .get(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(userId);
                expect(res.body.username).toBe(username);
                expect(res.body.firstName).toBe('Sellec');
                expect(res.body.lastName).toBe('Magnun');
                expect(res.body.email).toBe('tomsellec@gmail.com');
                expect(res.body.phone).toBe('999999999');
                expect(res.body.userStatus).toBe(1);
            });
    });

    // Teste: PUT - Atualizar usuário
    it('PUT User', async () => {
        const updatedUser = require('../../vendors/json/userput.json')

        return request
            .put(`/user/${username}`)
            .send(updatedUser)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe(updatedUser.id.toString());
            });
    });

    // Teste: DELETE - Remover usuário
    it('DELETE User', async () => {
        return request
            .delete(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe(username);
            });
    });

    it.each(massa1.array.map(elemento => [
        elemento.idMassa,
        elemento.usernameMassa,
        elemento.firstNameMassa,
        elemento.lastNameMassa,
        elemento.emailMassa,
        elemento.passwordMassa,
        elemento.phoneMassa,
        elemento.userStatusMassa
    ]))

    // Testes Data-Driven: Criar e excluir múltiplos usuários
    massa1.array.forEach(({ idMassa, usernameMassa, firstNameMassa, lastNameMassa, emailMassa, passwordMassa, phoneMassa, userStatusMassa }) => {

        it(`POST User Data Driven - ${usernameMassa}`, async () => {
            const user = require('../../vendors/json/user.json')
            // Substituimos os campos que queremos personalizar através da massa
            user.id = idMassa
            user.username = usernameMassa
            user.firstName = firstNameMassa
            user.lastName = lastNameMassa
            user.email = emailMassa
            user.password = passwordMassa
            user.phone = phoneMassa
            user.userStatus = userStatusMassa

            return request
                .post('/user')
                .send(user)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.message).toBe(idMassa.toString());
                });
        });

        it(`GET User Data Driven - ${usernameMassa}`, async () => {
            return request
                .get(`/user/${usernameMassa}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.id).toBe(idMassa);
                    expect(res.body.username).toBe(usernameMassa);
                    expect(res.body.firstName).toBe(firstNameMassa);
                    expect(res.body.lastName).toBe(lastNameMassa);
                    expect(res.body.email).toBe(emailMassa);
                    expect(res.body.phone).toBe(phoneMassa);
                    expect(res.body.userStatus).toBe(userStatusMassa);
                });
        });

        it(`DELETE User Data Driven - ${usernameMassa}`, async () => {
            return request
                .delete(`/user/${usernameMassa}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.code).toBe(200);
                    expect(res.body.message).toBe(usernameMassa);
                });
        });
    });
});