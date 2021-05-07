export const getLibrary = (provider = null) => (provider)

export const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`
}

export const getExplorerAddress = (tokenAddresses, chainId) => {
    if (chainId === 3) {
        return `https://ropsten.etherscan.io/address/${tokenAddresses[chainId]}`

    }
    if (chainId === 250) {
        return `https://ftmscan.com/address/${tokenAddresses[chainId]}`
    }
}