using core_service.DTO;
using System.Text.Json;

namespace core_service
{
    public class MessageBrokerHelp
    {
        public async Task CreateOperation(CreateOperationDTO body)
        {
            var url = $"https://localhost:7139/api/operation/create";
            using var client = new HttpClient();
            JsonContent content = JsonContent.Create(body);
            await client.PostAsync(url, content);
            //string responseText = await response.Content.ReadAsStringAsync();
        }
    }
}
