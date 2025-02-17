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
        public bool putreq(RequestDTO oo);
        public bool DeleteRequest(int id);
        public List<RequestDTO> GetRequest(string id);
        public int AddRequest(RequestDTO c);
        public RequestDTO UserCodeO(int RCode, int offerCode);
        public List<RequestDTO> GetByUserId(string userId);


        //public bool IsReq(RequestDTO u);

    }
}
