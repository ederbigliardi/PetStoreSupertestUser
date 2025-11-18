// Importações
const supertest = require('supertest');
const request = supertest('https://petstore.swagger.io/v2');
const massa1 = require('../../vendors/json/massaUsers');

// Dados fixos do usuário principal
const mainUser = {
    id: 906898810,
    username: 'Tom',
    firstName: 'Sellec',
    lastName: 'Magnun',
    email: 'tomsellec@gmail.com',
    phone: '999999999',
    userStatus: 1
};

function loadJson(path) {
    return require(path);
}

describe('PetStore User API - Versão Corrigida', () => {

    // Garante que o usuário principal sempre exista antes de todos os testes
    beforeAll(async () => {
        await request.post('/user').send(mainUser);
    });

    // POST
    it('POST User', async () => {
        const user = loadJson('../../vendors/json/user.json');

        const res = await request.post('/user').send(user);

        expect(res.statusCode).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.message).toBe(user.id.toString());
    });

    // GET
    it('GET User', async () => {

        const res = await request.get(`/user/${mainUser.username}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(mainUser.id);
        expect(res.body.username).toBe(mainUser.username);
        expect(res.body.firstName).toBe(mainUser.firstName);
        expect(res.body.lastName).toBe(mainUser.lastName);
        expect(res.body.email).toBe(mainUser.email);
        expect(res.body.phone).toBe(mainUser.phone);
        expect(res.body.userStatus).toBe(mainUser.userStatus);
    });

    // PUT
    it('PUT User', async () => {
        const updatedUser = loadJson('../../vendors/json/userput.json');

        const res = await request.put(`/user/${mainUser.username}`).send(updatedUser);

        expect(res.statusCode).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.message).toBe(updatedUser.id.toString());
    });

    // DELETE
    it('DELETE User', async () => {

        // garante existência
        await request.post('/user').send(mainUser);

        const res = await request.delete(`/user/${mainUser.username}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.message).toBe(mainUser.username);
    });

    // -----------------------------------------
    // DATA-DRIVEN
    // -----------------------------------------
    describe('Data Driven Users', () => {

        massa1.array.forEach(userData => {

            const {
                idMassa,
                usernameMassa,
                firstNameMassa,
                lastNameMassa,
                emailMassa,
                passwordMassa,
                phoneMassa,
                userStatusMassa
            } = userData;

            const userPayload = {
                id: idMassa,
                username: usernameMassa,
                firstName: firstNameMassa,
                lastName: lastNameMassa,
                email: emailMassa,
                password: passwordMassa,
                phone: phoneMassa,
                userStatus: userStatusMassa
            };

            it(`POST User Data Driven - ${usernameMassa}`, async () => {

                const res = await request.post('/user').send(userPayload);

                expect(res.statusCode).toBe(200);
                expect(res.body.message).toBe(idMassa.toString());
            });

            it(`GET User Data Driven - ${usernameMassa}`, async () => {

                // Garantir que usuário exista
                await request.post('/user').send(userPayload);

                const res = await request.get(`/user/${usernameMassa}`);

                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(idMassa);
                expect(res.body.username).toBe(usernameMassa);
                expect(res.body.firstName).toBe(firstNameMassa);
                expect(res.body.lastName).toBe(lastNameMassa);
                expect(res.body.email).toBe(emailMassa);
                expect(res.body.phone).toBe(phoneMassa);
                expect(res.body.userStatus).toBe(userStatusMassa);
            });

            it(`DELETE User Data Driven - ${usernameMassa}`, async () => {

                // garantir existência antes de deletar
                await request.post('/user').send(userPayload);

                const res = await request.delete(`/user/${usernameMassa}`);

                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.message).toBe(usernameMassa);
            });
        });

    });
});
