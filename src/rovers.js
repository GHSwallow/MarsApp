export const getRoverNames = async () => {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.NASA_API_KEY}`
    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('getRoverNames response not ok')
            }
            return response.json()
        })
        .then((data) => {
            return data.rovers.map((rover) => rover.name.toLowerCase())
        })
}

export const getSpecificRoverData = async (roverName) => {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}?api_key=${process.env.NASA_API_KEY}`

    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error ('getSpecificRoverData response not ok')
            }
            return response.json()
        })
        .then((roverData) => ({
            id: roverData.rover.id,
            name: roverData.rover.name,
            landing_date: roverData.rover.landing_date,
            launch_date: roverData.rover.launch_date,
            status: roverData.rover.status,
            max_sol: roverData.rover.max_sol,
            max_date: roverData.rover.max_date,
            total_photos: roverData.rover.total_photos,
            cameras: roverData.rover.cameras.map((camera) => ({
                name: camera.name.toLowerCase(),
                full_name: camera.full_name,
            }))
        }))
}

export const getRoverPhotosByCamera = async (rover, camera) => {
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&camera=${camera}&api_key=${process.env.NASA_API_KEY}`

    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('getRoverPhotosByCamera response not ok')
            }
            return response.json()
        })
        .then((roverCameraFullData) =>
            roverCameraFullData.photos.map((photoWithMetaData) => ({
                img_src: photoWithMetaData.img_src,
                earth_date: photoWithMetaData.earth_date,
            })))
}