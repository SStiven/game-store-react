import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import PublishersList from "./publisher/list-all/PublisherList.tsx";
import ErrorPage from "./common/pages/ErrorPage.tsx";
import CreatePublisher from "./publisher/create/CreatePublisher.tsx";

const router = createBrowserRouter([
    {
        path: "/publishers",
        element: <PublishersList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/publishers/create",
        element: <CreatePublisher />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
