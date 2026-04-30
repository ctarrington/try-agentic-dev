const CIVIC = { make: 'Honda', model: 'Civic', year: 2020, color: 'Blue', price: 18000, mileage: 35000 };
const MUSTANG = { make: 'Ford', model: 'Mustang', year: 2022, color: 'Red', price: 42000, mileage: 8000 };

describe('Car Inventory', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('empty state', () => {
    it('shows the empty message when there are no cars', () => {
      cy.contains('No cars in inventory').should('be.visible');
      cy.matchImageSnapshot('empty-state');
    });

    it('does not show the car grid', () => {
      cy.get('.car-grid').should('not.exist');
      cy.matchImageSnapshot('empty-state-no-grid');
    });
  });

  describe('adding a car', () => {
    it('shows the form when Add Car is clicked', () => {
      cy.contains('+ Add Car').click();
      cy.contains('h2', 'Add Car').should('be.visible');
      cy.matchImageSnapshot('add-car-form-open');
    });

    it('hides the form after cancelling', () => {
      cy.contains('+ Add Car').click();
      cy.contains('button', 'Cancel').click();
      cy.contains('h2', 'Add Car').should('not.exist');
      cy.matchImageSnapshot('add-car-form-cancelled');
    });

    it('adds a car and shows it in the grid', () => {
      cy.addCar(CIVIC);
      cy.contains('.car-card', '2020 Honda Civic').should('be.visible');
      cy.contains('.car-card', '$18,000').should('be.visible');
      cy.contains('.car-card', '35,000 mi').should('be.visible');
      cy.matchImageSnapshot('add-car-civic-in-grid');
    });

    it('clears the form after adding', () => {
      cy.addCar(CIVIC);
      cy.get('.car-form').should('not.exist');
      cy.matchImageSnapshot('add-car-form-dismissed');
    });

    it('can add multiple cars', () => {
      cy.addCar(CIVIC);
      cy.addCar(MUSTANG);
      cy.get('.car-card').should('have.length', 2);
      cy.matchImageSnapshot('add-car-two-cars');
    });
  });

  describe('editing a car', () => {
    beforeEach(() => {
      cy.addCar(CIVIC);
    });

    it('populates the form with the car data', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Edit').click());
      cy.get('#make').should('have.value', 'Honda');
      cy.get('#model').should('have.value', 'Civic');
      cy.get('#year').should('have.value', '2020');
      cy.get('#price').should('have.value', '18000');
      cy.get('#mileage').should('have.value', '35000');
      cy.matchImageSnapshot('edit-car-form-populated');
    });

    it('shows "Edit Car" heading', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Edit').click());
      cy.contains('h2', 'Edit Car').should('be.visible');
      cy.matchImageSnapshot('edit-car-form-heading');
    });

    it('updates the card after saving', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Edit').click());
      cy.get('#mileage').type('{selectall}40000');
      cy.contains('button', 'Save Changes').click();
      cy.contains('.car-card', '40,000 mi').should('be.visible');
      cy.matchImageSnapshot('edit-car-updated-mileage');
    });

    it('cancelling edit does not modify the car', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Edit').click());
      cy.get('#mileage').type('{selectall}99999');
      cy.contains('button', 'Cancel').click();
      cy.contains('.car-card', '35,000 mi').should('be.visible');
      cy.matchImageSnapshot('edit-car-cancelled');
    });
  });

  describe('deleting a car', () => {
    beforeEach(() => {
      cy.addCar(CIVIC);
      cy.addCar(MUSTANG);
    });

    it('removes the car from the grid', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Delete').click());
      cy.contains('.car-card', 'Honda').should('not.exist');
      cy.matchImageSnapshot('delete-car-honda-removed');
    });

    it('leaves other cars intact', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Delete').click());
      cy.contains('.car-card', 'Ford').should('be.visible');
      cy.matchImageSnapshot('delete-car-ford-remains');
    });

    it('shows the empty message when all cars are deleted', () => {
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Delete').click());
      cy.contains('.car-card', 'Ford').within(() => cy.contains('button', 'Delete').click());
      cy.contains('No cars in inventory').should('be.visible');
      cy.matchImageSnapshot('delete-car-all-removed');
    });
  });

  describe('persistence', () => {
    it('retains cars after a page reload', () => {
      cy.addCar(CIVIC);
      cy.reload();
      cy.contains('.car-card', '2020 Honda Civic').should('be.visible');
      cy.matchImageSnapshot('persistence-reload-retains-car');
    });

    it('retains edits after a page reload', () => {
      cy.addCar(CIVIC);
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Edit').click());
      cy.get('#mileage').type('{selectall}50000');
      cy.contains('button', 'Save Changes').click();
      cy.reload();
      cy.contains('.car-card', '50,000 mi').should('be.visible');
      cy.matchImageSnapshot('persistence-reload-retains-edit');
    });

    it('does not restore deleted cars after a page reload', () => {
      cy.addCar(CIVIC);
      cy.contains('.car-card', 'Honda').within(() => cy.contains('button', 'Delete').click());
      cy.reload();
      cy.contains('No cars in inventory').should('be.visible');
      cy.matchImageSnapshot('persistence-reload-delete-persists');
    });
  });
});
