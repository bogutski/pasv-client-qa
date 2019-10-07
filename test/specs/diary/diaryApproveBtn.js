import { expect } from 'chai';
import loginAction from './../user/_actions/loginAction';
import diaryGetAll from './_actions/diaryGetAll';
import diaryGetByID from './_actions/diaryGetByID';

const dayReportText = `Latyshev test # ${Math.floor(
  Math.random() * 1000,
)}, test test test test test test test test.`;
const token = process.env.TOKEN_ADMIN;
let allDiaries;
let diaryId;
let yourDiary;

const selector = {
  menuDiary: '//div[@id="site-menu"]//a[text() = "Diary"]',
  diaryRecord: '//div[@class="mt-2"]',
  createDayReportButton: '//a[text()="Create day report"]',
  saveButton: '//button[@type="submit"]',
  checkBox: '//input[@type="checkbox"]',
  descriptionField: '//textarea[@name="description"]',
  approveBtn: `//div[@qa="description"][contains(text(),'${dayReportText}')]/..//button[@qa="approve-button"]`,
  approvedSign: `//div[@qa="description"][contains(text(),'${dayReportText}')]/..//span[@qa="approve"]`,
};

describe('Diary - Func', () => {
  before(() => {
    loginAction(browser);
  });

  it('should  redirect to Diary page and day report creations field', () => {
    $(selector.menuDiary).waitForDisplayed(5000);
    $(selector.menuDiary).click();
    $(selector.createDayReportButton).waitForDisplayed(5000);
    $(selector.createDayReportButton).click();
  });

  it('should fill day report area and mark checkboxes', () => {
    $(selector.descriptionField).waitForDisplayed(5000);
    $(selector.descriptionField).setValue(dayReportText);
    for (let i = 0; i <= 6; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    $(selector.saveButton).waitForEnabled(5000);
    $(selector.saveButton).click();
  });

  it('should get the last diary in DB with API call', async () => {
    allDiaries = await diaryGetAll(token);
    for (let el of allDiaries) {
      if (el.description === dayReportText) {
        yourDiary = el;
      }
    }
    //lastDiary = allDiaries[0];
  });

  it('should check if the diary was not approved in DB with API call', async () => {
    const isApproved = yourDiary.approved;
    expect(isApproved).to.be.false;
  });

  it('should git the Id of the diary with API call', async () => {
    diaryId = yourDiary._id;
  });

  it('should approve the diary', () => {
    const approveBtn = $(selector.approveBtn);
    approveBtn.click();
  });

  it('should verify that the diary has Approved mark', () => {
    $(selector.approvedSign).waitForDisplayed(5000);
    const approved = $(selector.approvedSign);
    expect(approved.isDisplayed()).to.be.true;
  });

  it('should check if the diary was approved in DB with API call', async () => {
    yourDiary = await diaryGetByID(token, diaryId);
    const isApproved = yourDiary.approved;
    expect(isApproved).to.be.true;
  });
});
