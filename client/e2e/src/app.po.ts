import {browser, by, ElementFinder, protractor, ProtractorBrowser} from 'protractor';

export class AppPage {
  EC = protractor.ExpectedConditions;

  async getLoadingSpinner(browserInstance: ProtractorBrowser) {
    return await browserInstance.element(by.className('loading-spinner-wrapper'));
  }
  async getOfflineToggle(browserInstance: ProtractorBrowser) {
    return await browserInstance.element(by.id('offline-slide-toggle'));
  }
  async isCompleteCheckboxSelected(browserInstance: ProtractorBrowser, content: string) {
    const listInputElements: ElementFinder[] = await this.getListInputElements(browserInstance);
    for (const item of listInputElements) {
      if (await item.getAttribute('value') === content) {
        const completeCheckbox: ElementFinder = await item.element(by.xpath('preceding-sibling::input'));
        return await completeCheckbox.isSelected();
      }
    }
  }
  async getOfflineToggleInput(browserInstance: ProtractorBrowser) {
    return await browserInstance.element(by.id('offline-slide-toggle-input'));
  }
  async getNewTodoInput(browserInstance: ProtractorBrowser) {
    return await browserInstance.element(by.id('new-title'));
  }
  async getListItems(browserInstance: ProtractorBrowser){
    return await browserInstance.element.all(by.className('todo-list-item'));
  };
  async getSwipeArea(browserInstance: ProtractorBrowser) {
    return await browserInstance.element(by.id('swipe-down-area'));
  }
  async getListItemDeleteButton(parent: ElementFinder) {
    return await parent.element(by.className('todo-list-item-delete'));
  }
  async getListItemUpdateButton(parent: ElementFinder) {
    return await parent.element(by.className('todo-list-item-submit'));
  }

  async getListItemTextInput(parent: ElementFinder){
    return await parent.element(by.className('todo-list-item-input'));
  }

  async getListInputElements(browserInstance: ProtractorBrowser){
    return await browserInstance.element.all(by.css('.todo-list-item-input'));
  }

  async navigateTo(browserInstance: ProtractorBrowser) {
    // await browserInstance.waitForAngularEnabled(false);
    await browserInstance.get('/');
  }

  async reload(browserInstance: ProtractorBrowser) {
    await browserInstance.refresh();
  }

  async toggleOfflineOnline(browserInstance: ProtractorBrowser) {
    const offlineToggle = await this.getOfflineToggle(browserInstance);
    await offlineToggle.click();
    const loadingSpinner = await this.getLoadingSpinner(browserInstance);
    return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
  }

  async swipeDownToRefresh(browserInstance: ProtractorBrowser) {
    const startElem = await this.getSwipeArea(browserInstance);
    await browserInstance
      .actions()
      .mouseDown(startElem)
      .mouseMove({x: 0, y: 100})
      .mouseUp()
      .perform();
    const loadingSpinner = await this.getLoadingSpinner(browserInstance);
    return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
  }

  async typeAndAddNewTodo(browserInstance: ProtractorBrowser, content: string) {
    const newTodoInputElement = await this.getNewTodoInput(browserInstance);
    await newTodoInputElement.clear();
    await newTodoInputElement.sendKeys(content);
    await newTodoInputElement.sendKeys(protractor.Key.ENTER);
    const loadingSpinner = await this.getLoadingSpinner(browserInstance);
    return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
  }

  async deleteTodo(browserInstance: ProtractorBrowser, content: string) {
    const listInputElements: ElementFinder[] = await this.getListInputElements(browserInstance);
    for (const item of listInputElements) {
      if (await item.getAttribute('value') === content) {
        const deleteButton: ElementFinder = await item.element(by.xpath('following-sibling::button'));
        await deleteButton.click();
        const loadingSpinner = await this.getLoadingSpinner(browserInstance);
        return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
      }
    }
  }

  async markTodoAsDone(browserInstance: ProtractorBrowser, content: string) {
    const listInputElements: ElementFinder[] = await this.getListInputElements(browserInstance);
    for (const item of listInputElements) {
      if (await item.getAttribute('value') === content) {
        const completeCheckbox: ElementFinder = await item.element(by.xpath('preceding-sibling::input'));
        await completeCheckbox.click();
        const loadingSpinner = await this.getLoadingSpinner(browserInstance);
        return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
      }
    }
  }

  async updateTodo(browserInstance: ProtractorBrowser, oldContent: string, newContent: string) {
    const listInputElements: ElementFinder[] = await this.getListInputElements(browserInstance);
    for (const item of listInputElements) {
      if (await item.getAttribute('value') === oldContent) {
        await item.clear();
        await item.sendKeys(newContent);
        const updateButton: ElementFinder = await item.element(by.xpath('following-sibling::button'));
        await updateButton.click();
        const loadingSpinner = await this.getLoadingSpinner(browserInstance);
        return await this.waitForElementToDisappear(browserInstance, loadingSpinner);
      }
    }
  }

  waitForElementToDisappear = async (browserInstance: ProtractorBrowser, element) => {
    return await browserInstance.wait(this.EC.invisibilityOf(element), 2000, "Custom Error Message");
  };

  waitForElementToAppear = async (browserInstance: ProtractorBrowser, element) => {
    return await browserInstance.wait(this.EC.visibilityOf(element), 2000, "Custom Error Message");
  };

  getListInputElementsTexts = async (browserInstance: ProtractorBrowser): Promise<any> => {
    const listInputElements: ElementFinder[] = await this.getListInputElements(browserInstance);
    const listInputElementsTexts = await Promise.all(listInputElements.map(async element => {
      return await element.getAttribute('value');
    }));
    return await listInputElementsTexts;
  };

  async getListItemByString(browserInstance: ProtractorBrowser, expectedItem: string) {

    const listItems: any[] = await this.getListInputElementsTexts(browserInstance);

    return listItems.filter(item => item == expectedItem).reduce((previousValue, currentValue) => currentValue, undefined);
  };
}
