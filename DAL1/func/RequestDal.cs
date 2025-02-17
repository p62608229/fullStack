
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
using System.Globalization;
using System.Linq.Expressions;

namespace DAL1.func
{
    public class RequestDal : IRequestDal
    {
        ProjectdbContext projectdb;
        public RequestDal(ProjectdbContext db)
        {

            projectdb = db;
        }

        public bool putreq(Request oo)
        {

            Request? o = getbyid(oo.RequestCode);
            try
            {
                if (o != null)
                {
                    o.RequestCode = oo.RequestCode;
                    o.RequestUserId = oo.RequestUserId;
                    //o.Date = oo.Date;
                    //o.Hour = oo.Hour;
                    o.Profession = oo.Profession;
                    o.AddressProfession = oo.AddressProfession;
                    o.Note = oo.Note;
                    o.CameThroughFriend = oo.CameThroughFriend;
                    o.Fromhour = oo.Fromhour;
                    o.Tohour = oo.Tohour;
                    o.Date = oo.Date;

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
        public bool DeleteRequest(int id)
        {
            DaysTowork? p = projectdb.DaysToworks.FirstOrDefault(m => m.OfferCode == id);
            Request? o = getbyid(id);


            if (o != null)
            {
                projectdb.Requests.Remove(o);
                projectdb.SaveChanges();
                if (p != null)
                    projectdb.DaysToworks.Remove(p);

                projectdb.SaveChanges();
                return true;
            }
            return false;
        }



        public Request? getbyid(int id)
        {
            return projectdb.Requests.FirstOrDefault(m => m.RequestCode == id);
        }

        public List<Request> GetRequest(string id)
        {

            return projectdb.Requests.Include(x => x.RequestUser).Include(y => y.UserCodeOffersNavigation).ThenInclude(a => a.OfferUser)
                .Where(m => m.RequestUserId == id || m.UserCodeOffersNavigation.OfferUserId == id).ToList();

            
        }

        public List<Request> GetByUserId(string userId)
        { 
            return projectdb.Requests
    .Where(m => m.RequestUserId == userId )
    .ToList();

        }


        public int AddRequest(Request c)
            {
                try
                {
                    Request? e = projectdb.Requests.FirstOrDefault(y => y.RequestCode == c.RequestCode);
                    if (e == null)
                    {
                        projectdb.Requests.Add(c);
                        projectdb.SaveChanges();
                        return c.RequestCode;
                    }
                   return -1; 

                }
                catch (Exception ex)
                {
                return -1;

                }


            }

        public Request UserCodeO(int RCode, int offerCode)
        { 
            Request? p = projectdb.Requests.FirstOrDefault(k => k.RequestCode == RCode);
            if (p != null && p.UserCodeOffers == null)
            {
                p.UserCodeOffers = offerCode;
                projectdb.SaveChanges();
                return p;


            }
            else { return null; }
        }

        public bool IsReq(Request u)
        {
            throw new NotImplementedException();
        }
    }
    




    //public bool IsReq(Request u)       
    //{
    //    try
    //    {
    //    Request? t = projectdb.Requests.FirstOrDefault(p => p.RequestCode == u.RequestCode);

    //        if (t== null)
    //        {
    //            projectdb.Requests.Add(u);
    //            projectdb.SaveChanges();
    //            return true;
    //        }
    //        return false; 
    //    }
    //    catch
    //    {
    //        return false;
    //    }
    //}
    //public bool ChangeCalander(int id)
    //{
    //    Request y= projectdb.Requests.FirstOrDefault(m => m.RequestCode == id);
    //    y.calander
    //}

}




