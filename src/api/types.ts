export type Repository = {
    id: string
    name: string
    primaryLang: string
    langs: { id: string, name: string }[]
    forks: number
    stars: number
    license: string
    updatedAt: string
}

export type QueryParams = {
    query: string,
    sort: {
        column: 'none' | 'name' | 'forks' | 'stars' | 'updated',
        type: 'asc' | 'desc'
    }
    pagination: {
        perPage: number,
        page: 'next' | 'prev'
        startCursor?: string
        endCursor?: string
    }
}

export type GetRepositoriesQueryRes = {
    search: {
        pageInfo: {
            startCursor: string
            endCursor: string
        }
        repositoryCount: number
        nodes: {
            id: string
            nameWithOwner: string
            stargazerCount: number
            forkCount: number
            updatedAt: string
            primaryLanguage: {
                name: string
            }
            licenseInfo: {
                name: string
            }
            languages: {
                nodes: {
                    id: string
                    name: string
                }[]
            }
        }[]
    }
}

export type GetRepositoriesRes = {
    pageInfo: {
        startCursor: string
        endCursor: string
    }
    count: number
    repositories: Repository[]
}