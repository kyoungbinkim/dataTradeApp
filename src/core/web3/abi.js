export default abi = {"abi" :[
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_registData_vk",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_orderData_vk",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "c0",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "c1",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "c2",
        "type": "uint256[]"
      }
    ],
    "name": "logOrder",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pk_own",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pk_enc",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "eoa",
        "type": "address"
      }
    ],
    "name": "registUserByDelegator",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pk_own",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pk_enc",
        "type": "uint256"
      }
    ],
    "name": "registUser",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "addr",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pk_own",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pk_enc",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "eoa",
        "type": "address"
      }
    ],
    "name": "_registUser",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "addr",
        "type": "uint256"
      }
    ],
    "name": "isRegisteredUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "proof",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[5]",
        "name": "inputs",
        "type": "uint256[5]"
      }
    ],
    "name": "registData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hct",
        "type": "uint256"
      }
    ],
    "name": "isRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "proof",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[17]",
        "name": "inputs",
        "type": "uint256[17]"
      }
    ],
    "name": "orderData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]}