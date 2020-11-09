// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then(response => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
  });
});
Cypress.Commands.add('logout', () => {
    window.localStorage.removeItem('loggedUser');
});
Cypress.Commands.add('initBlogs', ({ title, url, author, likes }) => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  const user = JSON.parse(loggedUser);
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, url, author, likes },
    headers: { Authorization: `bearer ${user.token}` }
  }).then(response => {
  });
});