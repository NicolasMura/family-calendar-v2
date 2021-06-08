describe('Basic log in page tests', () => {
  console.log('Basic log in page tests');

  before(() => {
    // localStorage.setItem(
    //   'ngx-webstorage|hasreadthedocslocalstorage',
    //   JSON.stringify('true')
    // );
  });

  it('Should display the log in page', () => {
    cy.visit(Cypress.env('baseUrl'));

    // No picture, username, enter button or settings button in header
    // cy.get('#user-avatar').should('not.exist');
    // cy.get('#user-name').should('not.exist');
    // cy.get('[aria-label="enter"]').should('not.exist');
    // cy.get('[aria-label="settings"]').should('not.exist');

    // No side nav
    // cy.get('.mat-drawer').should('not.exist');
    cy.get('.mat-sidenav').should('not.be.visible');

    // Username and password form fields
    cy.get('[formcontrolname="username"]').should('exist');
    cy.get('[formcontrolname="password"]').should('exist');
  });

  it('Should not be allowed to connect without login and / or password', () => {
    // Username input should be focused
    cy.get('[formcontrolname="username"]').should('be.focused');

    // No username, no password
    cy.get('[data-cy="login-btn"]').should('have.attr', 'disabled', 'disabled');

    // Username, but no password
    cy.get('[formcontrolname="username"]')
      .type('bob', { delay: 100 })
      .should('have.value', 'bob');
    cy.get('[data-cy="login-btn"]').should('have.attr', 'disabled', 'disabled');

    // Password, but no username
    cy.get('[formcontrolname="username"]')
      .clear()
      .should('have.value', '');
    cy.get('[formcontrolname="password"]')
      .clear()
      .should('have.value', '')
      .type('eponge', { delay: 100 })
      .should('have.value', 'eponge');

    cy.get('[data-cy="login-btn"]').should('have.attr', 'disabled', 'disabled');
  });

  it('Should not log in with wrong username or password, and display user notification + red error message', () => {
    cy.get('[formcontrolname="username"]')
      .type('bob', { delay: 100 })
      .should('have.value', 'bob');
    cy.get('[formcontrolname="password"]')
      .clear()
      .should('have.value', '')
      .type('eponge', { delay: 100 })
      .should('have.value', 'eponge');
    cy.get('[data-cy="login-btn"]').should('not.have.attr', 'disabled');
    cy.get('[data-cy="login-btn"]').click();
    cy.get('.notification-login-by-username-error');
    cy.get('mat-error');
    // .should('have.css', 'color', '#d32f2f') // => @TODO: to be implemented
  });

  it('Should log in with correct credentials', () => {
    // start a server to begin routing responses to cy.route()
    // and intercept xhr response of network request /rest/api/v0/authorized-applications
    cy.intercept(
      'GET',
      Cypress.env('backApi').baseUrlMicroReferentiel +
        '/authorized-applications',
      'fixture:applications.json'
    ).as('getApps');;

    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');

    // it is ok for the username to be visible in the Command Log
    expect(username, 'username was set').to.be.a('string').and.not.be.empty;
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error(
        'Missing password value, set using cypress.env.json or CYPRESS_password=...'
      );
    }

    cy.get('[formcontrolname="username"]')
      .clear()
      .should('have.value', '')
      .type(username, { delay: 100 })
      .should('have.value', username);
    cy.get('[formcontrolname="password"]')
      .clear()
      .should('have.value', '')
      .type(password, { delay: 100, log: false })
      .should(el$ => {
        if (el$.val() !== password) {
          throw new Error('Different value of typed password');
        }
      })
      .type('{enter}');

    // // Picture, username, enter button and settings button in header
    // cy.get('.right__section')
    //   .find('img')
    //   .should('exist');
    // cy.get('.right__section')
    //   .find('span')
    //   .should('exist');
    // cy.get('[aria-label="enter"]').should('exist');
    // cy.get('[aria-label="settings"]').should('exist');
    // cy.get('[aria-label="More menu"]')
    //   .click({ force: true })
    //   .get('[aria-label="moreMenuConnected"]')
    //   .should('exist');
    // cy.get('.mat-form-field').should('exist');

    // // No log in SSO btn
    // cy.get('[aria-label="log in with sso"]').should('not.exist');

    // // No side nav
    // cy.get('.mat-drawer').should('not.exist');

    // // We must stay on baseUrl page
    // cy.url().then((url: string) => {
    //   expect([Cypress.env('baseUrl'), Cypress.env('baseUrl') + '/']).to.include(
    //     url
    //   );
    // });
  });
});
