import { expect } from 'chai';
import registerAction from '../actions/registerAction';

describe('', () => {
  before(() => {
    registerAction(browser);
  });

  it('should 1', () => {
    expect(2).eq(2);
  });

  it('should 2', () => {
    expect(2).eq(2);
  });
});
