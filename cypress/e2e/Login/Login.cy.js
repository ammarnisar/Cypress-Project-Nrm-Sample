/// <reference types="cypress" />

describe('Login Test with Default User', () => {

   
    beforeEach(()=>{

    });


    it('should log in with default credentials', () => {
        debugger;
      cy.loginwithOOp(); // Logs in with defaultUser from fixture
      debugger;
      // Add assertions or further actions here
    });
    it('should log in with the first user from the users array', () => {
        cy.visit('/')
        cy.loginwithOOp(0); // Logs in with the first user from the users array
        // Add assertions or further actions here
      });

  });
  