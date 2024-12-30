/// <reference types="cypress" />
// import data from '../fixtures/example.json';
// import data from '../fixtures/example.json';


// require('cypress-mochawesome-reporter/register');
let fixtureData;

describe('My Second test', function () {

  before(function () {

    //this is used to get json data for email and password 
    cy.fixture('example.json').then((data) => {
      fixtureData=data;
      expect(data.user.email).to.equal('ammar.nisar@ebitlogix.com');
      cy.login(fixtureData.user.email, fixtureData.user.password)
     // cy.login(data.user.email, data.user.password)
    });


    
  })


  it('My Event Repo cases', function () {
    //verifcation of URL redirection
   
   //  cy.get(fixtureData.user.email)
   //  cy.pause();
    // Check that the URL includes '/eventrepository'
    cy.get('.heading4', { timeout: 10000 }).should('be.visible').and('contain.text', 'Event Repository');
    cy.url({ timeout: 30000 }).should('include', '/eventrepository');

    cy.get('#ej2_dropdownlist_0 .e-input-group-icon').click()

   // cy.get('app-event-repository ejs-daterangepicker .e-input-group').click()
  
  cy.get('#ej2-datetimepicker_16 > .e-float-input > .e-input-group-icon').click()

    //cy.get('app-event-repository ejs-daterangepicker .e-input-group').click()
    // Screenshot commands
  //  cy.get('#ThisWeek_1').screenshot('Screenshot of week').click()
  //  cy.screenshot('full-page-screenshot', { capture: 'fullPage' });

    // cy.get('#ej2_multiselect_12')
    //   .children().last()
    //   .scrollIntoView({ duration: 1000 })  // Scroll to the last child element
    //   .should('be.visible');

     
      
   cy.contains('button', 'Export').click();

    // cy.get('app-event-products > :nth-child(1) > .titleSection').scrollIntoView();
    // cy.wait(2000);

    cy.contains('li', 'Events').trigger('mouseover');  // Find the <li> element 
    cy.wait(1000)
    // if got any error here user {force: true} in below code in click({force: true})
    cy.get('.e-menu-wrapper ul li div', { timeout: 10000 }).should('be.visible').and('contain.text', 'Create New Event');
    cy.contains('.e-menu-wrapper ul li div', 'Create New Event').click();
    cy.get('.heading4', { timeout: 100000 }).should('be.visible').and('contain.text', 'Create New Event');
    cy.url().should('include', '/createvent');

    //Event title
    cy.get('#textbox_48').type('Auto testing ammar event ')
    // promo code entry
    cy.get('form div div div div input[role="combobox"]').eq(0).type('Promo code testing{enter}');
    // Event type selection click to show a hidden class in next step
    cy.get('form div div div div input[role="combobox"]').eq(1).click();
    // check which event type should be selected
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li').should('be.visible').and('contain.text', 'Default');
    cy.get('.e-content.e-dropdownbase').find('li').contains('Default').click();
    cy.get('textarea[id="textbox_51"]').type('Event creation Auto');
    cy.get('textarea[id="textbox_10"]').type('Auto obejctive Notes');

    const textsToClick = ['Promo', 'Newspaper', 'CNY'];  // Replace with the desired text
   
    // Select the parent container selction of check boxes
    cy.get('span[fxlayout="row wrap"]') // Adjust selector to match the container of checkboxes
      .find('ejs-checkbox') // Find each ejs-checkbox element
      .each(($checkbox) => {
        // For each ejs-checkbox, find the label and extract the text from the span with class e-label
        cy.wrap($checkbox)
          .find('label')
          .find('span.e-label')
          .invoke('text') // Get the text content
          .then((text) => {
            // Trim the text for accurate comparison
            const trimmedText = text.trim();

            // Check if the text is in the list of texts to select
            if (textsToClick.includes(trimmedText)) {
              // If the text is in the list, click the corresponding checkbox
              cy.wrap($checkbox)
                .find('span.e-icons.e-frame') // Locate the span that visually represents the checkbox
                .click(); // Click the span
            }
          });
      });

    //sell-in date selection
    cy.get('#sellInDate .e-input-group-icon').click()

    //Date selection process of sell in date
    cy.get('table tr span')
      .filter((index, el) => el.innerText.trim() === '1') // Find the span with text '1'
      .first() // Ensure we select the first occurrence if there are multiple
      .click();
    // Date selection of Sell-In End date 
    cy.get('table tr span').then(($spans) => {
      // Get the current month and year
      const now = new Date();
      const currentMonth = now.toLocaleString('default', { month: 'long' });
      const currentYear = now.getFullYear();

      // Calculate the last day of the current month
      const lastDayOfMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
      cy.log('This is a log message');
      cy.log(lastDayOfMonth)
      // Filter the spans to find the ones that are from the current month and year
      const filteredSpans = $spans.filter((index, span) => {
        const title = span.getAttribute('title');
        return title && title.includes(currentMonth) && title.includes(currentYear);
      });
      // cy.log('This is a log message');
      // Find the span with the text that matches the last day of the current month
      const lastDateSpan = filteredSpans.filter((index, span) => {
        return parseInt(span.textContent.trim(), 10) === lastDayOfMonth;
      });
      cy.log('This is a log message');
      // cy.log(lastDateSpan)
      // Click the first element if there are multiple matches
      if (lastDateSpan.length > 0) {
        cy.wrap(lastDateSpan[0]).click();
      }
      cy.log('This is a log message');
      // cy.log(lastDateSpan)
    });

    cy.get('button.e-apply').click();
    // Select start date of Sell Out Date
    //sell-out date selection
    cy.get('#selloutDate .e-input-group-icon').click()

    cy.get('table', { timeout: 100000 }).find('tr span').should('be.visible').and('contain.text', '1');
    //Date selection process of Sellout in date
    cy.get('table tr span')
      .filter((index, el) => el.innerText.trim() === '1') // Find the span with text '1'
      .first() // Ensure we select the first occurrence if there are multiple
      .click();
    // Sellout end date 
    // Date selection of Sell-In End date 
    cy.get('table tr span').then(($spans) => {
      // Get the current month and year
      const now = new Date();
      const currentMonth = now.toLocaleString('default', { month: 'long' });
      const currentYear = now.getFullYear();

      // Calculate the last day of the current month
      const lastDayOfMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
      cy.log('This is a log message');
      cy.log(lastDayOfMonth)
      // Filter the spans to find the ones that are from the current month and year
      const filteredSpans = $spans.filter((index, span) => {
        const title = span.getAttribute('title');
        return title && title.includes(currentMonth) && title.includes(currentYear);
      });
      // Find the span with the text that matches the last day of the current month
      const lastDateSpan = filteredSpans.filter((index, span) => {
        return parseInt(span.textContent.trim(), 10) === lastDayOfMonth;
      });
      cy.log('This is a log message');
      // Click the first element if there are multiple matches
      if (lastDateSpan.length > 0) {
        cy.wrap(lastDateSpan[0]).click();
      }
    });

    cy.get('button.e-apply').click();

    //Click on Customer Planning Level 
    cy.get('#ej2_dropdownlist_52 ', { timeout: 100000 }).find('.e-search-icon').should('be.visible');
    //cy.get('#selloutDate .e-input-group-icon').click()
    cy.get('#ej2_dropdownlist_52 .e-search-icon').click();
    // Selection of Customer planning Level
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li.e-list-item').should('be.visible');

    cy.get('li.e-list-item').contains('Retailer').should('be.visible').click(); // Click on the item
    //cy.get('.e-content.e-dropdownbase').find('li').contains('ORO1').click();
   
    // Select the customer and added in the listed env 
    cy.get('.wrapAdditionItem.primary').each(($el, index) => {
      // Skip the first element if it's the "Available" row
      if (index < 1) {
        // Find the specific span element inside each item and click it
        cy.wrap($el).find('span.icon.plusO').click();
      }
    });


    cy.get('div.wrapAddition.secondary.wrapAdditionHeight.pr20')
      .children().last()
      .scrollIntoView({ duration: 1000 })  // Scroll to the last child element
      .should('be.visible');

    cy.get('app-event-products > :nth-child(1) > .titleSection').scrollIntoView();
    cy.wait(2000);


    cy.get('[aria-labelledby="label_ej2_dropdownlist_56"]').click(); // Example action

    // Selection of Prduct  planning Level
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li').should('be.visible');
    cy.get('li.e-list-item').contains('SKU').should('be.visible').click(); // Click on the item

    cy.get('span.mlAuto').each(($el, index) => {
      // Skip the first element if it's the "Available" row
      if (index < 1) {
        // Find the specific span element inside each item and click it
        cy.wrap($el).click();
      }
    });

    //scroll till SKU Added div 
    cy.get('h6').contains('Added').scrollIntoView();

    //scroll till Volume and Finance section
    cy.get('h5').contains('Volume & Finance').scrollIntoView();

    //click on volume dropdown cases
    cy.get('#ej2_dropdownlist_9').find('.e-search-icon').click()

    // Selection of Volume and Finance
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li').should('be.visible');
    cy.get('.e-content.e-dropdownbase').find('li.e-list-item').contains('Cases').should('be.visible').click(); // Click on the item


    //Click on uplift type 
    cy.get('#ej2_dropdownlist_0').find('.e-search-icon').click();
    cy.get('.e-content.e-dropdownbase').find('li.e-list-item').contains('Absolute').should('be.visible').click(); // Click on the item


    //click on volume sell in 
    cy.get('#numerictextbox_1').click().clear().type('23');

    //click on volume sell Out 
    cy.get('#numerictextbox_2').click().clear().type('23');

    //click on Estate value 
    cy.get('#numerictextbox_3').click().clear().type('23');

    //click on sold on deals %
    cy.get('#numerictextbox_4').click().clear().type('23');

    //click on RSP per unit
    // cy.get('#ej2_dropdownlist_5').find('.e-search-icon').click(); 
    // cy.get('#ej2_dropdownlist_5_popup').find('li.e-list-item').contains('RSP per unit').should('be.visible').click(); // Click on the item
    cy.get('#ej2_dropdownlist_5').find('.e-search-icon').click();
    cy.get('#ej2_dropdownlist_5_popup').find('li.e-list-item').first().click()

    //click on RSP Discount 
    cy.get('#numerictextbox_6').click().clear().type('23');

    //Trade spend sectiion

    //Discount Level 2
    //scroll till Volume and Finance section
    cy.get('h6').contains('Trade Spend').scrollIntoView();

    cy.get('div section ol li:nth-child(2) > div:nth-child(1)  span:nth-child(4)').click({ force: true });
    cy.get('#discountLevel2_popup').find('li.e-list-item').first().click();


    //Discount Level 3
    cy.get('div section ol li:nth-child(2) > div:nth-child(2)  span:nth-child(4)').click({ force: true });
    cy.get('#discountLevel3_popup').find('li.e-list-item').first().click();

    //On/Off Invoice
    cy.get('div section ol li:nth-child(2) > div:nth-child(3)  span:nth-child(4)').click({ force: true });
    cy.get('#invoiceType_popup').find('li.e-list-item').first().click();

    //Funding Type / Allocation
    cy.get('div section ol li:nth-child(2) > div:nth-child(4)  span:nth-child(4)').click({ force: true });
    cy.get('#allocationType_popup').find('li.e-list-item').first().click();

    //Based on
    cy.get('div section ol li:nth-child(2) > div:nth-child(5)  span:nth-child(4)').click({ force: true });
    cy.get('#basedOn_popup').find('li.e-list-item').first().click();


    //Amount
    cy.get('div section ol li:nth-child(2) > div:nth-child(7)').find('input#numerictextbox_8').clear().type('2'); //

    //Click ICon + TO ADD TRADE SPEND
    cy.get('div section ol li:nth-child(2) > div:nth-child(8)').find('.icon').click();

    //Click create Button 
   // cy.get('button.e-primary').contains('Create Event').click();

    //Click on Cancel Button 
//    cy.get('button.e-info').contains('Cancel').click();


   
  })


})