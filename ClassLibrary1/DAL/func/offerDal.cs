using DALL.models;
using DALL.interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALL.func
{
    public class offerDal : IofferDal
    {
        ProjectdbContext projectdb;
        public offerDal(ProjectdbContext db)
        {

            projectdb = db;
        }

        public bool put(Offer oo)
        {

            Offer? o = getbyid(oo.OfferCode);
            try
            {
                if (o != null)
                {
                    o.Note = oo.Note;
                    o.OfferUser = oo.OfferUser;
                    o.PriceForWork = oo.PriceForWork;
                    o.DaysToworks = oo.DaysToworks;
                    o.Profession = oo.Profession;
                    o.PricePerVisit = oo.PricePerVisit;
                    o.OfferUserId = oo.OfferUserId;


                    projectdb.SaveChanges();

                    return true;
                }
                return false;
            }
            catch
            {
                return false;

            }
        }
        public bool DeleteOffer(int id)
        {
            DaysTowork? p = projectdb.DaysToworks.FirstOrDefault(m => m.OfferCode == id);

            Offer? o = getbyid(id);

            if (o != null)
            {
                projectdb.Offers.Remove(o);
                projectdb.SaveChanges();
                if (p != null)
                    projectdb.DaysToworks.Remove(p);

                projectdb.SaveChanges();
                return true;
            }
            return false;
        }
        public Offer? getbyid(int id)
        {
            return projectdb.Offers.FirstOrDefault(m => m.OfferCode == id);
        }
        //public Offer? getbyuseid(string id)
        //{
        //   return  projectdb.Offers.FirstOrDefault(y => y.OfferUserId == id);
            
        //}

        public List<Offer> GetOffer(int id)
        {

            return projectdb.Offers.ToList();
        }
        public bool AddOffer(Offer c)
        { 
            User? e = projectdb.Users.FirstOrDefault(y => y.Id == c.OfferUserId);
            {
                try

                {
                    if (e != null)
                    {
                        projectdb.Offers.Add(c);
                        projectdb.SaveChanges();
                        return true;

                    }
                    return false;

                }
                catch
                {
                    return false;
                }
                
             
            }
        }
    }
}



