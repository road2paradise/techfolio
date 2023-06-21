using Contentful.Core;
using Microsoft.AspNetCore.Mvc;
using BFF.Models.Contentful;
using Microsoft.AspNetCore.Http.Extensions;
using Contentful.Core.Models;
using BFF.Models.Dtos;

namespace BFF.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContentController : ControllerBase
    {
        private readonly IContentfulClient _contentfulClient;
        public ContentController(IContentfulClient contentfulClient) { 
            _contentfulClient = contentfulClient;
        }

        [HttpGet]
        [Route("/introduction")]
        public async Task<IEnumerable<Introduction>> Get()
        {
            var entries = await _contentfulClient.GetEntries<Introduction>();
            return entries.AsEnumerable<Introduction>();
        }

        [HttpGet]
        [Route("/work-experience")]
        public async Task<IEnumerable<WorkExperienceDto>> GetWorkExperience()
        {
            var entries = await _contentfulClient.GetEntries<WorkExperience>();
            var results = new List<WorkExperienceDto>();

            foreach (var entry in entries)
            {
                var result = new WorkExperienceDto(entry);

                if (entry.Description != null)
                {
                    var htmlRenderer = new HtmlRenderer();
                    var htmlString = await htmlRenderer.ToHtml(entry.Description);

                    if (!string.IsNullOrEmpty(htmlString))
                    {
                        result.Description = (htmlString);
                    }
                }
                results.Add(result);
            }

            return results;
        }
    }
}