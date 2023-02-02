/* global BigInt */

var Config = {
    EC_TYPE : 'EC_ALT_BN128',
    dataBlockNum : '530',
    dataMaxBlockNum : '530',

    testProvider    : 'http://127.0.0.1:7545',

    homePath        : '/Users/kim/dataTradeApp/',

}

export let snarkLibraryPath = Config.homePath + 'src/core/snark/lib/'
export let snarkStorePath = snarkLibraryPath + '../proofs/'

export function initConfig() {
    snarkLibraryPath = Config.homePath + 'src/core/snark/lib/'
    snarkStorePath = snarkLibraryPath + '../proofs/'
}

export default Config;