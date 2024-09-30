import * as grpc from '@grpc/grpc-js';
import * as crypto from 'node:crypto';
import { connect, Identity, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'node:fs';
import { TextDecoder } from 'node:util';

const utf8Decoder = new TextDecoder();
const peerEndpoint = 'localhost:7051';

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile("/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/medleg.unbosque.edu.co/peers/peer0.medleg.unbosque.edu.co/tls/ca.crt");
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': 'peer0.medleg.unbosque.edu.co',
    });
}

async function newIdentity() {
    const credentials = await fs.readFile("/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/medleg.unbosque.edu.co/users/User1@medleg.unbosque.edu.co/msp/signcerts/User1@medleg.unbosque.edu.co-cert.pem");
    return { mspId: 'MedLegMSP', credentials };
}

async function newSigner() {
    const privateKeyPem = await fs.readFile("/home/administrador/red-hyperledger-fabric/unbosque-network/crypto-config/peerOrganizations/medleg.unbosque.edu.co/users/User1@medleg.unbosque.edu.co/msp/keystore/priv_sk");
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

export async function getFabricGateway() {
    const client = await newGrpcConnection();
    const identity = await newIdentity();
    const signer = await newSigner();

    return connect({
        client,
        identity,
        signer,
    });
}