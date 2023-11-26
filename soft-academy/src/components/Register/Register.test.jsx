import { render, screen, fireEvent } from '@testing-library/react';


import { BrowserRouter, Router } from 'react-router-dom';
import 'intersection-observer';
import { Register } from './Register';
import { UserProvider } from "../contexts/UserContext"

describe('Register component', () => {
    let renderComponent
    let emailInput;
    let passwordInput;
    let confirmInput;

    beforeEach(() => {
        renderComponent = render(
            <BrowserRouter>
                <UserProvider>
                    <Register />
                </UserProvider>
            </BrowserRouter>
        )

        emailInput = screen.getByLabelText('Email:');
        passwordInput = screen.getByLabelText('Password:');
        confirmInput = screen.getByLabelText('Confirm Password:');

    })
    it('renders login form correctly', () => {
        // const emailInput = screen.getByLabelText('Email:');
        // const passwordInput = screen.getByLabelText('Password:');

        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmInput).toBeInTheDocument();


        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        fireEvent.change(confirmInput, { target: { value: 'testPassword' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');
        expect(confirmInput.value).toBe('testPassword');

        const submitButton = screen.getByText('Register');
        fireEvent.click(submitButton);
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
    });

    it('successful login redirects to home', async () => {



        fireEvent.change(emailInput, { target: { value: 'test@example2.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(confirmInput, { target: { value: 'testpassword' } });


        fireEvent.click(screen.getByText("Register"));
        expect(window.location.pathname).toBe('/');
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
    })
})
describe("Register error handler", () => {


    let renderComponent
    let emailInput;
    let passwordInput;
    let confirmInput;

    beforeEach(() => {
        renderComponent = render(
            <BrowserRouter>
                <UserProvider>
                    <Register />
                </UserProvider>
            </BrowserRouter>
        )

        emailInput = screen.getByLabelText('Email:');
        passwordInput = screen.getByLabelText('Password:');
        confirmInput = screen.getByLabelText('Confirm Password:');

    })

    test('empty pass missing', async () => {


        fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.change(confirmInput, { target: { value: '' } });


        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Some fields is empty');

        expect(screen.getByText('Some fields is empty')).toBeInTheDocument();

        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
      
    })
    test('empty email missing', async () => {

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmInput, { target: { value: 'password' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Some fields is empty');

        expect(screen.getByText('Some fields is empty')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
    })
    test('empty all fields missing', async () => {

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.change(confirmInput, { target: { value: '' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Some fields is empty');

        expect(screen.getByText('Some fields is empty')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
    })
    test('Minimum characters is 5', async () => {

        fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
        fireEvent.change(passwordInput, { target: { value: '21' } });
        fireEvent.change(confirmInput, { target: { value: '21' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Minimum characters is 5');

        expect(screen.getByText('Minimum characters is 5')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
        fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
        fireEvent.change(passwordInput, { target: { value: '2144' } });
        fireEvent.change(confirmInput, { target: { value: '2144' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Minimum characters is 5');

        expect(screen.getByText('Minimum characters is 5')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
        fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
        fireEvent.change(passwordInput, { target: { value: '1' } });
        fireEvent.change(confirmInput, { target: { value: '1' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Minimum characters is 5');

        expect(screen.getByText('Minimum characters is 5')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
    })

    test('Minimum characters is 9', async () => {

        fireEvent.change(emailInput, { target: { value: 't@ex.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmInput, { target: { value: 'password' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Minimum characters is 9');

        expect(screen.getByText('Minimum characters is 9')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

        });
        fireEvent.change(emailInput, { target: { value: 't@exa' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmInput, { target: { value: 'password' } });

        fireEvent.click(screen.getByText("Register"));
        await screen.findByText('Minimum characters is 9');

       
    })

   
    // test('Minimum characters is 9', async () => {
    //     fireEvent.change(emailInput, { target: { value: 'c@abv.bg' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password' } });
    //     fireEvent.click(screen.getByText("Login"));
    //     await screen.findByText('Minimum characters is 9');

    //     expect(screen.getByText('Minimum characters is 9')).toBeInTheDocument();
    //     afterEach(() => {
    //         fireEvent.change(emailInput, { target: { value: '1' } });
    //         fireEvent.change(passwordInput, { target: { value: '1' } });
    //     });
    // })


    afterEach(() => {
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
    });
})