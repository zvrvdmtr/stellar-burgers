import {
  initialState,
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  stellarBurgerReducer
} from '../src/slice/stellarBurgerSlice';

const user = {
  email: 'test@test.ru',
  name: 'Test'
};

const userMock = {
  success: true,
  user: user
};

const authMock = {
  success: true,
  refreshToken: 'TEST_REFRESH_TOKEN',
  accessToken: 'TEST_ACCESS_TOKEN',
  user: user
};

const registerMock = {
  email: user.email,
  name: user.name,
  password: 'Test'
};

const loginMock = {
  email: 'test@test.ru',
  password: 'Test'
};

const updateMock = {
  email: 'test2@test.ru',
  name: 'Test2',
  password: 'Test'
};

const updateUserMock = {
  user: {
    email: 'test2@test.ru',
    name: 'Test2'
  },
  success: true
};

describe('Тестирование registerUser', () => {
  test('registerUser.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      registerUser.pending('pending', registerMock)
    );

    expect(state.error).toEqual('');
  });

  test('registerUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      registerUser.fulfilled(authMock, 'fulfilled', registerMock)
    );

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.error).toEqual('');
  });

  test('registerUser.rejected', () => {
    const error = 'registerUser.rejected';

    const state = stellarBurgerReducer(
      initialState,
      registerUser.rejected(new Error(error), 'rejected', registerMock)
    );

    expect(state.error).toEqual(error);
  });
});

describe('Тестирование loginUser', () => {
  test('loginUser.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      loginUser.pending('pending', loginMock)
    );

    expect(state.error).toEqual('');
  });

  test('loginUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      loginUser.fulfilled(authMock, 'fulfilled', loginMock)
    );

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.error).toEqual('');
  });

  test('loginUser.rejected', () => {
    const error = 'loginUser.rejected';

    const state = stellarBurgerReducer(
      initialState,
      loginUser.rejected(new Error(error), 'rejected', loginMock)
    );

    expect(state.error).toEqual(error);
  });
});

describe('Тестирование loginUser', () => {
  test('loginUser.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      loginUser.pending('pending', loginMock)
    );

    expect(state.error).toEqual('');
  });

  test('loginUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      loginUser.fulfilled(authMock, 'fulfilled', loginMock)
    );

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.error).toEqual('');
  });

  test('loginUser.rejected', () => {
    const error = 'loginUser.rejected';

    const state = stellarBurgerReducer(
      initialState,
      loginUser.rejected(new Error(error), 'rejected', loginMock)
    );

    expect(state.error).toEqual(error);
  });
});

describe('Тестирование getUser', () => {
  test('getUser.pending', () => {
    const state = stellarBurgerReducer(
      initialState,
      getUser.pending('pending')
    );

    expect(state.error).toEqual('');
  });

  test('getUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      initialState,
      getUser.fulfilled(userMock, 'fulfilled')
    );

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.user).toEqual(userMock.user);
    expect(state.error).toEqual('');
  });

  test('getUser.rejected', () => {
    const error = 'getUser.rejected';

    const state = stellarBurgerReducer(
      initialState,
      getUser.rejected(new Error(error), 'rejected')
    );

    expect(state.user.name).toEqual('');
    expect(state.user.email).toEqual('');
  });
});

describe('Тестирование logoutUser', () => {
  const _initialState = { ...initialState, user: user, isAuthenticated: true };

  test('logoutUser.pending', () => {
    const state = stellarBurgerReducer(
      _initialState,
      logoutUser.pending('pending')
    );

    expect(state.error).toEqual('');
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBeTruthy();
  });

  test('logoutUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      _initialState,
      logoutUser.fulfilled(userMock, 'fulfilled')
    );

    expect(state.isAuthenticated).toBeFalsy();
    expect(state.user.email).toEqual('');
    expect(state.user.name).toEqual('');
    expect(state.error).toEqual('');
  });

  test('logoutUser.rejected', () => {
    const error = 'logoutUser.rejected';

    const state = stellarBurgerReducer(
      _initialState,
      logoutUser.rejected(new Error(error), 'rejected')
    );

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBeTruthy();
  });
});

describe('Тестирование updateUser', () => {
  const _initialState = { ...initialState, user: user, isAuthenticated: true };

  test('updateUser.pending', () => {
    const state = stellarBurgerReducer(
      _initialState,
      updateUser.pending('pending', updateMock)
    );

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBeTruthy();
  });

  test('updateUser.fulfilled', () => {
    const state = stellarBurgerReducer(
      _initialState,
      updateUser.fulfilled(updateUserMock, 'fulfilled', updateMock)
    );

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.user).toEqual(updateUserMock.user);
    expect(state.error).toEqual('');
  });

  test('updateUser.rejected', () => {
    const error = 'updateUser.rejected';

    const state = stellarBurgerReducer(
      _initialState,
      updateUser.rejected(new Error(error), 'rejected', updateMock)
    );

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBeTruthy();
  });
});
