import { Box, Container, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { Repository } from "@/api";

function Langs({ langs }: { langs: Repository["langs"] }) {
    return (
        <Box display="flex" flexWrap="wrap" gap={1} marginTop={2}>
            {langs.map(el =>
                <Box key={el.id} display="inline-block" padding="3px 10px" bgcolor="lightgray" borderRadius={5}>
                    <Typography>{el.name}</Typography>
                </Box>
            )}
        </Box>
    )
}

export function RepoCard({ repo }: { repo?: Repository }) {
    return (
        <Box height="100%" width={480} bgcolor="#F2F2F2" >
            {repo &&
                <Container>
                    <Typography variant="h4" mt={4} sx={{wordBreak:'break-word'}}>{repo.name}</Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={2}>
                        <Box padding="7px 10px" bgcolor="#2196F3" borderRadius={5}>
                            <Typography color="white">{repo.primaryLang}</Typography>
                        </Box>
                        <StarIcon sx={{ color: "#FFB400", ml: "auto" }} />
                        <Typography marginLeft={0.5}>{repo.stars.toLocaleString()}</Typography>
                    </Box>

                    <Langs langs={repo.langs} />

                    <Typography marginTop={3}>{repo.license}</Typography>
                </Container>
            }
            {!repo &&
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography>Выберите репозиторий</Typography>
                </Box>
            }
        </Box>
    )
}