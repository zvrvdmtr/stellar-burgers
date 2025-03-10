import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectOrders } from '../../slice/stellarBurgerSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchFeed } from '../../slice/stellarBurgerSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
