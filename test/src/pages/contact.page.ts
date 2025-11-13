import PageBase from "./page.base";

export default class ContactPage extends PageBase {

    public async waitUntilSectionsIsDisplayed() {
        return await this.waitUntilIsDisplayed(this.getSelector('#contact'))
    }
}