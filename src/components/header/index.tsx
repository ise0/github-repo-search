
import { AppBar, Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import styles from './styles.module.scss'

export function Header({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    const [search, setSearch] = useState(value)
    return (
        <AppBar sx={{ bgcolor: "#00838F" }}>
            <Container maxWidth='xl' sx={{ maxWidth: '1400px' }}>
                <Box my={2} display="flex" alignItems="center">
                    <TextField
                        className={styles['text-field']}
                        placeholder="Введите поисковый запрос"
                        variant="outlined"
                        size="small"
                        inputProps={{ sx: { height: '27px' } }}
                        sx={{ width: 912, bgcolor: "#F2F2F2", mr: 1, borderRadius: 1 }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') onChange(search)
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: "#2196F3" }}
                        onClick={() => onChange(search)}
                    >
                        Искать
                    </Button>
                </Box>
            </Container>
        </AppBar>
    )
}