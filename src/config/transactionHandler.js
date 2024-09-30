import { getFabricGateway } from './fabricConnection.js';

async function submitTransaction(chaincodeName, functionName, args) {
    try {
        const gateway = await getFabricGateway();
        const network = gateway.getNetwork('unbosquechannel');
        const contract = network.getContract(chaincodeName);

        // Enviar la transacción a la red
        const result = await contract.submitTransaction(functionName, ...args);
        console.log(`Estado de la trasacción : ${result.toString()}`);

        // Cerrar la conexión del gateway
        gateway.close();
        return result;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
}

export { submitTransaction };