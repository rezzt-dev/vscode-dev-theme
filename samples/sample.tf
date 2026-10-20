# muestra de terraform para revisar el resaltado de dark dev
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

locals {
  tags = { Name = "dark-dev", Env = var.region }
}

resource "aws_s3_bucket" "site" {
  bucket = "dark-dev-${var.region}"
  count  = var.enabled ? 1 : 0
  tags   = merge(local.tags, { Extra = true })
}

output "arn" {
  value = aws_s3_bucket.site[0].arn
}
