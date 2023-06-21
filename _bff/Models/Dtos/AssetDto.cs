using Contentful.Core.Models;

namespace BFF.Models.Dtos
{
    public class AssetDto
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public AssetDto(Asset asset) {
            Title = asset.Title;
            Url = $"https:{asset.File.Url}";
            Description = asset.Description;
        }
    }
}
