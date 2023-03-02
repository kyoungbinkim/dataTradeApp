import _ from 'lodash'
import httpCli from "./http"

export async function getServerKeys() {
    try {
        const keys = await httpCli.get('usr/server/keys');
        
        return _.get(keys, 'data')
    } catch (error) {
        console.log(error);
        throw error;
    }
}