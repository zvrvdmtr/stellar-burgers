import {
  getIngredientsApi,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrder,
  TConstructorItems,
  TUser,
  TConstructorIngredient
} from '@utils-types';
import { setCookie } from '../utils/cookie';
import { stat } from 'fs';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  constructorItems: TConstructorItems;
  user: TUser;
  orders: TOrder[];
  totalOrders: number;
  totalToday: number;
  userOrders: TOrder[];
  isAuthenticated: boolean;
  error: string;
};

export const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderRequest: false,
  orderModalData: null,
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  user: {
    email: '',
    name: ''
  },
  orders: [],
  totalOrders: 0,
  totalToday: 0,
  userOrders: [],
  isAuthenticated: false,
  error: ''
};

const stellarBurgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: action.payload.id
        });
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveIngredientUp(state, action: PayloadAction<TConstructorIngredient>) {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(index);
      const temp = state.constructorItems.ingredients[index - 1];
      state.constructorItems.ingredients[index - 1] =
        state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] = temp;
    },
    moveIngredientDown(state, action: PayloadAction<TConstructorIngredient>) {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const temp = state.constructorItems.ingredients[index + 1];
      state.constructorItems.ingredients[index + 1] =
        state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] = temp;
    },
    closeOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.constructorItems = {
        bun: {
          price: 0
        },
        ingredients: []
      };
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.totalOrders,
    selectTotalToday: (state) => state.totalToday,
    selectErrors: (state) => state.error,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(newOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(newOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = { name: '', email: '' };
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const fetchFeed = createAsyncThunk('order/getAll', async () =>
  getFeedsApi()
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const newOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderId: number) => getOrderByNumberApi(orderId)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: TLoginData) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const {
  selectLoading,
  selectIngredients,
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectUser,
  selectIsAuthenticated,
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectErrors,
  selectUserOrders
} = stellarBurgerSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  closeOrder
} = stellarBurgerSlice.actions;
export const stellarBurgerReducer = stellarBurgerSlice.reducer;
