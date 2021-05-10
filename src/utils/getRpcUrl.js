import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = ["https://rpcapi.fantom.network", "https://rpc.fantom.network", "https://rpc2.fantom.network", "https://rpc3.fantom.network"]

const getRpcUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getRpcUrl