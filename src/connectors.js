import { InjectedConnector } from '@web3-react/injected-connector';


const supportedChainIds = [
    // 3, // Ropsten
    250, // FTM
]

export const injected = new InjectedConnector({
    supportedChainIds
})

export const ConnectorNames = {
    Injected: 'MetaMask',
}

export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
}

// const RPC_URLS = {
//     3: "https://ropsten.infura.io/v3/df9a2cbc416c4aa5ba4b9c85f57f756d",
//     250: "https://rpcapi.fantom.network",
// }