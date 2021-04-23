using Microsoft.AspNetCore.SignalR;
using NewsManagement.Data;
using NewsManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace NewsManagement.Hubs
{
    public class NewsHub : Hub
    //public class NewsHub : Hub<INewsClient>
    {
        //private static readonly NewsChecker _newsChecker = new NewsChecker(new Random());
        //public async Task GetUpdateForNews(News news)
        //{
        //    await Clients.Others.NewNews(news);
        //    UpdateInfo result;
        //    do
        //    {
        //        result = _newsChecker.GetUpdate(news);
        //        await Task.Delay(700);
        //        if (!result.New) continue;
        //        await Clients.Caller.ReceiveNewsUpdate(result);
        //    } while (!result.Finished);
        //    await Clients.Caller.Finished(news);
        //}
        //public override Task OnConnectedAsync()
        //{

        //    return base.OnConnectedAsync();
        //}
        NewsManagementRepository rep;
        public NewsHub(NewsManagementRepository repository)
        {
            rep = repository;
        }

        //public async Task CreateOneNews(int id, string title, string description, string content, string imageUrl, bool published)
        //{
        //    await Clients.All.SendAsync("NewsCreated", id, title, description,content, imageUrl, published);
        //}

        public async Task UpdateData(int id, string title, string description, string content, string imageUrl, bool published, string method)
        {
            if (method.Equals("C"))
            {
                await rep.AddOneNewsAsync(title, description, content, imageUrl, published);
            }
            else if (method.Equals("U"))
            {
                await rep.UpdateOneNewsAsync(id, title, description, content, imageUrl, published);
            }
            else if (method.Equals("D"))
            {
                await rep.DeleteOneNewsAsync(id);
            }
            IEnumerable<News> data = await rep.GetAllNewsAsync();
            await Clients.All.SendAsync("dataUpdated", data);
        }

        public async Task UpdateDataWithNull()
        {
            IEnumerable<News> data = await rep.GetAllNewsAsync();
            await Clients.All.SendAsync("dataUpdated", data);
        }


    }
}
