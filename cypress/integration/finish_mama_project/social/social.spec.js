///<reference types='cypress' />
import { getRandomNumber } from '/cypress/support/utils.js';
import { login } from '/cypress/support/shared.js';

function selectFirstArticle() {
  waitForLoadArticleList();
  cy.get('@articleList')
    .find('article-preview')
    .should('have.length', 10)
    .eq(0)
    .as('firstArticle');
}
function waitForLoadArticleList() {
  cy.get('@articleList')
    .find('article-preview')
    .should('not.contain', 'Loading');
}

function openGlobalFeed() {
  cy.get('.feed-toggle a.nav-link[ng-class*=all]').click();
}

function checkActiveYourFeed() {
  cy.get('@yourFeed').should('have.class', 'active');
}

function unsubscribeFromUser() {
  checkActiveYourFeed();
  selectFirstArticle();
  cy.get('@firstArticle').find('.author').click();
  cy.get('follow-btn button')
    .should('contain', 'Unfollow')
    .click()
    .as('UnfollowButton');
  // TODO:  improve css
  cy.get('@UnfollowButton').should('contain', 'Follow');

}

function unsubscribeFromAll() {
  waitForLoadArticleList();
  cy.get('@articleList').find('article-preview')
    .then(articles => {
      if (articles.length > 0) {
        cy.wrap(articles).eq(0).click();
        unsubscribeFromUser();
        unsubscribeFromAll();
      }
    });
}

describe('Social', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.navbar').should('be.visible').as('appHeader');
    login();
    cy.get('article-list').as('articleList');
    cy.get('@appHeader').find('[show-authed=true] [ui-sref="app.home"]').as('buttonHome');
    cy.get('.feed-toggle a.nav-link[ng-class*=feed]').as('yourFeed');
    cy.location('hash').should('eq', '#/');
  });

  it('should do subscribe to user', () => {

    unsubscribeFromAll();

    cy.get('@buttonHome').click();
    
    openGlobalFeed();
    selectFirstArticle();
    
    cy.get('@firstArticle').find('.author').as('describedAuthor').click();
    cy.get('@describedAuthor')
      .invoke('text')
      .invoke('trim')
      .as('subscribedAuthorName');

    cy.get('@subscribedAuthorName').then((authorName) => {
      cy.log(authorName);
      console.log(authorName);

      cy.get('follow-btn button')
        .should('contain', 'Follow')
        .click()
        .as('followButton');
      // TODO:  improve css
      cy.get('@followButton').should('contain', 'Unfollow');

      cy.get('@appHeader')
        .find('[show-authed=true] [ui-sref="app.home"]')
        .click();

      cy.get('.home-page').should('contain', authorName);

    });
  });
});
