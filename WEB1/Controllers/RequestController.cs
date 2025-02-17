using BLL.DTO;
using BLL.func;
using BLL.interfaces;
using DAL1.func;
using DAL1.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        IRequestBll requestbll;
        public RequestController(IRequestBll req)
        {
            requestbll = req;
        }
        [HttpPut]
        public ActionResult<bool> putreq(RequestDTO oo)
        {
            
          
            
            return Ok(requestbll.putreq(oo));

        }
        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteRequest(int id)
        {
            return Ok(requestbll.DeleteRequest(id));
        }
        [HttpGet]

        public ActionResult<List<RequestDTO>> GetRequest(string id)
        {
            return Ok(requestbll.GetRequest(id));
        }
        [HttpPut("new")]
        public ActionResult<bool> AddRequest(RequestDTO c)
        {
            return Ok(requestbll.AddRequest(c));

        }
        [HttpPost("UserCodeOffer")]
        public ActionResult <RequestDTO>UserCodeO (int RCode, int offerCode)
            {
            return Ok(requestbll.UserCodeO(RCode, offerCode));
        }
        [HttpGet("GetByUserId")]

        public ActionResult<List<RequestDTO>> GetByUserId(string userid)
        {
            return Ok(requestbll.GetByUserId(userid));
        }
        //[HttpPost("IsReq")]
        //public ActionResult<bool> IsReq(RequestDTO u)
        //{
        //    return Ok(requestbll.IsReq(u));
        //}
    }
}
