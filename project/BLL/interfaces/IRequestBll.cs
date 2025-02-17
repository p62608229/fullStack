using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IRequestBll
    {
        public bool put(RequestDTO oo);
        public bool DeleteRequest(int id);
        public List<RequestDTO> GetRequest(int id);
        public bool AddRequest(RequestDTO c);
    }
}
