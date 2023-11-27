import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';
import {  CourseProvider } from '../contexts/CourseContext';
import CatalogCourses from './CatalogCourses';
import { vi, describe, test, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UserProvider } from '../contexts/UserContext';
import { Provider } from 'react-redux';
import store from '../../store/store';
import 'intersection-observer';

import '@testing-library/jest-dom';
import { OneCourse } from './OneCourse';

describe('CatalogCourses component', () => {
    test('Renders courses when available', async () => {

        await act(async () => {
            const { debug, getByText } = render(

                <MemoryRouter>
                    <UserProvider>
                        <Provider store={store}>
                            <CourseProvider >



                                <CatalogCourses />
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </MemoryRouter>
            )
        })
        await waitFor(async () => {

            const altElements = screen.getAllByAltText("explore person")
            if (altElements.length > 0) {
                await waitFor(() => {
                    altElements.forEach((altElement) => {
                        expect(altElement).toBeInTheDocument();
                    });
                })
            } else {
                await waitFor(() => {
                    expect(screen.getByText('No articles yet')).toBeInTheDocument();
                });

            }

        });
    })

test("read more buttons", async() => {
    await act(async () => {
        const { debug, getByText } = render(

            <MemoryRouter>
                <UserProvider>
                    <Provider store={store}>
                        <CourseProvider >



                            <CatalogCourses />
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )
    })
    const readMoreButton = screen.getByText('Read more...')

    userEvent.click(readMoreButton);

})

test("favorite buttons", async() => {

    const handleBookmarkToggleMock = vi.fn();

    await act(async () => {
        const { debug, getByText } = render(

            <MemoryRouter>
                <UserProvider>
                    <Provider store={store}>
                        <CourseProvider >



                            <OneCourse handleBookmarkToggle={handleBookmarkToggleMock}/>
                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        )
    })

    const heartIcon = screen.getByTestId('heart-icon');
    expect(heartIcon).toBeVisible();
 
fireEvent.click(heartIcon);


})
})