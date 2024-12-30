import BasePage from "./BasePage";

class ModelSelectionPage extends BasePage  {
    constructor() {
        super(); // Call the base class constructor 
        this.floatInputSelector = '.e-float-input';
        this.modelSelectionHeader = 'h5:contains("Let\'s choose your model!")'; // Example header text
       // this.modelDropdown = '#ej2_dropdownlist_6';
        this.modelDropdown='#ej2_dropdownlist_2';
        this.countryOptionSelector = '.e-content div'; // Selector for country options
        this.proceedButtonText = 'Proceed';
      //  this.button = 'button'; used in now Basepage class as used in multiple classes
        this.country='Malaysia';
        this.modelSelectionUrl = 'https://mdlz-uat.nrminsight.io/auth/model-selection';
        
        // Declare the default country here
       // this.defaultCountry = 'Malaysia'; // Set your default country here
    }

    visitModelSelectionPage() {
        cy.visit('/auth/model-selection'); // Navigate to the model selection page
    }

    verifyFloatInputIsVisible() {
        cy.get(this.floatInputSelector, { timeout: 10000 }).should('be.visible');
    }

    validateModelSelectionPage() {
        cy.get(this.modelSelectionHeader, { timeout: 10000 }).should('be.visible').then(() => {
            cy.url().should('include', this.modelSelectionUrl);
          });
       
    }

    selectCountry() {
        // Open the model dropdown
        cy.get(this.modelDropdown, { timeout: 10000 }).should('be.visible').click().then(() => {
                // Type the country name into the dropdown
                cy.get(this.modelDropdown , { timeout: 10000 })
                .find('[aria-describedby="ej2_dropdownlist_2"]')
                .should('be.visible')
                .type(this.country);

          });

       
       
       
        // Check if options are visible and select the desired country
        cy.get('body').then($body => {
            if ($body.find(this.countryOptionSelector).length > 0) {
                cy.get(this.countryOptionSelector).contains(this.country).click(); // Click on the country option
            } else {
                cy.log('The option is not visible in the dropdown list');
            }
        });
    }

    clickProceed() {
        cy.contains(this.button, this.proceedButtonText).click().then(() => {  // Click on the Proceed button
            cy.url().should('include', '/eventrepository'); // Validate the URL after proceeding
          }); 
        
    }

    // High-level method to perform the entire model selection flow using the default country
    performModelSelection() {
        this.visitModelSelectionPage();
        this.verifyFloatInputIsVisible();
        this.validateModelSelectionPage();
        this.selectCountry(); // Use the default country
        this.clickProceed();
    }
}

export default ModelSelectionPage;
