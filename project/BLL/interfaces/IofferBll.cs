using BLL.DTO;
using DALL.models;
using DALL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IofferBll
    {
        public bool put(OfferDTO oo);
        public bool DeleteOffer(int id);
        public List<OfferDTO> GetOffer(int id);
        public bool AddOffer(OfferDTO c);




    }
}
