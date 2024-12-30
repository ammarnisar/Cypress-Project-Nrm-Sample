/// <reference types="cypress" />
import EventRepositoryPage from './EventRepositoryPage';

const neatCSV = require('neat-csv');

//const downloadsFolder = Cypress.config("fileServerFolder") + "/cypress/downloads/";

describe('My First test', function () {

  beforeEach(function () {

    cy.Loginwithsession();

  })

  // it('My First test cases', function () {
  //   const texts = [];
  //   const eventRepositoryPage = new EventRepositoryPage();
  //   cy.visit('/')

  //   // cy.get('.heading4', { timeout: 10000 }).should('be.visible').and('contain.text', 'Event Repository');
  //   cy.url({ timeout: 30000 }).should('include', '/eventrepository');
  //   eventRepositoryPage.navigateToEventCalendar();
  //   cy.get('#ej2-datetimepicker_28 > .e-float-input > .e-input-group-icon').click()
  //   cy.get('#ThisWeek_1').click()

  //   cy.get('#ej2_multiselect_23') //event status
  //     .children().last()
  //     .scrollIntoView({ duration: 1000 })  // Scroll to the last child element


  //   cy.get('#ej2_multiselect_26') // country Obj
  //     .children().last()
  //     .scrollIntoView({ duration: 1000 })  // Scroll to the last child element


  //   cy.get('[fxflex=""] > .e-primary').click() //click on searh bar

  //   cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click() //click on Top filters

  //   // cy.get('.e-link').click()

  //   cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click() //click on Top filters

  //   // cy.get('[data-id="Appointment_15"] > .e-appointment-details > .calenderItemWrap > .calenderItemWrapInner > .subject > .fontWeightSemibold')
  //   cy.get('[data-id="Appointment_15"] > .e-appointment-details > .calenderItemWrap > .calenderItemWrapInner > .subject > .fontWeightSemibold')
  //     .invoke('text') // Get the text content of the element
  //     .then((text) => {
  //       cy.log(text); // Logs the text in the Cypress runner console
  //       // You can perform further actions/assertions with the extracted text
  //       // expect(text).to.equal('Expected Text'); // Example of an assertion
  //     });

  //   cy.get('.calenderItemWrapInner  div .fontWeightSemibold')
  //     .then(($elements) => {
  //       // Get the first 10 elements
  //       const firstTenElements = $elements.slice(0, 400);

  //       // Extract and log the text of each element

  //       cy.wrap(firstTenElements).each(($el, index) => {
  //         cy.wrap($el).invoke('text').then((text) => {
  //           texts.push(text.trim()); // Add text to array
  //         });
  //       }).then(() => {
  //         texts.forEach((text, index) => {
  //           cy.log(`Text ${index + 1}: ${text}`); //show data in console of cypress
  //         });

  //         // You can perform assertions or further actions with the 'texts' array
  //       });
  //     });

  //   // cy.get('.calenderItemWrapInner div .fontWeightSemibold')
  //   // .then(($elements) => {
  //   //   // Extract and log the text of each element
  //   //   cy.wrap($elements).each(($el) => {
  //   //     cy.wrap($el).invoke('text').then((text) => {
  //   //       texts.push(text.trim()); // Add text to array
  //   //     });
  //   //   }).then(() => {
  //   //     // Log all texts after all elements have been processed
  //   //     texts.forEach((text, index) => {
  //   //       cy.log(`Text ${index + 1}: ${text}`); // Show data in console of Cypress
  //   //     });

  //   //     // You can perform assertions or further actions with the 'texts' array
  //   //     expect(texts).to.not.be.empty; // Example assertion to ensure texts are captured
  //   //   });
  //   // });

  //   // const filePath = "C:/Users/321/Downloads/20241019185939_EventCalender.csv";
  //   // cy.task('fileExists', filePath).then((exists) => {
  //   //     if (exists) {
  //   //       cy.readFile(filePath).then((text) => {
  //   //         return neatCSV(text);
  //   //       }).then((csv) => {
  //   //         debugger;
  //   //         console.log(csv);
  //   //         // Further processing or assertions can be done here
  //   //       });
  //   //     } else {
  //   //       cy.log(`File does not exist: ${filePath}`);
  //   //     }
  //   //   });

  //   cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/20241019200232_EventCalender.csv")
  //     .then(async (text) =>   //read about await and Async concepts
  //     {
  //       const csv = await neatCSV(text)
  //       const csvTexts = csv.map(row => row.Name);
  //       // csv.forEach((row) => {
  //       //     // Replace 'Name' with the actual column name you want to log
  //       //     console.log(row.Name); // Access the 'Name' field from each row
  //       // });

  //       // console.log(csv[0].Name)

  //       texts.forEach(text => {
  //         if (csvTexts.includes(text)) {
  //           cy.log(`Found matching text: ${text}`);
  //         } else {
  //           cy.log(`No match found for text: ${text}`);
  //         }
  //       });

  //     })

  // })


  // this one is a customied code
  // it('My third test cases', function () {
  //     const texts = [];
  //     const eventRepositoryPage = new EventRepositoryPage();

  //     cy.visit('/');
  //     cy.url({ timeout: 30000 }).should('include', '/eventrepository');
  //     eventRepositoryPage.navigateToEventCalendar();

  //     // Interactions to open the calendar and select a week
  //     cy.get('#ej2-datetimepicker_28 > .e-float-input > .e-input-group-icon').click();
  //     cy.get('#ThisWeek_1').click();

  //     // Scroll to necessary elements
  //     cy.get('#ej2_multiselect_23').children().last().scrollIntoView({ duration: 1000 });
  //     cy.get('#ej2_multiselect_26').children().last().scrollIntoView({ duration: 1000 });

  //     // Click on the search bar and top filters
  //     cy.get('[fxflex=""] > .e-primary').click();
  //     cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click();

  //     // Get all relevant calendar item texts
  //     cy.get('.calenderItemWrapInner div .fontWeightSemibold')
  //       .then(($elements) => {
  //         // Extract texts and log them
  //         const allTexts = Cypress.$.map($elements, el => Cypress.$(el).text().trim());


  //         allTexts.forEach((text, index) => {
  //           cy.log(`Text ${index + 1}: ${text}`);
  //         });
  //         // Return all texts as a Cypress chainable so we can user in then should etc
  //         return cy.wrap(allTexts);
  //       })
  //       .then((allTexts) => {
  //         // Read the CSV file and compare

  //         cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/20241019200232_EventCalender.csv")
  //           .then(async (csvData) => {
  //             const csv = await neatCSV(csvData);
  //             const csvTexts = csv.map(row => row.Name.trim()); // Adjust 'Name' to your actual CSV header
  //                  // Initialize counters
  //                 let matchCount = 0;
  //                 let unmatchCount = 0;
  //             // Compare front-end texts with CSV texts
  //             allTexts.forEach((text, index) => {
  //                 if (csvTexts.includes(text)) {  // Remove 'index' from includes() as it only takes one argument
  //                     matchCount++
  //                   cy.log(`Found matching text ${matchCount + 1}: ${text}`);
  //                 } else {
  //                     unmatchCount++
  //                   cy.log(`No match found for text ${unmatchCount + 1}: ${text}`);
  //                 }
  //               });
  //                // Log total matches and unmatched counts
  //         cy.log(`Total Matches Found: ${matchCount}`);
  //         cy.log(`Total Unmatches Found: ${unmatchCount}`);
  //           });
  //       });
  //   });




  // seperate sperate front nd and csv data
  // it('Process the latest EventCalendar CSV file', async function () {
  //   cy.visit('/');

  //   const texts = [];
  //     const eventRepositoryPage = new EventRepositoryPage();

  //     cy.visit('/');
  //     cy.url({ timeout: 30000 }).should('include', '/eventrepository');
  //     eventRepositoryPage.navigateToEventCalendar();

  //     // Interactions to open the calendar and select a week
  //     cy.get('#ej2-datetimepicker_28 > .e-float-input > .e-input-group-icon').click();
  //     cy.get('#ThisWeek_1').click();

  //     // Scroll to necessary elements
  //     cy.get('#ej2_multiselect_23').children().last().scrollIntoView({ duration: 1000 });
  //     cy.get('#ej2_multiselect_26').children().last().scrollIntoView({ duration: 1000 });

  //     // Click on the search bar and top filters
  //     cy.get('[fxflex=""] > .e-primary').click();
  //     cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click();

  //     // Get all relevant calendar item texts
  //     cy.get('.calenderItemWrapInner div .fontWeightSemibold')
  //       .then(($elements) => {
  //         // Extract texts and log them
  //         const allTexts = Cypress.$.map($elements, el => Cypress.$(el).text().trim());

  //         allTexts.forEach((text, index) => {
  //           cy.log(`Text ${index + 1}: ${text}`);
  //         });
  //         // Return all texts as a Cypress chainable so we can use it in then, should, etc.
  //         return cy.wrap(allTexts);
  //       })

  //   // Get the latest file path
  //   const latestFile = await cy.task('getLatestFile', {
  //     directory: Cypress.config("fileServerFolder") + "/cypress/downloads/",
  //     pattern: "\\d{14}_(EventCalender)"
  //   });

  //   console.log('Latest file path:', latestFile); // Log the latest file path

  //   // Check if the latest file was found
  //   if (!latestFile) {
  //     throw new Error('No valid latest file found. Please check your directory and pattern.');
  //   }

  //   cy.readFile(latestFile, 'utf8').then((fileContents) => {
  //     // Parse the CSV content using neat-csv
  //     neatCSV(fileContents).then((parsedData) => {       
  //       // Log the extracted Name for the first row, ensuring it’s a string
  //       if (parsedData[0] && parsedData[0].Name) {
  //         cy.log(`Extracted Name from first row: ${parsedData[0].Name}`);
  //       } else {
  //         cy.log('No Name found in the first row');
  //       }
  //       // Log the parsed CSV data for debugging
  //       console.log('Parsed Data:', parsedData);
  //       cy.log("sample");
  //       cy.log(`Extracted Names: ${parsedData[0].Name}`);
  //       // Extract the 'Name' field from each row
  //       const names = parsedData.map(row => row.Name).filter(Boolean); // Extract and filter 'Name' field boolean used for undefined, null, false, 0, NaN, and "" (an empty string).
  //       // Log the extracted names
  //       console.log('Extracted Names:', names);
  //       console.log('Extracted Names:', names[0]);

  //     });
  //   });

  // });

  // merge dynamcin csv file and front end data
  
 

  // simple code for csv data getting 
  // it('sample', function(){

  //   cy.visit('/')


  //   cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/20241020161158_EventCalender.csv")
  //       .then(async (text) =>   //read about await and Async concepts
  //       {
         
  //         const csv = await neatCSV(text)
  //         console.log(csv[0].Name)         
  //         cy.log(csv[0].Name)         
  //         csv.forEach((row,index)=>{
  //                     //  console.log('data showing in csv Event name is == '+ row.Name.trim())
  //           console.log(`Name at index ${index}: ${row.Name.trim()}`);
  //           cy.log(`Name at index ${index}: ${row.Name.trim()}`);
  //         });
  //         //this code is used to store in another array 
  //         // const csvTexts = csv.map(row => row.Name);

  //         //   csvTexts.forEach((name, index) => {
  //         //   //  console.log(`Name at index ${index}: ${name}`);
  //         //     // Perform some action with each 'name'
  //         //   });    
  
  //       });
  //     });


 //This one is Final Function with dynamic file getting frmo dowload and compare data from front end and csv 
 it('Process the latest EventCalendar CSV file', async function () {

  cy.visit('/');
  const texts = [];
  const eventRepositoryPage = new EventRepositoryPage();


  cy.url({ timeout: 30000 }).should('include', '/eventrepository');
  eventRepositoryPage.navigateToEventCalendar();

  // Interactions to open the calendar and select a week
  cy.get('#ej2-datetimepicker_28 > .e-float-input > .e-input-group-icon').click();
  cy.get('#ThisWeek_1').click();

  // Scroll to necessary elements
  cy.get('#ej2_multiselect_23').children().last().scrollIntoView({ duration: 1000 });
  cy.get('#ej2_multiselect_26').children().last().scrollIntoView({ duration: 1000 });


  // Click on the search bar and top filters
  cy.get('[fxflex=""] > .e-primary').click();
  cy.log('click on search bar')

  // cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click();
  // cy.get('.e-link')
  cy.log('click on top bar')
  cy.wait(1000)
  cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon')
    .click() // Click on the icon
    .then(() => {
      cy.wait(1000)
      // This block runs after the click action
      cy.get('.e-link') // Now you can get the '.e-link' element
        .should('be.visible') // Example assertion to check if the link is visible
        .click(); // Optionally click the link
      cy.log('download the file first')
    });
  cy.wait(1000)
  cy.log('after downloading the file now its execure further code ')
  cy.get('[fxlayoutgap="10px"][fxlayoutalign="center center"] > .ng-star-inserted > .icon').click()
  // Get all relevant calendar item texts
  cy.get('.calenderItemWrapInner div .fontWeightSemibold')
    .then(($elements) => {
      // Extract texts and log them

      const allTexts = Cypress.$.map($elements, el => Cypress.$(el).text().trim());
      // Log each text
      allTexts.forEach((text, index) => {
        cy.log(`Text ${index + 1}: ${text}`);
      });
      // Return all texts as a Cypress chainable
      return cy.wrap(allTexts);
    }).then(allTexts => {
      // Get the latest file path
      return cy.task('getLatestFile', {
        directory: Cypress.config("fileServerFolder") + "/cypress/downloads/",
       // pattern: '\\d{14}_(EventCalender)\\.(csv|xlsx)$', // that is used to filter specific type of file
        pattern: "\\d{14}_(EventCalender)"
      }).then(latestFile => {
        console.log('Latest file path:', latestFile); // Log the latest file path

        // Check if the latest file was found
        if (!latestFile) {
          throw new Error('No valid latest file found. Please check your directory and pattern.');
        }

        // Read and parse the CSV file
        return cy.readFile(latestFile, 'utf8').then(fileContents => {
          return neatCSV(fileContents).then(parsedData => {
            // Extract the 'Name' field from each row
            const csvNames = parsedData.map(row => row.Name.trim()).filter(Boolean);

            // Log the extracted names from the CSV
            console.log('Extracted Names from CSV:', csvNames);

            // Compare CSV data with front-end texts
            const matches = [];
            const nonMatches = [];

            allTexts.forEach(text => {
              if (csvNames.includes(text)) {
                matches.push(text);
              } else {
                nonMatches.push(text);
              }
            });

            // Log results
            cy.log(`Total Matches on frontend and csv file data: ${matches.length}`);
            cy.log(`Total Non-Matches on frontend and csv file data: ${nonMatches.length}`);

            // Log matched and non-matched texts
            console.log('Matched Texts:', matches);
            console.log('Non-Matched Texts:', nonMatches);

            // Displaying results in the console
            if (nonMatches.length === 0) {
              console.log('All texts match with the CSV data!');
            } else {
              console.log('Some texts do not match with the CSV data.');
            }
          });
        });
      });
    });
});





})