import {
  addIngredient,
  removeIngredient,
  stellarBurgerReducer,
  initialState,
  moveIngredientUp,
  moveIngredientDown,
  closeOrder
} from '../src/slice/stellarBurgerSlice';

const bunMock = {
  _id: 'testBunId',
  id: 'testBunId',
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
};

const firstIngredientMock = {
  _id: 'testFirstIngredientId',
  id: 'testFirstIngredientId',
  name: 'Ингредиент номер один',
  type: 'main',
  proteins: 200,
  fat: 200,
  carbohydrates: 200,
  calories: 2000,
  price: 600,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const secondIngredientMock = {
  _id: 'testSecondIngredientId',
  id: 'testSecondIngredientIdь',
  name: 'Ингредиент номер два',
  type: 'main',
  proteins: 300,
  fat: 300,
  carbohydrates: 300,
  calories: 3000,
  price: 1500,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

describe('Тестирование addIngredient', () => {
  test('Добавление булки в конструктор', () => {
    const state = stellarBurgerReducer(initialState, addIngredient(bunMock));

    expect(state.constructorItems.bun).toEqual(bunMock);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  test('Добавление ингредиента в конструктор', () => {
    const state = stellarBurgerReducer(
      initialState,
      addIngredient(firstIngredientMock)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(firstIngredientMock);
    expect(state.constructorItems.bun).toEqual({ price: 0 });
  });

  test('Удаление ингредиента из конструктора', () => {
    const _initialState = {
      ...initialState,
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [firstIngredientMock, secondIngredientMock]
      }
    };

    const state = stellarBurgerReducer(
      _initialState,
      removeIngredient(firstIngredientMock)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(secondIngredientMock);
    expect(state.constructorItems.bun).toEqual({ price: 0 });
  });

  test('Передвижение ингредиента вниз', () => {
    const _initialState = {
      ...initialState,
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [firstIngredientMock, secondIngredientMock]
      }
    };

    const state = stellarBurgerReducer(
      _initialState,
      moveIngredientDown(firstIngredientMock)
    );

    expect(state.constructorItems.ingredients).toHaveLength(2);
    expect(state.constructorItems.ingredients[0]).toEqual(secondIngredientMock);
    expect(state.constructorItems.ingredients[1]).toEqual(firstIngredientMock);
    expect(state.constructorItems.bun).toEqual({ price: 0 });
  });

  test('Передвижение ингредиента вверх', () => {
    const _initialState = {
      ...initialState,
      constructorItems: {
        bun: {
          price: 0
        },
        ingredients: [firstIngredientMock, secondIngredientMock]
      }
    };

    const state = stellarBurgerReducer(
      _initialState,
      moveIngredientUp(secondIngredientMock)
    );

    expect(state.constructorItems.ingredients).toHaveLength(2);
    expect(state.constructorItems.ingredients[0]).toEqual(secondIngredientMock);
    expect(state.constructorItems.ingredients[1]).toEqual(firstIngredientMock);
    expect(state.constructorItems.bun).toEqual({ price: 0 });
  });

  test('Очистка конструктора после закрытия заказа', () => {
    const _initialState = {
      ...initialState,
      constructorItems: {
        bun: bunMock,
        ingredients: [firstIngredientMock, secondIngredientMock]
      }
    };

    const state = stellarBurgerReducer(_initialState, closeOrder());

    expect(state.constructorItems.ingredients).toHaveLength(0);
    expect(state.constructorItems.bun).toEqual({ price: 0 });
  });
});
