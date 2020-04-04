const {
    element,
    by
} = require('protractor')


module.exports = {
    buttonText: by.addLocator('ButtonText', (btnText, parentElement, rootElement) => {
        let using = parentElement || rootElement || document
        buttons = using.querySelectorAll('button')

        return Array.prototype.filter.call(buttons, (button) => {
            return button.textContent === btnText;
        })
    })
}