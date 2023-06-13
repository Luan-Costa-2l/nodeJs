import request from 'supertest';
import app from '../app';
import { User } from '../models/User';

describe('Testing API routes', () => {
    const email = 'tes@jest.com';
    const password = '1234';

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('should return pong', (done) => {
        request(app)
            .get('/ping')
            .then((response) => {
                expect(response.body.pong).toBeTruthy();
                return done();
            });
    });

    it('should register a new user', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then((response) => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            });
    });

    it('should not allowed register a new user', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then((response) => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('should not allowed register a new user without an email', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`)
            .then((response) => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('should not allowed register a new user without a password', (done) => {
        request(app)
            .post('/register')
            .send(`password=${password}`)
            .then((response) => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('should not allowed register a new user without any data', (done) => {
        request(app)
            .post('/register')
            .send(``)
            .then((response) => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('should login correctly', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=${password}`)
            .then((response) => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeTruthy();
                return done();
            });
    });

    it('should login correctly', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=invalid`)
            .then((response) => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeFalsy();
                return done();
            });
    });

    it('should get list of users', (done) => {
        request(app)
            .get('/list')
            .then((response) => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.users.length).toBeGreaterThanOrEqual(1);
                expect(response.body.users).toContain(email);
                return done();
            });
    });
});