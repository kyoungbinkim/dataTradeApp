import axios from 'axios'
import { Platform } from 'react-native';

const httpCli = axios.create();
// default 설정 key 설정 등등. ..

const androidURL  = 'http://10.0.2.2:10801';
const iosURL      = 'http://127.0.0.1:10801';

httpCli.defaults.baseURL = Platform.OS === 'ios' ? iosURL : androidURL;;
// httpCli.defaults.withCredentials = true;
httpCli.defaults.timeout = 250000;

export default httpCli;


