using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JunoBE.Common;
using JunoBE.Data;
using JunoBE.Features.Properties;
using JunoBE.Features.Properties.Dtos;
using Microsoft.EntityFrameworkCore;

namespace JunoBE.Features.Bookmarks
{
    public class BookmarkService
    {
        private readonly AppDbContext _context;
        private readonly PropertiesMapper _propertiesMapper;

        public BookmarkService(AppDbContext context, PropertiesMapper propertiesMapper)
        {
            _context = context;
            _propertiesMapper = propertiesMapper;
        }

        public async Task<PaginationResponse<List<PropertiesDto>>> GetUserBookmarkedProperties(PaginationRequest pagination, string userId)
        {
            var totalProperties = await _context.bookmarks.Where(x => x.UserEntityId == userId).CountAsync();
            var query = _context.properties.AsQueryable();

            query = query.Skip((pagination.pageNumber - 1) * pagination.pageSize);

            var properties = await query.Where(x => x.bookmark.Any(a => a.UserEntityId == userId))
            .Include(x => x.user)
            .Include(x => x.address)
            .Include(x=>x.bookmark)
            .Include(x => x.propertiesImage)
            .Select(x => _propertiesMapper.ToDto(x, userId))
            .ToListAsync();

            return new PaginationResponse<List<PropertiesDto>>(pagination.pageNumber, pagination.pageSize, totalProperties, properties);
        }

        public async Task CreateBookmark(int propertyId, string userId)
        {
            BookmarkEntity bookmark = new BookmarkEntity
            {
                PropertyEntityId = propertyId,
                UserEntityId = userId
            };

            await _context.bookmarks.AddAsync(bookmark);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int propertyId, string userId)
        {
            var bookmark = await _context.bookmarks.Where(x => x.PropertyEntityId == propertyId && x.UserEntityId == userId).FirstAsync();
            if (bookmark != null)
            {
                _context.bookmarks.Remove(bookmark);
                await _context.SaveChangesAsync();
            }
        }
    }
}