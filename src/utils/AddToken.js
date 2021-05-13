export function addToken(address, symbol, decimals = 18, url = "https://sushiswap.vision/static/media/logo_white.c3952854.svg") {
    if (symbol === "LQDR") {
        url = "https://www.liquiddriver.finance/img/logo.png"
    }
    if (window.ethereum) {
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: address,
                    symbol: symbol,
                    decimals: decimals,
                    image: url,
                },
            },
        }).then((success) => {
            if (success) {
                console.log(symbol + ' successfully added to wallet!')
            } else {
                throw new Error('Something went wrong.')
            }
        }).catch(console.error)
    }
}