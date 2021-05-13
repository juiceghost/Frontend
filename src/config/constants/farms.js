import contracts from './contracts'
import { QuoteToken } from './types'

const farms = [
  {
    pid: 19,
    risk: 5,
    lpSymbol: 'LQDR',
    lpAddresses: {
      250: "0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9",
      3: '',
    },
    tokenSymbol: 'LQDR',
    lpShortSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.LQDR,
    quoteTokenAdresses: contracts.LQDR,
    isTokenOnly: true,
    icon: 'LQDR.png'
  },
  {
    pid: 18,
    risk: 5,
    lpSymbol: 'LQDR/FTM',
    lpShortSymbol: 'SLP-LF',
    lpAddresses: {
      250: "0xfa7ca6e6d17368e0a1fa9c75f2ebe5a8d7be9fc6",
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'LQDR-FTM.png'
  },
  {
    pid: 17,
    risk: 5,
    lpSymbol: 'LQDR/fUSDT',
    lpShortSymbol: 'SLP-Lf',
    lpAddresses: {
      250: "0xa1bb6830fabddb99ed365c0611a33741c5e6173f",
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FUSDT,
    quoteTokenAdresses: contracts.FUSDT,
    icon: 'LQDR-USDT.png'
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'YFI/FTM',
    lpShortSymbol: 'SLP-YF',
    lpAddresses: {
      250: "0x280abc0d9727f4de3a46ca9cf93c16b4a9c127d1",
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'YFI-FTM.png'
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'DAI/FTM',
    lpShortSymbol: 'SLP-DF',
    lpAddresses: {
      250: "0xd32f2eb49e91aa160946f3538564118388d6246a",
      3: '0xe10c2de405d12a8344cc5945df6f398660857760',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'DAI-FTM.png'
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'LINK/FTM',
    lpShortSymbol: 'SLP-LF',
    lpAddresses: {
      250: '0x1ca86e57103564f47ffcea7259a6ce8cc1301549',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '0x6491FC29E175CdE591f705a9694F48F4eFFd5d07',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'LINK-FTM.png'
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'wETH/FTM',
    lpShortSymbol: 'SLP-wF',
    lpAddresses: {
      250: '0x3d0bd54c48c2c433ea6fed609cc3d5fb7a77622b',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'wETH-FTM.png'
  },
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'fUSDT/FTM',
    lpShortSymbol: 'SLP-fF',

    lpAddresses: {
      250: '0xd019dd7c760c6431797d6ed170bffb8faee11f99',
      3: '',
    },
    tokenSymbol: 'LQDR',

    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'fUSDT-FTM.png'
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'WBTC/FTM',
    lpShortSymbol: 'SLP-WF',
    lpAddresses: {
      250: '0xc92d97416328a461bce2f539498b505c6c97748f',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'WBTC-FTM.png'
  },
  {
    pid: 6,
    risk: 5,
    lpSymbol: 'SUSHI/FTM',
    lpShortSymbol: 'SLP-SF',

    lpAddresses: {
      250: '0x49d2e0dc99c7358d7a9a8633bf6df111d0ee7f65',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'SUSHI-FTM.png'
  },
  {
    pid: 7,
    risk: 5,
    lpSymbol: 'CREAM/FTM',
    lpShortSymbol: 'SLP-CF',
    lpAddresses: {
      250: '0x147e27be8e66f74c7659d88e2e6a13188873d58b',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'CREAM-FTM.png'
  },
  {
    pid: 8,
    risk: 5,
    lpSymbol: 'FRAX/FXS',
    lpShortSymbol: 'SLP-FF',
    lpAddresses: {
      250: '0xcff4353e10a7207bd16427ca9549437d439b68df',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FXS,
    quoteTokenAdresses: contracts.FXS,
    icon: 'FRAX-FXS.png'
  },
  {
    pid: 9,
    risk: 5,
    lpSymbol: 'AAVE/USDC',
    lpShortSymbol: 'SLP-AU',
    lpAddresses: {
      250: '0x2d89bb3b1448152002453aa37fbe4051afdbf56d',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.USDC,
    icon: 'AAVE-USDC.png'
  },
  {
    pid: 10,
    risk: 5,
    lpSymbol: 'SNX/FTM',
    lpShortSymbol: 'SLP-SF',
    lpAddresses: {
      250: '0xfe69403cf2e22390c0d87ab05062f67d9084935b',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'SNX-FTM.png'
  },
  {
    pid: 11,
    risk: 5,
    lpSymbol: 'ICE/FTM',
    lpShortSymbol: 'SLP-IF',
    lpAddresses: {
      250: '0x84311ecc54d7553378c067282940b0fdfb913675',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'ICE-FTM.png'
  },
  {
    pid: 12,
    risk: 5,
    lpSymbol: 'COVER/FTM',
    lpShortSymbol: 'SLP-CF',
    lpAddresses: {
      250: '0xafa1bf9b2a89dfd60499838c331538283b3346ed',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'COVER-FTM.png'
  },
  {
    pid: 13,
    risk: 5,
    lpSymbol: 'ZOO/FTM',
    lpShortSymbol: 'SLP-ZF',
    lpAddresses: {
      250: '0x3ac28d350c59ef9054b305dfe9078fadc3cecabe',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'ZOO-FTM.png'
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'CRV/FTM',
    lpShortSymbol: 'SLP-CF',
    lpAddresses: {
      250: '0x177e2cc843d2ee20aa884dc8af2a865adf78adb2',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'CRV-FTM.png'
  },
  {
    pid: 16,
    risk: 5,
    lpSymbol: 'fUSDT/FRAX',
    lpShortSymbol: 'SLP-fF',
    lpAddresses: {
      250: '0x4669751cd7933c9ca2ac8147ae7043d8561f4c8d',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FRAX,
    quoteTokenAdresses: contracts.FRAX,
    icon: 'fUSDT-FRAX.png'
  },
  {
    pid: 14,
    risk: 5,
    lpSymbol: 'SFI/FTM',
    lpShortSymbol: 'SLP-SF',
    lpAddresses: {
      250: '0xc24afba17c981326aa14238fcb55abc7d0907808',
      3: '',
    },
    tokenSymbol: 'LQDR',
    tokenAddresses: {
      250: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
      3: '',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.FTM,
    icon: 'SFI-FTM.png',
    isDisable: true
  },
]

export default farms
