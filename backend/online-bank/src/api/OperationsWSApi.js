import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const operationsHubUrl = "https://localhost:7139/api/operations";

export const OperationsWSApi = {
    joinToAccountHistory = async (accountNumber) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(operationsHubUrl)
                .configureLogging(LogLevel.Information)
                .build();


        }
        catch (e) {
            console.log(e);
        }
    }
}