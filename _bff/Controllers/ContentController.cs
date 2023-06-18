using Contentful.Core;
using Microsoft.AspNetCore.Mvc;
using BFF.Models;

namespace BFF.Controllers
{
    [Route("api/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly IContentfulClient _contentfulClient;
        public ContentController(IContentfulClient contentfulClient) { 
            _contentfulClient = contentfulClient;
        }

        [HttpGet]
        public async Task<IEnumerable<Introduction>> Get()
        {
            var entries = await _contentfulClient.GetEntriesByType<Introduction>(nameof(Introduction).ToLowerInvariant());
            return entries.AsEnumerable<Introduction>();
        }
    }
}