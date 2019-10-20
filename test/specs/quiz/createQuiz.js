import { expect } from 'chai';
import loginAction from '../user/_actions/loginAction';

const sel = {
  header: '//h1',
  quizLink: '//a[@qa="quiz-link"]',
  createBtn: '//button[text()="Create Question Group"]',
  resultsLink: '//a[text()="Results"]',
  groupNameInput: '//input[@name="name"]',
  groupDescInput: '//input[@name="description"]',
  acceptableMistakesInput: '//input[@name="acceptableMistakes"]',
  checkBox: '//div[@class="custom-checkbox custom-control"]/label',
  button: '//button[@type="submit"]',
  labelGroupNameRequired: '//input[@name="name"]/../div/span',
  labelAcceptableMistakesRequired: '//input[@name="acceptableMistakes"]/../div/span',
  questionGroupCreatedMsg: '//div[@class="notifications-br"]//h4[contains(text(), "created")]',
  questionCreatedMsg: '//div[@class="notifications-br"]//h4[text()="Question created"]',
  emptyQuestionList: '//div[@role="alert"]',
  numberOfQuestionInQuiz: '//h1/span',
  questionNameInput: '//input[@placeholder="Question name"]',
  labelQuestionNameInputRequired: '//input[@placeholder="Question name"]/../div/span',
  questionDesc: '//textarea[@placeholder="Question description"]',
  selectNumOfCorrectAnswer: '//select[@name="answerType"]',
  selectNumOfCorrectAnswerOption: '//select[@name="answerType"]//option',
  answer1: '//input[@name="variants[0].name"]',
  labelAnswer1Required: '//input[@name="variants[0].name"]/../div/span',
  answer2: '//input[@name="variants[1].name"]',
  answer3: '//input[@name="variants[2].name"]',
  labelAnswer2Required: '//input[@name="variants[1].name"]/../div/span',
  checkBoxCorrectAnswer1: '//input[@id="variants[0].correct"]/..',
  checkBoxCorrectAnswer2: '//input[@id="variants[1].correct"]/..',
  removeAnswer1Btn: '//input[@name="variants[0].name"]/../../../div/button',
  removeAnswer2Btn: '//input[@name="variants[1].name"]/../../../div/button',
  addVariantBtn: '//button[text()="Add Variant"]',
  h3: '//h3',
  createButton: '//button[text()="Create"]',
};

const data = {
  expQuizUrl: 'https://stage.pasv.us/quiz',
  headerQuiz: 'Quiz',
  quizCreateQuestionGroupUrl: 'https://stage.pasv.us/quiz/questiongroup/create',
  headerCreateQuestionGroup: 'Create Question Group',
  allTypeText: 'QwЖц1?/>{])*&^%$#@! |',
  oneChar: 'I',
  largeText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna orci, pretium eget est sed, pretium egestas odio. Maecenas viverra lacinia ante vel scelerisque. Sed ut nibh lacus. Aenean dui nisl, accumsan non risus eget, malesuada congue nullam.',
  digitsOnly: 1234567890,
  questionGroupCreatedMessage: 'Question Group created',
  groupName: 'JavaScript_Test',
  headerEditQuestion: 'Edit',
  groupDesc: 'only 1 mistake is allowed',
  acceptableMistake: 1,
  numOfCorrectAnswer: ['Single', 'Multi'],
  //questionGroupUodatedMessage: 'Question Group updated',
  h3Text: 'Create Question',
  questionCreatedMessage: 'Question created',
  isValid: 'is-valid',
  isInvalid: 'is-invalid',
  question1Text: 'В JavaScript строка это:',
  question1Desc: 'Pay attention',
  answer1Question: 'любые текстовые данные',
  answer2Question: 'набор символов, имеющих смысл',
  answer3Question: 'только буквы',
};

