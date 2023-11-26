import { render, screen, fireEvent } from '@testing-library/react';


import { BrowserRouter, Router } from 'react-router-dom';
import 'intersection-observer';
import { Register } from './Register';
import { UserProvider } from "../contexts/UserContext"

test('renders login form correctly', () => {
    render(
        <BrowserRouter>
            <UserProvider>
                <Register />
            </UserProvider>
        </BrowserRouter>
    );


    expect(screen.getByText("IF you have a PROFILE CLICK")).toBeInTheDocument();


    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const repeatPasswordInput = screen.getByLabelText('Confirm Password:');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();


    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'testPassword' } });


    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testPassword');
    expect(repeatPasswordInput.value).toBe('testPassword');


    const submitButton = screen.getByText('Register');
    fireEvent.click(submitButton);


});
test('successful login redirects to home', async () => {

    const successfulLogin = () => Promise.resolve();


    render(
        <BrowserRouter>
        <UserProvider>
            <Register />
        </UserProvider>
    </BrowserRouter>
    );


    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password:")
    const repeatPasswordInput = screen.getByLabelText('Confirm Password:');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });





    fireEvent.click(screen.getByText("Register"));


    // Проверяваме дали потребителят е пренасочен към "home"
    expect(window.location.pathname).toBe('/'); 
});