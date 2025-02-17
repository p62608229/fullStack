using DAL1.interfaces;
using DAL1.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL1.func.UserDal;

namespace DAL1.func
{
    public class UserDal : IUserDal
    {
        ProjectdbContext db;

        public UserDal(ProjectdbContext Db)
        {
            db = Db;
        }
        public bool AddUser(User a)
        {
            try
            {
                User? u = db.Users.FirstOrDefault((z) => z.Id == a.Id);
                if (u == null)
                {
                    db.Users.Add(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
            }
    
        //public User SelctUser(Offer o)
        //{
        //    User? r = db.Users.FirstOrDefault(t => t.Id == o.OfferUserId);
        //    try
        //    {


        //        if (r != null)
        //        {
        //            return r;
        //        }
        //        return null;

        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}
        public User getbyid(string id)
        {
            User? r = db.Users.FirstOrDefault(t => t.Id == id);
            try
            {


                if (r != null)
                {
                    return r;
                }
                return null;

            }
            catch
            {
                return null;
            }
        }
        public List<Offer> SelctOffer(Request r)
        {
            try
            {
                List<Offer>? e = db.Offers.Include(a=> a.DaysToworks).Include(a => a.OfferUser).Where(w => w.Profession == r.Profession).ToList();
                if (e != null)
                {
                    return e;

                }

                return null;
            }
            catch
            {
                return null;
            }
        }
        public List<Request> SelctReq(Offer o)
        {

            try
            {
                List<Request>? r = db.Requests.Include(async => async.RequestUser).Where(t => t.Profession == o.Profession).ToList();

                if (r != null)
                {
                    return r;
                }
                return null;
            }

            catch
            {
                return null;
            }



        }



        public User? FindUser(string id, string Pass)
        {
            try
            {
                User? u = db.Users.FirstOrDefault((u) => u.Id == id);
                if (u != null && u.Password == Pass)
                {
                    return u;
                }
                return null;
            }
            catch
            {
                return null;
            }


        }

        public User UpUser(User a)
        {
            User? o = getbyid(a.Id);
            try
            {
                if (o != null)
                {
                    o.Id = a.Id;
                    o.Address = a.Address;
                    o.Password = a.Password;
                    o.City = a.City;
                    o.FirstName = a.FirstName;
                    o.LastName = a.LastName;
                    o.HouseNumber = a.HouseNumber;
                    o.Phone = a.Phone;
                    o.Postalcode = a.Postalcode;
                    o.Mail = a.Mail;


                    db.SaveChanges();

                    return a;
                }
                return null;
            }
            catch
            {
                return null;

            }
        }

        
            
    }
}



