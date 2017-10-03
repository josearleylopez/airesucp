import { AiresColombianosPage } from './app.po';

describe('aires-colombianos App', () => {
  let page: AiresColombianosPage;

  beforeEach(() => {
    page = new AiresColombianosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
