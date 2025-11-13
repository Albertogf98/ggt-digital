import AboutPage from '../src/pages/about.page';
import ContactPage from '../src/pages/contact.page';
import InitPage, { Section } from '../src/pages/init.page';
import Portfolio from '../src/pages/portfolio.page';
import ServicesPages from '../src/pages/services.page';

const initPage = new InitPage();
const servicesPage = new ServicesPages();
const aboutPage = new AboutPage();
const contactPage = new ContactPage();
const portfolioPage = new Portfolio();

describe('Navigate', () => {
  beforeEach(async () => await initPage.go());

  it('Navigate throw all the sections', async () => {
    const sections = [
      { section: Section.SERVICES, isDisplayed: async () => await servicesPage.waitUntilSectionsIsDisplayed() },
      { section: Section.PORTFOLIO, isDisplayed: async () => await portfolioPage.waitUntilSectionsIsDisplayed() },
      { section: Section.ABOUT, isDisplayed: async () => await aboutPage.waitUntilSectionsIsDisplayed() },
      { section: Section.CONTACT, isDisplayed: async () => await contactPage.waitUntilSectionsIsDisplayed() },
    ];

    for (const section of sections) {
      await initPage.selectSections(section.section);
      await expect(await section.isDisplayed()).toBeTruthy();
    };
  });
});
