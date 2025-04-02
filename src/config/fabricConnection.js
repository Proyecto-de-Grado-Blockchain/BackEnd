const grpc = require('@grpc/grpc-js');
const crypto = require('node:crypto');
const { connect, Identity, signers } = require('@hyperledger/fabric-gateway');
const fs = require('node:fs').promises;
const { TextDecoder } = require('node:util');

const utf8Decoder = new TextDecoder();

async function newGrpcConnection(MSPId) {
    let typeTLS = ""
    let typePeer = ""
    let peerEndpoint = "";

    if (MSPId === "FiscaliaMSP"){
        typeTLS = "/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/fiscalia.unbosque.edu.co/peers/peer0.fiscalia.unbosque.edu.co/tls/ca.crt";
        typePeer = "peer0.fiscalia.unbosque.edu.co";
        peerEndpoint = 'localhost:9051';
    }else if (MSPId === "CTIMSP"){
        typeTLS = "/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/cti.unbosque.edu.co/peers/peer0.cti.unbosque.edu.co/tls/ca.crt";
        typePeer = "peer0.cti.unbosque.edu.co";
        peerEndpoint = 'localhost:7051';
    }else if (MSPId === "MedLegMSP"){
        typeTLS = "/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/medleg.unbosque.edu.co/peers/peer0.medleg.unbosque.edu.co/tls/ca.crt";
        typePeer = "peer0.medleg.unbosque.edu.co";
        peerEndpoint = 'localhost:8051';
    }

    const tlsRootCert = await fs.readFile(typeTLS);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': typePeer,
    });
}

async function newIdentity(ca, MSPId) {
    const credentials = await fs.readFile(ca);
    return { mspId: MSPId, credentials };
}

async function newSigner(key) {
    const privateKeyPem = await fs.readFile(key);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function getFabricGateway(mspId, ca, key) {
    const client = await newGrpcConnection(mspId);
    const identity = await newIdentity(ca, mspId);
    const signer = await newSigner(key);

    return connect({
        client,
        identity,
        signer,
    });
}

module.exports = { getFabricGateway };