export default ({
  artist: {
    name,
    genre,
    rank,
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
    rank,
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
