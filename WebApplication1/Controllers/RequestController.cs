using BLL.DTO;
using BLL.func;
using BLL.interfaces;
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
        [HttpPost]
        public ActionResult<bool> put(RequestDTO oo)
        {
            return Ok(requestbll.put(oo));
               
        }
        [HttpDelete("{id}")]
        public ActionResult<bool> DeleteRequest(int id)
        {
            return Ok(requestbll.DeleteRequest(id));
        }
        [HttpGet]

        public ActionResult<List<RequestDTO>> GetRequest(int id)
        {
            return Ok(requestbll.GetRequest(id));
        }
        [HttpPut]
        public ActionResult<bool> PutRequest(RequestDTO c) 
        {
            return Ok(requestbll.AddRequest(c));
    }
}

    }

