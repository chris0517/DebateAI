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
  
    it('Test signup page as student', () => {
        cy.contains('Sign Up').click();
        cy.url().should('include', '/signup')
        cy.contains('Sign Up With Google')
        cy.get('#role').click()
        cy.get('[data-value="Student"]').click() 
        cy.get('#role').invoke('text').should('contain', 'Student')
        cy.get('#studentNumber').type('12345') /
        cy.get('#studentNumber').should('have.value', '12345') 
    });

    it('Test signup page as teracher', () => {
        cy.contains('Sign Up').click();
        cy.url().should('include', '/signup')
        cy.contains('Sign Up With Google')
        cy.get('#role').click()
        cy.get('[data-value="Teacher"]').click() 
        cy.get('#role').invoke('text').should('contain', 'Teacher')
    });

    it('Test Login page as teracher', () => {
        cy.contains('Log In').click();
        cy.url().should('include', '/login')
        cy.contains('Log In With Google')
        cy.get('#role').click()
        cy.get('[data-value="Teacher"]').click() 
        cy.get('#role').invoke('text').should('contain', 'Teacher')
    });

    it('Test Classroom page', () => {
        cy.contains('Classroom').click();
        cy.url().should('include', '/classroom')
        cy.contains('Please Log in first')
        cy.get('#navigate').click()
        cy.url().should('include', '/login')

    });
})