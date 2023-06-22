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

        /*
         * Gets all the Introduction content type from Contentful
         */
        [HttpGet]
        [Route("/greetings")]
        public async Task<Greetings> GetGreetings()
        {
            return await _contentfulClient.GetEntry<Greetings>("6o2AtQmrWItIfpBquysZh2");
        }

        /*
         * Gets all the work experience content type from Contentful
         */
        [HttpGet]
        [Route("/work-experience")]
        public async Task<IEnumerable<WorkExperienceDto>> GetWorkExperience()
        {
            var entries = await _contentfulClient.GetEntries<WorkExperience>();
            var results = new List<WorkExperienceDto>();

            // This is how to deal with rich text, I loop through each entry
            // and convert the rich text field into html.
            foreach (var entry in entries)
            {
                if (string.IsNullOrEmpty(entry.JobTitle))
                {
                    continue;
                }
                var result = new WorkExperienceDto(entry);

                if (entry.Description != null)
                {
                    var htmlRenderer = new HtmlRenderer();
                    var html = await htmlRenderer.ToHtml(entry.Description);

                    if (!string.IsNullOrEmpty(html))
                    {
                        result.Description = (html);
                    }
                }
                results.Add(result);
            }

            return results;
        }

        /*
         * Gets all assets for the given contentful space.
         */
        [HttpGet]
        [Route("/assets")]
        public async Task<IEnumerable<AssetDto>> GetAssets()
        {
            var entries = await _contentfulClient.GetAssets();
            return entries.Select(s => new AssetDto(s)) ?? Enumerable.Empty<AssetDto>();
        }
    }
}