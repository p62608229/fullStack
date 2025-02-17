using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DAL1.func;
using DAL1.interfaces;
using DAL1.models;
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
        public bool Put(OfferDTO oo)
        {
            return offerdal.Put(m.Map<OfferDTO, Offer>(oo));

        }
        public bool DeleteOffer(int id)
        {
            return offerdal.DeleteOffer(id);
        }
        public List<OfferDTO> GetOffer(string id)
        {

            List<OfferDTO> s= m.Map<List<Offer>, List<OfferDTO>>(offerdal.GetOffer(id));
            return s;
        }
        public bool AddOffer(OfferDTO c)

        {
            return offerdal.AddOffer(m.Map<OfferDTO,Offer>(c));
        }
        public OfferDTO UserCodeR(int OCode, int RequestUserId)
        {
            return m.Map<Offer, OfferDTO>(offerdal.UserCodeR(OCode, RequestUserId));
        }
       

        //public OfferDTO? Getmatchoffer(OfferDTO e)
        //{
        //       return m.Map<Offer,OfferDTO>(offerdal.Getmatchoffer(m.Map<OfferDTO, Offer > (e)));

        //}

        public bool ChangeCalander(int id)
        {
            return offerdal.ChangeCalander(id);
        }


    }
}

    

