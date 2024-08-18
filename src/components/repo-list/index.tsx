import { Box, Button, CircularProgress, Container, TablePagination, Typography } from "@mui/material"
import { RepoTable } from "./table"
import { RepoCard } from "./repo-card"
import { useEffect, useState } from "react"
import { QueryParams, Repository, useGetRepositoriesQuery } from "@/api"

/**
 *  Компонент реализующий запрос поиска репозиториев и отображающий его результат.
 *  @param search параметр принимающий часть имени репозитория для запроса поиска репозиториев 

 *  @public
 */
export function RepoList({ search }: { search: string }) {
    const [currentRepo, setCurrentRepo] = useState<Repository>()
    const [currentPage, setCurrentPage] = useState(0)
    const [queryParams, setQueryParams] = useState<QueryParams>({
        query: search,
        pagination: { perPage: 10, page: 'next' },
        sort: { column: 'none', type: 'desc' }
    })

    const query = useGetRepositoriesQuery(queryParams)

    useEffect(() => {
        setQueryParams((v) => ({
            ...v,
            query: search,
            pagination: { page: 'next', perPage: v.pagination.perPage }
        }))
        setCurrentPage(0)
    }, [search])

    if (query.isError) {
        return (
            <Box height='100%' display='flex' alignItems='center' justifyContent='center'>
                <Typography variant="h4" mr={2}>{'Что-то пошло не так :('}</Typography>
                <Button variant="outlined" size="large" onClick={() => query.refetch()}>Повторить</Button>
            </Box>
        )
    }

    return (
        <Box position="relative" height="100%" minWidth={1400}>
            {query.isFetching &&
                <Box position='absolute' height='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                    <CircularProgress size={100} />
                </Box>
            }
            <Container sx={{ height: "100%", maxWidth: '1400px' }} maxWidth='xl'>
                <Box width={912} height="100%" display="flex" flexDirection="column">
                    <Typography variant="h2" component="h2" marginTop={3}>
                        Результаты поиска
                    </Typography>
                    {query.data &&
                        <RepoTable
                            rows={query.data.repositories}
                            onRepoClick={(repo) => setCurrentRepo(repo)}
                            onOrderChange={(order) => {
                                setQueryParams((v) => ({
                                    ...v,
                                    sort: order,
                                    pagination: { page: 'next', perPage: v.pagination.perPage }
                                }))
                                setCurrentPage(0)
                            }}
                            order={queryParams.sort} />
                    }
                    <TablePagination
                        sx={{ mt: 3, minHeight: '52px' }}
                        component="div"
                        count={query.data?.count || 0}
                        page={currentPage}
                        onPageChange={(_, newPage) => {
                            setQueryParams((v) => ({
                                ...v,
                                pagination: {
                                    page: currentPage < newPage ? 'next' : 'prev',
                                    perPage: v.pagination.perPage,
                                    endCursor: query.data?.pageInfo.endCursor,
                                    startCursor: query.data?.pageInfo.startCursor
                                }
                            }))
                            setCurrentPage(newPage)
                        }}
                        rowsPerPage={queryParams.pagination.perPage}
                        onRowsPerPageChange={(e) => {
                            setQueryParams((v) => ({
                                ...v,
                                pagination: { page: 'next', perPage: +e.target.value }
                            }))
                            setCurrentPage(0)
                        }}
                    />
                    <Box position="absolute" right={0} top={0} display="flex" height="100%">
                        <RepoCard repo={currentRepo} />
                    </Box>
                </Box>
            </Container>
        </Box >
    )
}