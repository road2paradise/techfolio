using Contentful.Core;
using Microsoft.AspNetCore.Mvc;
using MyCoolWebAPI.Models;

namespace MyCoolWebAPI.Controllers
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
        public async Task<IEnumerable<SomeTestType>> Get()
        {
            var entries = await _contentfulClient.GetEntries<SomeTestType>();
            return entries.AsEnumerable<SomeTestType>();
        }
    }
}