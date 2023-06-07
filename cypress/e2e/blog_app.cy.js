describe('Blog App', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened with login page', function() {
    cy.contains('login');
  });

  it('login form success', function() {
    cy.get('#username').type('Dagna');
    cy.get('#password').type('password');
    cy.get('#loginBtn').click();

    cy.contains('Dagna logged in');
  });

  it('login form failure', function() {
    cy.get('#username').type('D');
    cy.get('#password').type('p');
    cy.get('#loginBtn').click();

    cy.contains('login');
    cy.get('#errorMessage', { timeout: 10000 }).should('be.visible', 'have-css', 'border-color', 'rgb(255, 0, 0)');

  });

});