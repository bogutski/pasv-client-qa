import { url } from '../../constants';
import { user } from '../../../examples/user/constants';

export default function registerAction(browser) {
  browser.url(url.register);

  const firstName = $('//input[@name="firstName"]');
  const lastName = $('//input[@name="lastName"]');
  const phone = $('//input[@name="phone"]');
  const email = $('//input[@name="email"]');
  const password = $('//input[@name="password"]');
  const about = $('//textarea[@name="about"]');
  const goals = $('//textarea[@name="goals"]');
  const englishLevel = $('//label[@for="englishLevel"]/../../select');

  firstName.setValue(user.student.firstName);
  lastName.setValue(user.student.lastName);
  phone.setValue(user.student.phone);
  email.setValue(user.student.email);
  password.setValue(user.student.password);
  about.setValue(user.student.about);
  goals.setValue(user.student.goals);
  englishLevel.selectByVisibleText(user.student.englishLevel);

  const button = $('//button[@type="submit"]');

  button.click();
  browser.pause(1000);
}
