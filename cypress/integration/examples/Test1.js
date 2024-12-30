/// <reference types="cypress" />
import EventRepositoryPage from '../examples/EventRepositoryPage';

import { Session } from "inspector";

describe('My First test', function () {

  beforeEach(function () {

    // cy.logintesting('ammar.nisar@ebitlogix.com', 'Nrm@123456789')
    //cy.login('ammar.nisar@ebitlogix.com', 'Nrm@123456789')
    // Intercept the login network request

    //https://www.youtube.com/watch?v=yV1JIf5MMno seesion youtube implementation 
    //https://www.youtube.com/watch?v=hOJ50rINCkA // best video for session common seesion should be declared
    //  cy.clearCookies(); 
    //  cy.clearLocalStorage()
    //https://www.youtube.com/watch?v=WagvaUbp_-k&list=PLfgqOw2zXnx_qvLG8-wk4pK1Ckcwz7Tdx&index=16  (For sesion common method example from here)
    cy.session(
      'login',
      () => {
        cy.visit('/'); // Replace with the correct login URL if needed
        
        cy.get('input[type="email"]').type('ammar.nisar@ebitlogix.com');
        cy.get('input[type="password"]').type('Nrm@123456789');
        cy.contains('Login').click();
        cy.log('before');
        cy.get('h5').contains("Let's choose your model!", { timeout: 10000 }).should('be.visible')
        cy.log('after');
        //cy.wait(2000)
        cy.log('Login successfully');
        // cy.pause()
        // Wait for the application to load after login
        cy.url().then((currentUrl) => cy.log(`Current URL after login: ${currentUrl}`));
        //cy.pause()
        cy.url().should('include', '/auth/model-selection?'); // Adjust as per your post-login URL
        //  // cy.pause()
        //   cy.getCookies().then((cookies) => {
        //     debugger;
        //     cy.log('Cookies after login:', cookies);
        //   });
          // Model code  start
          cy.visit('/');
          cy.get('.e-float-input', { timeout: 10000 }).should('be.visible');
          cy.url().should('include', 'https://mdlz-uat.nrminsight.io/auth/model-selection'); 
         cy.get('#ej2_dropdownlist_2').click()
         cy.get('#ej2_dropdownlist_2', { timeout: 10000 }).should('be.visible');
         //  cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).should('be.visible');
         //  cy.get('#ej2_dropdownlist_6').click();
          cy.wait(1000)
         //  cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).find('[aria-describedby="ej2_dropdownlist_6"]').should('be.visible');
      
         //  cy.get('#ej2_dropdownlist_6').find('[aria-describedby="ej2_dropdownlist_6"]').type('Malaysia');
         cy.get('#ej2_dropdownlist_2_popup', { timeout: 10000 }).should('be.visible');
         cy.get('#ej2_dropdownlist_2_popup').find('input').type('Malaysia', { force: true });     
       
          cy.get('#ej2_dropdownlist_2_popup').find('#ej2_dropdownlist_2_options li div').contains('Malaysia');      
           
          cy.get('body').then($body => {
              // Check if '.e-content div' is visible in the DOM
              if ($body.find('.e-content div').length > 0) {
                  cy.get('.e-content div').contains('Malaysia').click();
                  // cy.get('.e-content div').should('be.visible').click(); // Click if visible
              } else {
                  cy.log('The option is not visible in the dropdown list'); // Log if not visible
              }
          });
          
          cy.contains('button', 'Proceed').click();
          cy.url().should('include', '/eventrepository');     
           // Model code  End
      },
      {
        // cacheAcrossSpecs: true, this one is used to work in overall project
        validate() {
          // Validate the existence of a session cookie or specific cookie
          cy.getCookie('ARRAffinity').then((cookie) => {
            if (cookie) {
              debugger;
              expect(cookie.value).to.not.be.empty;
              cy.log('Session is valid');
            } else {
              throw new Error('Session expired or cookie not found');
            }
          });

          cy.url().then((currentUrl) => cy.log(`Current URL after login: ${currentUrl}`));

        }
      }
    );

    

  })
  it('My First test cases', function () {
    cy.visit('/');     
  //  cy.get('h4').contains("Event Repository").should('be.visible'); 
    cy.url().should('include', '/eventrepository');
  })

  it('My Se test cases', function () {
   // cy.visit(Cypress.env('UAT')); // Ensure the base URL is configured correctly
    // cy.visit('https://test.nrminsight.io');
    // cy.get('.e-float-input', { timeout: 10000 }).should('be.visible');
    cy.visit('/'); 
    cy.get('body').then(($body) => {
      if ($body.find('h4:contains("Event Repository")').length) {
        // Text "Event Repository" exists and is visible
        cy.get('h4').contains("Event Repository").should('be.visible');
      } else if ($body.find('h4:contains("sideNav.eventRepository")').length) {
        // The side navigation event repository element exists
        cy.get('h4').contains("sideNav.eventRepository").should('be.visible');
        
      } else {
        // Neither condition is met
        throw new Error("Neither Event Repository text nor sideNav element found");
      }
    });
  })

  it('My third test cases', function () {
    // cy.visit(Cypress.env('UAT')); // Ensure the base URL is configured correctly    
     cy.visit('/'); 
    //  cy.get('h4').contains("Event Repository").should('be.visible');
     cy.url().should('include', '/eventrepository');
   })



})