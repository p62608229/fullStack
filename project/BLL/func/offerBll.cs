using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DALL.func;
using DALL.interfaces;
using DALL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.func
{
    public class offerBll : IofferBll
    {

        IofferDal offerdal;
        IMapper m;

        public offerBll(IofferDal idal)
        {
            offerdal = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });
            m = confign.CreateMapper();
        }
        public bool put(OfferDTO oo)
        {
            return offerdal.put(m.Map<OfferDTO, Offer>(oo));

        }
        public bool DeleteOffer(int id)
        {
            return offerdal.DeleteOffer(id);
        }
        public List<OfferDTO> GetOffer(int id)
        {
            return m.Map<List<Offer>, List<OfferDTO>>(offerdal.GetOffer(id));
        }
        public bool AddOffer(OfferDTO c)

        {
            return offerdal.AddOffer(m.Map<OfferDTO,Offer>(c));
        }
    

    }
}

    

