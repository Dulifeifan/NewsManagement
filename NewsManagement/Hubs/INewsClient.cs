
using NewsManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsManagement.Hubs
{
    public interface INewsClient
    {
        Task NewNews(News news);
        Task ReceiveNewsUpdate(UpdateInfo info);
        Task Finished(News news);
    }
}
