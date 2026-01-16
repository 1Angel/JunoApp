using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JunoBE.Common;
using JunoBE.Common.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunoBE.Features.Bookmarks
{
    [ApiController]
    [Authorize]
    [Route("api/")]
    public class BookmarkController: ControllerBase
    {
        private readonly BookmarkService _bookmarkService;
        private readonly CurrentUser _currentUser;

        public BookmarkController(BookmarkService bookmarkService, CurrentUser currentUser)
        {
            _bookmarkService = bookmarkService;
            _currentUser = currentUser;
        }

        [HttpGet("properties/bookmarks")]
        public async Task<ActionResult> GetUserBookmarkedProperties([FromQuery] PaginationRequest pagination)
        {
            return Ok(await _bookmarkService.GetUserBookmarkedProperties(pagination, _currentUser.getUserId()));
        }

        [HttpPost("properties/{propertyId}/bookmarks")]
        public async Task<ActionResult> CreateBookmark([FromRoute] int propertyId)
        {
            await _bookmarkService.CreateBookmark(propertyId, _currentUser.getUserId());
            return Ok();
        }

        [HttpDelete("properties/{propertyId}/bookmarks")]
        public async Task<ActionResult> DeleteBookmark([FromRoute] int propertyId)
        {
            await _bookmarkService.Delete(propertyId, _currentUser.getUserId());
            return Ok();
        }

        [HttpPost("properties/{propertId}/toggle-bookmark")]
        public async Task<ActionResult> toggleBookmark([FromRoute] int propertId)
        {
            await _bookmarkService.toggleBookmark(propertId, _currentUser.getUserId());
            return Ok();
        }
    }
}