const searchPage = require('../pages/searchpage')
const moment = require('moment');
const log = require('../loggerUtil/logger').Logger.loggerDetails
const using = require('jasmine-data-provider');
const testData = require('../data/onewaytestdata')
const commonUtils = require('../helperutils/commonutils')
var browser = require('protractor').browser;
describe('One way flight booking ', () => {
        using(testData.oneWayTrip, (data, description) => {
            it('Search a flight in clear trip using ' + description, () => {
                browser.waitForAngularEnabled(false);
                browser.get('/').then(() => {
                    log.info(`URL  loaded successfully`)
                    browser.getSession().then(session => {
                        browser.takeScreenshot().then(png => {
                            commonUtils.writeScreenShot('png', './screenshots/' + (Math.floor(Date.now() / 1000)).toString() + ".png")
                        })
                        log.info(`Session id is : ${session.getId()}`)
                    }).catch(e => {
                        log.error(`Error is ${e}`)
                    })
                });
                searchPage.enterFromStation(data.stationName)
                searchPage.clickExpectedStationFromStationList(data.fromStation)
                searchPage.enterToStation(data.stationName)
                searchPage.clickExpectedStationToStationList(data.toStation)
                let fromDate = moment().add(1, 'DD').format('D')
                console.log(fromDate)
                searchPage.clickFromDate(fromDate)
                searchPage.selectAdults(data.adults)
                searchPage.selectChildren(data.children)
                searchPage.selectInfants(data.infants)
                searchPage.getStationValue('value').then(fromStation => {
                    log.info('Verifying actual and expected Station value')
                    expect(fromStation).toBe(data.fullFromStation)
                })
                searchPage.clickSearchFlightButton()

                browser.sleep(3000)

            })
        })

    }


)