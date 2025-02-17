using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.interfaces
{
    public interface IUserDal
    {
        public bool AddUser(User a);
        public User FindUser(string id, string Pass);

        //public List<User> SelectCity(Request t);
        public List<Request> SelctReq(Offer o);
        public List<Offer> SelctOffer(Request r);
        public User getbyid(string o);
        public User UpUser(User a);


    }
}
