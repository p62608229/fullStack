using DALL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALL.interfaces
{
    public interface IRequestDal
    {
        public bool put(Request oo);
        public bool DeleteRequest(int id);
        public List<Request> GetRequest(int id);
        public bool AddRequest(Request c);
    }
}
