
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../store/store';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';

import Contact from './Contact';

import 'intersection-observer';

import { UserProvider } from "../contexts/UserContext"
import { CourseProvider } from '../contexts/CourseContext';




let renderComponent
let email
let subject
let message
let username
describe('Contact component', () => {

    beforeEach(() => {
        renderComponent = render(
            <MemoryRouter>
                <UserProvider isAuthentication={true}>
                    <Provider store={store}>
                        <CourseProvider >
                            <Contact />
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )


        username = document.querySelector('input[name="user_name"]');
        email = document.querySelector('input[name="user_email"]');
        subject = document.querySelector('input[name="user_subject"]');
        message = document.querySelector('textarea[name="message"]');
     
    })

    it('renders contact form correctly', async () => {

        renderComponent = render(
            <MemoryRouter>
                <UserProvider isAuthentication={true}>
                    <Provider store={store}>
                        <CourseProvider >
                            <Contact />
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )

        const elements = [
            email,
            subject,
            message,
            username,
          ];
          elements.forEach(element => {
            if (element) {
                expect(element).toBeInTheDocument();
              } else {
              
                console.error('Element not found:', element);
              }
          });
   

    })

    it('render with uncorrected data', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

         
        fireEvent.change(email, { target: { value: 'peter@abv.bg' } });
        fireEvent.change(subject, { target: { value: '123456' } });
        fireEvent.change(message, { target: { value: 'Hellooo' } });
        fireEvent.change(username, { target: { value: '' } });

        const submitButton = document.querySelector('button[type="submit"]');
        fireEvent.click(submitButton);
        expect(alertSpy).toHaveBeenCalledWith(
            expect.stringContaining("Please fill in all required fields")
          )
    })

    it('render with uncorrected data empty message', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  
        
        fireEvent.change(email, { target: { value: 'peter@abv.bg' } });
        fireEvent.change(subject, { target: { value: '123456' } });
        fireEvent.change(message, { target: { value: '' } });
        fireEvent.change(username, { target: { value: 'bobi' } });

        const submitButton = document.querySelector('button[type="submit"]');
        fireEvent.click(submitButton);
        expect(alertSpy).toHaveBeenCalledWith(
            expect.stringContaining("Please fill in all required fields")
          )
    })
    it('render with uncorrected data empty subject', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  
        
        fireEvent.change(email, { target: { value: 'peter@abv.bg' } });
        fireEvent.change(subject, { target: { value: '' } });
        fireEvent.change(message, { target: { value: 'Hellooo' } });
        fireEvent.change(username, { target: { value: 'bobi' } });

        const submitButton = document.querySelector('button[type="submit"]');
        fireEvent.click(submitButton);
        expect(alertSpy).toHaveBeenCalledWith(
            expect.stringContaining("Please fill in all required fields")
          )
    })
    it('render with uncorrected data empty email', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  
        
        fireEvent.change(email, { target: { value: '' } });
        fireEvent.change(subject, { target: { value: '123456' } });
        fireEvent.change(message, { target: { value: 'Hellooo' } });
        fireEvent.change(username, { target: { value: 'bobi' } });

        const submitButton = document.querySelector('button[type="submit"]');
        fireEvent.click(submitButton);
        expect(alertSpy).toHaveBeenCalledWith(
            expect.stringContaining("Please fill in all required fields")
          )
    })

    it('render with ucorrected data', async () => {
        const alertSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        let result = "done"
  
        
        fireEvent.change(email, { target: { value: 'pepi@abv.bg' } });
        fireEvent.change(subject, { target: { value: '123456' } });
        fireEvent.change(message, { target: { value: 'Hellooo' } });
        fireEvent.change(username, { target: { value: 'bobi' } });

        const submitButton = document.querySelector('button[type="submit"]');
        fireEvent.click(submitButton);
  
  
         waitFor(()=>{
            expect(alertSpy).toHaveBeenCalled();
            console.log(alertSpy.mock.calls);

        })
       

        alertSpy.mockRestore();
    })

})