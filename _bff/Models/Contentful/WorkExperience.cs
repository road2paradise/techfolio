using Contentful.Core.Models;

namespace BFF.Models.Contentful
{
    public class WorkExperience
    {
        public string JobTitle { get; set; }
        public string CompanyName { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Document Description { get; set; }
    }
}
