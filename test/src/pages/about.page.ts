import PageBase from "./page.base";

export default class AboutPage extends PageBase {

    public async waitUntilSectionsIsDisplayed() {
        return await this.waitUntilIsDisplayed(this.getSelector('#about'))
    }
}