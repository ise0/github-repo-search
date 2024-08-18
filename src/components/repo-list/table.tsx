import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { PropsWithChildren } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { QueryParams, Repository } from "@/api";

type Order = QueryParams['sort'] 

type OrderBtnProps = PropsWithChildren<{
    order: Order, column: Order['column'], onOrderChange: (order: Order) => void
}>

function OrderBtn({ order, children, column, onOrderChange }: OrderBtnProps) {
    let icon
    if (order.column == column) {
        icon = order.type == 'asc' ?
            <ArrowUpwardIcon /> : <ArrowDownwardIcon />
    }

    return (
        <Button
            onClick={() => {
                const newValue = { ...order }
                if (order.column == column) {
                    newValue.type = order.type == 'asc' ? 'desc' : 'asc'
                } else {
                    newValue.type = 'desc'
                    newValue.column = column

                }
                onOrderChange(newValue)
            }}
            startIcon={icon}
            variant="text"
            color="inherit"
            sx={{ textTransform: 'none' }}
        >
            {children}
        </Button>
    )
}

type Props = {
    rows: Repository[],
    order: Order,
    onOrderChange: (order: Order) => void,
    onRepoClick: (repo: Repository) => void
}

export function RepoTable({ rows, order, onOrderChange, onRepoClick }: Props) {
    return (
        <Table sx={{ width: 912, position: 'relative', height: '100%', minHeight: '400px' }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell width='27%'><OrderBtn order={order} column="name" onOrderChange={onOrderChange}>Название</OrderBtn></TableCell>
                    <TableCell width='16%'>Язык</TableCell>
                    <TableCell width='19%'><OrderBtn order={order} column="forks" onOrderChange={onOrderChange}>Число форков</OrderBtn></TableCell>
                    <TableCell width='17%'><OrderBtn order={order} column="stars" onOrderChange={onOrderChange}>Число звезд</OrderBtn></TableCell>
                    <TableCell width='20%'><OrderBtn order={order} column="updated" onOrderChange={onOrderChange}>Дата добавления</OrderBtn></TableCell>
                </TableRow>
            </TableHead>
            <TableBody sx={{ position: 'absolute', width: '100%', height: 'calc(100% - 68.79px)', overflowY: 'auto' }}>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={() => onRepoClick(row)}
                    >
                        <TableCell sx={{ wordBreak: 'break-word' }} width='27%' component="th" scope="row">{row.name}</TableCell>
                        <TableCell width='16%'>{row.primaryLang}</TableCell>
                        <TableCell width='19%' align="center">{row.forks}</TableCell>
                        <TableCell width='17%' align="center">{row.stars}</TableCell>
                        <TableCell width='20%' align="right">{row.updatedAt}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}