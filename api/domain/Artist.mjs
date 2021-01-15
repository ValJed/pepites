export default ({
  artist: {
    name,
    genre,
    content,
    img,
    socialLinks,
    videos,
    releases,
    events
  },
  update = false,
  newImg
}) => {
  return {
    name,
    genre,
    content,
    img: newImg || img,
    socialLinks,
    videos,
    releases,
    events,
    ...!update && { createdAt: new Date() },
    updatedAt: new Date()
  }
}
