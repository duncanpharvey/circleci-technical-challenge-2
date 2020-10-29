const Browser = require('zombie');
const { assert } = require('chai');

describe('Button Clicks', () => {
    const browser = new Browser();

    before(() => {
        app = require('../app.js');
    });

    after(async () => {
        browser.destroy();
        await app.server.close();
    });

    beforeEach(() => {
        return browser.visit(`http://localhost:${app.port}`);
    });

    describe('Hide Text', () => {
        it('should hide text on page load', () => {
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 0);
        });

        it('should hide text after two clicks', () => {
            const button = browser.document.querySelector('#button');
            for (i = 0; i < 2; i++) button.click();
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 0);
        });
        
        it('should hide text after 100 clicks', () => {
            const button = browser.document.querySelector('#button');
            for (i = 0; i < 100; i++) button.click();
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 0);
        });
    });

    describe('Show Text', () => {
        it('should show text after one click', () => {
            const button = browser.document.querySelector('#button');
            button.click();
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 1);
        });

        it('should show text after three clicks', () => {
            const button = browser.document.querySelector('#button');
            for (i = 0; i < 3; i++) button.click();
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 1);
        });
        
        it('should show text after 101 clicks', () => {
            const button = browser.document.querySelector('#button');
            for (i = 0; i < 101; i++) button.click();
            assert.equal(browser.document.querySelector('#hidden-text').style.getPropertyValue('opacity'), 1);
        });
    });
});