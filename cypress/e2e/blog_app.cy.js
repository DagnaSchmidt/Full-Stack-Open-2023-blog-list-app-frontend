describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {         
      username: 'Dagna',      
      password: 'password'    
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
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

  describe('when user is logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Dagna');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();
    });

    it('blog can be added', function() {
      cy.contains('add new blog').click();
      cy.get('#title').type('Det forsta mordet');
      cy.get('#author').type('John Lawrence Reynolds');
      cy.get('#url').type('someurl');
      cy.get('#addBtn').click();
      cy.get('#errorMessage', { timeout: 10000 }).should('be.visible', 'have-css', 'border-color', 'rgb(0,128,0)');
      cy.get('#errorMessage', { timeout: 10000 }).contains('a new blog: Det forsta mordet successfully added!');
      cy.contains('Det forsta mordet');
    })

    describe('when there is one blog', function() {
      beforeEach(function() {
        cy.contains('add new blog').click();
        cy.get('#title').type('Det forsta mordet');
        cy.get('#author').type('John Lawrence Reynolds');
        cy.get('#url').type('someurl');
        cy.get('#addBtn').click();
      });
  
      it('user can view and hide details of a blog', function() {
        cy.contains('view details');
        cy.get('#detailsBtn').click();
        cy.contains('someurl');
        cy.contains('hide details');
        cy.get('#detailsBtn').click();
        cy.contains('view details');
      });

      it('user can like a blog', function() {
        cy.get('#detailsBtn').click();
        cy.contains('add');
        cy.get('#addBtn').click();
        cy.contains('1');
      })
    });

  });

});