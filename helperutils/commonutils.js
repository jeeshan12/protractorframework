const synchronizationUtil = require('../helperutils/synchronizationutil');
const fs = require('fs')
var browser = require('protractor').browser;

function clickElement(element) {
    element.click()
}

function enterDataIntoTextBox(element, data) {
    element.sendKeys(data)
}

function clickExpectedItemInList(element, station) {
    let EC = browser.ExpectedConditions
    browser.wait(EC.visibilityOf(element), 8000);
    let childElements = element.all(by.tagName('li'))
    childElements.each(listElement => {
        this.getROValue(listElement).then(stationName => {
            if (stationName.includes(station)) {
                listElement.click()
                return false
            }
        })
    })
}


function clickDayInCalendar(element, dayToSelect) {
    element.each(listElement => {
        this.getROValue(listElement).then(dayInCalendar => {
            if (dayInCalendar === dayToSelect) {
                listElement.click()
                return false
            }
        })
    })
}

function selectDataFromDropDown(element, dataToSelect) {
    let childElements = element.all(by.tagName('option'))
    childElements.each(ele => {
        this.getAttributeValue(ele, 'value').then(value => {
            if (value === dataToSelect) {
                ele.click()
                return false;
            }
        })
    })
}


function getAttributeValue(element, value) {
    return element.getAttribute(value)
}

function getROValue(element) {
    return element.getText()
}

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
}

module.exports = {
    clickElement: clickElement,
    enterDataIntoTextBox: enterDataIntoTextBox,
    clickExpectedItemInList: clickExpectedItemInList,
    selectDataFromDropDown: selectDataFromDropDown,
    clickDayInCalendar: clickDayInCalendar,
    getAttributeValue: getAttributeValue,
    getROValue: getROValue,
    writeScreenShot: writeScreenShot
}