import contracts from './contracts'
import { QuoteToken } from './types'

const farms = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'DAI/FTM',
    lpAddresses: {
      250: '0xd32f2eb49e91aa160946f3538564118388d6246a',
      3: '0xe10c2de405d12a8344cc5945df6f398660857760', // SushiSwap LP Token https://ropsten.etherscan.io/token/0xe10c2de405d12a8344cc5945df6f398660857760
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x6491fc29e175cde591f705a9694f48f4effd5d07',
      3: '0x6491FC29E175CdE591f705a9694F48F4eFFd5d07', // LQDR https://ropsten.etherscan.io/token/0x6491fc29e175cde591f705a9694f48f4effd5d07
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.ETH,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'SLP',
    lpAddresses: {
      250: '0xd32f2eb49e91aa160946f3538564118388d6246a',
      3: '0xe10c2de405d12a8344cc5945df6f398660857760', // SushiSwap LP Token https://ropsten.etherscan.io/token/0xe10c2de405d12a8344cc5945df6f398660857760
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x6491fc29e175cde591f705a9694f48f4effd5d07',
      3: '0x6491FC29E175CdE591f705a9694F48F4eFFd5d07', // LQDR https://ropsten.etherscan.io/token/0x6491fc29e175cde591f705a9694f48f4effd5d07
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.ETH,
  },
]

export default farms
