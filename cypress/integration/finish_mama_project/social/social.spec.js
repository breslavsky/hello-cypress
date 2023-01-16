///<reference types='cypress' />
import { getRandomNumber } from '/cypress/support/utils.js';
import { login } from '/cypress/support/shared.js';
// import meUser from '/cypress/fixtures/me-user.json';

function selectFirstArticle() {
  waitForArticlesList();
  cy.get('@articleList')
    .find('.article-preview')
    .should('have.length', 12)
    .eq(0)
    .as('firstArticle');
}
function waitForArticlesList() {
  cy.get("article-list")
    .contains(".article-preview", "Loading")
    .should("not.be.visible");
}

function openGlobalFeed() {
  cy.get('.feed-toggle a.nav-link[ng-class*=all]').click();
}

function checkActiveYourFeed() {
  cy.get('@yourFeed').should('have.class', 'active');
}

function subscribeFromUser() {
  // meUser.username
  cy.get('@firstArticle').find('.author').as('describedAuthor').click();
  cy.get('@describedAuthor')
    .invoke('text')
    .invoke('trim')
    .as('subscribedAuthorName');
  cy.get('follow-btn button')
    .should('contain', 'Follow')
    .click()
    .as('followButton');
  // TODO:  improve css
  cy.get('@followButton').should('contain', 'Unfollow');
}

function unsubscribeFromUser() {
  checkActiveYourFeed();
  selectFirstArticle();
  cy.get('@firstArticle').find('.author').as('undescribedAuthor').click();
  cy.get('@undescribedAuthor')
    .invoke('text')
    .invoke('trim')
    .as('unsubscribedAuthorName');
  cy.get('follow-btn button')
    .should('contain', 'Unfollow')
    .click()
    .as('UnfollowButton');
  // TODO:  improve css
  cy.get('@UnfollowButton').should('contain', 'Follow');

}

function unsubscribeFromAll() {
  cy.get('@buttonHome').click();
  waitForArticlesList();
  cy.get('@articleList').find('.article-preview')
    .then(articles => {
      cy.log(articles.length);
      if (articles.length > 2) {
        cy.wrap(articles).eq(0).click();
        unsubscribeFromUser();
        unsubscribeFromAll();
      }
    });
}

function goToHomePage() {
  cy.get('@appHeader')
    .find('[show-authed=true] [ui-sref="app.home"]').as('buttonHome')
    .click();
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
    openGlobalFeed();
    selectFirstArticle();
    subscribeFromUser();

    cy.get('@subscribedAuthorName').then((authorName) => {
      cy.log(authorName);
      console.log(authorName);

      goToHomePage();

      cy.get('.home-page').should('contain', authorName);
    });

  });

  it('should do unsubscribe from user', () => {

    checkActiveYourFeed();
    waitForArticlesList();

    cy.get('@articleList').find('.article-preview')
      .then(articles => {
        cy.log(articles.length);
        if (articles.length === 2) {

          openGlobalFeed();
          selectFirstArticle();
          subscribeFromUser();

          cy.get('@subscribedAuthorName').then((authorName) => {
            cy.log(authorName);
            console.log(authorName);

            goToHomePage();

            cy.get('.home-page').should('contain', authorName);
          });
        }
      });

    unsubscribeFromUser();

    cy.get('@unsubscribedAuthorName').then((authorName) => {
      cy.log(authorName);
      console.log(authorName);

      goToHomePage();

      cy.get('.home-page').should('not.contain', authorName);
    });

  });


});
