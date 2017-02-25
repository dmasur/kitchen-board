import { KitchenBoard2Page } from './app.po';

describe('kitchen-board2 App', function() {
  let page: KitchenBoard2Page;

  beforeEach(() => {
    page = new KitchenBoard2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
