import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { TopProjects } from './TopProjects';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { CourseProvider } from '../contexts/CourseContext';


// Mock на forumService
const mockProjects = [
  { _id: '1', title: 'Project 1',  },
  { _id: '2', title: 'Project 2',  }
];

vi.mock('../Services/forumService', () => ({
  forumServiceFactory: () => ({
    getAllProjects: vi.fn(() => Promise.resolve(mockProjects))
  })
}));

describe('TopProjects Component', () => {
  beforeEach(() => {
  
    render(
        <MemoryRouter>
            <UserProvider isAuthentication={true}>
                <Provider store={store}>
                    <CourseProvider>
                        <TopProjects />


                    </CourseProvider>
                </Provider>
            </UserProvider>
        </MemoryRouter>
    );

  });

  it('renders the component correctly', async () => {
    // Проверка за заглавието
    expect(screen.getByText('Educational Ambitions: Selected Top Student Projects Demonstrating the Power of Learning and Development')).toBeInTheDocument();

    // Проверка за асинхронното зареждане на проекти
    await waitFor(() => {
      mockProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });
});
