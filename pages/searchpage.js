const searchFlightPageConstants = require('../pageconstants/searchflightpageconstants');
const commonUtils = require('../helperutils/commonutils')

class SearchPage {
    constructor() {
        this.txtfromStation = element(by.id(searchFlightPageConstants.fromStationTextBox))
        this.textToStation = element(by.id(searchFlightPageConstants.toStationTextBox))
        this.liFromStation = element(by.xpath(searchFlightPageConstants.fromStationSearchList))
        this.liToStation = element(by.xpath(searchFlightPageConstants.toStationSearchList))
        this.chkOneWay = element(by.id(searchFlightPageConstants.oneWayCheckBox))
        this.ddlAdults = element(by.id(searchFlightPageConstants.adultsDropDown))
        this.ddlChildren = element(by.id(searchFlightPageConstants.childrenDropDown))
        this.ddlInfants = element(by.id(searchFlightPageConstants.infantsDropdown))
        this.ipCalendar = element(by.id(searchFlightPageConstants.fromDateInput)),
            this.calFromDate = element.all(by.xpath(searchFlightPageConstants.fromDateTable))
        this.btnSearchFlight = element(by.id(searchFlightPageConstants.searchFlightsButton))
        this.lblGetting = element(by.xpath(searchFlightPageConstants.priceLabel))

    }

    enterFromStation(station) {
        commonUtils.enterDataIntoTextBox(this.txtfromStation, station)

    }

    enterToStation(station) {
        commonUtils.enterDataIntoTextBox(this.textToStation, station)

    }

    clickExpectedStationFromStationList(station) {
        commonUtils.clickExpectedItemInList(this.liFromStation, station)
    }

    clickExpectedStationToStationList(station) {
        commonUtils.clickExpectedItemInList(this.liToStation, station)
    }

    clickCalendarInput() {
        commonUtils.clickElement(this.ipCalendar)
    }


    selectAdults(numberOfAdults) {
        commonUtils.selectDataFromDropDown(this.ddlAdults, numberOfAdults)
    }

    selectChildren(numberOfChildren) {
        commonUtils.selectDataFromDropDown(this.ddlChildren, numberOfChildren)
    }

    selectInfants(numberOfInfants) {
        commonUtils.selectDataFromDropDown(this.ddlInfants, numberOfInfants)
    }

    clickFromDate(day) {
        commonUtils.clickDayInCalendar(this.calFromDate, day)
    }

    getStationValue(property) {
        return commonUtils.getAttributeValue(this.txtfromStation, property)
    }

    clickSearchFlightButton() {
        commonUtils.clickElement(this.btnSearchFlight)
    }

    verifyElementVisibilityOnPage() {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(this.lblGetting), 30000);
    }

}


module.exports = new SearchPage()
module.exports.SearchPage = SearchPage