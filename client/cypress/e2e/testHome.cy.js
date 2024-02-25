
describe('DebateAI Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Replace with your DebateAI page URL
  });
  it('displays Title', () => {
    cy.contains('DebateAI');

  });
  it('displays NavBar Components', () => {
    cy.contains('Topics');
    cy.contains('Classroom');
    cy.contains('Log In');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup')
  });

  it('Test NavBar Links to signup Page', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup')
  });

  it('Test NavBar Links to login Page', () => {
    cy.contains('Log In').click();
    cy.url().should('include', '/login')
  });

  it('Test NavBar Links to classroom Page', () => {
    cy.contains('Classroom').click();
    cy.url().should('include', '/classroom')
  });

  it('Test NavBar Links to Topics Page', () => {
    cy.contains('Topics').click();
    cy.url().should('include', '/')
  });

  it('displays current topics', () => {
    cy.contains('Climate Change');
    cy.contains('Legalization of Marijuana');
    cy.contains('Iphones vs android');
  });
});

