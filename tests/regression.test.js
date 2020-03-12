const chai = require('chai');
const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const expect = chai.expect;
const path = require('chromedriver').path;
import HomePage from'./pages/home.page.js';

let driver;
let homePage;
describe('ToDo App Regression Tests', async () => {

    before(async ()=> {
        driver = new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(new chrome.Options().headless().addArguments("--disable-dev-shm-usage")
                    .addArguments("--no-sandbox").addArguments("--disable-gpu").addArguments("--disable-extensions").addArguments("--disable-infobars"))
                    .build();

        homePage = new HomePage(driver);
    })

    it('Add a new Task', async () =>{
        await driver.get('http://localhost:8080/todo');
        let title = await homePage.title.getText();
        expect(title).to.be.equal('My todolist');
        await homePage.inp_todo.sendKeys('Find a new Job!');
        await homePage.submit.click();
        await homePage.inp_todo.sendKeys('Up skill on DevOps!');
        await homePage.submit.click();
        await homePage.inp_todo.sendKeys('Spray paint car!');
        await homePage.submit.click();
    });

    it('Check that todo list are populated correctly', async () =>{
       let todolist = await homePage.li_todo;
       expect(todolist).to.have.length(3);
       for (let i = 0; i < todolist.length; i++) {
         let txt = await todolist[i].getText();
         console.log(txt)
         expect(await todolist[0].getText()).to.contain('Find a new Job!')
         expect(await todolist[1].getText()).to.contain('Up skill on DevOps!')
         expect(await todolist[2].getText()).to.contain('Spray paint car!')
       }
    });

    it('Delete todo list item', async () =>{
           let deleteBtns = await driver.findElements(By.xpath('/html/body/ul/li/a[2]'));
           for (let i = 0; i < deleteBtns.length; i++) {
                await deleteBtns[1].click();
                break;
           }
           let del_todolist = await driver.findElements(By.xpath('/html/body/ul/li'));
           expect(del_todolist).to.have.length(2);
           for (let i = 0; i < del_todolist.length; i++) {
             let txt = await del_todolist[i].getText();
             console.log(txt)
             expect(await del_todolist[0].getText()).to.contain('Find a new Job!')
             expect(await del_todolist[1].getText()).to.contain('Spray paint car!')
           }
    });

    it('Update todo list item', async () =>{
       let todolist = await driver.findElements(By.xpath('/html/body/ul/li/a[1]'));
       expect(todolist).to.have.length(2);
       for (let i = 0; i < todolist.length; i++) {
         await todolist[1].click();
         break;
       }
       expect(await driver.getCurrentUrl()).to.be.equal('http://localhost:8080/todo/edit/1')
       await driver.findElement(By.id('update')).clear();
       await driver.findElement(By.id('update')).sendKeys('This is an update task!');
       await driver.findElement(By.id('submit')).click();

       let updated_todolist = await driver.findElements(By.xpath('/html/body/ul/li'));
       expect(updated_todolist).to.have.length(2);
       for (let i = 0; i < updated_todolist.length; i++) {
         let txt = await updated_todolist[i].getText();
         console.log(txt)
         expect(await updated_todolist[0].getText()).to.contain('Find a new Job!')
         expect(await updated_todolist[1].getText()).to.contain('This is an update task!')
       }
    });

    it('Check redirect to home on invalid URL path', async () =>{
        await driver.get('http://localhost:8080/todo/notvalid');
        expect(await driver.getCurrentUrl()).to.be.equal('http://localhost:8080/todo')
    });

    it('Reflected Cross Site Scripting test', async () =>{
        await homePage.inp_todo.sendKeys('<script>alert("Hello World")</script>');
        await homePage.submit.click();
        let todolist = await homePage.li_todo;
        expect(todolist).to.have.length(3);
        for (let i = 0; i < todolist.length; i++) {
             let txt = await todolist[i].getText();
             console.log(txt)
             expect(await todolist[0].getText()).to.contain('Find a new Job!')
             expect(await todolist[1].getText()).to.contain('This is an update task!')
             expect(await todolist[2].getText()).to.contain('<script>alert("Hello World")</script>')
        }

        await driver.quit();
    });
});