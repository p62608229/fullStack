using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DAL1.models;
using DAL1.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL1.func;

namespace BLL.func
{
    public class RequestBll : IRequestBll
    {

        IRequestDal requestdal;
        IMapper m;

        public RequestBll(IRequestDal idal)
        {
            requestdal = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });

            m = confign.CreateMapper();
        }
        public bool putreq(RequestDTO oo)
        {
            return requestdal.putreq(m.Map<RequestDTO, Request>(oo));

        }
        public bool DeleteRequest(int id)
        {
            return requestdal.DeleteRequest(id);
        }
        public List<RequestDTO> GetRequest(string id)
        {
            return m.Map<List<Request>, List<RequestDTO>>(requestdal.GetRequest(id));
        }
        public int AddRequest(RequestDTO c)

        {
            return requestdal.AddRequest(m.Map<RequestDTO, Request>(c));
        }
        public RequestDTO UserCodeO(int RCode, int offerUserId)
        {
            return m.Map<Request, RequestDTO>(requestdal.UserCodeO(RCode, offerUserId));
        }
        public List<RequestDTO> GetByUserId(string userId)
        {
            return m.Map<List<Request>, List<RequestDTO>>(requestdal.GetByUserId(userId));
        }

        //public bool IsReq(RequestDTO u)
        //{
        //return requestdal.IsReq(m.Map<RequestDTO,Request>(u)); 
        //}





    }
}

    

