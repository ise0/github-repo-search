'use client'
import { Header } from "@/components/header";
import { Box, Typography } from "@mui/material";
import { RepoList } from "@/components/repo-list";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/api";
import { useState } from "react";
import "./globals.scss"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default function Home() {
  const [search, setSearch] = useState('')

  return (
    <Provider store={store}>
      <Box height='100vh' minWidth='1400px' display="flex" flexDirection="column" >
        <Box minHeight={'76px'} />
        <Header value={search} onChange={(v) => setSearch(v)} />
        {search == '' ?
          <Typography m='auto' variant="h3" component="h2">Добро пожаловать</Typography> :
          <RepoList search={search} />
        }
        <Box bgcolor='#4F4F4F' minHeight='32px' width='100%'/>
      </Box>
    </Provider>
  );
}
