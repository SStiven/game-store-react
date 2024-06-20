import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import PublishersList from "./publisher/list-all/PublisherList.tsx";
import CreatePublisher from "./publisher/create/CreatePublisher.tsx";
import GamesList from "./game/list-all/GamesList.tsx";
import CreateGame from "./game/create/CreateGame.tsx";
import ErrorPage from "./common/pages/ErrorPage.tsx";

const router = createBrowserRouter([
    {
        path: "/publishers",
        element: <PublishersList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/publishers/create",
        element: <CreatePublisher />,
    },
    {
        path: "/games",
        element: <GamesList />,
    },
    {
        path: "/games/create",
        element: <CreateGame />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
