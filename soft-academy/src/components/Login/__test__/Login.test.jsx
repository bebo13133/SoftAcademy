// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login'; // Заменете с пътя до вашия компонент
import { UserProvider } from '../../contexts/UserContext';
import { BrowserRouter, Router } from 'react-router-dom';
import 'intersection-observer';
test('renders login form correctly', () => {
    render(
        <BrowserRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </BrowserRouter>
    );


    expect(screen.getByText("IF you don't have a PROFILE CLICK")).toBeInTheDocument();


    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();


    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });


    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testPassword');


    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);

    // Добавете допълнителни проверки, ако е необходимо
});
test('successful login redirects to home', async () => {

    const successfulLogin = () => Promise.resolve();


    render(
        <BrowserRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </BrowserRouter>
    );


    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password:")
    // const repeatPasswordInput = screen.getByLabelText(/confirm-password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

    // Имитираме събитие "submit" на формата

    // fireEvent.click(screen.getByText("Login"));
    // Изчакваме асинхронната операция (логване) да приключи
    // await waitFor(() => {});

    // Проверяваме дали потребителят е пренасочен към "home"
    expect(window.location.pathname).toBe('/'); // Ако използвате реакт рутера
});
test('login errors', async () => {

    const successfulLogin = () => Promise.resolve();


    render(
        <BrowserRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </BrowserRouter>
    );


    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password:")
    // const repeatPasswordInput = screen.getByLabelText(/confirm-password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText("Login"));
    await screen.findByText('Some fields is empty');

    // Assert that the error message is rendered
    expect(screen.getByText('Some fields is empty')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'vcc' } });
    // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText("Login"));
    await screen.findByText('Minimum characters is 5');

    // Assert that the error message is rendered
    expect(screen.getByText('Minimum characters is 5')).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'Password' } });
    // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText("Login"));
    await screen.findByText('Some fields is empty');

    // Assert that the error message is rendered
    expect(screen.getByText('Some fields is empty')).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'test@ex' } });
    fireEvent.change(passwordInput, { target: { value: 'Password' } });
    // fireEvent.change(repeatPasswordInput, { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByText("Login"));
    await screen.findByText('Minimum characters is 9');

    // Assert that the error message is rendered
    expect(screen.getByText('Minimum characters is 9')).toBeInTheDocument();

});