import { expect } from 'chai';
//import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  createNewCardButton: '//a[contains(text(),"Create new Card")]',
  waitingForApprovalButton: '//a[contains(text(),"Waiting for approval")]',
  flashGroupName: '//div/h4[@qa="name"]/a',
  questionField: '//textarea[@name="question"]',
  answerField: '//textarea[@name="answer"]',
  saveButton: '//button[@class="btn btn-primary"]',
  successMessage: '//div[@class="notification notification-success notification-visible"]',
  successMessageNotification: '//h4[@class="notification-title"]',
  waitingForApprovalQuestion: '//div//strong[@class="d-block mb-2"]', //need improvment
  waitingForApprovalAnswer: '',
  questionApproved: '//div/strong[@qa="question"]',
  answerApproved: '//div/span[@qa="answer"]',
};

const expected = {
  h1FlashCards: 'FlashCards',
  h1CreateFlashCard: 'Create FlashCard',
};

const data = {
  question: 'What does abbreviation QA mean?',
  answer: 'Meaning: quality assurance.',
  successMessage: 'Flash Card created',
};

let numberOfCardsWaitingForApproval;

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

  it('should verify amount of approved cards in `Main view`', () => {
    $(selector.waitingForApprovalButton).click();
    numberOfCardsWaitingForApproval = $$(selector.waitingForApprovalQuestion).length;
    expect(numberOfCardsWaitingForApproval > 0).to.be.true;
  });

  it('should verify amount of waiting for approval cards', () => {
    $(selector.waitingForApprovalButton).click();
    numberOfCardsWaitingForApproval = $$(selector.waitingForApprovalQuestion).length;
    expect(numberOfCardsWaitingForApproval > 0).to.be.true;
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

  it('should filling all required fields of flash card and click on Save button', () => {
    $(selector.questionField).setValue(data.question);
    $(selector.answerField).setValue(data.answer);
    $(selector.saveButton).click();
  });

  it('should verify that success message is displayed', () => {
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that success message has correct text', () => {
    const actualTextOfSuccessMessage = $(selector.successMessageNotification).getText();
    expect(actualTextOfSuccessMessage).equal(data.successMessage);
  });

  it('should verify that card will appear in the list `Waiting for approval`', () => {
    $(selector.waitingForApprovalButton).click();
    const question = $$(selector.waitingForApprovalQuestion)[0].getText();
    expect(question).equal(data.question);
  });
});
