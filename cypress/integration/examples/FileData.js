/// <reference types="cypress" />
const neatCSV = require('neat-csv');

//import { text } from "stream/consumers";
import EventRepositoryPage from "./EventRepositoryPage";

// import data from '../fixtures/example.json';
// import data from '../fixtures/example.json';


// require('cypress-mochawesome-reporter/register');
let fixtureData;

describe('My Second test', function () {

  beforeEach(function () {
    cy.Loginwithsession();    
  })

// must read this tutorial for udnerstanding https://www.udemy.com/course/cypress-tutorial/learn/lecture/31160700#overview
  it('My Event Calendar ', async () =>{
    //verifcation of URL redirection
    const eventRepositoryPage = new EventRepositoryPage();
   //  cy.get(fixtureData.user.email)
   //  cy.pause();
    // Check that the URL includes '/eventrepository'
    cy.visit('/')
   
   // cy.get('.heading4', { timeout: 10000 }).should('be.visible').and('contain.text', 'Event Repository');
    cy.url({ timeout: 30000 }).should('include', '/eventrepository');
    eventRepositoryPage.navigateToEventCalendar();
    cy.get('#ej2-datetimepicker_28 > .e-float-input > .e-input-group-icon').click()
    cy.get('#ThisWeek_1').click()
    
    cy.get('#ej2_multiselect_23') //event status
    .children().last()
      .scrollIntoView({ duration: 1000 })  // Scroll to the last child element
      

      cy.get('#ej2_multiselect_26') // country Obj
      .children().last()
      .scrollIntoView({ duration: 1000 })  // Scroll to the last child element
      
       
        cy.get('[fxflex=""] > .e-primary').click() //click on searh bar

        cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click() //click on Top filters

     // cy.get('.e-link').click()

     cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click() //click on Top filters

    // cy.get('[data-id="Appointment_15"] > .e-appointment-details > .calenderItemWrap > .calenderItemWrapInner > .subject > .fontWeightSemibold')
     cy.get('[data-id="Appointment_15"] > .e-appointment-details > .calenderItemWrap > .calenderItemWrapInner > .subject > .fontWeightSemibold')
     .invoke('text') // Get the text content of the element
     .then((text) => {
       cy.log(text); // Logs the text in the Cypress runner console
       // You can perform further actions/assertions with the extracted text
      // expect(text).to.equal('Expected Text'); // Example of an assertion
     });
     
     cy.get('.calenderItemWrapInner  div .fontWeightSemibold')
     .then(($elements) => {
    // Get the first 10 elements
    const firstTenElements = $elements.slice(0, 10);

    // Extract and log the text of each element
    const texts = [];
    cy.wrap(firstTenElements).each(($el, index) => {
      cy.wrap($el).invoke('text').then((text) => {
        texts.push(text.trim()); // Add text to array
      });
    }).then(() => {
        texts.forEach((text, index) => {
            cy.log(`Text ${index + 1}: ${text}`); //show data in console of cypress
          });
      
      // You can perform assertions or further actions with the 'texts' array
    });
  });
 
 // Cypress.config("fileServerFolder") // its auto get the path of the project 
  // cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/20241019200232_EventCalender.csv")
  // .then(async (text) =>   //read about await and Async concepts
  // {
  //   const csv= await neatCSV(text)  
  //   console.log(csv)
  // })


  cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/20241020161158_EventCalender.csv")
  .then(async (text) =>   //read about await and Async concepts
  {
    const csv= await neatCSV(text)  
    console.log(csv)
  })

  // cy.task('readCsvFile', 'Cypress.config("fileServerFolder")+"/cypress/downloads/20241019200232_EventCalender.csv').then((fileContent) => {
  //   cy.log(fileContent);
  // });
   


  })


  it ('test data', function(){
  
    cy.visit('/')
    });

    
})