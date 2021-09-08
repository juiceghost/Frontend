import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap',
    // uri: 'https://api.thegraph.com/subgraphs/name/strikefinance/strike-subgraph',    
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})
