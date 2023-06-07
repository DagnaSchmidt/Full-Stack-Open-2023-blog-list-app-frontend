describe('Blog App', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened with login page', function() {
    cy.contains('login');
  });

  it('login form ', function() {
    cy.get('#username').type('Dagna');
    cy.get('#password').type('password');
    cy.get('#loginBtn').click();

    cy.contains('Dagna logged in');
  });

});