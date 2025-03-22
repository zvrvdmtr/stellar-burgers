import * as ingredientsFixture from '../fixtures/ingredients.json';
import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/');
  });

  describe('Проверка что в модальном окне открывается выбранный ингредиент', () => {
    it('Модальное окно ингредиента', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      const bunModal = cy.get('#modals').children().should('have.length', 2);
      bunModal.get('h3').contains(ingredientsFixture.data[0].name);
      bunModal
        .get('li > p:nth-child(2)')
        .contains(ingredientsFixture.data[0].calories);
      bunModal
        .get('li:nth-child(2) > p:nth-child(2)')
        .contains(ingredientsFixture.data[0].proteins);
      bunModal
        .get('li:nth-child(3) > p:nth-child(2)')
        .contains(ingredientsFixture.data[0].fat);
      bunModal
        .get('li:nth-child(4) > p:nth-child(2)')
        .contains(ingredientsFixture.data[0].carbohydrates);
    });
  });

  describe('Проверка что модальное окно закрывается', () => {
    it('Модальное окно ингредиента', () => {
      cy.get('[data-ingredient="bun"]:first-of-type').click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals button').click();
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Оформление заказа если пользователь не авторизован', () => {
    it('Модальное окно ингредиента', () => {
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').click();
      cy.get('button').contains('Войти');
    });
  });

  describe('Оформление заказа если пользователь авторизован', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });

      cy.visit('http://localhost:4000/');
    });

    it('Модальное окно заказа', () => {
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('#modals h2').contains(orderFixture.order.number);
      cy.get('#modals button').click();
      cy.get('[data-order-button]').should('be.disabled');
    });
  });
});
