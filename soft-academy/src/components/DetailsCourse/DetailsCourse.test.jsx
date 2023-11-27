import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CourseProvider } from '../contexts/CourseContext';

import { vi, describe, test, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../contexts/UserContext';
import { Provider } from 'react-redux';
import store from '../../store/store';
import 'intersection-observer';

import '@testing-library/jest-dom';
import * as courseService from '../Services/courseService'

import { DetailsCourse } from './DetailsCourse';
import { ForumProvider } from '../contexts/ForumContext';
import { OneCourse } from './OneCourse';
import { LectorPage } from './LectorsPage';
import { SignUpCourse } from './SignUpCourse';


const mockDetails = { _id: '1', title: 'Course 1', description: 'Description for Course 1' };
const paymentDetails= [{
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "cardNumber": "432432432",
    "ownerName": "432234323",
    "expiDate": "1111",
    "cvc": "231",
    "courseId": "78525fb8-3674-4444-a08d-49497f017853",
    "userId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "payType": "student-course",
    "_createdOn": 1701089877966,
    "_id": "1fd2d9ec-8fe1-4000-8ebd-14748c512cb9"
},{
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "cardNumber": "432432432",
    "ownerName": "432234323",
    "expiDate": "1111",
    "cvc": "231",
    "courseId": "78525fb8-3674-4444-a08d-49497f017853",
    "userId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "payType": "student-course",
    "_createdOn": 1701089877966,
    "_id": "1fd2d9ec-8fe1-4000-8ebd-14748c512cb9"
}]

vi.mock('../Services/courseService', () => ({
    courseServiceFactory: () => ({
        getOne: vi.fn(async () => ((mockDetails))),
        getAllStudentsPayment: vi.fn(async () => ((paymentDetails))),
        getAll:vi.fn(async () => ((mockDetails))),
       
    }),
}));


describe("test details page", async () => {


    await act(async () => {
        const { debug, getByText } = render(

            <MemoryRouter>
                <UserProvider>
                    <Provider store={store}>
                        <CourseProvider >
                            <ForumProvider>
                                {/* <ErrorBoundary> */}


                                <DetailsCourse />

                                {/* </ErrorBoundary> */}
                            </ForumProvider>
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )
    })
    test('renders OneCourse with details', async () => {

        await act(async () => {
            const { debug, getByText } = render(

                <MemoryRouter>
                    <UserProvider>
                        <Provider store={store}>
                            <CourseProvider >


                             
                                    <ForumProvider>
                                        <OneCourse />
                                    </ForumProvider>
                           
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </MemoryRouter>
            )
        })
     
        const TestRender = screen.getAllByText("Description for Course 1")
            // expect(lang).toBeInTheDocument()
    

    })
    test('renders OneCourse with details', async () => {

        await act(async () => {
            const { debug, getByText } = render(

                <MemoryRouter>
                    <UserProvider>
                        <Provider store={store}>
                            <CourseProvider >


                             
                                    <ForumProvider>
                                        <LectorPage />
                                    </ForumProvider>
                           
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </MemoryRouter>
            )
        })
     
        const lang = screen.getByText("Lector:")
            expect(lang).toBeInTheDocument()
            const showMore= screen.getByText("Show More")
            expect(showMore).toBeInTheDocument()

    })

    test('renders OneCourse with details', async () => {

        await act(async () => {
            const { debug, getByText } = render(

                <MemoryRouter>
                    <UserProvider>
                        <Provider store={store}>
                            <CourseProvider >


                             
                                    <ForumProvider>
                                        <SignUpCourse />
                                    </ForumProvider>
                           
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </MemoryRouter>
            )
        })
     
        const lang = screen.getByText("credits")
            expect(lang).toBeInTheDocument()
    

    })

})