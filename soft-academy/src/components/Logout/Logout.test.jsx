import { render,screen, waitFor } from '@testing-library/react';
import { Logout } from './Logout';
import { UserProvider, useAuthContext } from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header/Header';
import { ResponsiveUserBar } from '../ResponsiveUserBar';
import userEvent from '@testing-library/user-event';


describe('Logout component', () => {
    test('should log out the user and navigate to "/"',async () => {

     

        render(
            <BrowserRouter>
                <UserProvider>
                    <ResponsiveUserBar />
                </UserProvider>
            </BrowserRouter>
        );
        const avatarButton = document.getElementsByClassName('user-avatar-button')[0];
        expect(avatarButton).toBeInTheDocument();
   
        userEvent.click(avatarButton);
      

        await waitFor(() => {
        const logoutButton = screen.getByRole('button', { name: "Logout"});
         expect(logoutButton).toBeInTheDocument();
         userEvent.click(logoutButton);
           expect(window.location.pathname).toBe('/');
          

        })
    
    });
    
});
