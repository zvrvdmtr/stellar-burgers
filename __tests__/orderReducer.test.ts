import {
  fetchOrder,
  fetchUserOrders,
  initialState,
  fetchFeed,
  stellarBurgerReducer
} from '../src/slice/stellarBurgerSlice';

const ordersMock = {
  success: true,
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      _id: '111',
      status: 'done',
      name: 'TEST_NAME',
      createdAt: '2024-04-19T09:03:52.748Z',
      updatedAt: '2024-04-19T09:03:58.057Z',
      number: 111
    }
  ],
  total: 1,
  totalToday: 1
};

describe('Тестирование fetchOrder', () => {
  test('fetchOrder.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchOrder.pending('pending', 111)
    );
    expect(state.error).toEqual('');
    expect(state.loading).toBeTruthy();
  });

  test('fetchOrder.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchOrder.fulfilled(ordersMock.orders[0], 'fulfilled', 111)
    );

    expect(state.error).toEqual('');
    expect(state.orderModalData).toEqual(ordersMock.orders[0]);
    expect(state.loading).toBeFalsy();
  });

  test('fetchOrder.rejected', () => {
    const error = 'orderReducer.rejected';

    const state = stellarBurgerReducer(
      initialState,
      fetchOrder.rejected(new Error(error), 'rejected', 111)
    );

    expect(state.loading).toBeFalsy();
  });
});

describe('Тестирование fetchUserOrders', () => {
  test('fetchUserOrders.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchUserOrders.pending('pending')
    );
    expect(state.error).toEqual('');
    expect(state.loading).toBeTruthy();
  });

  test('fetchUserOrders.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchUserOrders.fulfilled(ordersMock.orders, 'fulfilled')
    );

    expect(state.error).toEqual('');
    expect(state.userOrders).toEqual(ordersMock.orders);
    expect(state.loading).toBeFalsy();
  });

  test('fetchUserOrders.rejected', () => {
    const error = 'fetchUserOrders.rejected';

    const state = stellarBurgerReducer(
      initialState,
      fetchUserOrders.rejected(new Error(error), 'rejected')
    );

    expect(state.loading).toBeFalsy();
  });
});

describe('Тестирование fetchFeed', () => {
  test('fetchFeed.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchFeed.pending('pending')
    );
    expect(state.error).toEqual('');
    expect(state.loading).toBeTruthy();
  });

  test('fetchFeed.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchFeed.fulfilled(ordersMock, 'fulfilled')
    );

    expect(state.error).toEqual('');
    expect(state.orders).toEqual(ordersMock.orders);
    expect(state.totalOrders).toEqual(ordersMock.total);
    expect(state.totalToday).toEqual(ordersMock.totalToday);
    expect(state.loading).toBeFalsy();
  });

  test('fetchFeed.rejected', () => {
    const error = 'fetchFeed.rejected';

    const state = stellarBurgerReducer(
      initialState,
      fetchFeed.rejected(new Error(error), 'rejected')
    );

    expect(state.loading).toBeFalsy();
  });
});
