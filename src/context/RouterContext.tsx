import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from '$pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

export const RouterContextProvider: FC = () => {
	return <RouterProvider router={router} />;
};
