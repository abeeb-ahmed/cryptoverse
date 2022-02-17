import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Stack,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useGetCryptosQuery } from "../service/cryptoApi";
import "../style.css";
import millify from "millify";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";

const CryptoPage = ({ simplified }) => {
  const isLaptop = useMediaQuery("(min-width:769px)");

  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // Filter coins according to search input
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredCryptos = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCrypto.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [cryptosList, searchCrypto]);

  if (isFetching) return <Loader />;

  return (
    <div className={simplified ? "crpto-page-simplified" : "crypto-page"}>
      {!simplified && (
        <Stack justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            sx={{ width: isLaptop ? "50%" : "100%", backgroundColor: "white" }}
            onChange={(e) => setSearchCrypto(e.target.value)}
          />
        </Stack>
      )}

      <Grid container spacing={2}>
        {cryptos?.map((crypto, i) => (
          <Grid item xs={12} sm={4} lg={3} key={i}>
            <NavLink to={`/cryptocurrencies/${crypto.uuid}`}>
              <Card sx={{ cursor: "pointer", minHeight: "200px" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {crypto.rank}. {crypto.name}
                    </Typography>
                    <img
                      style={{ height: "20px", width: "20px" }}
                      src={crypto.iconUrl}
                      alt=""
                    />
                  </Stack>
                  <Divider variant="li" />
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <Typography>Price: ${millify(crypto.price)}</Typography>
                    <Typography>
                      Market Cap: {millify(crypto.marketCap)}
                    </Typography>
                    <Typography>
                      Daily Change: {millify(crypto.change)}%
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CryptoPage;
