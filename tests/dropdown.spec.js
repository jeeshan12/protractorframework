const {
    browser,
    element,
    by
} = require('protractor')

describe('Dropdon test', () => {
    function selectDataFromDropDown(ele) {
        let items = ele.all(by.tagName('option')).map(function (elm, index) {
            return {
                optionsText: elm.getText(),
                index: index
            }
        });


        let arrayItems = items.then(x => {
            const dataArray = []
            x.forEach(data => {
                if (data.index !== 0) {
                    dataArray.push(data.optionsText)
                }

            });
            return dataArray
        });
        arrayItems.then(x => {
            console.log(`Elements are ${x}`)
        })

    }
    it('Selecting element from dropdown list', async () => {
        browser.get('http://www.helpingtesters.com/practice/protractor/dropdown.php')
        let EC = browser.ExpectedConditions;
        const dropdownElement = element(by.id('country'))
        browser.wait(EC.elementToBeClickable(dropdownElement), 6000, 'Not visible')
        //Changes coming from master
        selectDataFromDropDown(dropdownElement)

    }, 30000)

    it('Print console log', async () => {
        console.log('Print data in console')

    }, 30000)
})