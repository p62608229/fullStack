using BLL.DTO;
using DAL1.models;
using DAL1.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IofferBll
    {
        public bool Put(OfferDTO oo);
        public bool DeleteOffer(int id);
        public List<OfferDTO> GetOffer(string id);
        public OfferDTO UserCodeR(int OCode, int RequestCode);

        public bool AddOffer(OfferDTO c);
        public bool ChangeCalander(int id);
        //public OfferDTO? Getmatchoffer(OfferDTO e);
    }
}
