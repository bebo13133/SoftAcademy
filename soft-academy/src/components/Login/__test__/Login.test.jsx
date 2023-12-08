// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login';
import { UserProvider } from '../../contexts/UserContext';
import { BrowserRouter, Router } from 'react-router-dom';
import 'intersection-observer';
import { describe } from 'vitest';
describe('Login component', () => {
    let renderComponent
    let emailInput;
    let passwordInput;
    beforeEach(() => {
        renderComponent = render(
            <BrowserRouter>
                <UserProvider>
                    <Login />
                </UserProvider>
            </BrowserRouter>
        )

        emailInput = screen.getByLabelText('Email:');
        passwordInput = screen.getByLabelText('Password:');

    })
    it('renders login form correctly', () => {
        // const emailInput = screen.getByLabelText('Email:');
        // const passwordInput = screen.getByLabelText('Password:');

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();


        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');
        const submitButton = screen.getByText('Login');
        fireEvent.click(submitButton);
        expect(window.location.pathname).toBe('/');
    });

    it('successful login redirects to home', async () => {

        // emailInput = screen.getByLabelText(/email/i);
        //  emailInput = screen.getByLabelText("Password:")

        fireEvent.change(emailInput, { target: { value: 'test@example11.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });


        fireEvent.click(screen.getByText("Login"));
        expect(window.location.pathname).toBe('/');
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });
    })

})

describe("Login error handler", () => {


    let renderComponent
    let emailInput;
    let passwordInput;
    beforeEach(() => {
        renderComponent = render(
            <BrowserRouter>
                <UserProvider>
                    <Login />
                </UserProvider>
            </BrowserRouter>
        )
        emailInput = screen.getByLabelText('Email:');
        passwordInput = screen.getByLabelText('Password:');

    })

    test('empty pass missing', async () => {
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText("Password:")
        // const repeatPasswordInput = screen.getByLabelText(/confirm-password/i);
        fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

        fireEvent.click(screen.getByText("Login"));
        await screen.findByText('Some field is empty');

        expect(screen.getByText('Some field is empty')).toBeInTheDocument();

        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });

    })
    test('empty pass missing', async () => {

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(screen.getByText("Login"));
        await screen.findByText('Some field is empty');

        expect(screen.getByText('Some field is empty')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });

    })
    test('empty all missing', async () => {

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.click(screen.getByText("Login"));
        await screen.findByText('Some field is empty');

        expect(screen.getByText('Some field is empty')).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });

    })

    test('Minimum characters is 5', async () => {
        let minLength = 5
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'vcc' } });


        fireEvent.click(screen.getByText("Login"));
        await screen.findByText(`Minimum field length is ${minLength}`);

        expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();

        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });
      
    })
    test('Minimum characters is 9', async () => {
        let minLength = 9
        fireEvent.change(emailInput, { target: { value: 'c@abv.bg' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(screen.getByText("Login"));
        await screen.findByText(`Minimum field length is ${minLength}`);

        expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();
        afterEach(() => {
            fireEvent.change(emailInput, { target: { value: '1' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
        });
    })


    afterEach(() => {
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
      });
})