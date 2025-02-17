using BLL.DTO;
using BLL.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class nameController : ControllerBase
    {
        InameBll nameBll;

        public nameController(InameBll cbll)
        {
           nameBll = cbll;
        }


        [HttpGet]
        public ActionResult<List<CommentDTO>> get()
        {
            return Ok(nameBll.GetUsers());
        }

    }

}
