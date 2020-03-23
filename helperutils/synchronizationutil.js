let EC = browser.ExpectedConditions;

function elementVisibility(element,timeout,message){
    browser.wait(EC.visibilityOf(element), timeout, message);

}

module.exports={
    elementVisibility:elementVisibility
}