using JunoBE.Common;
using JunoBE.Data;
using JunoBE.Features.Properties.Dtos;
using Microsoft.EntityFrameworkCore;

namespace JunoBE.Features.Properties
{
    public class PropertiesService
    {
        private readonly AppDbContext _context;
        private readonly PropertiesMapper _propertiesMapper;
        public PropertiesService(AppDbContext context, PropertiesMapper propertiesMapper)
        {
            _context = context;
            _propertiesMapper = propertiesMapper;

        }


        public async Task Create(CreatePropertyDto createPropertyDto)
        {
            var propertyEntity = _propertiesMapper.ToEntity(createPropertyDto);
            await _context.properties.AddAsync(propertyEntity);
            await _context.SaveChangesAsync();
        }

        public async Task<PropertiesDto> GetPropertyByIdAsync(int propertyId)
        {
            return await _context.properties
            .Where(x => x.Id == propertyId)
            .Select(x => _propertiesMapper.ToDto(x))
            .FirstAsync();
        }

        public async Task<PaginationResponse<List<PropertiesDto>>> GET(PaginationRequest paginationRequest)
        {

            var query = _context.properties.AsQueryable();

            if (!string.IsNullOrEmpty(paginationRequest.search))
            {
                query = query.Where(x => x.address.city == paginationRequest.search);
            }
            //-----todo tomorrow-----
            //add filter by homestatus and hometype
            //add filter by price- X
            //add filter by creation date

            //filter by price
            if (!string.IsNullOrEmpty(paginationRequest.minimumPrice.ToString()) && !string.IsNullOrEmpty(paginationRequest.maximumPrice.ToString()))
            {
                query = query.Where(x => x.price >= paginationRequest.minimumPrice && x.price <= paginationRequest.maximumPrice); 
            }

            //add filter by number of bedrooms
            if (!string.IsNullOrEmpty(paginationRequest.filterByBeds.ToString()))
            {
                query = query.Where(x => x.bedrooms == paginationRequest.filterByBeds);
            }

            //pagination
            query = query.Skip((paginationRequest.pageNumber - 1) * paginationRequest.pageSize).Take(paginationRequest.pageSize);

            var properties = await query
            .Include(x => x.address)
            .Select(x => _propertiesMapper.ToDto(x))
            .ToListAsync();

            return new PaginationResponse<List<PropertiesDto>>(paginationRequest.pageNumber, paginationRequest.pageSize, properties.Count(), properties);
        }
        
    }
}