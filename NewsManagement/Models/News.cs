using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsManagement.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public bool Published { get; set; }
    }
}
