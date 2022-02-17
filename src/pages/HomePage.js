import React from "react";
import { NavLink } from "react-router-dom";
import { Typography, Grid, Stack, Button } from "@mui/material";
import millify from "millify";

import { useGetCryptosQuery } from "../service/cryptoApi";
import "../style.css";
import CryptoPage from "./CryptoPage";
import NewsPage from "./NewsPage";
import Loader from "../components/Loader";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalCryptoStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <div className="home">
      <div className="home-section-1">
        <Typography variant="h5" sx={{ mb: 3 }}>
          Global Crypto Stats
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
        >
          <Grid item lg={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Total Cryptocurrencies
              </Typography>
              <Typography variant="h5">
                {millify(globalCryptoStats?.total)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Total Exchanges
              </Typography>
              <Typography variant="h5">
                {millify(globalCryptoStats?.totalExchanges)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Total Market Cap
              </Typography>
              <Typography variant="h5">
                {millify(globalCryptoStats?.totalMarketCap)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Total 24h Volume
              </Typography>
              <Typography variant="h5">
                {millify(globalCryptoStats?.total24hVolume)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item lg={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Total Markets
              </Typography>
              <Typography variant="h5">
                {millify(globalCryptoStats?.totalMarkets)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <div className="home-section-2">
        <Stack
          sx={{ mb: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">
            Top 10 Cryptocurrencies In The World
          </Typography>
          <NavLink to="/cryptocurrencies">
            <Button variant="text">Show More</Button>
          </NavLink>
        </Stack>

        <CryptoPage simplified />
      </div>
      <div className="home-section-3">
        <Stack
          sx={{ mb: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Latest Crypto News</Typography>
          <NavLink to="/news">
            <Button variant="text">Show More</Button>
          </NavLink>
        </Stack>

        <NewsPage simplified />
      </div>
    </div>
  );
};

export default HomePage;
