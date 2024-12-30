/// <reference types="cypress" />


// describe('JWT Authentication Tests', () => {

//     let jwtToken;
  
//     before(() => {
//       // Login and get JWT token
//       cy.request({
//         method: 'POST',
//         url: 'https://uks-mdlru-web-api-uat.azurewebsites.net//api/Auth/Token',
//         body: {
//           username: 'ammarnisar@ebitlogix.com',
//           password: 'Nrm@123456789'
//         },
//         failOnStatusCode: false // Add this option for debugging purposes
//       }).then((response) => {
//         // Log the response for debugging
//         cy.log(JSON.stringify(response));
//         expect(response.status).to.not.eq(405); 
//         expect(response.status).to.not.eq(500); // Add checks as needed
//       }).then((response) => {
//         // Store the JWT token
//         debugger;
//         jwtToken = response.body.token;
  
//         // Set the token in localStorage (or sessionStorage)
//         window.localStorage.setItem('jwt', jwtToken);
//       });
//     });
  
//     beforeEach(() => {
//       // Ensure the JWT is present before each test
//       cy.visit('/'); // Your application URL
//       window.localStorage.setItem('jwt', jwtToken); // Add token to localStorage
//     });
  
//     it('Test Case 1', () => {
//       // Now you are logged in using the stored JWT
//       // Add test steps here
//       cy.visit('/auth/model-selection?');
//       cy.url().should('include', '/auth/model-selection?');
//       cy.contains('Welcome, testuser');
//     });
  
//     it('Test Case 2', () => {
//       // Another test without logging in again
//       cy.visit('/auth/model-selection?');
//       cy.url().should('include', '/auth/model-selection?');
//       cy.contains('Welcome, testuser');
//     });
  
//   });
  