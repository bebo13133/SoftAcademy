import { render, screen, fireEvent } from '@testing-library/react';

import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter, Router } from 'react-router-dom';
import 'intersection-observer';
import { describe } from 'vitest';

import { Provider } from 'react-redux';
import { CourseProvider } from '../contexts/CourseContext';
import store from '../../store/store';
import { CreateCourse } from './CreateCourse';
// import '../../../public/angular.png'
describe('Create component', () => {
    let renderComponent;
   let courseName;
   let firstName;
   let lastName;
   let email;
   let ownerCourse;
   let price;
   let description;
   let lectorImage;
   let lectorDescription;
   let creditsCourse;
   let weeksCourse;
   let date;
   let image;
   let language;
    let imageUrl;
   let imageUrl2;
// const langImage = "angular.png"

    beforeEach(() => {
        
        renderComponent = render(
            <BrowserRouter>
            <UserProvider isAuthentication={true}>
                <Provider store={store}>
                    <CourseProvider >
                        <CreateCourse />
                    </CourseProvider>
                </Provider>
            </UserProvider>
        </BrowserRouter>
        )

        // courseName = screen.getByLabelText('Course name ');
        // firstName = screen.getByLabelText('Lector name');

    })
    it('renders add form correctly', () => {
        // const emailInput = screen.getByLabelText('Email:');
        // const passwordInput = screen.getByLabelText('Password:');
        renderComponent = render(
            <BrowserRouter>
            <UserProvider isAuthentication={true}>
                <Provider store={store}>
                    <CourseProvider >
                        <CreateCourse />
                    </CourseProvider>
                </Provider>
            </UserProvider>
        </BrowserRouter>
        )
        courseName = document.querySelector('input[name="courseName"]');
       firstName =document.querySelector('input[name="firstName"]');
        lastName =document.querySelector('input[name="lastName"]');
        description =document.querySelector('input[name="lectorDescription"]');
        lectorImage =document.querySelector('input[name="lectorImage"]');
        email =document.querySelector('input[name="email"]');
        ownerCourse =document.querySelector('input[name="ownerCourse"]');
        language =document.querySelector('input[name="language"]');
        imageUrl =document.querySelector('input[name="imageUrl"]');
        imageUrl2 =document.querySelector('input[name="imageUrl2"]'); //да не го попълвам
        description =document.querySelector('input[name="description"]');
        creditsCourse =document.querySelector('input[name="creditsCourse"]');
        weeksCourse =document.querySelector('input[name="weeksCourse"]');
        price =document.querySelector('input[name="price"]');
        date =document.querySelector('input[name="date"]');


  

    //    email = screen.getAllByText('Email');
    //    ownerCourse = screen.getAllByText('User name');
    //    price = screen.getAllByText('Price');
    //    description = screen.getAllByText('Description');
    //    lectorImage = screen.getAllByText('Lector Image');
    //    lectorDescription = screen.getAllByText('Lector Description');
    //    creditsCourse = screen.getAllByText('Credits');
    //    weeksCourse = screen.getAllByText('Weeks');
    //    date = screen.getAllByText('Start Date');
    //    image= screen.getAllByText('Language');



    //    [courseName, firstName, email, ownerCourse, price, description, lectorImage, lectorDescription, creditsCourse, weeksCourse, date, image].forEach(elementsArray => {
    //     elementsArray.forEach(element => {
    //         expect(element).toBeInTheDocument();
    //     });
    // });

    });
    it('successful uncorrected data', async () => {


        // fireEvent.change(courseName, { target: { value: 'Java' } });
        // fireEvent.change(firstName, { target: { value: 'Bobi Iliev' } });

        // expect(emailInput.value).toBe('test@example.com');
        // expect(passwordInput.value).toBe('testPassword');
        // const submitButton = screen.getByText('Login');
        // fireEvent.click(submitButton);
        // expect(window.location.pathname).toBe('/');
    })

    // it('successful login redirects to home', async () => {

    //     // emailInput = screen.getByLabelText(/email/i);
    //     //  emailInput = screen.getByLabelText("Password:")

    //     fireEvent.change(emailInput, { target: { value: 'test@example11.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'testpassword' } });


    //     fireEvent.click(screen.getByText("Login"));
    //     expect(window.location.pathname).toBe('/');
    //     afterEach(() => {
    //         fireEvent.change(emailInput, { target: { value: '1' } });
    //         fireEvent.change(passwordInput, { target: { value: '1' } });
    //     });
    // })

})