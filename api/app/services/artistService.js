
module.exports = ({
  // usersRepo,
  artistRepo,
  imageRepo,
  // uploadConfig,
  // cloud,
  // drive,
  encrypt,
  jwt,
  log
}) => {
  const getArtists = async (id) => {
    const projects = await artistRepo.findAll()

    if (!id) {
      return projects
    }

    const project = projects
      .find(project => project._id.toString() === id)

    return {
      project,
      projects: projects.filter(project => !project.isAbout)
    }
  }

  const addArtist = async (projectData) => {
    const project = ProjectEntity(projectData)

    const createdProject = await artistRepo.createArtist(project)

    if (!createdProject.result.ok) {
      throw new Error('Project couldn\'t have been created')
    }

    return {
      _id: createdProject.insertedId,
      ...project
    }
  }

  return {
    getArtists,
    addArtist
  }
}
