const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

const fetchAPI = async ( path, options = {} ) => { 
    try {

        const response = await fetch(`${baseURL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        })
        
        if (!response.ok) {
            const error = await response.text()
            throw new Error (`${response.status} - ${error}` || 'API request failed')
        }
        return response.json()
    } catch (error) {
        console.error(error.message)
    }
}

export function getAllProducts( queryOptions = {} ) {

    let filteredQueryObject = {}

    const fullQuery = new URLSearchParams(queryOptions)
    for (const [key, value] of fullQuery.entries()) {
        if (value !== '' && value != null) {
            filteredQueryObject = { ...filteredQueryObject, [key]: value }
        }
    }

    const filteredQueryPath = new URLSearchParams(filteredQueryObject).toString()
    
    const path = `/store` + (filteredQueryPath ? `?${filteredQueryPath}` : '')
    console.log(path)
    return fetchAPI(path)
}

export function getSingleProduct(id) {
    return fetchAPI(`/store/${id}`)
}

export function getProductCategories(){
    return fetchAPI('/store/categories')
}

export function getAllGenres() {
    return fetchAPI('/genres')
}

export function getPodcastNames() {
    return fetchAPI('/podcasts/simple-list')
}

export function getAllTeamMembers() {
    return fetchAPI('/team')
}

export function getStaffPicks() {
    return fetchAPI('/team/staff-picks')
}

export function getAllPodcasts( queryOptions = {} ) {
    let filteredQueryObject = {}
    
    const fullQuery = new URLSearchParams(queryOptions)
    for (const [key, value] of fullQuery.entries()) {
        if (value !== '' && value != null) {
            filteredQueryObject = { ...filteredQueryObject, [key]: value }
        }
    }
    
    const filteredQueryPath = new URLSearchParams(filteredQueryObject).toString()
    
    const path = `/podcasts` + (filteredQueryPath ? `?${filteredQueryPath}` : '')
    console.log(path)
    return fetchAPI(path)
}

export function getSinglePodcast(id) {
    return fetchAPI(`/podcasts/${id}`)
}

export function getRandomByGenre(genre) {
    if (!genre) { 
        throw new Error ("Genree is required")
    }
    const path = `/podcasts/random?genre=${genre}`
    return fetchAPI(path)
}

export function getAllPodcastEpisodes(id, queryOptions = {}) {
    let filteredQueryObject = {}

    const fullQuery = new URLSearchParams(queryOptions)
    for (const [key, value] of fullQuery.entries()) {
        if (value !== '' && value != null) {
            filteredQueryObject = { ...filteredQueryObject, [key]: value }
        }
    }

    const filteredQueryPath = new URLSearchParams(filteredQueryObject).toString()
    
    const path = `/podcasts/${id}/episodes` + (filteredQueryPath ? `?${filteredQueryPath}` : '')
    console.log(path)
    return fetchAPI(path)
}

export function getNewestEpisodes() {
    return fetchAPI(`/episodes/newest`)
}

export function getSingleEpisode(id) {
    return fetchAPI(`/episodes/${id}`)
}

export function getSingleEpisodeTranscript(id) {
    return fetchAPI(`/episodes/${id}/transcript`)
}