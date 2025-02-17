using BLL.DTO;
using BLL.interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        IUserBll UserBll;

        public UserController(IUserBll IU)
        { UserBll = IU; }

        [HttpPut]
        
        public ActionResult<bool> AddUser(UserDTO a) {
            return Ok(UserBll.AddUser(a));
    }


    [HttpGet("{i}/{P}")]
        public ActionResult<UserDTO> FindUser(string i, string P)
        {

            return Ok(UserBll.FindUser(i, P));

        }
        [HttpPost("searchrequest") ]

        public ActionResult <List<RequestDTO>> SelctReq (OfferDTO o)
        {
            return Ok(UserBll.SelctReq(o));                                                     
        }
        [HttpPost("searchoffer")]

        public ActionResult<List<OfferDTO>> SelctOffer(RequestDTO o)
        {
            return Ok(UserBll.SelctOffer(o));
        }
        [HttpPost("UpUsers")]
        public ActionResult<UserDTO> UpUser(UserDTO a)
        {
            return Ok(UserBll.UpUser(a));
        

        }
        //[HttpGet]

        //public ActionResult<List<OfferDTO>> SelctOffer(OfferDTO t)
        //{
        //    return Ok(UserBll.SelctOffer(t));
        //}
    }
}
//public List<RequestDTO> SelctReq(OfferDTO o);
//public List<OfferDTO> SelctOffer(RequestDTO r);