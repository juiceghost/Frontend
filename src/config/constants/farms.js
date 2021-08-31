import { Tokens } from './tokens'

const farms = [
  {
    pid: 19,
    lpSymbol: 'LQDR',
    lpAddresses: {
      250: "0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9",
      3: '',
    },
    tokenSymbol: Tokens.LQDR.symbol,
    tokenAddresses: Tokens.LQDR.address,
    quoteTokenSymbol: Tokens.LQDR.symbol,
    quoteTokenAdresses: Tokens.LQDR.address,
    isTokenOnly: true,
    type: 0,
  },
  {
    pid: 18,
    lpSymbol: 'LQDR/FTM',
    lpAddresses: {
      250: "0xfa7ca6e6d17368e0a1fa9c75f2ebe5a8d7be9fc6",
      3: '',
    },
    tokenSymbol: Tokens.LQDR.symbol,
    tokenAddresses: Tokens.LQDR.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 17,
    lpSymbol: 'LQDR/fUSDT',
    lpAddresses: {
      250: "0xa1bb6830fabddb99ed365c0611a33741c5e6173f",
      3: '',
    },
    tokenSymbol: Tokens.LQDR.symbol,
    tokenAddresses: Tokens.LQDR.address,
    quoteTokenSymbol: Tokens.FUSDT.symbol,
    quoteTokenAdresses: Tokens.FUSDT.address,
    type: 0,
  },
  {
    pid: 0,
    lpSymbol: 'YFI/FTM',
    lpAddresses: {
      250: "0x280abc0d9727f4de3a46ca9cf93c16b4a9c127d1",
      3: '',
    },
    tokenSymbol: Tokens.YFI.symbol,
    tokenAddresses: Tokens.YFI.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 1,
    lpSymbol: 'DAI/FTM',
    lpAddresses: {
      250: "0xd32f2eb49e91aa160946f3538564118388d6246a",
      3: '0xe10c2de405d12a8344cc5945df6f398660857760',
    },
    tokenSymbol: Tokens.FTM.symbol,
    tokenAddresses: Tokens.FTM.address,
    quoteTokenSymbol: Tokens.DAI.symbol,
    quoteTokenAdresses: Tokens.DAI.address,
    type: 0,
  },
  {
    pid: 2,
    lpSymbol: 'LINK/FTM',
    lpAddresses: {
      250: '0x1ca86e57103564f47ffcea7259a6ce8cc1301549',
      3: '',
    },
    tokenSymbol: Tokens.LINK.symbol,
    tokenAddresses: Tokens.LINK.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 3,
    lpSymbol: 'wETH/FTM',
    lpAddresses: {
      250: '0x3d0bd54c48c2c433ea6fed609cc3d5fb7a77622b',
      3: '',
    },
    tokenSymbol: Tokens.ETH.symbol,
    tokenAddresses: Tokens.ETH.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 4,
    lpSymbol: 'fUSDT/FTM',
    
    lpAddresses: {
      250: '0xd019dd7c760c6431797d6ed170bffb8faee11f99',
      3: '',
    },
    tokenSymbol: Tokens.FUSDT.symbol,
    tokenAddresses: Tokens.FUSDT.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 5,
    lpSymbol: 'WBTC/FTM',
    lpAddresses: {
      250: '0xc92d97416328a461bce2f539498b505c6c97748f',
      3: '',
    },
    tokenSymbol: Tokens.WBTC.symbol,
    tokenAddresses: Tokens.WBTC.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 6,
    lpSymbol: 'SUSHI/FTM',
    
    lpAddresses: {
      250: '0x49d2e0dc99c7358d7a9a8633bf6df111d0ee7f65',
      3: '',
    },
    tokenSymbol: Tokens.SUSHI.symbol,
    tokenAddresses: Tokens.SUSHI.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 7,
    lpSymbol: 'CREAM/FTM',
    lpAddresses: {
      250: '0x147e27be8e66f74c7659d88e2e6a13188873d58b',
      3: '',
    },
    tokenSymbol: Tokens.CREAM.symbol,
    tokenAddresses: Tokens.CREAM.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 8,
    lpSymbol: 'FRAX/FXS',
    lpAddresses: {
      250: '0xcff4353e10a7207bd16427ca9549437d439b68df',
      3: '',
    },
    tokenSymbol: Tokens.FXS.symbol,
    tokenAddresses: Tokens.FXS.address,
    quoteTokenSymbol: Tokens.FRAX.symbol,
    quoteTokenAdresses: Tokens.FRAX.address,
    type: 0,
  },
  {
    pid: 9,
    lpSymbol: 'AAVE/USDC',
    lpAddresses: {
      250: '0x2d89bb3b1448152002453aa37fbe4051afdbf56d',
      3: '',
    },
    tokenSymbol: Tokens.AAVE.symbol,
    tokenAddresses: Tokens.AAVE.address,
    quoteTokenSymbol: Tokens.USDC.symbol,
    quoteTokenAdresses: Tokens.USDC.address,
    type: 0,
  },
  {
    pid: 10,
    lpSymbol: 'SNX/FTM',
    lpAddresses: {
      250: '0xfe69403cf2e22390c0d87ab05062f67d9084935b',
      3: '',
    },
    tokenSymbol: Tokens.SNX.symbol,
    tokenAddresses: Tokens.SNX.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 11,
    lpSymbol: 'ICE/FTM',
    lpAddresses: {
      250: '0x84311ecc54d7553378c067282940b0fdfb913675',
      3: '',
    },
    tokenSymbol: Tokens.ICE.symbol,
    tokenAddresses: Tokens.ICE.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 12,
    lpSymbol: 'COVER/FTM',
    lpAddresses: {
      250: '0xafa1bf9b2a89dfd60499838c331538283b3346ed',
      3: '',
    },
    tokenSymbol: Tokens.COVER.symbol,
    tokenAddresses: Tokens.COVER.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 13,
    lpSymbol: 'ZOO/FTM',
    lpAddresses: {
      250: '0x3ac28d350c59ef9054b305dfe9078fadc3cecabe',
      3: '',
    },
    tokenSymbol: Tokens.ZOO.symbol,
    tokenAddresses: Tokens.ZOO.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 15,
    lpSymbol: 'CRV/FTM',
    lpAddresses: {
      250: '0x177e2cc843d2ee20aa884dc8af2a865adf78adb2',
      3: '',
    },
    tokenSymbol: Tokens.CRV.symbol,
    tokenAddresses: Tokens.CRV.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
  },
  {
    pid: 16,
    lpSymbol: 'fUSDT/FRAX',
    lpAddresses: {
      250: '0x4669751cd7933c9ca2ac8147ae7043d8561f4c8d',
      3: '',
    },
    tokenSymbol: Tokens.FRAX.symbol,
    tokenAddresses: Tokens.FRAX.address,
    quoteTokenSymbol: Tokens.FUSDT.symbol,
    quoteTokenAdresses: Tokens.FUSDT.address,
    type: 0,
  },
  {
    pid: 14,
    lpSymbol: 'SFI/FTM',
    lpAddresses: {
      250: '0xc24afba17c981326aa14238fcb55abc7d0907808',
      3: '',
    },
    tokenSymbol: Tokens.SFI.symbol,
    tokenAddresses: Tokens.SFI.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 0,
    isDisable: true
  },
  {
    pid: 0,
    lpSymbol: 'LQDR/FTM',
    lpAddresses: {
      250: "0x4fe6f19031239f105f753d1df8a0d24857d0caa2",
      3: '',
    },
    tokenSymbol: Tokens.LQDR.symbol,
    tokenAddresses: Tokens.LQDR.address,
    quoteTokenSymbol: Tokens.FTM.symbol,
    quoteTokenAdresses: Tokens.FTM.address,
    type: 1,
  },
  // {
  //   pid: 1,
  //   lpSymbol: 'LQDR/SPIRIT',
  //   lpAddresses: {
  //     250: "0xFeBbfeA7674720cEdD35e9384d07F235365c1B3e",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.SPIRIT.symbol,
  //   tokenAddresses: Tokens.SPIRIT.address,
  //   quoteTokenSymbol: Tokens.LQDR.symbol,
  //   quoteTokenAdresses: Tokens.LQDR.address,
  //   type: 1,
  // },
  // {
  //   pid: 2,
  //   lpSymbol: 'SPIRIT/FTM',
  //   lpAddresses: {
  //     250: "0x30748322B6E34545DBe0788C421886AEB5297789",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.SPIRIT.symbol,
  //   tokenAddresses: Tokens.SPIRIT.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 1,
  // },
  // {
  //   pid: 3,
  //   lpSymbol: 'FTM/fUSDT',
  //   lpAddresses: {
  //     250: "0xd14Dd3c56D9bc306322d4cEa0E1C49e9dDf045D4",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.FUSDT.symbol,
  //   quoteTokenAdresses: Tokens.FUSDT.address,
  //   type: 1,
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'WBTC/FTM',
  //   lpAddresses: {
  //     250: "0x279b2c897737a50405ED2091694F225D83F2D3bA",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.WBTC.symbol,
  //   tokenAddresses: Tokens.WBTC.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 1,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'FTM/USDC',
  //   lpAddresses: {
  //     250: "0xe7E90f5a767406efF87Fdad7EB07ef407922EC1D",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.USDC.symbol,
  //   quoteTokenAdresses: Tokens.USDC.address,
  //   type: 1,
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'wETH/FTM',
  //   lpAddresses: {
  //     250: "0x613BF4E46b4817015c01c6Bb31C7ae9edAadc26e",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.ETH.symbol,
  //   tokenAddresses: Tokens.ETH.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 1,
  // },
  // {
  //   pid: 7,
  //   lpSymbol: 'MIM/FTM',
  //   lpAddresses: {
  //     250: "0xB32b31DfAfbD53E310390F641C7119b5B9Ea0488",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.MIM.symbol,
  //   tokenAddresses: Tokens.MIM.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 1,
  // },
  // {
  //   pid: 8,
  //   lpSymbol: 'BOO/FTM',
  //   lpAddresses: {
  //     250: "0xEc7178F4C41f346b2721907F5cF7628E388A7a58",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.BOO.symbol,
  //   tokenAddresses: Tokens.BOO.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 2,
  // },
  // {
  //   pid: 9,
  //   lpSymbol: 'USDC/FTM',
  //   lpAddresses: {
  //     250: "0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.USDC.symbol,
  //   quoteTokenAdresses: Tokens.USDC.address,
  //   type: 2,
  // },
  // {
  //   pid: 10,
  //   lpSymbol: 'DAI/FTM',
  //   lpAddresses: {
  //     250: "0xe120ffbda0d14f3bb6d6053e90e63c572a66a428",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.DAI.symbol,
  //   quoteTokenAdresses: Tokens.DAI.address,
  //   type: 2,
  // },
  // {
  //   pid: 11,
  //   lpSymbol: 'SUSHI/FTM',
  //   lpAddresses: {
  //     250: "0xf84e313b36e86315af7a06ff26c8b20e9eb443c3",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.SUSHI.symbol,
  //   tokenAddresses: Tokens.SUSHI.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 2,
  // },
  // {
  //   pid: 12,
  //   lpSymbol: 'LINK/FTM',
  //   lpAddresses: {
  //     250: "0x89d9bc2f2d091cfbfc31e333d6dc555ddbc2fd29",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.LINK.symbol,
  //   tokenAddresses: Tokens.LINK.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 2,
  // },
  // {
  //   pid: 13,
  //   lpSymbol: 'wETH/FTM',
  //   lpAddresses: {
  //     250: "0xf0702249f4d3a25cd3ded7859a165693685ab577",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.ETH.symbol,
  //   tokenAddresses: Tokens.ETH.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 2,
  // },
  // {
  //   pid: 14,
  //   lpSymbol: 'fUSDT/FTM',
  //   lpAddresses: {
  //     250: "0x5965e53aa80a0bcf1cd6dbdd72e6a9b2aa047410",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.FUSDT.symbol,
  //   quoteTokenAdresses: Tokens.FUSDT.address,
  //   type: 2,
  // },
  // {
  //   pid: 15,
  //   lpSymbol: 'MIM/FTM',
  //   lpAddresses: {
  //     250: "0x6f86e65b255c9111109d2D2325ca2dFc82456efc",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.MIM.symbol,
  //   tokenAddresses: Tokens.MIM.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 2,
  // },
  // {
  //   pid: 16,
  //   lpSymbol: 'WAKA/FTM',
  //   lpAddresses: {
  //     250: "0x696885e9581bd33ee9877bd8750ddda65381ff01",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.WAKA.symbol,
  //   tokenAddresses: Tokens.WAKA.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 3,
  // },
  // {
  //   pid: 17,
  //   lpSymbol: 'FTM/WBTC',
  //   lpAddresses: {
  //     250: "0x195c45044b121d8caf4c9e2d8f47fb81f4e12f21",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.WBTC.symbol,
  //   tokenAddresses: Tokens.WBTC.address,
  //   quoteTokenSymbol: Tokens.FTM.symbol,
  //   quoteTokenAdresses: Tokens.FTM.address,
  //   type: 3,
  // },
  // {
  //   pid: 18,
  //   lpSymbol: 'FTM/USDC',
  //   lpAddresses: {
  //     250: "0x97a490e7c90b4d8f6d18752672f4c8e3c35891a2",
  //     3: '',
  //   },
  //   tokenSymbol: Tokens.FTM.symbol,
  //   tokenAddresses: Tokens.FTM.address,
  //   quoteTokenSymbol: Tokens.USDC.symbol,
  //   quoteTokenAdresses: Tokens.USDC.address,
  //   type: 3,
  // },
]

export default farms
