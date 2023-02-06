import { NativeModules } from 'react-native';
import _ from 'lodash';

const { LibsnarkModule } = NativeModules;

const SERIALIZE_FORMAT = {
    SERIALIZE_FORMAT_DEFAULT: 1,
    SERIALIZE_FORMAT_CRV: 2,
    SERIALIZE_FORMAT_ZKLAY: 3,
};

const EC_SELECTION = {
    EC_ALT_BN128: 1,
    EC_BLS12_381: 2,
};

/**
 *
 * @param {string} circuitName 'GenTrade' 
 * @returns {Promise<number>}
 */
async function getContextId(circuitName) {
    const contextId = Number(_.get(await LibsnarkModule.getContextId(circuitName), 'contextId'));
    return contextId;
}

/**
 *
 * @param {string} circuitName 'GenTrade'
 * @returns {Promise<number>}
 */
async function setContextId(circuitName) {
    const contextId = Number(_.get(await LibsnarkModule.setContextId(circuitName), 'contextId'));
    return contextId;
}

async function loggerTest(s) {
    return LibsnarkModule.loggerTest(s);
}

async function testMethod() {
    return LibsnarkModule.testMethod();
}

/**
 *
 * @param {string} circuitName
 * @param {string} treeHeight
 * @param {string} hashType
 * @param {string|Number} serializeFormat   SERIALIZE_FORMAT_DEFAULT: 1 | SERIALIZE_FORMAT_CRV: 2 | SERIALIZE_FORMAT_ZKLAY: 3
 * @param {string|Number} ecSelection       EC_ALT_BN128: 1 | EC_BLS12_381: 2
 * @returns {Promise<*>}
 */
async function createCircuitContext(circuitName, treeHeight='', hashType='', serializeFormat = SERIALIZE_FORMAT.SERIALIZE_FORMAT_ZKLAY, ecSelection = EC_SELECTION.EC_ALT_BN128) {
    if (typeof serializeFormat === 'string') {
        serializeFormat = SERIALIZE_FORMAT[serializeFormat];
    }
    if (typeof ecSelection === 'string') {
        ecSelection = EC_SELECTION[ecSelection];
    }
    return LibsnarkModule.createGenTradeCircuitContext(circuitName, serializeFormat, ecSelection);
}

async function buildCircuit() {
    return LibsnarkModule.buildCircuit();
}

async function runSetup() {
    return LibsnarkModule.runSetup();
}

async function runProof() {
    return LibsnarkModule.runProof();
}

async function runVerify() {
    return LibsnarkModule.runVerify();
}

async function setProof(proof) {
    let str = proof;
    if (typeof proof !== 'string') {
        str = JSON.stringify(proof);
    }
    return LibsnarkModule.setProof(str);
}

async function getVerifyKeyJson() {
    return LibsnarkModule.getVerifyKeyJson();
}

async function getProofJson() {
    return LibsnarkModule.getProofJson();
}

async function writeVerifyKeyToFile(filePath) {
    return LibsnarkModule.writeVerifyKeyToFile(filePath);
}

async function readVerifyKeyFromFile(filePath) {
    return LibsnarkModule.readVerifyKeyFromFile(filePath);
}

async function writeProofKeyToFile(filePath) {
    return LibsnarkModule.writeProofKeyToFile(filePath);
}

async function readProofKeyFromFile(filePath) {
    return LibsnarkModule.readProofKeyFromFile(filePath);
}

async function finalizeCircuit() {
    return LibsnarkModule.finalizeCircuit();
}

async function setInput(key, hexValue) {
    return LibsnarkModule.setInput(key, hexValue);
}

async function setInputArray(key, arrayIdx, hexValue) {
    return LibsnarkModule.setInputArray(key, arrayIdx, hexValue);
}

async function setInputJsonStr(jsonStr) {
    let str = (typeof jsonStr !== 'string') ? JSON.stringify(jsonStr) : jsonStr;

    return LibsnarkModule.setInputJsonString(str);
}

const modules = {
    getContextId,
    setContextId,
    loggerTest,
    testMethod,
    createCircuitContext,
    buildCircuit,
    runSetup,
    runProof,
    runVerify,
    setProof,
    getVerifyKeyJson,
    getProofJson,
    writeVerifyKeyToFile,
    readVerifyKeyFromFile,
    writeProofKeyToFile,
    readProofKeyFromFile,
    finalizeCircuit,
    setInput,
    setInputArray,
    setInputJsonStr,
};

export default modules;
