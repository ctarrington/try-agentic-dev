export interface CarData {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  mileage: number;
}

Cypress.Commands.add('addCar', (car: CarData) => {
  cy.contains('button', '+ Add Car').click();
  cy.get('#make').clear().type(car.make);
  cy.get('#model').clear().type(car.model);
  cy.get('#year').type('{selectall}' + String(car.year));
  cy.get('#color').clear().type(car.color);
  cy.get('#price').type('{selectall}' + String(car.price));
  cy.get('#mileage').type('{selectall}' + String(car.mileage));
  cy.contains('button', 'Add Car').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addCar(car: CarData): Chainable<void>;
    }
  }
}
