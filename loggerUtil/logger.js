'use strict';
const {
    createLogger,
    format,
    transports
} = require('winston');
const {
    combine,
    timestamp,
    label,
    printf
} = format;

class Logger {
    static loggerFormat = printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });

    static createTimeStamp() {
        return Math.floor(Date.now() / 1000)
    }
    static loggerDetails = createLogger({
        level: 'info',
        format: combine(
            label({
                label: 'right meow!'
            }),
            timestamp(),
            Logger.loggerFormat
        ),
        transports: [new transports.Console,
            new transports.File({
                filename: 'lofgile.log'
            })
        ]
    })
}

module.exports = new Logger()
module.exports.Logger = Logger