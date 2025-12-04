using JunoBE.Common;
using JunoBE.Common.Authorization;
using JunoBE.Features.Properties.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunoBE.Features.Properties
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly PropertiesService _service;
        private readonly CurrentUser _currentUser;

        public PropertiesController(PropertiesService service, CurrentUser currentUser)
        {
            _service = service;
            _currentUser = currentUser;
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationRequest paginationRequest)
        {
            return Ok(await _service.GET(paginationRequest));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertiesDto>> GetbyId([FromRoute] int id)
        {
            var property = await _service.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound();
            }
            return Ok(property);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromForm] CreatePropertyDto createPropertyDto)
        {
            await _service.Create(createPropertyDto, _currentUser.getUserId());
            return Ok();
        }
    }
}