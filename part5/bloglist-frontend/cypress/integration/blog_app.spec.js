describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'test2',
      password: 'test2',
      name: 'test2'
    });
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'test',
      password: 'test',
      name: 'test'
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Blog list');
    cy.get('#login_form').should('be.visible');
  });
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login_form #username').type('test');
      cy.get('#login_form #password').type('test');
      cy.get('#login_form #login').click();
      cy.contains('test logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#login_form #username').type('test_');
      cy.get('#login_form #password').type('test');
      cy.get('#login_form #login').click();
      cy.get('html').should('not.contain', 'test logged in');
    });
  });
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test2', password: 'test2' }).initBlogs({ title: 'Test2 Text Init 1', url: 'http://test.com', author: 'Tester', likes: '1', }).logout();
      cy.login({ username: 'test', password: 'test' });
      cy.initBlogs({ title: 'Test Text Init 5', url: 'http://test.com', author: 'Tester', likes: '5', });
      cy.initBlogs({ title: 'Test Text Init 2', url: 'http://test.com', author: 'Tester', likes: '2', });
      cy.initBlogs({ title: 'Test Text Init 3', url: 'http://test.com', author: 'Tester', likes: '3', });
      cy.initBlogs({ title: 'Test Text Init 1', url: 'http://test.com', author: 'Tester', likes: '1', });
      cy.initBlogs({ title: 'Test Text Init 4', url: 'http://test.com', author: 'Tester', likes: '4', });
      cy.visit('http://localhost:3000');
    });

    it('A blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#create_form #text').type('Test Text');
      cy.get('#create_form #author').type('Tester');
      cy.get('#create_form #url').type('http://test.com');
      cy.get('#create_form #submit').click();
      cy.get('html').should('contain', 'a new blog Test Text created by Tester');
    });
    it('A blog can be update likes', function() {
        
    });
    it('A blog can be remove', function() {
        
    });
    it('blogs sort by likes', function() {
        
    });
  });
});