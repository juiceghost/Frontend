export const Tokens = {
    "LQDR": {
        symbol: "LQDR",
        decimals: 18,
        address: {
            3: '',
            250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
        }
    },
    "FUSDT": {
        symbol: "FUSDT",
        decimals: 6,
        address: {
            3: '',
            250: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
        }
    },
    "FTM": {
        symbol: "FTM",
        decimals: 18,
        address: {
            3: '',
            250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        }
    },
    "ETH": {
        symbol: "ETH",
        decimals: 18,
        address: {
            3: '',
            250: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
        }
    },
    "FXS": {
        symbol: "FXS",
        decimals: 18,
        address: {
            3: '',
            250: '0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62',
        }
    },
    "FRAX": {
        symbol: "FRAX",
        decimals: 18,
        address: {
            3: '',
            250: '0xaf319E5789945197e365E7f7fbFc56B130523B33',
        }
    },
    "USDC": {
        symbol: "USDC",
        decimals: 6,
        address: {
            3: '',
            250: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        }
    },
    "WBTC": {
        symbol: "WBTC",
        decimals: 8,
        address: {
            3: '',
            250: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
        }
    },
    "YFI": {
        symbol: "YFI",
        decimals: 18,
        address: {
            3: '',
            250: '0x29b0Da86e484E1C0029B56e817912d778aC0EC69',
        }
    },
    "DAI": {
        symbol: "DAI",
        decimals: 18,
        address: {
            3: '',
            250: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
        }
    },
    "LINK": {
        symbol: "LINK",
        decimals: 18,
        address: {
            3: '',
            250: '0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8',
        }
    },
    "SUSHI": {
        symbol: "SUSHI",
        decimals: 18,
        address: {
            3: '',
            250: '0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC',
        }
    },
    "CREAM": {
        symbol: "CREAM",
        decimals: 18,
        address: {
            3: '',
            250: '0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6',
        }
    },
    "AAVE": {
        symbol: "AAVE",
        decimals: 18,
        address: {
            3: '',
            250: '0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B',
        }
    },
    "SNX": {
        symbol: "SNX",
        decimals: 18,
        address: {
            3: '',
            250: '0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc',
        }
    },
    "ICE": {
        symbol: "ICE",
        decimals: 18,
        address: {
            3: '',
            250: '0xf16e81dce15b08f326220742020379b855b87df9',
        }
    },
    "COVER": {
        symbol: "COVER",
        decimals: 18,
        address: {
            3: '',
            250: '0xB01E8419d842beebf1b70A7b5f7142abbaf7159D',
        }
    },
    "ZOO": {
        symbol: "ZOO",
        decimals: 0,
        address: {
            3: '',
            250: '0x09e145a1d53c0045f41aeef25d8ff982ae74dd56',
        }
    },
    "CRV": {
        symbol: "CRV",
        decimals: 18,
        address: {
            3: '',
            250: '0x1E4F97b9f9F913c46F1632781732927B9019C68b',
        }
    },
    "SFI": {
        symbol: "SFI",
        decimals: 18,
        address: {
            3: '',
            250: '0x924828a9Fb17d47D0eb64b57271D10706699Ff11',
        }
    },
    "SPIRIT": {
        symbol: "SPIRIT",
        decimals: 18,
        address: {
            3: '',
            250: '0x5Cc61A78F164885776AA610fb0FE1257df78E59B',
        }
    },
    "MIM": {
        symbol: "MIM",
        decimals: 18,
        address: {
            3: '',
            250: '0x82f0B8B456c1A451378467398982d4834b6829c1',
        }
    },
    "BOO": {
        symbol: "BOO",
        decimals: 18,
        address: {
            3: '',
            250: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe',
        }
    },
    "WAKA": {
        symbol: "WAKA",
        decimals: 18,
        address: {
            3: '',
            250: '0xf61ccde1d4bb76ced1daa9d4c429cca83022b08b',
        }
    },
    "Test": {
        symbol: "TLQ",
        decimals: 18,
        address: {
            3: '',
            250: '0xD8C61EDe8CD9EE7B93855c3f110191e95eDF2979',
        }
    },
    "Treasury": {
        symbol: "TRS",
        decimals: 18,
        address: {
            3: '',
            250: '0x298d4313Aea04d0B82B52A3EC5090f4A8C3718B5',
        }
    },
}

const SushiRouteName = {
    "WBTC": ["WBTC", "FTM", "FUSDT"],
    "FTM": ["FTM", "FUSDT"],
    "FRAX": ["FRAX", "FUSDT"],
    "FXS": ["FXS", "FRAX"],
    "LQDR": ["LQDR", "FUSDT"],
    "USDC": ["USDC", "FUSDT"],
}

export const getSushiRoute = (token, chainId) => {
    return SushiRouteName[token].map(name => Tokens[name].address[chainId])
}

export const getLastRouteName = (token) => {
    const path = SushiRouteName[token]
    return path[path.length - 1]
}


/**
Sushi :0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC
YFI: 0x29b0Da86e484E1C0029B56e817912d778aC0EC69
DAI: 0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e
LINK: 0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8
ETH: 0x74b23882a30290451A17c44f4F05243b6b58C76d
fUSDT: 0x049d68029688eabf473097a2fc38ef61633a3c7a
WBTC: 0x321162Cd933E2Be498Cd2267a90534A804051b11
CREAM: 0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6
FRAX: 0xaf319E5789945197e365E7f7fbFc56B130523B33
FXS: 0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62
AAVE: 0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B
USDC: 0x04068da6c83afcfa0e13ba15a6696662335d5b75
SNX: 0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc
ICE: 0xf16e81dce15b08f326220742020379b855b87df9
COVER: 0xB01E8419d842beebf1b70A7b5f7142abbaf7159D
ZOO: 0x09e145a1d53c0045f41aeef25d8ff982ae74dd56
SFI: 0x924828a9Fb17d47D0eb64b57271D10706699Ff11
CRV : 0x1E4F97b9f9F913c46F1632781732927B9019C68b
*/