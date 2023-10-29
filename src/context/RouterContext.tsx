import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <h1>Hello there!</h1>,
	},
]);

export const RouterContextProvider: FC = () => {
	return <RouterProvider router={router} />;
};
