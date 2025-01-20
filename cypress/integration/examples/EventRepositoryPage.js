class EventRepositoryPage {
    verifyUrlRedirection() {
     // cy.get('.heading4', { timeout: 10000 }).should('be.visible').and('contain.text', 'Event Repository');
     cy.visit('/eventrepository');
      cy.url({ timeout: 30000 }).should('include', '/eventrepository');
    }
  
    navigateToCreateNewEvent() {
      cy.contains('li', 'Events').trigger('mouseover');
      cy.wait(1000);
      cy.get('.e-menu-wrapper ul li div', { timeout: 10000 }).should('be.visible').and('contain.text', 'Create New Event');
      cy.contains('.e-menu-wrapper ul li div', 'Create New Event').click();
      cy.get('.heading4', { timeout: 100000 }).should('be.visible').and('contain.text', 'Create New Event');
      cy.url().should('include', '/createvent');
    }
    navigateToEventCalendar(){
      cy.contains('li', 'Events').trigger('mouseover');  // Find the <li> element 
      cy.wait(1000)
      // if got any error here user {force: true} in below code in click({force: true})
      cy.get('.e-menu-wrapper ul li div', { timeout: 10000 }).should('be.visible').and('contain.text', 'Event Calendar');
      cy.contains('.e-menu-wrapper ul li div', 'Event Calendar').click();
      cy.get('.heading4', { timeout: 100000 }).should('be.visible').and('contain.text', 'Event Calendar');
      cy.url().should('include', '/eventcalendar');
    }
  }
  
  export default EventRepositoryPage;
  