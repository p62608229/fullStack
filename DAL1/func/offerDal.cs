using DAL1.models;
using DAL1.interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.func
{
    public class offerDal : IofferDal
    {
        ProjectdbContext projectdb;
        public offerDal(ProjectdbContext db)
        {

            projectdb = db;
        }

        public bool Put(Offer oo)
        {

            Offer? o = getbyid(oo.OfferCode);
            try
            {
                if (o != null)
                {
                    o.Note = oo.Note;
                    o.PriceForWork = oo.PriceForWork;
                   // o.DaysToworks = oo.DaysToworks.;
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
            Offer l = projectdb.Offers.Include(x => x.DaysToworks).FirstOrDefault(m => m.OfferCode == id);
            return l ;
        }
        //public Offer? getbyuseid(string id)
        //{
        //   return  projectdb.Offers.FirstOrDefault(y => y.OfferUserId == id);

        //}

        public List<Offer> GetOffer(string id)
        {
            List < Offer > ll= projectdb.Offers.Include(x => x.DaysToworks).Where(m => m.OfferUserId == id ||  m.OfferCode.ToString().Equals(id)).ToList();
            return ll;
            //return getbyid();
            //return projectdb.Offers.ToList();
        }
        public bool AddOffer(Offer c)
        {
            Offer? e = projectdb.Offers.FirstOrDefault(y => y.OfferCode == c.OfferCode);

            //User? e = projectdb.Users.FirstOrDefault(y => y.Id == c.OfferUserId);
            {
                try

                {
                    if (e == null)
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
        public bool ChangeCalander(int id)
        {
            try
            {
                Offer? y = projectdb.Offers.FirstOrDefault(m => m.OfferCode == id);

                //y.Calander = !y.Calander;
                projectdb.SaveChanges();
                return true;
            }
            catch { return false; }
        }
        public Offer UserCodeR(int OCode, int RequestCode)
        {
            Offer? p = projectdb.Offers.FirstOrDefault(k => k.OfferCode == OCode);
            if (p != null && p.UserCodeRequest == null)
            {
                p.UserCodeRequest = RequestCode;
                projectdb.SaveChanges();
                return p;


            }

            else { return null; }
        }

    


        //public Offer Getmatchoffer(Offer e)
        //{
        //    Offer? y = projectdb.Offers.FirstOrDefault(p => p.OfferCode == e.OfferCode);

        //    if (y != null)
        //    {
        //        //y.Calander = !y.Calander;
        //        y.MatchedEmail = e.MatchedEmail;
        //        y.MatchedPhone = e.MatchedPhone;
        //        y.MatchedName = e.MatchedName;
        //        projectdb.SaveChanges();
        //        return e;
        //    }
        //    return null;
        //}
    }
            
            }
       
    




