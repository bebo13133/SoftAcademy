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


  


        const elements = [
            courseName,
            firstName,
            lastName,
            description,
            lectorImage,
            email,
            ownerCourse,
            language,
            imageUrl,
            imageUrl2,
            description,
            creditsCourse,
            weeksCourse,
            price,
            date,
          ];
        
     
          elements.forEach(element => {
            if (element) {
                expect(element).toBeInTheDocument();
              } else {
           
                console.error('Element not found:', element);
              }
          });
    });


    it('successful corrected data', async () => {
   
        const file = new File(['(binary data)'], 'java.png', { type: 'image/png' });
        const file1 = new File(['(binary data)'], 'java1.png', { type: 'image/png' });


        fireEvent.change(courseName, { target: { value: 'Java' } });
        fireEvent.change(firstName, { target: { value: 'Bobi' } });
        fireEvent.change(lastName, { target: { value: 'Iliev' } });
        fireEvent.change(description, { target: { value: 'Bobi is the best' } });

     fireEvent.input(lectorImage, {target: { files: [file] }});
    
        fireEvent.change(email, { target: { value: 'Bobi@abv.bg' } });
        fireEvent.change(ownerCourse, { target: { value: 'Bobi' } });
    
        fireEvent.input(imageUrl2, {target: { files: [file1] }});

  
        fireEvent.change(description, { target: { value: 'Bobi is the best' } });
       
        fireEvent.change(creditsCourse, { target: { value: "12" } });
        fireEvent.change(weeksCourse, { target: { value: "12" } });
        fireEvent.change(price, { target: { value: "222" } });
        fireEvent.change(date, { target: { value: "" } });


        expect(courseName.value).toBe('Java');
        expect(firstName.value).toBe('Bobi');
        expect(lastName.value).toBe('Iliev');
        expect(description.value).toBe('Bobi is the best');

        expect(lectorImage.files[0].name).toBe('java.png');
        expect(imageUrl2.files[0].name).toBe('java1.png');
     


        expect(email.value).toBe('Bobi@abv.bg');
        expect(ownerCourse.value).toBe('Bobi');
    
        expect(description.value).toBe('Bobi is the best');
        expect(creditsCourse.value).toBe("12");
        expect(weeksCourse.value).toBe("12");

        expect(price.value).toBe("222");
        expect(date.value).toBe('');



        const submitButton = screen.getByText('Create');
        fireEvent.click(submitButton);
        expect(screen.getByText('Some field is empty')).toBeInTheDocument();
        expect(window.location.pathname).toBe('/');
    })

    // it('successful login redirects to home', async () => {

    //     // emailInput = screen.getByLabelText(/email/i);
    //     //  emailInput = screen.getByLabelText("Password:")

 })