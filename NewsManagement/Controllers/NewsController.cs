using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using NewsManagement.Data;
using NewsManagement.Hubs;
using NewsManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace NewsManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private NewsManagementRepository rep;
        private readonly ILogger<NewsController> _logger;
        private readonly IHubContext<NewsHub> _hubContext;
        public NewsController(NewsManagementRepository repository,ILogger<NewsController> logger, IHubContext<NewsHub> hub)
        {
            rep = repository;
            _logger = logger;
            _hubContext = hub;
        }
        

        
        private static int NewsId;
        

        [HttpPost]
        public int AddNews(News news)
        {
            //var hubContext = GlobalHost.ConnectionManager.GetHubContext<NewsHub>();
            //hubContext.Clients.All.NewNews(news);
            NewsId++;
            return NewsId;
        }
        //[HttpGet]
        //public IEnumerable<News> Get()
        //{
        //    return rep.GetAllNews();
        //}
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await rep.GetAllNewsAsync();
            await _hubContext.Clients.All.SendAsync("dataUpdated", data);
            return Ok(new { Message = "Request Completed" });
        }
    }
}
