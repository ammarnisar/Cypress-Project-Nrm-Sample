import BasePage from "./BasePage";
 
class LoginPage extends BasePage {
    constructor() {
        super(); // Call the base class constructor 
      this.emailInput = 'input[type="email"]';
      this.passwordInput = 'input[type="password"]';
     // this.button = 'button'; // put into basepage as used common in mulitple files
      this.logintext='Login';
      this.modelSelectionHeader = 'h5:contains("Let\'s choose your model!")';
      this.modelDropdown = '#ej2_dropdownlist_6';
      this.modedropdowncountryselection='.e-content div';
      this.proceedButton = 'button:contains("Proceed")';
    }
  
    debugger;
    visitLoginPage() {
      cy.visit('/');
    }
  
    enterEmail(email) {
      cy.get(this.emailInput).clear().type(email);
    }
  
    enterPassword(password) {
      cy.get(this.passwordInput).clear().type(password);
    }
  
    clickLogin() {
        cy.get(this.button).contains(this.logintext).click();
    }
  
    validateLogin() {
      cy.get(this.modelSelectionHeader, { timeout: 10000 }).should('be.visible').then(() => {
        
        cy.url().should('include', '/auth/model-selection');
      });
      
    }
  
    // selectModelCountry(country) {
    //   cy.get(this.modelDropdown, { timeout: 10000 }).should('be.visible').click().then(() => {        
    //     cy.get(this.modedropdowncountryselection).contains(country).click();
    //   });
      
    // }
  
    // clickProceed() {
    //   cy.contains(this.proceedButton).click();
    //   cy.url().should('include', '/eventrepository');
    // }
  
    performLogin(email, password) {
      this.visitLoginPage();
      this.enterEmail(email);
      this.enterPassword(password);
      this.clickLogin();
      this.validateLogin();
    }
  }
  
  export default LoginPage;
  