import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'LDT-ETH LP',
    lpAddresses: {
      250: '',
      3: '0xe10c2de405d12a8344cc5945df6f398660857760', // SushiSwap LP Token https://ropsten.etherscan.io/token/0xe10c2de405d12a8344cc5945df6f398660857760
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '',
      3: '0x6491fc29e175cde591f705a9694f48f4effd5d07', // LQDR https://ropsten.etherscan.io/token/0x6491fc29e175cde591f705a9694f48f4effd5d07
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.ETH,
  },
]

export default farms
