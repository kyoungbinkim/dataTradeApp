import httpCli from "./http.js";



export async function nicknameCheck(nickname) {

    const flag = (await httpCli.get(`/usr/join/check/nickname/${nickname}`)).data;
    return flag;
}

export async function addressCheck(address){
    const flag = (await httpCli.get(`/usr/join/check/address/${address}`)).data;
    return flag
}


const joinQuery ={
    nicknameCheck,
    addressCheck
}

export default joinQuery;