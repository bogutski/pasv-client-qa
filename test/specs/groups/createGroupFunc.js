import { expect } from 'chai';
import { url } from '../constants';
import loginAction from '../user/_actions/loginAction';

const sel = {
  groupLink: '//li/a[@qa="groups-link"]',
  header: '//h1',
  createGroupBtn: '//a[@qa="create-group-button"]',
  groupNameField: '//input[@name="name"]',
  labelForName: '//label[@for="name"]',
  nameRequired: '//label[@for="name"]/./following-sibling::span[contains(text(),"Required")]',
  accessTypeSel: '//select[@name="accessType"]',
  accessTypeOption: '//select[@name="accessType"]//option',
  labelForAccessType: '//label[@for="accessType"]',
  accessTypeRequired:
    '//label[@for="accessType"]/./following-sibling::span[contains(text(),"Required")]',
  groupDescField: '//input[@name="description"]',
  labelForDesc: '//label[@for="description"]',
  createBtn: '//button[@type="submit"]',
  successMsg: '//div[@class="notifications-br"]//h4[text()="Group created"]',
  groupList: '//div[@qa="group-list-item"]',
  groupAll: '//div[@qa="group-list"]',
};

const data = {
  groupName: 'QA_new',
  groupDesc: 'Only quality info',
  expHeaderGroups: 'Groups',
  expHeader: 'Create new Group',
  expLabelForName: 'Group name',
  expLabelForAccessType: 'Access Type',
  expLabelForGroupDesc: 'Group description',
  expAccessTypeOption: ['', 'Members', 'All'],
  allTypeText: 'QwЖц1?/>{])*&^%$#@! |',
  oneChar: 'I',
  largeText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna orci, pretium eget est sed, pretium egestas odio. Maecenas viverra lacinia ante vel scelerisque. Sed ut nibh lacus. Aenean dui nisl, accumsan non risus eget, malesuada congue nullam.',
  isValid: 'is-valid',
  isInvalid: 'is-invalid',
  expUrl: 'https://stage.pasv.us/groups',
  textMsg: 'Group created',
};
let valid;
let groupNum;

describe('Creating Group', () => {
  before(() => {
    browser.url(url.login);
    loginAction(browser);
  });

  it('should check that user gets redirected to `Groups` page', () => {
    $(sel.groupLink).click();
    $(sel.createGroupBtn).waitForDisplayed(500);
    expect($(sel.header).getText()).to.be.equal(data.expHeaderGroups);
  });

  it('should check the amount of the existing groups > 0', () => {
    groupNum = $(sel.groupAll).$$(sel.groupList).length;
    expect(groupNum > 0).to.be.true; //
  });

  it('should check that the user gets redirected to `Create new Group` page', () => {
    $(sel.createGroupBtn).click();
    expect($(sel.header).getText()).to.be.equal(data.expHeader);
  });

  it('should check that `Group name` field is displayed', () => {
    expect($(sel.groupNameField).isDisplayed()).to.be.true;
  });

  it('should check that `Group name` label is displayed', () => {
    expect($(sel.labelForName).isDisplayed()).to.be.true;
  });

  it('should check that `Group name` field is required', () => {
    expect($(sel.nameRequired).isDisplayed()).to.be.true;
  });

  it('should check that `Access Type` field is displayed', () => {
    expect($(sel.accessTypeSel).isDisplayed()).to.be.true;
  });

  it('should check that `Access Type` label is displayed', () => {
    expect($(sel.labelForAccessType).isDisplayed()).to.be.true;
  });

  it('should check that `Access Type` field is required', () => {
    expect($(sel.accessTypeRequired).isDisplayed()).to.be.true;
  });

  it('should check that `Group description` field is displayed', () => {
    expect($(sel.groupDescField).isDisplayed()).to.be.true;
  });

  it('should check that `Group description` label is displayed', () => {
    expect($(sel.labelForDesc).isDisplayed()).to.be.true;
  });

  it('should check that the `Create` button is disabled', () => {
    expect($(sel.createBtn).isEnabled()).to.be.false;
  });

  it('should check that `Group name` field accepts any type of text', () => {
    $(sel.groupNameField).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.groupNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group name` field is valid with 1 char', () => {
    $(sel.groupNameField).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.groupNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group name` field accepts any length of text', () => {
    $(sel.groupNameField).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.groupNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });
  it('should check that `Access Type` has correct options', () => {
    const dropDownOptionsText = $$(sel.accessTypeOption).map(option => option.getText());
    expect(dropDownOptionsText).to.deep.equal(data.expAccessTypeOption);
  });

  it('should check that `Access Type` field is valid', () => {
    for (let i = 1; i < $$(sel.accessTypeOption).length; i++) {
      $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[i]);
      browser.keys('Tab');
      valid = $(sel.accessTypeSel)
        .getAttribute('class')
        .includes(data.isValid);
    }
    expect(valid).to.be.true;
  });

  it('should check that `Access Type` field is invalid with empty option', () => {
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[0]);
    browser.keys('Tab');
    const validationFailed = $(sel.accessTypeSel)
      .getAttribute('class')
      .includes(data.isInvalid);
    expect(validationFailed).to.be.true;
  });

  it('should check that `Group description` field accepts any type of text', () => {
    $(sel.groupDescField).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.groupDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group description` field is valid with 1 char', () => {
    $(sel.groupDescField).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.groupDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Group description` field accepts any length of text', () => {
    $(sel.groupDescField).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.groupDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that the `Create` button is disabled if `Group name` is empty', () => {
    $(sel.groupNameField).clearValue();
    browser.keys('Tab');
    expect($(sel.createBtn).isEnabled()).to.be.false;
  });

  it('should check that the `Create` button is disabled if `Access Type` is invalid', () => {
    $(sel.groupNameField).setValue(data.oneChar);
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[0]);
    browser.keys('Tab');
    expect($(sel.createBtn).isEnabled()).to.be.false;
  });
  it('should check that the `Create` button is enabled if `Group descripton` is empty', () => {
    $(sel.groupDescField).clearValue();
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[2]);
    browser.keys('Tab');
    expect($(sel.createBtn).isEnabled()).to.be.true;
  });

  it('should check that the `Create` button is enabled if all fields are filled', () => {
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[1]);
    $(sel.groupDescField).setValue(data.allTypeText);
    browser.keys('Tab');
    expect($(sel.createBtn).isEnabled()).to.be.true;
  });

  it('should check that user gets redirected to `Group` page', () => {
    $(sel.groupNameField).setValue(data.groupName);
    $(sel.groupDescField).setValue(data.groupDesc);
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[1]);
    $(sel.createBtn).click();
    browser.pause(300);
    expect(browser.getUrl()).to.be.equal(data.expUrl);
  });

  it('should check that the user sees successful message', () => {
    expect($(sel.successMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message', () => {
    expect($(sel.successMsg).getText()).to.be.equal(data.textMsg);
  });

  it('should check that the Group`s list increased by 1', () => {
    $(sel.groupLink).click();
    $(sel.createGroupBtn).waitForDisplayed(500);
    const groupNumNew = $(sel.groupAll).$$(sel.groupList).length;
    expect(groupNumNew).to.be.equal(groupNum + 1);
  });
});
