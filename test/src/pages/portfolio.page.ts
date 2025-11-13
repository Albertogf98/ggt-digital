import PageBase from "./page.base";

export default class Portfolio extends PageBase {

    public async waitUntilSectionsIsDisplayed() {
        return await this.waitUntilIsDisplayed(this.getSelector('#portfolio'))
    }
}