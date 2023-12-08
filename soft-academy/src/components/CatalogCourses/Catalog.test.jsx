import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import {  MemoryRouter } from 'react-router-dom';
import {  CourseProvider } from '../contexts/CourseContext';
import CatalogCourses from './CatalogCourses';
import { vi, describe, test, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UserProvider, useAuthContext } from '../contexts/UserContext';
import { Provider } from 'react-redux';
import store from '../../store/store';
import 'intersection-observer';

import '@testing-library/jest-dom';
import { OneCourse } from './OneCourse';

// const {onLoginSubmit,onLogout} = useAuthContext()
vi.mock('path-to-your-authentication-hook', () => ({
    useAuthContext: () => ({
      user: { email: 'peter@abv.bg', password:123456 }, // Фиксирани данни за теста
      onLoginSubmit: vi.fn(user),
      onLogout: vi.fn(user),
    }),
  }));
  
  const testObject=[{
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "make": "Table",
        "model": "Swedish",
        "year": 2015,
        "description": "Medium table",
        "price": 235,
        "img": "./images/table.png",
        "material": "Hardwood",
        "_createdOn": 1615545143015,
        "_id": "53d4dbf5-7f41-47ba-b485-43eccb91cb95"
    }]
    // vi.mock('./CatalogCourses', () => {
    //     return {
    //       __esModule: true,
    //       default: (props) => {
    //         // Връща компонент със зададени props
    //         return <div>{props.data}</div>;
    //       }
    //     };
    //   });
describe('CatalogCourses component', () => {
    it('Renders courses when available', async () => {

        await act(async () => {
            const { debug, getByText } = render(

                <MemoryRouter>
                    <UserProvider isAuthentication={true}>
                        <Provider store={store}>
                            <CourseProvider >

                                <CatalogCourses data={testObject} />
                            </CourseProvider>
                        </Provider>
                    </UserProvider>
                </MemoryRouter>
            )
        })
         waitFor(async () => {

            const altElements = screen.getAllByText("explore person")
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

it("read more buttons", async() => {
    // await act(async () => {
        const AuthenticatedComponent = () => (
            <MemoryRouter>
              <UserProvider isAuthenticated={true}>
                <Provider store={store}>
                  <CourseProvider >
                    <CatalogCourses data={testObject} />
                  </CourseProvider>
                </Provider>
              </UserProvider>
            </MemoryRouter>
          );
    // })
    await act(async () => {
        render(<AuthenticatedComponent />);
      });
    const readMoreButton = screen.getByText('No articles yet')

    expect(readMoreButton).toBeInTheDocument()
  
        // const invalidMessage = screen.getByText('Unauthorized');
        // expect(invalidMessage).toBeInTheDocument();

})

// test("favorite buttons", async() => {

//     const handleBookmarkToggleMock = vi.fn();

//     await act(async () => {
//         const { debug, getByText } = render(

//             <MemoryRouter>
//                 <UserProvider>
//                     <Provider store={store}>
//                         <CourseProvider >



//                             <OneCourse handleBookmarkToggle={handleBookmarkToggleMock}/>
//                         </CourseProvider>
//                     </Provider>
//                 </UserProvider>
//             </MemoryRouter>
//         )
//     })

//     const heartIcon = screen.getByTestId('heart-icon');
//     expect(heartIcon).toBeVisible();
 
//     fireEvent.click(heartIcon);
  

 


// })
})