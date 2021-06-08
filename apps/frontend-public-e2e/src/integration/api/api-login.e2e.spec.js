describe('Login API', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  it('should log in by username / password successfully', () => {
    // it is ok for the username to be visible in the Command Log
    expect(username, 'username was set').to.be.a('string').and.not.be.empty;
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error(
        'Missing password value, set using cypress.env.json or CYPRESS_password=...'
      );
    }
    expect(password, 'username was set').to.be.a('string').and.not.be.empty;

    const loginUrl = `${Cypress.env('backApi').baseUrlAuth}/login`;
    cy.request({
      method: 'POST',
      url: loginUrl,
      body: {
        username,
        password
      },
      // headers: {
      //   'client-api': 'mycloud-portal'
      // }
    })
      .its('body')
      .then(body => {
        expect(body).to.have.property('access_token').and.not.be.empty;
      });
  });
});
