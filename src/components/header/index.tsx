
import { AppBar, Box, Button, Container, TextField } from "@mui/material";

export function Header({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    return <AppBar sx={{ bgcolor: "#00838F" }} position="sticky">
        <Container>
            <Box marginY={2} display="flex" alignItems="center" >
                <TextField
                    placeholder="Введите поисковый запрос"
                    variant="outlined"
                    size="small"
                    sx={{ width: 912, background: "white", marginRight: 1, overflow: "hidden", borderRadius: 1 }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button variant="contained" size="large" sx={{ bgcolor: "#2196F3" }}>Искать</Button>
            </Box>
        </Container>
    </AppBar>
}