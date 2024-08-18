import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GetRepositoriesRes, GetRepositoriesQueryRes, QueryParams, Repository } from './types'

export type { QueryParams, Repository, GetRepositoriesRes }

const getPostsQueryDoc = gql`
    query($first: Int, $last: Int, $before: String, $after: String, $query: String!) {
        search(first: $first, last: $last, query: $query, before: $before, after: $after, type:REPOSITORY) {
            pageInfo{
                startCursor
                endCursor
            }
            repositoryCount
            nodes{
                __typename
                ... on Repository {
                    id
                    nameWithOwner
                    stargazerCount
                    forkCount
                    updatedAt
                    primaryLanguage {
                        name
                    }
                    licenseInfo {
                        name
                    }
                    languages(first:100) {
                        nodes{
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: 'https://api.github.com/graphql',
        prepareHeaders: (headers) => {
            headers.append("Authorization", `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getRepositories: builder.query<
            GetRepositoriesRes,
            QueryParams
        >({
            query: ({ query, pagination, sort }) => ({
                document: getPostsQueryDoc,
                variables: {
                    first: pagination.page == 'next' ? pagination.perPage : undefined,
                    last: pagination.page == 'prev' ? pagination.perPage : undefined,
                    after: pagination.page == 'next' ? pagination.endCursor : undefined,
                    before: pagination.page == 'prev' ? pagination.startCursor : undefined,
                    query: query + ' in:name ' + (sort.column !== 'none' ? `sort:${sort.column}-${sort.type}` : '')
                },
            }),
            transformResponse(r: GetRepositoriesQueryRes) {
                const rs: Repository[] = r.search.nodes.map((v) => ({
                    id: v.id,
                    name: v.nameWithOwner,
                    primaryLang: v.primaryLanguage?.name || 'none',
                    langs: v.languages.nodes,
                    forks: v.forkCount,
                    stars: v.stargazerCount,
                    license: v.licenseInfo ? v.licenseInfo.name : 'Other',
                    updatedAt: v.updatedAt,
                }))
                return {
                    count: r.search.repositoryCount,
                    pageInfo: r.search.pageInfo,
                    repositories: rs
                }
            }
        }),
    }),
})

export const { useGetRepositoriesQuery } = api