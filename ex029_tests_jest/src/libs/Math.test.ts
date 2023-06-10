import { Math } from './Math';

// toBe == toEqual

describe('Testing the Math library', () => {

    beforeEach(() => {
        // runs a func before each test
        // ex: conect to database or reset a variable
    });

    afterEach(() => {
        // runs a func after each test
        // ex: disconect to database or reset a variable
    });

    beforeAll(() =>  {
        // runs one time before run the tests afterAll is after
    });




    it('should be add two numbers', () => {
        const response = Math.sum(5, 10);
        expect(response).toBe(15);

        const response2 = Math.sum(10, 5);
        expect(response2).toBe(15);
    });

    it('Should subtract two numbers', () => {
        const response = Math.sub(5, 10);
        expect(response).toBe(-5);

        const response2 = Math.sub(10, 5);
        expect(response2).toBe(5);
    });

    it('Should multiply two numbers', () => {
        const response = Math.mut(5, 10);
        expect(response).toBe(50);

        const response2 = Math.mut(10, 5);
        expect(response2).toBe(50)
    });

    it('Should divide two numbers', () => {
        const response = Math.div(5, 10);
        expect(response).toBe(0.5);

        const response2 = Math.div(10, 5);
        expect(response2).toBe(2);

        const divideZeroResponse = Math.div(10, 0);
        expect(divideZeroResponse).toBeFalsy();

        expect(divideZeroResponse).not.toBeTruthy();
    });


    // if use it.only it skip the others and and run only it
    it.only('Count how many characters are in the string', () => {
        const response = 'DENIED';
        expect(response).toHaveLength(6);
    });

    it('Verify if has the propriety email', () => {
        const response = {
            name: 'Luan',
            email: 'exemple@gmail.com'
        }
        expect(response).toHaveProperty('email');
    });

    it('Verify if is an email', () => {
        const response = 'exemple@gmail.com'
        expect(response).toMatch(/^(.+)@(\\S+)$/);
    });
});
