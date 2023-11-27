
import { render,screen, waitFor,fireEvent, act } from '@testing-library/react';

import { UserProvider, useAuthContext ,token,isAuthentication} from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header/Header';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi ,beforeEach} from 'vitest';

import 'intersection-observer';





describe('Header component', () => {
    let renderComponent

    
    beforeEach(() => {
  
  
        renderComponent = render(
            <BrowserRouter >
                <UserProvider >
                    <Header />
                </UserProvider>
            </BrowserRouter>
        )
    })  

    test('Navigate to catalog',async () => {
      
        const coursesLink = screen.getByText(/courses/i);
        expect(coursesLink).toBeInTheDocument();
    
  
        userEvent.click(coursesLink);
    
        
        await waitFor(() => {
       
          expect(window.location.pathname).toBe('/catalog');
        });

    })
    test('Navigate to catalog',async () => {
   
        const homeLink = screen.getByText(/home/i);
        expect(homeLink).toBeInTheDocument();
    
  
        userEvent.click(homeLink);
    
        
        await waitFor(() => {
       
          expect(window.location.pathname).toBe('/');
        });

    })
    test('Navigate to catalog',async () => {
     
        const contactLink = screen.getByText(/contact/i);
        expect(contactLink).toBeInTheDocument();
    
  
        userEvent.click(contactLink);
    
        
        await waitFor(() => {
       
          expect(window.location.pathname).toBe('/contact');
        });

    })





   

    
})

describe('Header component auth component', async() => {
    let renderComponent


    beforeEach(() => {
  
        renderComponent = render(
            <MemoryRouter >
                <UserProvider >
                    <Header />
                </UserProvider>
            </MemoryRouter>)
    })
    screen.debug();


    test('Navigate to create',async () => {
    
   
 waitFor(() => {
    const addLink = screen.getByText("add course");
    expect(addLink).toBeInTheDocument();
    userEvent.click(addLink);
    expect(window.location.pathname).toBe('/create');


    });


})
test('Navigate to forum',async () => {
    
   
    waitFor(() => {
        const addLink = screen.getByText("forum");
        expect(addLink).toBeInTheDocument();
    
    
        userEvent.click(addLink);
          expect(window.location.pathname).toBe('/forum');
        });
    
    })
    test('Navigate to news',async () => {
    
   
        waitFor(() => {
            const addLink = screen.getByText("news");
            expect(addLink).toBeInTheDocument();
        
        
            userEvent.click(addLink);
              expect(window.location.pathname).toBe('/blog');
            });
        
        })
        test('Navigate to admin', () => {
    
   
            waitFor(() => {
                const addLink = screen.getByText("admin");
                expect(addLink).toBeInTheDocument();          
                userEvent.click(addLink);
                  expect(window.location.pathname).toBe('/admin');
                });
            
            })

})
describe('Header component', () => {
    let renderComponent


    beforeEach(() => {
const props ={
    isAuthentication:true,
}
         render(
            <MemoryRouter >
                <UserProvider value={isAuthentication=true}>
                    <Header {...props} />
                </UserProvider >
            </MemoryRouter>)
    })

    it('negative Navigate to admin', () => {
        const adminLink = screen.getByText("admin");
        expect(adminLink).toBeInTheDocument();
        
        userEvent.click(adminLink);
        waitFor(() => {
      

            // Тук можете да използвате async/await, ако ви е необходимо
            waitFor(() => {
                expect(window.location.pathname).toBe('/admin');
            });
        });;
        
        })
})