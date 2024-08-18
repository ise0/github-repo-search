
/**
 * Параметры запроса поиска репозиториев. 
 * 
 * @public
 */
export type QueryParams = {
    /** часть имени репозитория */
    query: string,
    /** Композиция этих полей используется для сортировки. 
     * При установке значения "none" в поле "column" сортировка не используется.  */
    sort: {
        column: 'none' | 'name' | 'forks' | 'stars' | 'updated',
        type: 'asc' | 'desc'
    }
    /** пагинация результата запроса */
    pagination: {
        /** Количество элементов на одной странице */
        perPage: number,
        /** Направление получения новой страницы относительно курсора.
         * Имеет смысл, только если поля курсов заполнены,
         * иначе будет получена первая страница запроса.   
         */
        page: 'next' | 'prev'
        /** Работает в связке с полем page  */
        startCursor?: string
        /** Работает в связке с полем page  */
        endCursor?: string
    }
}

/** Тело ответа успешно обработанного запроса Graphql  */
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

/**
 * Тип репозитория после парсинга ответа запроса 
 * 
 * @public
 */
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

/**
 * Ответ запроса поиска репозиториев после парсинга
 * 
 * @public
 */
export type GetRepositoriesRes = {
    pageInfo: {
        startCursor: string
        endCursor: string
    }
    count: number
    repositories: Repository[]
}