import {AppPage} from './app.po';
import {browser, ProtractorBrowser} from "protractor";
import v1 = require("uuid/v1");

let page: AppPage;

describe('Todo-App E2E (one browser)', async () => {

  beforeEach(async () => {
    page = new AppPage();
    // await page.navigateTo(browser);
    // await browser.waitForAngular();



    await browser.waitForAngularEnabled(true);
    await page.navigateTo(browser);
    await browser.waitForAngularEnabled(false);
  });

  it('should toggle to offline mode and back to online', async () => {
    const getOnlineToggle = await page.getOfflineToggleInput(browser);
    const isOnlineBeforeToggling = await getOnlineToggle.getAttribute('aria-checked');
    await expect((isOnlineBeforeToggling == 'true')).toBe(true);

    await page.toggleOfflineOnline(browser);

    const getOfflineToggle = await page.getOfflineToggleInput(browser);
    const isOnlineAfterToggling = await getOfflineToggle.getAttribute('aria-checked');
    await expect((isOnlineAfterToggling == 'true')).toBe(false);

  });

  it('should refresh data on swipe down and show loadingspinner', async () => {
    const startElem = await page.getSwipeArea(browser);
    await browser
      .actions()
      .mouseDown(startElem)
      .mouseMove({x: 0, y: 100})
      .mouseUp()
      .perform();
    // todo
    // const loadingSpinner = await page.getLoadingSpinner(browser);
    // await expect(loadingSpinner.isPresent()).toBe(true);
  });

  describe('I.a. (READ)', async () => {

    it('should show a todo in the list.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      const expectToExist: string = await page.getListItemByString(browser, newItem);
      await expect(expectToExist).toBe(newItem);

      await page.deleteTodo(browser, newItem);
    });

    it('should still be shown even while offline.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      await page.toggleOfflineOnline(browser);
      await page.waitForSync(browser);

      const expectToExist: string = await page.getListItemByString(browser, newItem);
      await expect(expectToExist).toBe(newItem);

      await page.deleteTodo(browser, newItem);
      await page.toggleOfflineOnline(browser);
    });
  });

  describe('I.b.(CREATE)', async () => {

    it('should add a new todo.', async () => {
      const newItem: string = v1();
      const expectNotToExist: string = await page.getListItemByString(browser, newItem);
      await expect(expectNotToExist).toBe(undefined);

      await page.typeAndAddNewTodo(browser, newItem);

      const expectToExistAfterAdd: string = await page.getListItemByString(browser, newItem);
      await expect(expectToExistAfterAdd).toBe(newItem);
      await page.deleteTodo(browser, newItem);
    });

    it('should still exist after refresh.', async () => {
      const newItem: string = v1();

      await page.toggleOfflineOnline(browser);
      await page.typeAndAddNewTodo(browser, newItem);
      await page.waitForSync(browser);

      const expectToExist: string = await page.getListItemByString(browser, newItem);
      await expect(expectToExist).toBe(newItem);

      await page.deleteTodo(browser, newItem);
      await page.toggleOfflineOnline(browser);
    });
  });

  describe('I.c. (UPDATE)', async () => {
    it('should update a todo.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem + 'updated';
      await page.typeAndAddNewTodo(browser, newItem);

      await page.updateTodo(browser, newItem, updatedItem);
      await page.markTodoAsDone(browser, updatedItem);

      const expectToBeUpdated: string = await page.getListItemByString(browser, updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browser, updatedItem)).toBe(true);
      await expect(expectToBeUpdated).toBe(updatedItem);

      await page.deleteTodo(browser, updatedItem);
    });

    it('should still be updated after refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem + 'updated';
      await page.typeAndAddNewTodo(browser, newItem);

      await page.toggleOfflineOnline(browser);
      await page.updateTodo(browser, newItem, updatedItem);
      await page.markTodoAsDone(browser, updatedItem);
      await page.waitForSync(browser);

      const expectToBeUpdated: string = await page.getListItemByString(browser, updatedItem);
      await expect(expectToBeUpdated).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browser, updatedItem)).toBe(true);

      await page.deleteTodo(browser, updatedItem);
      await page.toggleOfflineOnline(browser);
    });
  });

  describe('I.d. (DELETE)', async () => {

    it('should remove a todo.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      await page.deleteTodo(browser, newItem);

      const expectToBeDeleted: string = await page.getListItemByString(browser, newItem);
      await expect(expectToBeDeleted).toBe(undefined);
    });

    it('should still be removed after refresh.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      await page.toggleOfflineOnline(browser);
      await page.deleteTodo(browser, newItem);
      await page.waitForSync(browser);

      const expectToBeDeleted: string = await page.getListItemByString(browser, newItem);
      await expect(expectToBeDeleted).toBe(undefined);
      await page.toggleOfflineOnline(browser);
    });
  });
});

