/// <reference types="cypress" />

import EventRepositoryPage from '../../integration/examples/EventRepositoryPage';
import CreateEventPage from '../../integration/examples/CreateEventPage';
import BasePage from '../../integration/examples/POM/BasePage';

describe('Events', function () {
  const eventRepositoryPage = new EventRepositoryPage();
  const createEventPage = new CreateEventPage();
  const basetotal_event = [];
  let weeksArray = []; // Initialize an array to store week values
  let weekindex = 0;
  
  //const BasePage=new BasePage();

  before(function () {
    //  cy.loginwithOOp(); // Logs in with defaultUser from fixture  
    // Later in the same test, read and use the saved URL

  });

  beforeEach(() => {

    cy.loginwithOOp();
    // cy.readFile('cypress/fixtures/currentUrl.json').then((data) => {
    //   // Access the saved URL and use it
    //   const savedUrl = data.url;
    //   debugger;
    //   if (savedUrl) {
    //     // The condition checks if the URL exists and performs actions based on that
    //     cy.log(`Saved URL is: ${savedUrl}`);
    //   } else {
    //     // If 'savedUrl' doesn't exist or is empty
    //     cy.log('No URL found');  // Log a message or handle the case as needed
    //   }

    //   cy.pause();
    //   // Any setup steps, if required
    // });
  });

  // it('My Event Repo cases', function () {
  //   // Login to the application
  //   // cy.login('ammar.nisar@ebitlogix.com', 'Nrm@123456789');
  //   // Cypress.env(URL)

  //   // Verifying URL redirection
  //   cy.visit('/');
  //   eventRepositoryPage.verifyUrlRedirection();

  //   // Navigating to Create New Event
  //   eventRepositoryPage.navigateToCreateNewEvent();

  //   // Filling in the event details
  //   createEventPage.fillEventInfoTab();

  //   // Select checkboxes
  //   const textsToClick = ['Promo', 'Newspaper', 'CNY'];
  //   createEventPage.selectCheckboxes(textsToClick);

  //   // Select Sell-In and Sell-Out dates
  //   createEventPage.selectSellInDate();
  //   // createEventPage.selectSellInEndDate();
  //   createEventPage.selectSellOutDate();
  //   // createEventPage.selectSellOutEndDate();

  //   // Select Customer Planning Level
  //   createEventPage.selectCustomerPlanningLevelAndAdd();

  //   //Scroll towards products 
  //   createEventPage.scrolltowardsproducts();

  //   // Select Product Planning Level
  //   createEventPage.selectProductPlanningLevel();

  //   // Select Volume and Finance details
  //   createEventPage.selectVolumeFinanceDetails();

  //   // Fill in the volume details
  //   createEventPage.fillVolumeDetails();

  //   // Fill in the trade spend details
  //   createEventPage.fillTradeSpendDetails();

  //   //Click on Create Event Button
  //    createEventPage.clickCreateButton();

  //    // please create a seperate function for this regarding creation of file and put the url below

  //   // Step 1: Get the current page URL
  //   cy.url().then((currentUrl) => {
  //     // Step 2: Save the URL in a JSON object
  //     const urlData = { url: currentUrl };

  //     // Step 3: Write the JSON object to a file
  //     cy.writeFile('cypress/fixtures/currentUrl.json', urlData);
  //   });
  //   // save file is called in before function please check before


  //   // Example: Navigate to the saved URL

  // })

  it('After creation event comparsion of weeks/month in the current event', function () {
    // cy.pause();
    cy.readFile('cypress/fixtures/currentUrl.json').then((urlData) => {
      // Step 2: Use the URL to navigate
      cy.visit(urlData.url);
    });
    //cy.pause();

    // let tableData = {};

    // cy.wait(5000);  // Wait for the table to be visible

    // cy.get('.e-frozen-left-content table tr')
    //   .should('have.length.greaterThan', 0)  // Ensure rows are present
    //   .each(($row, rowIndex) => {  // Iterate over each row
    //     let rowData = {};  // Create an object to store data for the current row

    //     cy.wrap($row)
    //       .find('td')  // Find all 'td' cells within the row
    //       .should('have.length.greaterThan', 0)  // Ensure cells exist
    //       .each(($cell, cellIndex) => {  // Iterate through each cell
    //         const cellText = $cell.text().trim();  // Get the text of the cell
    //         const columnName = `Column ${cellIndex + 1}`;  // Give each column a dynamic name
    //         rowData[columnName] = cellText;  // Add the cell data to the rowData object
    //       });

    //     // Add the rowData object to the tableData object, using "row1", "row2", etc. as keys
    //     tableData[`row${rowIndex + 1}`] = rowData;
    //   })
    //   .then(() => {
    //     // After all rows are processed, write the table data to a JSON file in fixtures folder
    //     cy.writeFile('cypress/fixtures/summaryvolumeforecast-type.json', tableData);  // Save data in 'tableData.json'
    //   });



    const tableData = [];

    // Wait for the table to be visible
    //  cy.wait(2000);
    cy.get('#grid_1058904465_0').should('be.visible');

    // Extract table headers
    cy.get('.e-headercontent table thead tr span').then(($headers) => {
      const headers = [];

      // Loop through headers and store them in the headers array
      $headers.each((index, header) => {
        headers.push(Cypress.$(header).text().trim());
      });
      // Log the extracted headers up to the "Week" columns
      cy.log('Extracted Headers (up to Week columns):');
      // Filter headers up until the "Week" columns
      //  const filteredHeaders = headers.filter((header) => header.includes('Week') || header === 'Type' || header === 'Total');
      const filteredHeaders = headers.filter((header) => header.includes('Week'));
      filteredHeaders.forEach((header) => {
        cy.log(header); // Log each filtered header
        console.log(header); // Log each filtered header to the browser's console
      });
    });


    // this code is create to write the data in json format for comparsion
    // cy.get('.e-frozencontent.e-frozen-left-content table tr').should('have.length.greaterThan', 0).then(($rows) => {
    //   const rowData = {}; // Object to hold all rows' data with row names as keys
    //   cy.log(`Number of rows: ${$rows.length}`);
    //   cy.wait(4000);
    //   // it can save all the data in json for future use
    //   // cy.get('.e-frozencontent.e-frozen-left-content table tr').each(($row, rowIndex) => {
    //   //   const rowObject = {}; // Object to store the current row's data
    //   //   // cy.wait(000);
    //   //   // Get the dynamic row name (first column) mean base promo heading 
    //   //   cy.wrap($row).find('td:nth-child(1)').invoke('text').then((rowName) => {
    //   //     rowObject.name = rowName.trim(); // Save the row name

    //   //     // Get the base total value (second column)
    //   //     cy.wrap($row).find('td:nth-child(2)').invoke('text').then((baseTotal) => {
    //   //       rowObject.total = baseTotal.trim(); // Save the base total value
    //   //       const weekValues = []; // Array to store the week-wise values
    //   //       // Get the week-wise values for the current row
    //   //       cy.get('.e-movablecontent table tr').eq(rowIndex).find('td').each(($cell) => {
    //   //         weekValues.push($cell.text().trim());
    //   //       }).then(() => {
    //   //         rowObject.weeks = weekValues; // Save the weeks data
    //   //         rowData[`row${rowIndex + 1}`] = rowObject; // Add the row data under a dynamic key
    //   //         // Once all rows are processed, write the JSON file
    //   //         if (rowIndex === $rows.length - 1) {
    //   //           cy.writeFile('cypress/fixtures/rowData.json', rowData);
    //   //           cy.log('Data written to rowData.json in fixtures.');
    //   //         }
    //   //       });
    //   //     });
    //   //   });


    //   //       // Iterate over each row




    //   // });

    //   // only to get first row text we will use this also save data in array next time 


    // });


    cy.wait(3000)
    //Total base value is showing start
   // const basetotal = [];
    cy.get('.e-frozencontent.e-frozen-left-content table tr').first().each((row, index) => {
      // Find the second <td> of the current row
      cy.wrap(row).find('td:nth-child(2)').each((td, cellIndex) => {
        // Log the index and the text inside the second td
        cy.log(`Row ${index},Td ${cellIndex}: ${Cypress.$(td).text()}`);
        const cellValue = Cypress.$(td).text().trim();
        // Convert to a number
        const numericValue = Number(cellValue);
        // Push the numeric value into the array
        basetotal_event.push(numericValue);

        // Optional: Log the converted value
        cy.log(`Converted Value: ${numericValue}`);
        cy.log('Base Total Values:', basetotal_event[0]);
      //  cy.pause();

      });
    });
     //Total base value is showing end

    // Weeks value is showing only start
   

cy.get('body').then(($body) => {
  if ($body.find('.e-movablecontent .e-table tr').length === 0) {
    // If the element is not found, reload the page
    cy.log('.e-movablecontent .e-table tr not found, reloading the page');
    cy.wait(5000);
    cy.reload();
  } else {
    // Process the rows if found
    cy.get('.e-movablecontent .e-table tr').first().each((row, index) => {
      cy.wrap(row).find('td').each((td, cellIndex) => {
        // Extract the text from the cell
        const cellText = Cypress.$(td).text().trim();
        
        // Log the value
        cy.log(`Row ${index}, Td ${cellIndex}: ${cellText}`);

        // Save the week value (assuming weeks are in a specific column, adjust accordingly)
        weeksArray.push(cellText); // Push the value into the weeks array
      });
    });
  }
});

// Optional: Log the entire weeks array after processing
    cy.log('Weeks Array:', weeksArray);
    
      // Weeks value is showing only end
    // above code comment added
    // cy.get('.e-movablecontent .e-table tr').first().each((row, index) => {
    //   // Find all <td> elements in the current row
    //   cy.wrap(row).find('td').each((td, cellIndex) => {
    //     // Log each <td> value separately
    //     cy.log(`Row ${index}, Td ${cellIndex}: ${Cypress.$(td).text()}`);
    //   });
    // });

    eventRepositoryPage.verifyUrlRedirection();

    // function for eventt base forecast  redirection
    cy.contains('li', 'Forecast').trigger('mouseover').click();  // Find the <li> element 
    cy.wait(1000)

    //click on customer start
    cy.get('#ej2_dropdownlist_1 .e-search-icon').click();
    // cy.get('.e-float').click().type(BasePage.Customer1);
    // enter in customer dropdown 
    cy.get('#ej2_dropdownlist_1 > .e-float-input > .e-lib') // Locate the dropdown element
      .click() // Click to open the dropdown
      .type(BasePage.Customer1) // Type the desired value
      .type('{enter}'); // Simulate pressing the Enter key
  //click on customer end

    //click on date range start
    cy.get('#ej2-datetimepicker_4_input').click().clear().type(BasePage.dateRange).type('{enter}');
    //click on date range End
    // click on product input and add product stert
    cy.get('.e-multi-select-wrapper > .e-input-group-icon').click();
    cy.get('#searchSkus .e-dropdownbase').clear().type(BasePage.SKU1);
// click on product input and add product End

    // click on sku if found------------------ Start
    cy.get('#searchSkus_popup div ul li div').each(($el, index) => {
      const text = $el.text();

      // Skip the first <li> element
      if (index === 1) {
        cy.log('Skipping first <li> item');
        cy.log(text);
        //cy.pause();
        return; // Skip the first item
      }
      cy.log(`Item ${index}: ${text}`);

      // Check if the text matches the desired SKU
      if (text.includes(BasePage.SKU1)) {
        cy.log(`Item ${index} contains ${BasePage.SKU1}`);

        // Click on the matching element and break the chain to avoid DOM issues
        cy.wait(3000)
        cy.log(text);
        //cy.pause();
        cy.wrap($el).click({ force: true }); // Click, breaking the chain
        return false; // Exit the `.each()` loop after the click is performed
      }
    }) // Ensures the SKU exists in at least one item
    // click on sku if found------------------ End


     // click on search button 
     cy.get('[fxlayoutalign="end center"] > .e-primary').click();



     // Get all rows in the table in baseforecast start 
      // Ensure that the table rows exist
      cy.get('#grid_573311068_0 .e-movablecontent  table tbody tr td')
      .should('have.length.greaterThan', 1); // Check if there are more than 1 <td> elements

    // Get all <td> elements in the table and iterate over them
    cy.get('#grid_573311068_0 .e-movablecontent  table tbody tr td').last().each((td, index) => {
      // Optional: Wait for dynamic content to load (adjust time as needed)
      //cy.wait(3000); // Adjust this as needed

      // Get the text of the <td> element
      const cellText = Cypress.$(td).text().trim();
      // Log the text content of the <td>
      cy.log(`Cell ${index + 1}: "${cellText}"`); // Log the cell's text content
      // Convert the cell text to a numeric value
      const numericValue = Number(cellText);
      // Log the text content and its numeric value
      cy.log(`Cell ${index + 1}: "${cellText}" (Numeric Value: ${numericValue})`);
      // Compare the numeric value with basetotal[0]
      if (numericValue === basetotal_event[0]) {
        cy.log(`Cell ${index + 1}: Match Found! ${numericValue} equals ${basetotal_event[0]}`);
      } else {
        cy.log(`Cell ${index + 1}: No Match. ${numericValue} does not equal ${basetotal_event[0]}`);
      }     
      
    });
        // Get all rows in the table in baseforecast start end
      //click on weeks tab 
      cy.get('[for="radio2"]').click();

      // compare the data of weekly basis 
      cy.get('#grid_573311068_0 .e-movablecontent  table tbody tr td')
      .should('have.length.greaterThan', 1); // Check if there are more than 1 <td> elements

            // Wait for 2 seconds before scrolling start
      cy.wait(1000);      
      cy.get('.e-movablescrollbar')
      .should('be.visible')  // Ensure the scrollbar is visible
      .scrollTo(930, 0);     // Scroll to 930px horizontally (x-axis), no vertical scrolling
      // Wait for 2 seconds before scrolling end

       // Get all <td> elements in the table and iterate over them in weeks start
    cy.get('#grid_573311068_0 .e-movablecontent  table tbody tr td').each((td, index) => {
      // Optional: Wait for dynamic content to load (adjust time as needed)
      //cy.wait(3000); // Adjust this as needed
     if (index>5){
       // Get the text of the <td> element       
       const cellText = Cypress.$(td).text().trim();
       // Log the text content of the <td>
       cy.wrap(td).invoke('text').then((cellText) => {
        weekindex++;
         // Trim and log the content of each <td>
         cy.log(`Cell ${index}: "${cellText}"`);
         cy.log(`Cell ${weeksArray[weekindex-1]}:`);
         // Increment the weekindex after logging
      
       expect(cellText).to.equal(weeksArray[weekindex-1]);
       });
       
     }
      // Convert the cell text to a numeric value
      // const numericValue = Number(cellText);
      // // Log the text content and its numeric value
      // cy.log(`Cell ${index + 1}: "${cellText}" (Numeric Value: ${numericValue})`);
      // // Compare the numeric value with basetotal[0]
      // if (numericValue === basetotal_event[0]) {
      //   cy.log(`Cell ${index + 1}: Match Found! ${numericValue} equals ${basetotal_event[0]}`);
      // } else {
      //   cy.log(`Cell ${index + 1}: No Match. ${numericValue} does not equal ${basetotal_event[0]}`);
      // }     
      
    });
       // Get all <td> elements in the table and iterate over them in weeks End 

    cy.pause();


   

    // now get data from rows








  })
})




// describe('My First test', function()
// {

//   beforeEach(function () {
//   //  cy.Loginwithsession();
//     cy.loginwithOOp(); // Logs in with defaultUser from fixture
//   });

// it('My First Test cases', function()
// {
//     cy.visit("/");
//     // Click on the textarea element
//     // Click on the textarea element, enter text, and hit enter
//     cy.url({ timeout: 30000 }).should('include', '/eventrepository');

// });

// it('My Second Test cases', function()
// {
//     cy.visit("/");
//     // Click on the textarea element
//     // Click on the textarea element, enter text, and hit enter
//     cy.url({ timeout: 30000 }).should('include', '/eventrepository');

// });

// it('My Third Test cases', function()
// {
//     cy.visit("/");
//     // Click on the textarea element
//     // Click on the textarea element, enter text, and hit enter
//     cy.url({ timeout: 30000 }).should('include', '/eventrepository');

// });
