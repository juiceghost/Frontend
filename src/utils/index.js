export const getLibrary = (provider = null) => (provider)

export const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export const getExplorerAddress = (tokenAddresses, chainId = 250) => {
    if (chainId === 3) {
        return `https://ropsten.etherscan.io/address/${tokenAddresses[chainId]}`

    }
    if (chainId === 250) {
        return `https://ftmscan.com/address/${tokenAddresses[chainId]}`
    }
    if (chainId === 4002) {
        return `https://https://testnet.ftmscan.com//address/${tokenAddresses[chainId]}`
    }
}

export const isDesktop = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return ((typeof window.orientation === "undefined") || (navigator.userAgent.indexOf('IEMobile') === -1)) && !(isMobile);
};

export const generateLottoNumbers = (
    numberOfTickets,
    lottoSize,
    maxRange
) => {
    var numberOfNumbers = [];
    let counterForNumbers = 0;
    for (let i = 0; i < numberOfTickets; i++) {
        for (let j = 0; j < lottoSize; j++) {
            numberOfNumbers[counterForNumbers] = Math.floor(Math.random() * maxRange);
            counterForNumbers += 1;
        }
    }
    return numberOfNumbers;
}