import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Explore from './pages/Explore';
import RecipeDetail from './pages/RecipeDetail';
import MyRecipes from './pages/MyRecipes';
import Ingredients from './pages/Ingredients';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="explore" element={<Explore />} />
            <Route path="recipe/:id" element={<RecipeDetail />} />
            <Route
              path="my-recipes"
              element={
                <ProtectedRoute>
                  <MyRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="ingredients"
              element={
                <ProtectedRoute>
                  <Ingredients />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
