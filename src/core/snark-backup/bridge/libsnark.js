import Config from '../../utils/config';
import modules from './modules';
import _ from 'lodash';

export default class Libsnark {
    contextId = 0;
    circuitName = 'GenTrade';
    serializeFormat = 'SERIALIZE_FORMAT_ZKLAY';
    // serializeFormat = 'SERIALIZE_FORMAT_CRV';
    // serializeFormat = 'SERIALIZE_FORMAT_DEFAULT';
    treeHeight = '32';
    // hashType = 'Poseidon';
    hashType = 'MiMC7';
    ecSelection = Config.EC_TYPE;

    /**
     * @param {string} circuitName 'ZKlay' | 'ZKlay_nft'
     * @param {string} treeHeight
     * @param {string} hashType
     * @param {string} serializeFormat
     */
    constructor(circuitName='GenTrade', treeHeight = '32', hashType = 'MiMC7', serializeFormat = 'SERIALIZE_FORMAT_ZKLAY') {
        this.circuitName = circuitName;
        this.treeHeight = treeHeight;
        this.hashType = hashType;
        this.serializeFormat = serializeFormat;
    }

    /**
     * call native module [createCircuitContext] in libsanrk
     * If the contextId exists, it first calls finalizeCircuit.
     * @returns {Promise<true>}
     */
    async init() {
        console.log('Init libsnark module ...');
        this.contextId = await modules.getContextId(this.circuitName);
        if (this.contextId !== 0) {
            console.debug('[LIBSNARK] finalizeCircuit !', this.contextId);
            await modules.finalizeCircuit(this.contextId);
        }
        const resolveDataCreateCircuitContext = await modules.createCircuitContext(this.circuitName, this.serializeFormat, this.ecSelection);
        // const resolveDataCreateCircuitContext = await modules.createGenTradeCircuitContext(this.circuitName, this.serializeFormat, this.ecSelection);

        this.contextId = Number(_.get(resolveDataCreateCircuitContext, 'contextId'));
        console.debug('[LIBSNARK] createCircuitContext !', resolveDataCreateCircuitContext);
        const resolveDataBuildCircuit = await modules.buildCircuit();
        console.debug('[LIBSNARK] buildCircuit !', resolveDataBuildCircuit);
        return true;
    }

    async haltSnarkProcess() {
        await modules.setContextId(this.circuitName);
        const resolveData = await modules.finalizeCircuit();
        console.log('haltSnarkProcess:', resolveData);
        this.contextId = await modules.getContextId(this.circuitName);
    }

    async resumeSnarkProcess() {
        await modules.setContextId(this.circuitName);
        this.contextId = await modules.getContextId(this.circuitName);
        if (this.contextId === 0) {
            await this.init();
        }

        await modules.buildCircuit();
    }

    /**
     * do not use this function
     * generates CRS
     * @returns {Promise<void>}
     */
    async runSetup() {
        await modules.setContextId(this.circuitName);
        const resolveData = await modules.runSetup();
        console.log('runSetup:', resolveData);
    }

    /**
     *
     * @param {object} inputs primary and auxiliary input see sample_input.json
     * @returns {Promise<*>} groth16 proof
     */
    async runProof(inputs) {
        await modules.setContextId(this.circuitName);
        await modules.setInputJsonStr(inputs);
        const resolveData = await modules.runProof();
        return modules.getProofJson();
    }

    /**
     *
     * @param {object} proof groth16 proof {a: G1, b: G2, c: G1}
     * @param {object} inputs primary see sample_input.json
     * @returns {Promise<void>}
     */
    async runVerify(proof, inputs) {
        await modules.setContextId(this.circuitName);
        await modules.setInputJsonStr(inputs);
        await modules.setProof(proof);
        const resolveData = await modules.runVerify();
        console.log('runVerify:', resolveData);
        return resolveData;
    }

    async getVerifyKeyJson() {
        await modules.setContextId(this.circuitName);
        const vkJson = await modules.getVerifyKeyJson();
        console.log(JSON.parse(vkJson));
        return vkJson;
    }

    /**
     * cautions: do not use write key function
     *
     *  ios: Bundle.main.bundlePath + _path
     *  android: assets/crs + _path
     * @param {string} _path
     * @returns {Promise<void>}
     */
    async writeVerifyKeyToFile(_path) {
        await modules.setContextId(this.circuitName);
        const vkFilePath = _path + `${this.circuitName}_crs_vk.dat`;
        const resolveData = await modules.writeVerifyKeyToFile(vkFilePath);
        console.log('writeVerifyKeyToFile:', resolveData);
    }

    /**
     *  ios: Bundle.main.bundlePath + _path
     *  android: assets/crs + _path
     * @param {string} _path
     * @returns {Promise<void>}
     */
    async readVerifyKeyFromFile(_path) {
        await modules.setContextId(this.circuitName);
        const vkFilePath = _path + `${this.circuitName}_crs_vk.dat`;
        const resolveData = await modules.readVerifyKeyFromFile(vkFilePath);
        console.log('readVerifyKeyFromFile:', resolveData);
    }

    /**
     * cautions: do not use write key function
     *
     *  ios: Bundle.main.bundlePath + _path
     *  android: _path
     * @param {string} _path
     * @returns {Promise<void>}
     */
    async writeProofKeyToFile(_path) {
        await modules.setContextId(this.circuitName);
        const pkFilePath = _path + `${this.circuitName}_crs_pk.dat`;
        const resolveData = await modules.writeProofKeyToFile(pkFilePath);
        console.log('writeProofKeyToFile:', resolveData);
    }

    /**
     *  ios: Bundle.main.bundlePath + _path
     *  android: _path
     * @param {string} _path
     * @returns {Promise<void>}
     */
    async readProofKeyFromFile(_path) {
        await modules.setContextId(this.circuitName);
        const pkFilePath = _path + `${this.circuitName}_crs_pk.dat`;
        const resolveData = await modules.readProofKeyFromFile(pkFilePath);
        console.log('readProofKeyFromFile:', resolveData);
    }
}