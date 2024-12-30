/// <reference types="cypress" />

import EventRepositoryPage from '../examples/EventRepositoryPage';
import CreateEventPage from '../examples/CreateEventPage';

describe('Events', function () {
  const eventRepositoryPage = new EventRepositoryPage();
  const createEventPage = new CreateEventPage();

  before(function () {
    cy.loginwithOOp(); // Logs in with defaultUser from fixture  
    // Any setup steps, if required
  });

  it('My Event Repo cases', function () {
    // Login to the application
   // cy.login('ammar.nisar@ebitlogix.com', 'Nrm@123456789');
   // Cypress.env(URL)

    // Verifying URL redirection
    cy.visit('/');
    eventRepositoryPage.verifyUrlRedirection();   

    // Navigating to Create New Event
    eventRepositoryPage.navigateToCreateNewEvent();

    // Filling in the event details
    createEventPage.fillEventInfoTab();

    // Select checkboxes
    const textsToClick = ['Promo', 'Newspaper', 'CNY'];
    createEventPage.selectCheckboxes(textsToClick);

    // Select Sell-In and Sell-Out dates
    createEventPage.selectSellInDate();
    createEventPage.selectSellInEndDate();
    createEventPage.selectSellOutDate();
    createEventPage.selectSellOutEndDate();

    // Select Customer Planning Level
    createEventPage.selectCustomerPlanningLevelAndAdd();

    //Scroll towards products 
    createEventPage.scrolltowardsproducts();

    // Select Product Planning Level
    createEventPage.selectProductPlanningLevel();

    // Select Volume and Finance details
    createEventPage.selectVolumeFinanceDetails();

    // Fill in the volume details
    createEventPage.fillVolumeDetails();

    // Fill in the trade spend details
    createEventPage.fillTradeSpendDetails();

    //Click on Create Event Button
   // createEventPage.clickCreateButton();

    })
})
