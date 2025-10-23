using JunoBE.Common;
using JunoBE.Features.Properties.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace JunoBE.Features.Properties
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly PropertiesService _service;

        public PropertiesController(PropertiesService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationRequest paginationRequest)
        {
            return Ok(await _service.GET(paginationRequest));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertiesDto>> GetbyId([FromRoute] int id)
        {
            return Ok(await _service.GetPropertyByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreatePropertyDto createPropertyDto)
        {
            await _service.Create(createPropertyDto);
            return Ok();
        }
    }
}