using BLL.DTO;
using BLL.func;
using BLL.interfaces;
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
        [HttpPost]
        public ActionResult<bool> put(OfferDTO oo)
        {
            return Ok(offerBll.put(oo));
        }
        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteOffer (int id)
        {
            return Ok(offerBll.DeleteOffer(id));
        }
        [HttpGet]

        public ActionResult<List<OfferDTO>> GetOffer(int id)
        {
            return Ok(offerBll.GetOffer(id));
        }
        [HttpPut]
        public ActionResult<bool> PutOffer(OfferDTO c) 
        { 
            return Ok(offerBll.AddOffer(c));
        }
    }
}
