import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes/main.routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { inject } from "@vercel/analytics";

// inject();

export const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <MainRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
