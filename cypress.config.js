const { defineConfig } = require("cypress");
 const fs = require('fs');
const path = require('path');
//require('cypress-mochawesome-reporter/register');

module.exports = defineConfig({

  // env: {
  //   url: 'https://mdlz-uat.nrminsight.io/auth',
  // },
  video: true,
  defaultCommandTimeout:1000000,  
  pageLoadTimeout: 1000000, 
  reporter: 'cypress-mochawesome-reporter',
  e2e: {

    "viewportWidth": 1920,
    "viewportHeight": 1080,
   
    //baseUrl: 'https://test.nrminsight.io',
    baseUrl:'https://mdlz-uat.nrminsight.io',
    
    
    env: {
      // Define multiple environment-specific URLs
      test: 'https://test.nrminsight.io',
      UAT: 'https://mdlz-uat.nrminsight.io/auth',
      prodUrl: 'https://prod.nrminsight.io',
    },
   // video: true,
    // screenshotsFolder: 'cypress/screenshots', // Folder for screenshots
    // videosFolder: 'cypress/videos', // Folder for videos
    setupNodeEvents(on, config) {
      
      on('task', {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        }
      });

      
      
// Define task to get the latest EventCalendar file based on pattern
on('task', {
   
  // getLatestFile({ directory, pattern }) {
  //   const fs = require('fs');
  //   const path = require('path');
  //   return new Promise((resolve, reject) => {
  //     // Read all files in the directory
  //     fs.readdir(directory, (err, files) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       // Log all files found in the directory
  //       console.log('All files in directory:', files);

  //       // Use the dynamic pattern for event files (both EventCalendar and EventRepo)
  //       const filePattern = new RegExp(pattern);

  //       // Filter files that match the given pattern
  //       const matchingFiles = files
  //         .filter(file => filePattern.test(file))
  //         .map(file => path.join(directory, file));

  //       // Log the filtered files that match the pattern
  //       console.log('Matching files:', matchingFiles);

  //       if (matchingFiles.length === 0) {
  //         return reject(new Error(`No files matching the pattern '${pattern}' were found.`));
  //       }

  //       // Sort the files by timestamp to get the latest one
  //       const latestFile = matchingFiles.sort((a, b) => {
  //         const aTime = a.match(/\d{14}/) ? a.match(/\d{14}/)[0] : 0;
  //         const bTime = b.match(/\d{14}/) ? b.match(/\d{14}/)[0] : 0;
  //         return bTime.localeCompare(aTime); // Sort in descending order
  //       })[0];

  //       // Log the latest file for debugging
  //       console.log('Latest file:', latestFile);

  //       resolve(latestFile);
  //         });
  //       });
  //     }

  // getLatestFile({ directory, pattern }) {
  //   debugger;
  //   return new Promise((resolve, reject) => {
  //     // Read all files in the directory
  //     fs.readdir(directory, (err, files) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       debugger;
  //       // Log all files found in the directory for debugging
  //       console.log('All files in directory:', files);

  //       // Create a RegExp object from the provided pattern
  //       const filePattern = new RegExp(pattern);

  //       // Filter files that match the given pattern
  //       const matchingFiles = files
  //         .filter(file => filePattern.test(file))
  //         .map(file => path.join(directory, file));

  //       // Log the filtered files that match the pattern
  //       console.log('Matching files:', matchingFiles);

  //       if (matchingFiles.length === 0) {
  //         return resolve(null); // No files found
  //       }

  //       // Sort the files by timestamp (assuming timestamp is the first part of the filename)
  //       const latestFile = matchingFiles.sort((a, b) => {
  //         const aTime = a.match(/\d{14}/) ? a.match(/\d{14}/)[0] : 0;
  //         const bTime = b.match(/\d{14}/) ? b.match(/\d{14}/)[0] : 0;
  //         return bTime.localeCompare(aTime); // Sort in descending order
  //       })[0];

  //       // Log the latest file for debugging
  //       console.log('Latest file:', latestFile);

  //       resolve(latestFile);
  //     });
  //   });
  // }


  getLatestFile({ directory, pattern }) {
    return new Promise((resolve, reject) => {
        // Log the inputs received by the function
        console.log('Directory ammar:', directory);
        console.log('Pattern ammar:', pattern);
        
        // Read all files in the directory
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return reject(err);
            }

            // Log all files found in the directory
            console.log('All files in directory:', files);

            // Create a RegExp object from the provided pattern
            const filePattern = new RegExp(pattern);
            
            // Filter files that match the given pattern
            const matchingFiles = files.filter(file => {
                const match = filePattern.test(file);
                console.log(`File: ${file}, Matches: ${match}`);
                return match;
            }).map(file => path.join(directory, file));

            // Log the filtered files that match the pattern
            console.log('Matching files:', matchingFiles);

            if (matchingFiles.length === 0) {
                console.warn('No matching files found.');
                return resolve(null); // No files found
            }

            // Sort the files by timestamp
            const latestFile = matchingFiles.sort((a, b) => {

              

              // const validateDateTime = (str) => {
              //   const match = str.match(/^\d{4}\d{2}\d{2}\d{2}\d{2}\d{2}$/);
              //   if (!match) return false;
              
              //   const year = parseInt(str.substring(0, 4));
              //   const month = parseInt(str.substring(4, 6));
              //   const day = parseInt(str.substring(6, 8));
              //   const hour = parseInt(str.substring(8, 10));
              //   const minute = parseInt(str.substring(10, 12));
              //   const second = parseInt(str.substring(12, 14));
              
              //   if (year < 1900 || year > 2099) return false;
              //   if (month < 1 || month > 12) return false;
              //   if (day < 1 || day > 31) return false;  // Simplified, does not account for month-specific days
              //   if (hour < 0 || hour > 23) return false;
              //   if (minute < 0 || minute > 59) return false;
              //   if (second < 0 || second > 59) return false;
              
              //   return true;
              // };
              
              // const aTime = validateDateTime(a) ? a.match(/^\d{4}\d{2}\d{2}\d{2}\d{2}\d{2}$/)[0] : '0';
              // const bTime = validateDateTime(b) ? b.match(/^\d{4}\d{2}\d{2}\d{2}\d{2}\d{2}$/)[0] : '0';

              // console.log(`Comparing: ${a} (${aTime}) vs ${b} (${bTime})`);
              // return bTime.localeCompare(aTime); // Sort in descending order
                
               
                const aTime = a.match(/\d{14}/) ? a.match(/\d{14}/)[0] : '0';
                const bTime = b.match(/\d{14}/) ? b.match(/\d{14}/)[0] : '0';
                console.log(`Comparing: ${a} (${aTime}) vs ${b} (${bTime})`);
                return bTime.localeCompare(aTime); // Sort in descending order
            })[0];

            // Log the latest file for debugging
            console.log('Latest file:', latestFile);
        
            resolve(latestFile); // Ensure this returns the correct file path
        });
    });
}

  

});
  
      // implement node event listeners here
     require('cypress-mochawesome-reporter/plugin')(on);
    },
   // specPattern: 'cypress/integration/examples/*.js',
    specPattern: ['cypress/e2e/Events/**/*cy.js','cypress/e2e/Login/**/*cy.js', 'cypress/integration/**/*.js'],
   // screenshotsFolder: 'cypress/screenshots',
  },
});
