import PageBase from "./page.base";

export default class ServicesPages extends PageBase {

    public async waitUntilSectionsIsDisplayed() {
        return await this.waitUntilIsDisplayed(this.getSelector('#services'))
    }
}