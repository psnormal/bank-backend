using core_service.DTO;
using Microsoft.AspNetCore.SignalR;

namespace core_service
{
    public class OperationsHub : Hub
    {
        private readonly IDictionary<string, int> _connections;

        public OperationsHub(IDictionary<string, int> connections)
        {
            _connections = connections;
        }
        public async Task JoinToAccountHistory(string accountNumber)
        {
            int Number = Convert.ToInt32(accountNumber); 
            await Groups.AddToGroupAsync(Context.ConnectionId, accountNumber);
            _connections[Context.ConnectionId] = Number;
            await Clients.Group(accountNumber).SendAsync("ReceiveMessage", $"You has joined {accountNumber}");
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out int accountNumber))
            {
                _connections.Remove(Context.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        /*public async Task SendOperations(InfoOperationsDTO operationsList)
        {
            await Clients.All.SendAsync("GetOperations", operationsList);
        }*/
    }
}
