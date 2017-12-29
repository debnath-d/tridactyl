/**
 * Helper functions for logging
 */

import * as Config from "./config"


export enum LEVEL {
    NEVER = 0,      // don't use this in calls to log()
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4,
}

/**
 * Config-aware logging function.
 *
 * @param logModule     the logging module name: this is ued to look up the
 *                      configured/default level in the user config
 * @param level         the level of the logging - if <= configured, the message
 *                      will be shown
 *
 * @return              logging function: this is returned as a function to
 *                      retain the call site
 */
function log(logModule: string, level: LEVEL) {

    let configedLevel = Config.get("logging", logModule) || LEVEL.WARNING

    if (level <= configedLevel) {
        // hand over to console.log, error or debug as needed
        switch (level) {

            case LEVEL.ERROR:
                return console.error
            case LEVEL.WARNING:
                return console.warn
            case LEVEL.INFO:
                return console.log
            case LEVEL.DEBUG:
                return console.debug
        }
    }

    // do nothing with the message
    return function(...args) {}
}

export function debug(logModule: string, ...args) {
    log(logModule, LEVEL.DEBUG)(...args)
}
export function info(logModule: string, ...args) {
    log(logModule, LEVEL.INFO)(...args)
}
export function warning(logModule: string, ...args) {
    log(logModule, LEVEL.WARNING)(...args)
}
export function error(logModule: string, ...args) {
    log(logModule, LEVEL.ERROR)(...args)
}
