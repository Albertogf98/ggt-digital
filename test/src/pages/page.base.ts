import { browser } from '@wdio/globals'


export default class PageBase {
    constructor() {}

    protected async navigate(endpoint: string) {
        if (!endpoint)
            throw new Error('URL is not defined');

        return await browser.url(endpoint);
    }

    protected getSelector(selector: string): ReturnType<WebdriverIO.Browser["$"]> {
        return $(selector);
    }

    protected async click(selector: ReturnType<WebdriverIO.Browser["$"]>) {
        await selector.click();
    }

    protected async waitUntilIsDisplayed(selector: ReturnType<WebdriverIO.Browser["$"]>): Promise<boolean> {
       return await selector.waitForDisplayed()
    }
}