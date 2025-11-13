import PageBase from "./page.base";

export enum Section {
    SERVICES = 'services',
    PORTFOLIO = 'portfolio',
    ABOUT = 'about',
    CONTACT = 'contact'

}
export default class InitPage extends PageBase {

    public async go() {
        await super.navigate('http://localhost:5173/');
    }

    public async selectSections(section: Section) {
       await this.click(this.getSelector(`nav a[href *= ${section}`));
    }


}