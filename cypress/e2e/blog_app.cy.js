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
      });

      it('user who created a blog can delete it', function() {
        cy.get('#detailsBtn').click();
        cy.contains('add');
        cy.contains('remove blog');
        cy.get('#deleteBtn').click();
        cy.get('Det forsta mordet').should('not.exist');
      });

      it('user who did not create a blog, can not see remove blog btn', function() {
        cy.get('#logoutBtn', { timeout: 10000 }).click();
        const user2 = {         
          username: 'Ola',      
          password: 'password2'
        };
        cy.request('POST', 'http://localhost:3000/api/users/', user2);
        cy.get('#username').type('Ola');
        cy.get('#password').type('password2');
        cy.get('#loginBtn').click();
        cy.get('#detailsBtn').click();
        cy.get('#deleteBtn').should('not.exist');
      });
    });

    describe('when there are 3 blogs', function() {
      beforeEach(function() {
        cy.contains('add new blog').click();
        cy.get('#title').type('Det forsta mordet');
        cy.get('#author').type('John Lawrence Reynolds');
        cy.get('#url').type('someurl');
        cy.get('#addBtn').click();

        cy.contains('add new blog').click();
        cy.get('#title').type('Hjalp jag heter Zbigniew');
        cy.get('#author').type('Zbigniew Kuklarz');
        cy.get('#url').type('someurl');
        cy.get('#addBtn').click();

        cy.contains('add new blog').click();
        cy.get('#title').type('Hemligheten i Helmersbruk');
        cy.get('#author').type('Eva Frantz');
        cy.get('#url').type('someurl');
        cy.get('#addBtn').click();
      });

      it('check if blogs order is by most likes', function() {
        cy.get('.detailsBtn').eq(2).click();
        cy.get('#addBtn').click();
        cy.get('.title').eq(0).contains('Det forsta mordet');
      });

    });
    
  });

});