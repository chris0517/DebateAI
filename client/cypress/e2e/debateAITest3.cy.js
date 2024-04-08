describe('DebateAI Page', () => {
  const login = () => {
    cy.visit('/login'); // Replace with your DebateAI page URL
    cy.contains('Log In').click();
    cy.url().should('include', '/login');
    cy.contains('Log In With Google');
    //insert email and password
    cy.get('#email').type('buffalosnakeman@gmail.com');
    cy.get('#password').type('1234567');
    cy.get('#loginbtn').click();
    cy.get('#continueloginbtn').click();
    cy.wait(3000);
  };
  it('displays Title', () => {
    cy.visit('/'); // Replace with your DebateAI page URL
    cy.contains('DebateAI');
  });
  it('displays NavBar Components', () => {
    cy.contains('Topics');
    cy.contains('Classroom');
    cy.contains('Log In');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('go to history page', () => {
    //wait three seconds
    login();
    cy.get('#history-link').click();
    cy.url().should('include', '/history');
    cy.wait(3000);
    cy.contains('Artificial Intelligence').click();
  });
});
