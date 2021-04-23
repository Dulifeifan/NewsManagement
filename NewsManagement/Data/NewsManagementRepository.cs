using Microsoft.EntityFrameworkCore;
using NewsManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsManagement.Data
{
    public class NewsManagementRepository
    {
        private readonly ApplicationDbContext _Context;
        public NewsManagementRepository(ApplicationDbContext context)
        {
            _Context = context;
        }
        public async Task<IEnumerable<News>> GetAllNewsAsync()
        {
            return await (from n in _Context.News
                    orderby n.Id descending
                    select n).ToListAsync();
        }
        public async Task<News> GetNewsByIdAsync(int id)
        {
            return await _Context.News.FirstOrDefaultAsync(n => n.Id == id);
        }
        public async Task AddOneNewsAsync(string title, string description, string content, string imageUrl, bool published)
        {
            var n = new News
            {
                Title = title,
                Description = description,
                Content = content,
                ImageUrl = imageUrl,
                Published = published
            };

            _Context.News.Add(n);
            await _Context.SaveChangesAsync();
        }
        public async Task UpdateOneNewsAsync(int id, string title, string description, string content, string imageUrl, bool published)
        {
            News n = await GetNewsByIdAsync(id);
            n.Title =title;
            n.Description = description;
            n.Content = content;
            n.ImageUrl = imageUrl;
            n.Published = published;
            _Context.News.Attach(n);
            _Context.Entry(n).State = EntityState.Modified;
            await _Context.SaveChangesAsync();
        }
        public async Task DeleteOneNewsAsync(int id)
        {
            News n = await GetNewsByIdAsync(id);
            if (n != null)
            {
                _Context.News.Remove(n);
                await _Context.SaveChangesAsync();
            }
        }
    }
}