describe('Todo-App E2E (multiple browser interacting)', async () => {
  let browserA: ProtractorBrowser = browser.forkNewDriverInstance();
  let browserB: ProtractorBrowser = browser.forkNewDriverInstance();

  beforeEach(async () => {
    page = new AppPage();
    await browser.waitForAngularEnabled(true);
    await page.navigateTo(browser);
    await browser.waitForAngularEnabled(false);

    await browserB.waitForAngularEnabled(true);
    await page.navigateTo(browserB);
    await browserB.waitForAngularEnabled(false);

    await browserA.waitForAngularEnabled(true);
    await page.navigateTo(browserA);
    await browserA.waitForAngularEnabled(false);
  });

  describe('II.a.ii. (CREATE & READ)', async () => {

    it('should add a new todo on B and to be displayed on A after refresh.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browserB, newItem);

      await page.waitForSync(browserA);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      await expect(expectToExistInBrowserA).toBe(newItem);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      await expect(expectToExistInBrowserB).toBe(newItem);

      await page.deleteTodo(browserB, newItem);
    });


    it('should toggle both browser offline and add new todo on B. Should be synchronized after going online and making a refresh.', async () => {
      const newItem: string = v1();
      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      await page.typeAndAddNewTodo(browserB, newItem);

      await page.toggleOfflineOnline(browserB);
      await page.waitForSync(browserB);
      await page.toggleOfflineOnline(browserA);
      await page.waitForSync(browserA);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      await expect(expectToExistInBrowserA).toBe(newItem);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      await expect(expectToExistInBrowserB).toBe(newItem);

      await page.deleteTodo(browserB, newItem);
    });
  });

  describe('II.a.iii. (UPDATE & READ)', async () => {

    it('should update a todo on B and to be changed on A after refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem+'updated';
      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);
      await page.updateTodo(browserB, newItem, updatedItem);
      await page.markTodoAsDone(browserB, updatedItem);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectToExistInBrowserB).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, updatedItem)).toBe(true);

      await page.waitForSync(browserA);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectToExistInBrowserA).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, updatedItem)).toBe(true);

      await page.deleteTodo(browserB, updatedItem);
      await page.waitForSync(browserB);
    });

    it('should toggle both browser offline and update a todo on B. Should be synchronized after going online and making a refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem + 'updated';
      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      await page.updateTodo(browserB, newItem, updatedItem);
      await page.markTodoAsDone(browserB, updatedItem);

      await page.toggleOfflineOnline(browserB);
      await page.waitForSync(browserB);
      await page.toggleOfflineOnline(browserA);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectToExistInBrowserB).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, updatedItem)).toBe(true);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, updatedItem);
      await expect(expectToExistInBrowserA).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, updatedItem)).toBe(true);

      await page.deleteTodo(browserB, updatedItem);
      await page.waitForSync(browserB);
    });
  });

  describe('II.a.iv. (DELETE & READ)', async () => {

    it('should delete a todo on B and to be deleted on A after refresh.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.deleteTodo(browserB, newItem);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      await expect(expectToExistInBrowserB).toBe(undefined);

      await page.waitForSync(browserA);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      await expect(expectToExistInBrowserA).toBe(undefined);
    });

    it('should toggle both browser offline and delete a todo on B. Should be synchronized after going online and making a refresh.', async () => {
      const newItem: string = v1();
      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      await page.deleteTodo(browserB, newItem);

      await page.toggleOfflineOnline(browserB);
      await page.waitForSync(browserB);
      await page.toggleOfflineOnline(browserA);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      await expect(expectToExistInBrowserB).toBe(undefined);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      await expect(expectToExistInBrowserA).toBe(undefined);
    });
  });

  describe('II.b.i. (UPDATE & UPDATE)', async () => {

    it('should update a todo on B and the same todo is being updated on A. Should be the same after refresh.', async () => {
      const newItem: string = v1();
      const updatedItemA: string = newItem+' updatedA';
      const updatedItemB: string = 'updatedB '+newItem;
      const expectedMergedItem: string = 'updatedB '+newItem+' updatedA';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.markTodoAsDone(browserA, newItem);
      await page.waitForSync(browserB);
      await page.updateTodo(browserB, newItem, updatedItemB);
      await page.updateTodo(browserA, newItem, updatedItemA);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, expectedMergedItem);
      await expect(expectToExistInBrowserB).toBe(expectedMergedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, expectedMergedItem)).toBe(true);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, expectedMergedItem);
      await expect(expectToExistInBrowserA).toBe(expectedMergedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, expectedMergedItem)).toBe(true);

      await page.deleteTodo(browserA, expectedMergedItem);
      await page.waitForSync(browserB);
    });

    it('should toggle both browser offline and update a todo on B and the same item on A. Should be synchronized (merged) after going online and making a refresh.', async () => {
      const newItem: string = v1();
      const updatedItemA: string = newItem+' updatedA';
      const updatedItemB: string = 'updatedB '+newItem;
      const expectedMergedItem: string = 'updatedB '+newItem+' updatedA';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      await page.updateTodo(browserB, newItem, updatedItemB);
      await page.updateTodo(browserA, newItem, updatedItemA);
      await page.markTodoAsDone(browserA, updatedItemA);

      await page.toggleOfflineOnline(browserB);
      await page.toggleOfflineOnline(browserA);
      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, expectedMergedItem);
      await expect(expectToExistInBrowserB).toBe(expectedMergedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, expectedMergedItem)).toBe(true);

      const expectToExistInBrowserA: string = await page.getListItemByString(browserA, expectedMergedItem);
      await expect(expectToExistInBrowserA).toBe(expectedMergedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, expectedMergedItem)).toBe(true);

      await page.deleteTodo(browserA, expectedMergedItem);
      await page.waitForSync(browserA);
    });
  });

  describe('II.b.iii. (UPDATE & DELETE)', async () => {

    it('should update a todo on B and the same todo is being deleted on A. Should be deleted then after refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem+'updated';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.updateTodo(browserB, newItem, updatedItem);
      await page.deleteTodo(browserA, newItem);

      await page.waitForSync(browserA);
      await page.waitForSync(browserB);

      const expectNewItemNotToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      const expectUpdatedItemNotToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectNewItemNotToExistInBrowserB).toBe(undefined);
      await expect(expectUpdatedItemNotToExistInBrowserB).toBe(undefined);

      const expectNewItemNotToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      const expectUpdatedItemNotToExistInBrowserA: string = await page.getListItemByString(browserA, updatedItem);
      await expect(expectNewItemNotToExistInBrowserA).toBe(undefined);
      await expect(expectUpdatedItemNotToExistInBrowserA).toBe(undefined);
    });

    it('should toggle both browser offline and update a todo on B and delete the same item on A. Item should be still deleted after going online (B goes online first) and making a refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem+'updated';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      await page.updateTodo(browserB, newItem, updatedItem);
      await page.deleteTodo(browserA, newItem);
      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserB);
      await page.waitForSync(browserA);
      await page.waitForSync(browserB);
      await page.toggleOfflineOnline(browserA);

      await page.waitForSync(browserA);
      await page.waitForSync(browserB);

      const expectNewItemNotToExistInBrowserB: string = await page.getListItemByString(browserB, newItem);
      const expectUpdatedItemNotToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectNewItemNotToExistInBrowserB).toBe(undefined);
      await expect(expectUpdatedItemNotToExistInBrowserB).toBe(undefined);

      const expectNewItemNotToExistInBrowserA: string = await page.getListItemByString(browserA, newItem);
      const expectUpdatedItemNotToExistInBrowserA: string = await page.getListItemByString(browserA, updatedItem);
      await expect(expectNewItemNotToExistInBrowserA).toBe(undefined);
      await expect(expectUpdatedItemNotToExistInBrowserA).toBe(undefined);
    });
  });

  describe('II.b.iv. (DELETE & UPDATE)', async () => {

    it('should delete a todo on B and the same todo is being updated on A. Should be updated then after refresh on both sides.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem+'updated';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.deleteTodo(browserB, newItem);
      await page.updateTodo(browserA, newItem, updatedItem);
      await page.markTodoAsDone(browserA, updatedItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectToExistInBrowserB).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, updatedItem)).toBe(true);

      const expectItemToExistInBrowserA: string = await page.getListItemByString(browserA, updatedItem);
      await expect(expectItemToExistInBrowserA).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, updatedItem)).toBe(true);

      await page.deleteTodo(browserA, updatedItem);
      await page.waitForSync(browserA);
    });

    it('should toggle both browser offline and delete a todo on B and update the same item on A. Item should be still available and updated after going online (B goes online first) and making a refresh.', async () => {
      const newItem: string = v1();
      const updatedItem: string = newItem+'updated';

      await page.typeAndAddNewTodo(browser, newItem);

      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      await page.toggleOfflineOnline(browserA);
      await page.toggleOfflineOnline(browserB);

      // the sequence of this doesnt matter
      await page.deleteTodo(browserB, newItem);
      await page.updateTodo(browserA, newItem, updatedItem);
      await page.markTodoAsDone(browserA, updatedItem);
      await page.waitForSync(browserB);
      await page.waitForSync(browserA);


      // the sequence of going online matters
      await page.toggleOfflineOnline(browserB);
      await page.waitForSync(browserA);
      await page.waitForSync(browserB);
      await page.toggleOfflineOnline(browserA);
      await page.waitForSync(browserB);
      await page.waitForSync(browserA);

      const expectToExistInBrowserB: string = await page.getListItemByString(browserB, updatedItem);
      await expect(expectToExistInBrowserB).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserB, updatedItem)).toBe(true);

      const expectItemToExistInBrowserA: string = await page.getListItemByString(browserA, updatedItem);
      await expect(expectItemToExistInBrowserA).toBe(updatedItem);
      await expect(await page.isCompleteCheckboxSelected(browserA, updatedItem)).toBe(true);

      await page.deleteTodo(browserA, updatedItem);
      await page.toggleOfflineOnline(browserA);
    });
  });
});


