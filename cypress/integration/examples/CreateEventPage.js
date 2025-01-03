class CreateEventPage {
    fillEventInfoTab() {
      cy.wait(1000);
      cy.get('input.w100.e-control.e-textbox.e-lib').first().type('UAT SMOKE TEST Event on Malaysia 09-Dec-2024 TIME:8:50 PM PST');
      cy.get('form div div div div input[role="combobox"]').eq(0).type('Promo code testing{enter}');
      cy.get('form div div div div input[role="combobox"]').eq(1).click();
      cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li').should('be.visible').and('contain.text', 'Default');
      cy.get('.e-content.e-dropdownbase').find('li').contains('Default').click();
      cy.get('textarea.w100 ').first().type('Event creation Auto');
      cy.get('textarea.w100').eq(1).type('Auto obejctive Notes');
    }
  
    selectCheckboxes(textsToClick) {
      cy.get('span[fxlayout="row wrap"]')
        .find('ejs-checkbox')
        .each(($checkbox) => {
          cy.wrap($checkbox)
            .find('label')
            .find('span.e-label')
            .invoke('text')
            .then((text) => {
              const trimmedText = text.trim();
              if (textsToClick.includes(trimmedText)) {
                cy.wrap($checkbox)
                  .find('span.e-icons.e-frame')
                  .click();
              }
            });
        });
    }
  
    selectSellInDate() {

      //directly enter the date range value 
      // const dateRange = '01/11/2024 - 30/11/2024';
      //   // Log the variable to ensure it's correct
      //   cy.log(`Date Range: ${dateRange}`);
      //   // Type the value into the input field
      //   cy.get('#sellInDate_input').type(dateRange);
      //   cy.pause();


       cy.get('#sellInDate .e-input-group-icon').click();
      // cy.get('table tr span')
      //   .filter((index, el) => el.innerText.trim() === '1')
      //   .first()
      //   .click();
          // Open the calendar
  //  cy.get('#sellInDate .e-input-group-icon').click();

    // Select the desired date (e.g., "1")
    
    cy.get('table tr .e-day')
      .filter((index, el) => el.innerText.trim() === '1')
      .first()
      .as('selectedDate') // Alias the selected date element
      .click();

// Assert that the 'span' element inside the 'td' has the 'e-selected' class
  cy.get('@selectedDate')
  .parent('td') // Get the parent 'td' of the selected 'span'
  .should('have.class', 'e-selected'); 
   
  
  }
  
    selectSellInEndDate() {
      cy.get('table tr span').then(($spans) => {
        const now = new Date();
        const currentMonth = now.toLocaleString('default', { month: 'long' });
        const currentYear = now.getFullYear();
        const lastDayOfMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
        const filteredSpans = $spans.filter((index, span) => {
          const title = span.getAttribute('title');
          return title && title.includes(currentMonth) && title.includes(currentYear);
        });
        const lastDateSpan = filteredSpans.filter((index, span) => {
          return parseInt(span.textContent.trim(), 10) === lastDayOfMonth;
        });
        if (lastDateSpan.length > 0) {
          cy.wrap(lastDateSpan[0]).click();
        }
      });
      cy.get('.e-apply.e-flat.e-primary').click({ force: true });
      //cy.get('.e-apply.e-flat.e-primary').should('not.be.disabled').click();
     // cy.get('button.e-apply').click();
    }
  
    selectSellOutDate() {
      cy.get('#selloutDate .e-input-group-icon').click();
      cy.get('table tr .e-day').filter((index, el) => el.innerText.trim() === '1').first().click();
    }
  
    selectSellOutEndDate() {
      cy.get('table tr span').then(($spans) => {
        const now = new Date();
        const currentMonth = now.toLocaleString('default', { month: 'long' });
        const currentYear = now.getFullYear();
        const lastDayOfMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
        const filteredSpans = $spans.filter((index, span) => {
          const title = span.getAttribute('title');
          return title && title.includes(currentMonth) && title.includes(currentYear);
        });
        const lastDateSpan = filteredSpans.filter((index, span) => {
          return parseInt(span.textContent.trim(), 10) === lastDayOfMonth;
        });
        if (lastDateSpan.length > 0) {
          cy.wrap(lastDateSpan[0]).click();
        }
      });
      cy.get('button.e-apply').click();
    }
  
    selectCustomerPlanningLevelAndAdd() {
   
  cy.get('#ej2_dropdownlist_76 > .e-float-input > .e-lib')
  .scrollIntoView();  // Scrolls to bring the element into view
         

// customer level dropdown selection
    cy.get('#ej2_dropdownlist_76', { timeout: 100000 }).find('.e-search-icon').should('be.visible');
   cy.get('#ej2_dropdownlist_76 .e-search-icon').click();

    // Select the 'Retailer' item from the dropdown
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li.e-list-item').should('be.visible');
    cy.get('li.e-list-item').contains('Retailer').should('be.visible').click();

    // Select the customer and add to the listed environment
    cy.get('.wrapAdditionItem.primary').each(($el, index) => {
      // Skip the first element if it's the "Available" row
      if (index < 1) {
        // Find the specific span element inside each item and click it
        cy.wrap($el).find('span.icon.plusO').click();
      }
    });
  }

  scrolltowardsproducts() {
    cy.get('div.wrapAddition.secondary.wrapAdditionHeight.pr20')
      .children().last()
      .scrollIntoView({ duration: 1000 })
      .should('be.visible');

    cy.get('app-event-products > :nth-child(1) > .titleSection').scrollIntoView();
    cy.wait(2000);
  }

  
  selectProductPlanningLevel() {
    // Click to open the dropdown
    cy.get('[aria-labelledby="label_ej2_dropdownlist_80"]').click(); // Example action

    // Wait for the dropdown content to be visible
    cy.get('.e-content.e-dropdownbase', { timeout: 100000 }).find('li.e-list-item').should('be.visible');

    // Select 'SKU' from the dropdown list
    cy.get('li.e-list-item').contains('SKU').should('be.visible').click(); // Click on the item

    // Interact with each item in the span.mlAuto container
    cy.get('span.mlAuto').each(($el, index) => {
      // Skip the first element if it's the "Available" row
      if (index < 1) {
        // Find the specific span element inside each item and click it
        cy.wrap($el).click();
      }
    });
  }
  
    selectVolumeFinanceDetails() {
      cy.get('#ej2_dropdownlist_26 .e-search-icon').click();
      cy.get('.e-content.e-dropdownbase').find('li').contains('Cases').should('be.visible').click();
    }
  
    fillVolumeDetails() {
      cy.get('#numerictextbox_18').click().clear().type('23');
      cy.get('#numerictextbox_19').click().clear().type('23');
      cy.get('#numerictextbox_20').click().clear().type('23');
      cy.get('#numerictextbox_21').click().clear().type('23');
    }
  
    fillTradeSpendDetails() {
      cy.get('h6').contains('Trade Spend').scrollIntoView();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(1)  span:nth-child(4)').click({ force: true });
      cy.get('#discountLevel2_popup').find('li.e-list-item').first().click();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(2)  span:nth-child(4)').click({ force: true });
      cy.get('#discountLevel3_popup').find('li.e-list-item').first().click();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(3)  span:nth-child(4)').click({ force: true });
      cy.get('#invoiceType_popup').find('li.e-list-item').first().click();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(4)  span:nth-child(4)').click({ force: true });
      cy.get('#allocationType_popup').find('li.e-list-item').first().click();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(5)  span:nth-child(4)').click({ force: true });
      cy.get('#basedOn_popup').find('li.e-list-item').first().click();
  
      cy.get('div section ol li:nth-child(2) > div:nth-child(7)').find('input#numerictextbox_25').clear().type('2'); //previous is input#numerictextbox_8
      cy.get('div section ol li:nth-child(2) > div:nth-child(8)').find('.icon').click();
    }

    clickCreateButton(){
      cy.get('button.e-primary').contains('Create Event').click();
      cy.get('h5').contains('Filters').should('be.visible');
    }
  }
  
  export default CreateEventPage;
  