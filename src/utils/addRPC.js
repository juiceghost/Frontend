export const addRPC = (account, chainId = 250) => {
    console.log(account, chainId)

    if ((window.ethereum)) {
        window.ethereum
            .request({
                method: 'wallet_addEthereumChain',
                params: [{ ...NetworksData[chainId] }],
            })
            .then((result) => {
                console.log("success");
            })
            .catch((error) => {
                console.log('We can encrypt anything without the key.');
            });
    }
}

const NetworksData = {
    250: {
        chainId: "0xFA",
        chainName: "Fantom Opera",
        nativeCurrency: {
            name: "Fantom",
            symbol: "FTM",
            decimals: 18,
        },
        rpcUrls: ["https://rpcapi.fantom.network"],
        blockExplorerUrls: ["https://ftmscan.com/"],
        iconUrls: []
    },

}