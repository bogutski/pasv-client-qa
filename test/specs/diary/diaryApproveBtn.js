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
let lastDiary;

const selector = {
  menuDiary: '//div[@id="site-menu"]//a[text() = "Diary"]',
  diaryRecord: '//div[@class="mt-2"]',
  createDayReportButton: '//a[@qa="create-day-report-button"]',
  saveButton: '//button[@type="submit"]',
  descriptionField: '//textarea[@name="description"]',
  approveBtn: '(//button[@qa="approve-button"])[1]',
  approvedSign: '(//span[@qa="approve"])[1]',
};

describe('Diary - Approve - Button', () => {
  before(() => {
    loginAction(browser);
  });

  it('should redirect to Diary page and day report creations field', () => {
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

  it('should get the last diary and it`s Id in DB with API call', async () => {
    allDiaries = await diaryGetAll(token);
    lastDiary = allDiaries[0];
    diaryId = lastDiary._id;
  });

  it('should check if the diary was not approved in DB with API call', () => {
    const isApproved = lastDiary.approved;
    expect(isApproved).to.be.false;
  });

  it('should approve the last diary', () => {
    const approveBtn = $(selector.approveBtn);
    approveBtn.click();
  });

  it('should verify that the diary has Approved mark', () => {
    $(selector.approvedSign).waitForDisplayed(5000);
    const approved = $(selector.approvedSign);
    expect(approved.isDisplayed()).to.be.true;
  });

  it('should check if the diary was approved in DB with API call', async () => {
    lastDiary = await diaryGetByID(token, diaryId);
    const isApproved = lastDiary.approved;
    expect(isApproved).to.be.true;
  });
});
