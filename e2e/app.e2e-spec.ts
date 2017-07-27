import { OnyoPage } from './app.po';

describe('onyo App', () => {
  let page: OnyoPage;

  beforeEach(() => {
    page = new OnyoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
