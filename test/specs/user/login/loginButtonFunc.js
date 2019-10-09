import { expect } from 'chai';
import { url } from '../../constants';
//import {user} from './../_data/data';

const sel = {
  loginButton: '//button[@type="submit"]',
  passwordField: '//input[@name="password"]',
  emailField: '//input[@name="email"]',
  failedMsg: '//div[@id="root"]//div/h4[contains(text(),"failed")]',
  successMsg: '//div[@id="root"]//div/h4[contains(text(), "success")]',
  //msg: '//div[@id="root"]//div/h4',
  invalidMsg: '//input[@name="email"]/../div[@class="invalid-feedback"]',
  header: '//h1',
  linkUserName: '//a[@class="dropdown-toggle nav-link"]',
  logoutBtn: '//button[contains(text(),"Logout")]',
  closeSign: '//span[@class="notification-dismiss"]',
  alert: '//div[@class="alert-line alert-bg-warning"]',
  profileBtn: '//button[contains(text(),"Profile")]',
};

const data = {
  expectedFailedMsg: 'Auth failed.',
  expectedSuccessMsg: 'Auth success',
  incorrectPass: '11112',
  incorrectEmail: 'qwert@tyty',
  notExistEmail: 'yututututuytutyutuyty@ru.ru',
  expectedInvalidMsg: 'Invalid email address',
  email: 'student_new@qwe.qwe',
  password: '11111',
  firstName: 'Student',
  lastName: 'New',
  id: '5d9e356984ee430038d6fe3b',
};

/*describe('User - Login - `Login Button` - Empty Field/Fields - Functional', () => {
  before(() => {
    browser.url(url.login);
  });

  it('should check that the button is disabled if password and email are empty', () => {
    $(sel.emailField).click();
    browser.keys('Tab');
    browser.keys('Tab');
    expect($(sel.loginButton).isEnabled()).to.be.false;
  });

  it('should check that the button is disabled if email is empty', () => {
    $(sel.emailField).click();
    browser.keys('Tab');
    $(sel.passwordField).setValue(data.password);
    expect($(sel.loginButton).isEnabled()).to.be.false;
    $(sel.passwordField).clearValue();
  });

  it('should check that the button is disabled if password is empty', () => {
    $(sel.emailField).setValue(data.email);
    browser.keys('Tab');
    browser.keys('Tab');
    expect($(sel.loginButton).isEnabled()).to.be.false;
  });
});

describe('User - Login - `Login Button` - Incorrect email - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.incorrectEmail);
    browser.keys('Tab');
  });

  it('should check that the button is disabled if email is incorrect format', () => {
    $(sel.passwordField).setValue(data.password);
    expect($(sel.loginButton).isEnabled()).false;
  });

  it('should check that the error message appears if email is incorrect format', () => {
    expect($(sel.invalidMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of the message if email is incorrect format', () => {
    expect($(sel.invalidMsg).getText()).to.be.equal(data.expectedInvalidMsg);
  });
});

describe('User - Login - `Login Button` - Email is not registered - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.notExistEmail);
    $(sel.passwordField).setValue(data.password);
    $(sel.loginButton).click();
    browser.waitUntil(() => {
      return $(sel.failedMsg).isDisplayed() === true;
    }, 1000, 'expected text to be different after 5s');
  });

  it('should check that the error message appears if email is not registered', () => {
    expect($(sel.failedMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of error message if email is not registered', () => {
    expect($(sel.failedMsg).getText()).to.be.equal(data.expectedFailedMsg);
  });
});


describe('User - Login - `Login Button` - Password is incorrect - Functional', () => {
  
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.email);
    $(sel.passwordField).setValue(data.incorrectPass);
    $(sel.loginButton).click();
    browser.pause(500);
  });

  it('should check that `Auth failed` message appears if password is incorrect', () => {
    expect($(sel.failedMsg).isDisplayed()).to.be.true;
  });
  

  it('should check that the text of error message if password is incorrect', () => {
    expect($(sel.failedMsg).getText()).to.be.equal((data.expectedFailedMsg).slice(0, -1));
  });
});*/

describe('User - Login - `Login Button` - Correct credentials - Functional', () => {
  beforeEach(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.email);
    $(sel.passwordField).setValue(data.password);
  });

  // it('should check that the button is enabled if email and password are filled', () => {
  //console.log('!!!!!!!!', $(sel.loginButton).isEnabled());
  //   expect($(sel.loginButton).isEnabled()).to.be.true;
  // });

  it('should check that the user with correct credentials sees `Auth success` message', () => {
    $(sel.loginButton).click();
    //browser.pause(1000);
    $(sel.successMsg).isExisting();
    console.log('!!!!!!!!!!', $(sel.successMsg).isExisting());
    expect($(sel.successMsg).isDisplayed()).to.be.true;

    //  if($(sel.alert).isDisplayed()){
    //   $(sel.linkUserName).click();
    // $('//a[contains(text(),"profile")]').click();
    // browser.pause(200);
    //}
    //browser.waitUntil(() => {
    //return $(sel.successMsg).isDisplayed() === true;
    //}, 2000, 'expected text to be different after 5s');

    //

    $(sel.closeSign).click();
    $(sel.linkUserName).click();
    $(sel.logoutBtn).click();
  });

  /*it('should check that the text of success message ', () => {
   // $(sel.emailField).setValue(user.student.email);
   // $(sel.passwordField).setValue(user.student.password);
    $(sel.loginButton).click();
    browser.pause(1000);

  //  $(sel.successMsg).waitForDisplayed();
    if($(sel.alert).isDisplayed()===true){
      $(sel.linkUserName).click();
     $(sel.profileBtn).click();
      browser.pause(200);
    }
    // browser.pause(1000);
    //browser.waitUntil(() => {
     // return $(sel.successMsg).isDisplayed() === true;
    //}, 2000, 'expected text to be different after 5s');
    //$(sel.successMsg).waitForDisplayed();
    console.log('!!!!!!!!!!', $(sel.successMsg).getText(), data.expectedSuccessMsg);
    expect($(sel.successMsg).getText()).to.be.equal(data.expectedSuccessMsg);
    $(sel.closeSign).click();
    //browser.pause(300);
    //$(sel.closeSign).click();
    $(sel.linkUserName).click();
    $(sel.logoutBtn).click();
    //browser.pause(500);
    //browser.waitUntil(() => {
     // return $(sel.header).getText() === 'User Login';
    //}, 3000, 'expected text to be different after 3s');
  });

  it('should check that the user with correct credentials successfully logged in', () => {

    $(sel.loginButton).click();
    browser.pause(1000);
    //browser.waitUntil(() => {
     // return browser.getUrl() === `${url.baseUrl}/user/${user.student.id}`;
    //}, 1000, 'expected text to be different after 3s');
    //browser.pause(500);
    console.log('!!!!!!!!!!!!!!!!!!!', $(sel.header).getText(), `${url.baseUrl}/user/${data.id}`);
    expect($(sel.header).getText()).to.be.equal(`${data.firstName} ${data.lastName}`);
    //$(sel.linkUserName).click();
    //$(sel.logoutBtn).click();
  });*/
});
