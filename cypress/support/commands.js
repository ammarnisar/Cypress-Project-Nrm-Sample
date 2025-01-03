// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
//import cypress from 'cypress';
// import './commands';
import LoginPage from '../integration/examples/POM/Login';
import ModelSelectionPage from '../integration/examples/POM/ModelSelection';
const fs = require('fs');
const path = require('path');
let country='Malaysia';

Cypress.Commands.add('login', (username, password) => {


    // Intercept the login network request
    cy.intercept('POST', '/api/Auth/Token').as('loginRequest'); ``
    //.env('url');
    //  Cypress.env(URL); 
    cy.visit(Cypress.env('UAT'));
    //  const uatUrl = Cypress.env('UAT');

    //  // Validate if the UAT URL is defined
    //  if (uatUrl) {
    //    // Visit the UAT URL if it is defined
    //    cy.visit(uatUrl);
    //  } else {
    //    throw new Error('UAT environment variable is not defined or is empty. Please check your configuration.');
    //  }
    //  cy.visit('https://mdlz-uat.nrminsight.io/auth');
    cy.wait(1000)
    cy.get('#e-dropdown-btn_2').click()

    cy.get('ul > li').each(($el, index, $list) => {

        const dataValue = $el.attr('aria-label');

        if (dataValue === 'UK') {
            cy.wrap($el).click();
            console.log('Uk  FOUND')
            cy.log(`Element ${index + 1} of ${$list.length}`);
            console.log(`Element ${index + 1} of ${$list.length}`);
            // cy.pause()
        } else {
            console.log('Uk  Not FOUND')
        }
        // if (dataValue == 'UK') {   
        //     console.log(dataValue)   
        //   cy.wrap($el).click();
        // }             
    });

    cy.get('input[type="email"]').type(username)
    cy.get('input[type="password"]').type(password)
    cy.contains('Login').click()



    // Wait for the intercepted request and verify the status code
    cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });


    //Model page logic start 
    // cy.get('.dropdown-button').click();
    cy.get('.e-float-input', { timeout: 10000 }).should('be.visible');

    cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).should('be.visible');
    cy.get('#ej2_dropdownlist_6').click();
    cy.pause()
    cy.wait(1000)
    cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).find('[aria-describedby="ej2_dropdownlist_6"]').should('be.visible');

    cy.get('#ej2_dropdownlist_6').find('[aria-describedby="ej2_dropdownlist_6"]').type('Malaysia');

    //cy.get('.e-content div').click();
    cy.wait(2000);

    cy.get('body').then($body => {
        // Check if '.e-content div' is visible in the DOM
        if ($body.find('.e-content div').length > 0) {
            cy.get('.e-content div').contains('Malaysia').click();
            // cy.get('.e-content div').should('be.visible').click(); // Click if visible
        } else {
            cy.log('The option is not visible in the dropdown list'); // Log if not visible
        }
    });

    // // Optionally, debug by logging the current URL and checking if the page has loaded
    // cy.url().then((url) => {
    //     cy.log('Current URL:', url);
    // });

    // Click the button once it is confirmed to be visible
    // cy.get('.button').click();
    // cy.get('.button', { timeout: 20000 }).should('be.visible').and('contain.text', 'Proceed');
    cy.contains('button', 'Proceed').click();

    //Model page Logic End 

});


Cypress.Commands.add('logintesting', (username, password) => {
    cy.visit('https://test.nrminsight.io');
    //  cy.wait(9000)
    cy.get('input[type="email"]').type('ammar.nisar@ebitlogix.com')
    cy.get('input[type="password"]').type('Nrm@123456789999')
    cy.contains('Login').click()

});

Cypress.Commands.add('Loginwithsession', () => {
    cy.session(
        'login',
        () => {
            cy.visit('/'); // Replace with the correct login URL if needed

            cy.get('input[type="email"]').type('ammar.nisar@ebitlogix.com');
            cy.get('input[type="password"]').type('Nrm@123456789999');
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

            cy.get('.e-float-input', { timeout: 10000 }).should('be.visible');
            cy.url().should('include', 'https://mdlz-uat.nrminsight.io/auth/model-selection');
            //    cy.get('#ej2_dropdownlist_2').click()
            //    cy.get('#ej2_dropdownlist_2', { timeout: 10000 }).should('be.visible');
            cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).should('be.visible');
            cy.get('#ej2_dropdownlist_6').click();
            cy.wait(1000)
            cy.get('#ej2_dropdownlist_6', { timeout: 10000 }).find('[aria-describedby="ej2_dropdownlist_6"]').should('be.visible');

            cy.get('#ej2_dropdownlist_6').find('[aria-describedby="ej2_dropdownlist_6"]').type(country);
            // cy.get('#ej2_dropdownlist_2_popup', { timeout: 10000 }).should('be.visible');
            //  cy.get('#ej2_dropdownlist_2_popup').find('input').type('Malaysia', { force: true });     

            //  cy.get('#ej2_dropdownlist_2_popup').find('#ej2_dropdownlist_2_options li div').contains('Malaysia');      

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
                        // debugger;
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

});


//Created foe the Usage of OOP Based
Cypress.Commands.add('loginwithOOp', (userType = 'defaultUser') => {

    cy.fixture('example.json').then((credentials) => {
        const loginPage = new LoginPage();
        const modelSelectionPage = new ModelSelectionPage();
        debugger;
        let email, password;

        if (userType === 'defaultUser') {
            // Use default credentials

            email = credentials.defaultUser.email;
            password = credentials.defaultUser.password;
        } else if (typeof userType === 'number') {
            // Use indexed user from fixture
            const user = credentials.users[userType];
            email = user.email;
            password = user.password;
        } else if (typeof userType === 'object' && userType.email && userType.password) {
            // Use custom provided credentials
            email = userType.email;
            password = userType.password;
        }

        cy.session([email, password], () => {
            loginPage.performLogin(email, password);
            modelSelectionPage.performModelSelection();

        }, {
            validate() {
                cy.getCookie('ARRAffinity').should('exist');
                //   cy.url().should('include', '/eventrepository');
            }
        });
    });
});



