import { expect } from 'chai';
//import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  mainViewButton: '//a[@qa="main-view"]',
  createNewCardButton: '//a[contains(text(),"Create new Card")]',
  waitingForApprovalButton: '//a[contains(text(),"Waiting for approval")]',
  saveButton: '//button[@class="btn btn-primary"]',
  approveButton: '//button[contains(text(),"Approve")]',
  flashGroupName: '//div/h4[@qa="name"]/a',
  questionField: '//textarea[@name="question"]',
  answerField: '//textarea[@name="answer"]',

  successMessage: '//div[@class="notification notification-success notification-visible"]',
  successMessageNotification: '//h4[@class="notification-title"]',
  cardsNew: '//div/span[contains(text(),"new")]',
  questionNew: '//div//strong[@class="d-block mb-2"]', //need improvment
  answerNew: '',
  cardsApproved: '//div/span[@qa="status"]',
  questionApproved: '//div/strong[@qa="question"]',
  answerApproved: '//div/span[@qa="answer"]',
};

const expected = {
  h1FlashCards: 'FlashCards',
  h1CreateFlashCard: 'Create FlashCard',
  successMessage: 'Flash Card created',
};

const data = {
  question: 'What does abbreviation QA mean?',
  answer: 'Meaning: quality assurance.',
};

let initialNumberOfApprovedCards;
let initialNumberOfNewCards;
let newNumberOfNewCards;

//let initialCardsCount;

describe('Cards - Create FlashCard - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should verify that click to `Cards`item in menu should redirect to `FlashCards` page', () => {
    $(selector.menuCards).click();
    browser.waitUntil(
      () => {
        return $(selector.h1).getText() === expected.h1FlashCards;
      },
      6000,
      'WRONG Header',
    );
    expect($(selector.h1).getText()).equal(expected.h1FlashCards);
  });

  it('should verify that click to name of the last Flash Group should redirect to Flash group page', () => {
    const nameOfGroup = $$(selector.flashGroupName)[0].getText();
    $$(selector.flashGroupName)[0].click();
    expect($(selector.h1).getText()).equal(nameOfGroup);
  });

  it('should count initial number of approved cards in `Main view`', () => {
    $(selector.mainViewButton).click();
    initialNumberOfApprovedCards = $$(selector.cardsApproved).length;
  });

  it('should find initial number of new (waiting for approval) cards', () => {
    $(selector.waitingForApprovalButton).click();
    initialNumberOfNewCards = $$(selector.cardsNew).length;
  });

  it('should verify that click to `Create new Card` button should redirect to `Create FlashCard` page', () => {
    $(selector.createNewCardButton).click();
    const actualH1 = $$(selector.h1)[1].getText();
    expect(actualH1).equal(expected.h1CreateFlashCard);
  });

  it('should verify that `Question` field is displayed', () => {
    expect($(selector.questionField).isDisplayed()).to.be.true;
  });

  it('should verify that `Answer` field is displayed', () => {
    expect($(selector.answerField).isDisplayed()).to.be.true;
  });

  it('should verify that button `Save` is displayed', () => {
    expect($(selector.saveButton).isDisplayed()).to.be.true;
  });

  it('should verify that after filling all required fields and clicking on Save button success message is displayed', () => {
    $(selector.questionField).setValue(data.question);
    $(selector.answerField).setValue(data.answer);
    $(selector.saveButton).click();
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that success message has correct text', () => {
    const actualTextOfSuccessMessage = $(selector.successMessageNotification).getText();
    expect(actualTextOfSuccessMessage).equal(expected.successMessage);
  });

  it('should verify that number af new cards increased by 1', () => {
    $(selector.waitingForApprovalButton).click();
    browser.pause(1000);
    newNumberOfNewCards = $$(selector.cardsNew).length;
    expect(newNumberOfNewCards).equal(initialNumberOfNewCards + 1);
  });

  it('should verify that new card has correct text of question', () => {
    const question = $$(selector.questionNew)[0].getText();
    expect(question).equal(data.question);
  });

  /* === after add class!
  it('should verify that new card has correct answer', () => {
    const question = $$(selector.answerNew)[0].getText();
    expect(question).equal(data.answer);
  });
  */

  it('should verify that after approval of new card number of approved cards increase by 1', () => {
    $$(selector.approveButton)[0].click();
    $(selector.mainViewButton).click();
    browser.refresh();
    const newNumberOfApprovedCards = $$(selector.cardsApproved).length;
    expect(newNumberOfApprovedCards).equal(initialNumberOfApprovedCards + 1);
  });

  it('should verify that after approval of new card number of new cards decrease by 1 (or the same as at the begining)', () => {
    $(selector.waitingForApprovalButton).click();
    browser.pause(1000);
    const numberOfNewCards = $$(selector.cardsNew).length;
    expect(numberOfNewCards).equal(initialNumberOfNewCards);
  });
});
