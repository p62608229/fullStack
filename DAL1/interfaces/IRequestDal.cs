using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.interfaces
{
    public interface IRequestDal
    {
        public bool putreq(Request oo);
        public bool DeleteRequest(int id);
        public List<Request> GetRequest(string id);
        public int AddRequest(Request c);
        public Request UserCodeO(int RCode, int offerCode);
        public bool IsReq(Request u);
        public List<Request>GetByUserId(string userId);


        //public bool ChangeCalander(int id);
    }
}
