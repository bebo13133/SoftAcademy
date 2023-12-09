
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import { Provider } from 'react-redux';
import { CourseProvider } from '../contexts/CourseContext';
import Blog from './Blog';
import store from '../../store/store';
// Заменете 'path-to-your-Blog-component' с реалния път към компонента Blog.
describe('Blog Component', () => {
    test('renders Blog component', async () => {
        render(
            <MemoryRouter>
                <UserProvider isAuthentication={true}>
                    <Provider store={store}>
                        <CourseProvider>
                            <Blog />


                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        );


        const blogHeader = screen.getByText('News and Articles');
        expect(blogHeader).toBeInTheDocument();



        const newsArticles = screen.getAllByTestId('news-article');
        expect(newsArticles.length).toBeGreaterThan(0);





    });

    test('fetches and renders news articles from API', async () => {

        const mockNewsData = {
            articles: [
                { title: 'Article 1', author: 'Author 1', description: 'Description 1', thumbnail: 'image1.jpg' },
                { title: 'Article 2', author: 'Author 2', description: 'Description 2', thumbnail: 'image2.jpg' },

            ],
        };


        window.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockNewsData),
        });


        render(
            <MemoryRouter>
                <UserProvider isAuthentication={true}>
                    <Provider store={store}>
                        <CourseProvider>
                            <Blog />


                        </CourseProvider>
                    </Provider>
                </UserProvider>
            </MemoryRouter>
        );


        await waitFor(() => {
            const newsArticles = screen.getAllByTestId('news-article');
            console.log(newsArticles);
            expect(newsArticles.length+1).toBe(mockNewsData.articles.length);
            newsArticles.forEach((article, index) => {
                expect(article).toHaveTextContent(mockNewsData.articles[index].title);
            });
        });
    });

})