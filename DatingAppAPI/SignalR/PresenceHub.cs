namespace DatingAppAPI.SignalR
{
    using System;
    using System.Threading.Tasks;
    using DatingAppAPI.Extensions;
    using Microsoft.AspNetCore.SignalR;

    public class PresenceHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            //UserIsOnline => name of the method that we use inside the client
            await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());
            await base.OnDisconnectedAsync(exception);
        }
    }
}