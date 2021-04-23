using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewsManagement.Models
{
    public class UpdateInfo
    {
        public int NewsId { get; set; }
        public bool New { get; set; }
        public string Update { get; set; }
        public bool Finished { get; set; }
    }
}
