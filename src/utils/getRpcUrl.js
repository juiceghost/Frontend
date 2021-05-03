import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = ["https://ropsten.infura.io/v3/df9a2cbc416c4aa5ba4b9c85f57f756d"]

const getRpcUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getRpcUrl