using BLL.DTO;
using BLL.func;
using BLL.interfaces;
using DAL1.func;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class offerController : ControllerBase
    {
        IofferBll offerBll;
        public offerController(IofferBll io)
        {
            offerBll = io;
        }
        [HttpPut]
        public ActionResult<bool> Put(OfferDTO oo)//עדכון
        {
            
            return Ok(offerBll.Put(oo));
        }
        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteOffer(int id)
        {
            return Ok(offerBll.DeleteOffer(id));
        }
        [HttpPost("UserCoderequest")]
        public ActionResult<OfferDTO> UserCodeR(int OCode, int RequestCode)
        {
            return Ok(offerBll.UserCodeR(OCode, RequestCode));
        }
        [HttpGet]

        public ActionResult<List<OfferDTO>> GetOffer(string id)
        {
            return Ok(offerBll.GetOffer(id));
        }
        [HttpPut("newoffer")]
        public ActionResult<bool> AddOffer(OfferDTO c)
        {
            return Ok(offerBll.AddOffer(c));
        }
        [HttpPut("calander")]
        public ActionResult<bool> ChangeCalander(int id)
        {
            return Ok(offerBll.ChangeCalander(id));
        }
        //[HttpPost("getmatchoffer")]
        //public ActionResult<OfferDTO> Getmatchoffer(OfferDTO e)
        //{
        //    return Ok(offerBll.Getmatchoffer(e));
        //}
    }
}