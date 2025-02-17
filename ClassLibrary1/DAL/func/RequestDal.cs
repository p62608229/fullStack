
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
    public class RequestDal : IRequestDal
    {
        ProjectdbContext projectdb;
        public RequestDal(ProjectdbContext db)
        {

            projectdb = db;
        }

        public bool put(Request oo)
        {

            Request? o = getbyid(oo.RequestCode);
            try
            {
                if (o != null)
                {
                    o.RequestCode = oo.RequestCode;
                    o.OfferUserId = oo.OfferUserId;
                    //o.Date = oo.Date;
                    //o.Hour = oo.Hour;
                    o.Profession = oo.Profession;
                    o.AddressProfession = oo.AddressProfession;
                    o.Note = oo.Note;
                    o.CameThroughFriend = oo.CameThroughFriend;


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

public List<Request> GetRequest(int id)
        {

            return projectdb.Requests.ToList();
        }
        public bool AddRequest(Request c)
        {
            User? e = projectdb.Users.FirstOrDefault(y => y.Id == c.OfferUserId);
            {
                try

                {
                    if (e != null)
                    {
                        projectdb.Requests.Add(c);
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



