describe('DebateAI Page', () => {
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

  it('Test NavBar Links to signup Page', () => {
    cy.wait(2000);
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('Test NavBar Links to login Page', () => {
    cy.wait(2000);
    cy.contains('Log In').click();
    cy.url().should('include', '/login');
  });

  it('Test NavBar Links to classroom Page', () => {
    cy.wait(2000);
    cy.contains('Classroom').click();
    cy.url().should('include', '/classroom');
  });

  it('Test NavBar Links to Topics Page', () => {
    cy.wait(2000);
    cy.contains('Topics').click();
    cy.url().should('include', '/');
  });

  it('displays current topics', () => {
    cy.contains('Free College For All');
    cy.contains('Artificial Intelligence vs. Human Doctors');
    cy.contains('iPhones vs Androids');
  });
});
