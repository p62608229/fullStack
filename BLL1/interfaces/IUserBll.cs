using BLL.DTO;
using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{

    public interface IUserBll
    {

        public bool AddUser(UserDTO a);

        public UserDTO FindUser(string id, string Pass);
        public bool SendEmail(OfferDTO r, UserDTO u);

        public UserDTO SelctUser(OfferDTO o);
        public List<RequestDTO> SelctReq(OfferDTO o);
        public List<OfferDTO> SelctOffer(RequestDTO r);
        public UserDTO UpUser(UserDTO a);
    }
}
