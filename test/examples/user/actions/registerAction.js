import { url } from '../../../specs/constants';
import { user } from '../constants';

export default function registerAction(browser) {
  browser.url(url.register);

  const name = $('//input[@name="name"]');
  const phone = $('//input[@name="phone"]');
  const email = $('//input[@name="email"]');
  const password = $('//input[@name="password"]');
  const about = $('//textarea[@name="about"]');
  const goals = $('//textarea[@name="goals"]');
  const englishLevel = $('//label[@for="englishLevel"]/../../select');

  name.setValue(user.student.name);
  phone.setValue(user.student.phone);
  email.setValue(user.student.email);
  password.setValue(user.student.password);
  about.setValue(user.student.about);
  goals.setValue(user.student.goals);
  englishLevel.selectByVisibleText('Elementary');

  const button = $('//button[@type="submit"]');

  button.click();
  browser.pause(1000);
}
