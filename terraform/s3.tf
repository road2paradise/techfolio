resource "aws_s3_bucket" "techfolio" {
  bucket = var.bucketName
}

resource "aws_s3_bucket_website_configuration" "techfolio-config" {
  bucket = aws_s3_bucket.techfolio.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "techfolio-policy" {
  bucket = aws_s3_bucket.techfolio.id

  policy = templatefile("s3-policy.json", { bucket = var.bucketName })
}