import { defineQuery } from "groq";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    hero,
    about,
    archive,
    contact,
    topbar,
    bottomBar
  }
`);

export const FEATURED_PROJECT_QUERY = defineQuery(`
  *[_type == "featuredProject"][0]{
    backgroundImage,
    recognitionImage,
    title,
    subtitle,
    description,
    linkText,
    linkUrl
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc){
    _id,
    title,
    order
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc){
    _id,
    title,
    thumbnail,
    externalUrl,
    order,
    "category": category->{ _id, title }
  }
`);

export const GALLERY_PHOTOS_QUERY = defineQuery(`
  *[_type == "galleryPhoto"] | order(order asc){
    _id,
    image,
    alt,
    order
  }
`);
