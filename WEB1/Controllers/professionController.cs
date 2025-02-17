using BLL.DTO;
using BLL.func;
using BLL.interfaces;
using BLL1.func;
using BLL1.interfaces;
using DAL1.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class professionController : ControllerBase
    {
        IprofessionBll professionbll;

        public professionController(IprofessionBll cbll)
        {
            professionbll = cbll;
        }
        [HttpGet]


        public ActionResult<List<ProfessionDTO>> Getprofession()
        {
            return Ok(professionbll.Getprofession());
        }
    }
}
    
    

