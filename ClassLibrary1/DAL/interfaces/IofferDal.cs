using DALL.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALL.interfaces
{
    public interface IofferDal
    {
      public bool put(Offer oo);
        public bool DeleteOffer(int id);
        public List< Offer> GetOffer(int id);
        public bool AddOffer(Offer c);


    }
}
