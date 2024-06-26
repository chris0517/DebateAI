describe('DebateAI Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Replace with your DebateAI page URL
  });

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
    cy.contains('DebateAI');
  });
  it('displays NavBar Components', () => {
    cy.contains('Topics');
    cy.contains('Classroom');
    cy.contains('Log In');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('Test Classroom page', () => {
    cy.contains('Classroom').click();
    cy.url().should('include', '/classroom');
    cy.contains('Please Log in first');
    cy.get('#navigate').click();
    cy.url().should('include', '/login');
  });

  it('go to topics page', () => {
    login();
    cy.contains('Topics').click();
    cy.url().should('include', '/');
    cy.contains('Artificial Intelligence').click();
    cy.get('#chat-input').type('I choose the other side');
    cy.wait(3000);
    cy.get('#chat-send').click();
  });
});
