import { KitchenBoardPage } from './app.po';

describe('kitchen-board App', function() {
  let page: KitchenBoardPage;

  beforeEach(() => {
    page = new KitchenBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
