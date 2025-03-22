import store from '../src/services/store';

import { stellarBurgerReducer } from '../src/slice/stellarBurgerSlice';

describe('rootReducer', () => {
  test('UNKNOWN_ACTION и undefined возвращает предыдущее состояние хранилища', () => {
    const before = store.getState();
    const after = stellarBurgerReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(before.stellarBurger).toEqual(after);
  });
});
