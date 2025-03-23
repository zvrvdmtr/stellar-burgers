import {
  fetchIngredients,
  initialState,
  stellarBurgerReducer
} from '../src/slice/stellarBurgerSlice';

const ingredientsMock = [
  {
    _id: 'testId',
    name: 'Булка',
    type: 'bun',
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 1000,
    price: 500,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Тестирование fetchIngredients', () => {
  test('fetchIngredients.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(state.error).toEqual('');
    expect(state.loading).toBeTruthy();
  });

  test('fetchIngredients.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      fetchIngredients.fulfilled(ingredientsMock, 'fulfilled')
    );

    expect(state.error).toEqual('');
    expect(state.ingredients).toEqual(ingredientsMock);
    expect(state.loading).toBeFalsy();
  });

  test('fetchIngredients.rejected', () => {
    const error = 'fetchIngredients.rejected';

    const state = stellarBurgerReducer(
      initialState,
      fetchIngredients.rejected(new Error(error), 'rejected')
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toEqual(error);
  });
});
