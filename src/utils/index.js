export const getLibrary = (provider = null) => (provider)

export const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`
}