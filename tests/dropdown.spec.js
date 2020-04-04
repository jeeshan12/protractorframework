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


        let arr = items.then(x => {
            const dd = []
            x.forEach(data => {
                if (data.index !== 0) {
                    dd.push(data.optionsText)
                }

            });
            return dd
        });
        arr.then(x => {
            console.log(`Elements are ${x}`)
        })

    }
    it('Selecting element from dropdown', () => {
        browser.get('http://www.helpingtesters.com/practice/protractor/dropdown.php')
        let EC = browser.ExpectedConditions;
        const dropdownElement = element(by.id('country'))
        browser.wait(EC.elementToBeClickable(dropdownElement), 6000, 'Not visible')
        //Changes coming from master
        selectDataFromDropDown(dropdownElement)

    })
})