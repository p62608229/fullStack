using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.interfaces
{
    public interface IofferDal
    {
      public bool Put(Offer oo);
        public bool DeleteOffer(int id);
        public List< Offer> GetOffer(string id);
        public bool AddOffer(Offer c);
        public Offer? getbyid(int id);
        public bool ChangeCalander(int id);
        public Offer UserCodeR(int RCode, int offerCode);


        //public Offer Getmatchoffer(Offer e);



    }
}