describe('Create Quiz', () => {
  before(() => {
    loginAction(browser);
  });

  it('should check that user gets redirected to `Quiz` page (header)', () => {
    $(sel.quizLink).click();
    $(sel.header).waitForDisplayed(500);
    expect($(sel.header).getText()).to.be.equal(data.headerQuiz);
  });

  it('should check that user gets redirected to `Quiz` page (URL)', () => {
    expect(browser.getUrl()).to.be.equal(data.expQuizUrl);
  });

  it('should check that the `Create Question Group` button is displayed', () => {
    const isDisplayed = $(sel.createBtn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that the `Create Question Group` button is enabled', () => {
    const isEnabled = $(sel.createBtn).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should check that the `Results` link is displayed', () => {
    const isDisplayed = $(sel.resultsLink).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that user redirects to `Create Question Group` page', () => {
    $(sel.createBtn).click();
    expect(browser.getUrl()).to.be.equal(data.quizCreateQuestionGroupUrl);
  });

  it('should check that `Group name` field is displayed', () => {
    const isDisplayed = $(sel.groupNameInput).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Group name` field is required', () => {
    const isDisplayed = $(sel.labelGroupNameRequired).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Group description` field is displayed', () => {
    const isDisplayed = $(sel.groupDescInput).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Acceptable mistakes` field is displayed', () => {
    $(sel.acceptableMistakesInput).clearValue();
    const isDisplayed = $(sel.acceptableMistakesInput).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Acceptable mistakes` field is required', () => {
    const isDisplayed = $(sel.labelAcceptableMistakesRequired).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Active` checkbox is displayed', () => {
    const isDisplayed = $(sel.checkBox).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Active` checkbox is not selected', () => {
    const isSelected = $(sel.checkBox).isSelected();
    expect(isSelected).to.be.false;
  });

  it('should check that `Save` button is displayed', () => {
    expect($(sel.button).isDisplayed()).to.be.true;
  });

  it('should check that the `Save` button is disabled', () => {
    const isEnabled = $(sel.button).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should check that `Group name` field accepts any type of text', () => {
    $(sel.groupNameInput).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.groupNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group name` field is valid with 1 char', () => {
    $(sel.groupNameInput).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.groupNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group name` field accepts any length of text', () => {
    $(sel.groupNameInput).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.groupNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group description` field accepts any type of text', () => {
    $(sel.groupDescInput).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.groupDescInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group description` field is valid with 1 char', () => {
    $(sel.groupDescInput).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.groupDescInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group description` field accepts any length of text', () => {
    $(sel.groupDescInput).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.groupDescInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Acceptable mistakes` field accepts only digits', () => {
    $(sel.acceptableMistakesInput).setValue(data.digitsOnly);
    browser.keys('Tab');
    const validation = $(sel.acceptableMistakesInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Acceptable mistakes` field does not accept letters and special symbols', () => {
    $(sel.acceptableMistakesInput).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.acceptableMistakesInput)
      .getAttribute('class')
      .includes(data.isInvalid);
    expect(validation).to.be.true;
  });

  it('should check that the `Save` button is enabled if all fields are filled', () => {
    $(sel.groupNameInput).setValue(data.groupName);
    $(sel.groupDescInput).setValue(data.groupDesc);
    $(sel.acceptableMistakesInput).setValue(data.acceptableMistake);
    const isEnabled = $(sel.button).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should check that user redirects to `Edit question` page', () => {
    $(sel.button).click();
    browser.waitUntil(
      () => {
        return (
          $(sel.header)
            .getText()
            .includes(data.headerEditQuestion) === true
        );
      },
      5000,
      'expected text to be `Edit JavaScript_Test` after 5s',
    );
  });

  it('should check that the user sees successful message', () => {
    expect($(sel.questionGroupCreatedMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message', () => {
    expect($(sel.questionGroupCreatedMsg).getText()).to.be.equal(data.questionGroupCreatedMessage);
  });

  it('should check that `Question list is empty` alert is displayed', () => {
    const isDisplayed = $(sel.emptyQuestionList).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that the header `Create Question` is displayed', () => {
    const isDisplayed = $(sel.h3).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Question name` field is displayed', () => {
    const isDisplayed = $(sel.questionNameInput).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Question name` input is required', () => {
    const isDisplayed = $(sel.labelQuestionNameInputRequired).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Question name` field accepts any type of text', () => {
    $(sel.questionNameInput).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.questionNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Question name` field is valid with 1 char', () => {
    $(sel.questionNameInput).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.questionNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Question name` field accepts any length of text', () => {
    $(sel.questionNameInput).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.questionNameInput)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Question description` input is displayed', () => {
    const isDisplayed = $(sel.questionDesc).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Question description` field accepts any type of text', () => {
    $(sel.questionDesc).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.questionDesc)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Question description` field is valid with 1 char', () => {
    $(sel.questionDesc).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.questionDesc)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Question description` field accepts any length of text', () => {
    $(sel.questionDesc).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.questionDesc)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `AnswerType` dropdown field is displayed', () => {
    const isDisplayed = $(sel.selectNumOfCorrectAnswer).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `AnswerType` dropdown field has correct data', () => {
    const answerTypeEl = $(sel.selectNumOfCorrectAnswer).$$(sel.selectNumOfCorrectAnswerOption);
    const answerTypeElText = answerTypeEl.map(el => el.getText());
    expect(answerTypeElText).to.deep.equal(data.numOfCorrectAnswer);
  });

  it('should check that `Answer#1` field is displayed', () => {
    const isDisplayed = $(sel.answer1).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Answer#1` field is required', () => {
    const isDisplayed = $(sel.labelAnswer1Required).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Answer#2` field is displayed', () => {
    const isDisplayed = $(sel.answer2).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Answer#2` field is required', () => {
    const isDisplayed = $(sel.labelAnswer1Required).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Answer` field accepts any type of text', () => {
    $(sel.answer1).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.answer1)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Answer` field is valid with 1 char', () => {
    $(sel.answer1).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.answer1)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that Answer` field accepts any length of text', () => {
    $(sel.answer1).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.answer1)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Correct` checkbox for the 1st answer is not selected', () => {
    const isSelected = $(sel.checkBoxCorrectAnswer1).isSelected();
    expect(isSelected).to.be.false;
  });

  it('should check that `Correct` checkbox for the 2nd answer is not selected', () => {
    const isSelected = $(sel.checkBoxCorrectAnswer2).isSelected();
    expect(isSelected).to.be.false;
  });

  it('should check that `Remove` button for the 1st answer is displayed', () => {
    const isDisplayed = $(sel.removeAnswer1Btn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Remove` button for the 2nd answer is displayed', () => {
    const isDisplayed = $(sel.removeAnswer2Btn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Add variant` button is displayed', () => {
    const isDisplayed = $(sel.addVariantBtn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Add variant` button is enabled', () => {
    const isEnabled = $(sel.addVariantBtn).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should check that `Create` button is displayed', () => {
    const isDisplayed = $(sel.createButton).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Create` button is disabled', () => {
    $(sel.questionNameInput).clearValue();
    $(sel.questionDesc).clearValue();
    $(sel.answer1).clearValue();
    $(sel.answer2).clearValue();
    const isEnabled = $(sel.createButton).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should check that `Create` button is enabled if all fields are filled', () => {
    $(sel.questionNameInput).setValue(data.question1Text);
    $(sel.questionDesc).setValue(data.question1Desc);
    $(sel.selectNumOfCorrectAnswer).selectByVisibleText(data.numOfCorrectAnswer[0]);
    $(sel.answer1).setValue(data.answer1Question);
    $(sel.answer2).setValue(data.answer2Question);
    $(sel.addVariantBtn).click();
    $(sel.answer3).setValue(data.answer3Question);
    $(sel.checkBoxCorrectAnswer1).click();
    const isEnabled = $(sel.createButton).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should check that the user sees successful message after `Create` button was clicked on', () => {
    $(sel.createButton).click();
    $(sel.questionCreatedMsg).waitForDisplayed(5000);
    expect($(sel.questionCreatedMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message after `Create` button was clicked on', () => {
    expect($(sel.questionCreatedMsg).getText()).to.be.equal(data.questionCreatedMessage);
  });
});
