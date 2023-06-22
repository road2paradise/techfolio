using Contentful.Core.Models;

namespace BFF.Models.Dtos
{
    public class AssetDto
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public string Type { get; set; }

        public AssetDto(Asset asset) {
            Title = asset.Title;
            Url = $"https:{asset.File.Url}";
            Description = asset.Description;
            Type = asset.File.ContentType.Contains("pdf") ? (nameof(AssetType.Pdf)) : (nameof(AssetType.Image));
        }
    }
}