namespace BFF.Models.Contentful
{
    public class WebsiteBodyText
    {
        public string JobTitle { get; set; }
        public string Name { get; set; }
        public string WelcomeParagraph { get; set; }
        public List<string> Greetings { get; set; }

        public List<string> Quotes { get; set; }
    }
}
