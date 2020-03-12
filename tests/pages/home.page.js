const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');

export default class HomePage {
    constructor(driver) {
       this.driver = driver;
    }

    get title() { return this.driver.findElement(By.id('title')) }
    get inp_todo() { return this.driver.findElement(By.id('newtodo')) }
    get li_todo() { return this.driver.findElements(By.xpath('/html/body/ul/li')) }
    get submit() { return this.driver.findElement(By.id('submit')) }
}