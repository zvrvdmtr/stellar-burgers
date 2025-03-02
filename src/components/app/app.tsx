import { ConstructorPage, Feed, Login, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  selectIngredients,
  fetchIngredients
} from '../../slice/stellarBurgerSlice';
import { useSelector, useDispatch } from '../../services/store';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='feed' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='ingredients' onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='profile' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};
