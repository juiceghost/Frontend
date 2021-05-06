import { Interface } from '@ethersproject/abi'
import MultiCallAbi from '../config/abi/Multicall.json'
import { getMulticallAddress } from '../utils/addressHelpers'

const multicall = async (web3, abi, calls, chainId = 3) => {
    const multi = new web3.eth.Contract(
        MultiCallAbi,
        getMulticallAddress(chainId)
    )
    const itf = new Interface(abi)

    const calldata = calls.map((call) => [
        call.address.toLowerCase(),
        itf.encodeFunctionData(call.name, call.params),
    ])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData.map((call, i) =>
        itf.decodeFunctionResult(calls[i].name, call)
    )

    return res
}

export default multicall
