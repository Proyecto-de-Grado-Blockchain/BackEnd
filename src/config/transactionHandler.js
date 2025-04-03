const { getFabricGateway } = require('./fabricConnection.js');

async function submitTransaction(chaincodeName, functionName, MSPID, ca, KEY, ...args) {
    try {

        const MSPId = MSPID;
        const CA = ca;
        const key = KEY;
        
        const gateway = await getFabricGateway(MSPId, CA, key);
        const network = gateway.getNetwork('unbosquechannel');
        const contract = network.getContract(chaincodeName);

        // Enviar la transacción a la red
        const result = await contract.submitTransaction(functionName, ...args);

        // Cerrar la conexión del gateway
        gateway.close();
        return result;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
}

async function queryTransaction(chaincodeName, functionName,  MSPID, ca, KEY, ...args) {
    try {
        const MSPId = MSPID;
        const CA = ca;
        const key = KEY;
        
        const gateway = await getFabricGateway(MSPId, CA, key);
        const network = gateway.getNetwork('unbosquechannel');
        const contract = network.getContract(chaincodeName);

        // Ejecutar la consulta (evaluateTransaction)
        const result = await contract.evaluateTransaction(functionName, ...args);

        // Cerrar la conexión del gateway
        gateway.close();

        return result;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error;
    }
}

module.exports = { submitTransaction, queryTransaction };