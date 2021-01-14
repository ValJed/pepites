export default ({
  name,
  genre,
  content,
  img,
  socialLinks,
  videos,
  releases,
  events,
  createdAt
},
update = false,
newImg
) => {
  return {
    name,
    genre,
    content,
    img: newImg || img,
    socialLinks,
    videos,
    releases,
    events,
    ...!update ? { createdAt: new Date() } : { createdAt },
    updatedAt: new Date()
  }
}
