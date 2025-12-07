using JunoBE.Common;
using JunoBE.Common.Services;
using JunoBE.Data;
using JunoBE.Features.Properties.Dtos;
using JunoBE.Features.ProperyImage;
using Microsoft.EntityFrameworkCore;

namespace JunoBE.Features.Properties
{
    public class PropertiesService
    {
        private readonly AppDbContext _context;
        private readonly PropertiesMapper _propertiesMapper;

        private readonly PropertyimageService propertyimageService;

        public PropertiesService(AppDbContext context, PropertiesMapper propertiesMapper, PropertyimageService propertyimageService)
        {
            _context = context;
            _propertiesMapper = propertiesMapper;
            this.propertyimageService = propertyimageService;
        }

        public async Task Create(CreatePropertyDto createPropertyDto, string userId)
        {
            var propertyEntity = _propertiesMapper.ToEntity(createPropertyDto, userId);
            var result = await _context.properties.AddAsync(propertyEntity);
            await _context.SaveChangesAsync();

            await propertyimageService.UploadImages(result.Entity.Id, createPropertyDto.image);
        }

        public async Task<PropertiesDto?> GetPropertyByIdAsync(int propertyId, string userId)
        {
            return await _context.properties
            .Where(x => x.Id == propertyId)
            .Include(x=>x.address)
            .Include(x=>x.user)
            .Include(x=>x.propertiesImage)
            .Select(x => _propertiesMapper.ToDto(x, userId))
            .FirstOrDefaultAsync();
        }

        public async Task<PaginationResponse<List<PropertiesDto>>> GET(PaginationRequest paginationRequest, string userId)
        {

            var query = _context.properties.AsQueryable();

            if (!string.IsNullOrEmpty(paginationRequest.search))
            {
                query = query.Where(x => EF.Functions.ILike(x.address.city, $"%{paginationRequest.search}%"));
            }
            //-----todo tomorrow-----
            //add filter by homestatus and hometype
            if (!string.IsNullOrEmpty(paginationRequest.homestatus))
            {
                query = query.Where(x => x.homeStatus == paginationRequest.homestatus);
            }
            //add filter by creation date

            //filter by price
            if (!string.IsNullOrEmpty(paginationRequest.minimumPrice.ToString()) && !string.IsNullOrEmpty(paginationRequest.maximumPrice.ToString()))
            {
                query = query.Where(x => x.price >= paginationRequest.minimumPrice && x.price <= paginationRequest.maximumPrice)
                .OrderBy(x=>x.price);
            }

            //add filter by number of bedrooms
            if (!string.IsNullOrEmpty(paginationRequest.filterByBeds.ToString()))
            {
                query = query.Where(x => x.bedrooms == paginationRequest.filterByBeds);
            }

            
            var totalData = await query.CountAsync();

            //pagination
            query = query.Skip((paginationRequest.pageNumber - 1) * paginationRequest.pageSize).Take(paginationRequest.pageSize);

            var properties = await query
            .Include(x => x.address)
            .Include(x=>x.user)
            .Include(x=>x.bookmark)
            .Include(x => x.propertiesImage)
            .Select(x => _propertiesMapper.ToDto(x, userId))
            .ToListAsync();

            return new PaginationResponse<List<PropertiesDto>>(paginationRequest.pageNumber, paginationRequest.pageSize, totalData, properties);
        }

    }
}