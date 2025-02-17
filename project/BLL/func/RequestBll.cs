using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DALL.models;
using DALL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public bool put(RequestDTO oo)
        {
            return requestdal.put(m.Map<RequestDTO, Request>(oo));

        }
        public bool DeleteRequest(int id)
        {
            return requestdal.DeleteRequest(id);
        }
        public List<RequestDTO> GetRequest(int id)
        {
            return m.Map<List<Request>, List<RequestDTO>>(requestdal.GetRequest(id));
        }
        public bool AddRequest(RequestDTO c)

        {
            return requestdal.AddRequest(m.Map<RequestDTO, Request>(c));
        }


    }
}

    

