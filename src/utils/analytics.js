import ReactGA from "react-ga"

function init() {
    const GOOGLE_ANALYTICS_ID = "UA-201902194-1"
    if (typeof GOOGLE_ANALYTICS_ID === 'string') {
        ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
            gaOptions: {
                storage: 'none',
                storeGac: false,
            },
        })
    } else {
        ReactGA.initialize('test', { testMode: true, debug: true })
    }
}

function sendEvent(payload) {
    ReactGA.event(payload)
}

function sendPageview(path) {
    ReactGA.set({ page: path, anonymizeIp: true })
    ReactGA.pageview(path)
}

const GA = {
    init,
    sendEvent,
    sendPageview,
}

export default GA