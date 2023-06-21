using BFF.Models.Contentful;

namespace BFF.Models.Dtos
{
    public class WorkExperienceDto
    {
        public string JobTitle { get; set; }
        public string CompanyName { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Description { get; set; }
        public WorkExperienceDto(WorkExperience workExperience) {
            JobTitle = workExperience.JobTitle;
            CompanyName = workExperience.CompanyName;
            Location = workExperience.Location;
            StartDate = workExperience.StartDate; 
            EndDate = workExperience.EndDate;
        }
    }
}
