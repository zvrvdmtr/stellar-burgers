import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  newOrder,
  selectIsAuthenticated,
  closeOrder
} from '../../slice/stellarBurgerSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login', { replace: true });
    }

    if (!constructorItems.bun || orderRequest) return;
    const ids = constructorItems.ingredients.map((item) => item._id);
    dispatch(
      newOrder([constructorItems.bun._id!, ...ids, constructorItems.bun._id!])
    );
  };
  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun?.price ?? 0 * 2) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
