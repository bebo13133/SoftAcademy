import { render, screen, fireEvent, act } from '@testing-library/react';


import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import 'intersection-observer';
import { Register } from './Register';
import { UserProvider } from "../contexts/UserContext"
import { Provider, useDispatch } from 'react-redux';
import store from '../../store/store';
import { CourseProvider } from '../contexts/CourseContext';
import CatalogCourses from '../CatalogCourses/CatalogCourses';
import userEvent from '@testing-library/user-event';

describe('Register component', () => {
    let renderComponent
    let emailInput;
    let passwordInput;
    let confirmInput;

    beforeEach(() => {
        renderComponent = render(
            <MemoryRouter>
                <UserProvider isAuthentication={true}>
                    <Provider store={store}>
                        <CourseProvider >



                            <Register />
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )

        emailInput = screen.getByLabelText('Email:');
        passwordInput = screen.getByLabelText('Password:');
        confirmInput = screen.getByLabelText('Confirm Password:');

    })
    it('renders register form correctly', async () => {
        // const emailInput = screen.getByLabelText('Email:');
        // const passwordInput = screen.getByLabelText('Password:');
        await act(async () => {
            const { debug, getByText } = render(

                <BrowserRouter>
                    <UserProvider >
                        <Provider store={store}>
                            <CourseProvider >

                                <Register />
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </BrowserRouter>
            )
        })
        // expect(screen.getByDisplayValue("Register")).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmInput).toBeInTheDocument();


    });

        it("fill  register", async () => {
            const { debug, getByText } = render(

                <BrowserRouter>
                    <UserProvider >
                        <Provider store={store}>
                            <CourseProvider >

                                <Register />
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </BrowserRouter>
            )

            fireEvent.change(emailInput, { target: { value: 'peter@abv,bg' } });
            fireEvent.change(passwordInput, { target: { value: '123456' } });
            fireEvent.change(confirmInput, { target: { value: '123456' } });
    
            expect(emailInput.value).toBe('peter@abv,bg');
            expect(passwordInput.value).toBe('123456');
            expect(confirmInput.value).toBe('123456');
            // const container = screen.getByTestId('parent-container');
            const registerButton = screen.getAllByText("Register");
            // fireEvent.click(registerButton);
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });


        })

        it("click  register", async () => {

            const registerButton = screen.getAllByText("Register");
       userEvent.click(registerButton);
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });
        })


        it('successful login redirects to home', async () => {



            fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
            fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
            fireEvent.change(confirmInput, { target: { value: 'testpassword' } });


            fireEvent.click(screen.getByText("Register"));
            expect(window.location.pathname).toBe('/');
           
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

      
        })
    })
    describe("Register error handler", async() => {


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


            fireEvent.change(emailInput, { target: { value: 'bebo@abv.bg' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });


            fireEvent.click(screen.getByText("Register"));
            // await screen.findByText('Some fields is empty');

            expect(screen.getByText('Some field is empty')).toBeInTheDocument();

            // afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            // });
        })
    //     })
        test('empty email missing', async () => {

            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.change(confirmInput, { target: { value: 'password' } });

            fireEvent.click(screen.getByText("Register"));
            // await screen.findByText('Some fields is empty');

            expect(screen.getByText('Some field is empty')).toBeInTheDocument();
            // afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            // });
        })
        test('empty all fields missing', async () => {

            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.change(confirmInput, { target: { value: '' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText('Some field is empty');

            expect(screen.getByText('Some field is empty')).toBeInTheDocument();
            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });
        })
        test('Minimum characters is 5', async () => {
let minLength = 5
            fireEvent.change(emailInput, { target: { value: 'test@example13.com' } });
            fireEvent.change(passwordInput, { target: { value: '21' } });
            fireEvent.change(confirmInput, { target: { value: '21' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText(`Minimum field length is ${minLength}`);

            expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();
            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });
        })

        test('Minimum characters is 5', async () => {
            let minLength = 5
            fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
            fireEvent.change(passwordInput, { target: { value: '2144' } });
            fireEvent.change(confirmInput, { target: { value: '2144' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText(`Minimum field length is ${minLength}`);

            expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();
            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });
        });
        test('Minimum characters is 5', async () => {
            let minLength = 5
            fireEvent.change(emailInput, { target: { value: 'test@example3.com' } });
            fireEvent.change(passwordInput, { target: { value: '1' } });
            fireEvent.change(confirmInput, { target: { value: '1' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText(`Minimum field length is ${minLength}`);

            expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();
            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });
        })
            
    })
        test('Minimum characters is 9', async () => {
            let minLength = 9
            fireEvent.change(emailInput, { target: { value: 't@ex.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.change(confirmInput, { target: { value: 'password' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText(`Minimum field length is ${minLength}`);

            expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();
            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });
        })
        test('Minimum characters is 9', async () => {
            let minLength = 9

            fireEvent.change(emailInput, { target: { value: 't@exa' } });
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.change(confirmInput, { target: { value: 'password' } });

            fireEvent.click(screen.getByText("Register"));
            await screen.findByText(`Minimum field length is ${minLength}`);
            expect(screen.getByText(`Minimum field length is ${minLength}`)).toBeInTheDocument();

            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });

        })
        it('Please enter a valid password email', async () => {



            fireEvent.change(emailInput, { target: { value: 'test@example3322.com' } });
            fireEvent.change(passwordInput, { target: { value: 'testpasswor12d' } });
            fireEvent.change(confirmInput, { target: { value: 'testpassword' } });


            fireEvent.click(screen.getByText("Register"));
            expect(window.location.pathname).toBe('/');

            afterEach(() => {
                fireEvent.change(emailInput, { target: { value: '' } });
                fireEvent.change(passwordInput, { target: { value: '' } });
                fireEvent.change(confirmInput, { target: { value: '' } });

            });
        })
    //         fireEvent.change(emailInput, { target: { value: 'test@example2.com' } });
    //         fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    //         fireEvent.change(confirmInput, { target: { value: 'testpassword12' } });


    //         fireEvent.click(screen.getByText("Register"));
    //         expect(screen.getByText('Please enter a valid password email')).toBeInTheDocument();

    //         afterEach(() => {
    //             fireEvent.change(emailInput, { target: { value: '' } });
    //             fireEvent.change(passwordInput, { target: { value: '' } });
    //             fireEvent.change(confirmInput, { target: { value: '' } });

    //         });
    //     })

    //       afterEach(() => {
    //         fireEvent.change(emailInput, { target: { value: '' } });
    //         fireEvent.change(passwordInput, { target: { value: '' } });
        });
