import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import {
  Grid,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import millify from "millify";

import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../service/cryptoApi";
import Loader from "../components/Loader";
import LineChart from "../components/LineChart";

const CryptoDetail = () => {
  const isLaptop = useMediaQuery("(min-width:769px)");
  let { cryptoId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(cryptoId);

  const [cryptoDetails, setCryptoDetails] = useState(data?.data?.coin);

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: cryptoId,
    timePeriod,
  });

  useEffect(() => {
    setCryptoDetails(data?.data?.coin);
  }, [data]);

  const handleTimeChange = (e) => {
    setTimePeriod(e.target.value);
  };

  if (isFetching) {
    return <Loader />;
  }
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.price && millify(Number(cryptoDetails?.price))
      }`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumbersOutlinedIcon />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails &&
        cryptoDetails["24hVolume"] &&
        millify(Number(cryptoDetails["24hVolume"]))
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(Number(cryptoDetails?.marketCap))
      }`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(Number(cryptoDetails.allTimeHigh.price))
      }`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AccountBalanceOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <PaidOutlinedIcon />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlinedIcon />
      ) : (
        <CloseOutlinedIcon />
      ),
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.supply?.total && millify(cryptoDetails.supply.total)
      }`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails.supply.circulating)
      }`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
  ];

  return (
    <div className="crypo-detail">
      <div className="crypto-detail-1">
        <Typography
          gutterBottom
          variant="h5"
          color="#1a1a40"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {cryptoDetails?.name} Price
        </Typography>
        <Typography gutterBottom sx={{ textAlign: "center", color: "gray" }}>
          {cryptoDetails?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </Typography>

        <FormControl
          size="small"
          sx={{
            width: "40%",
            maxWidth: "200px",
            backgroundColor: "white",
            mt: 2,
          }}
        >
          <InputLabel>Period</InputLabel>
          <Select value={timePeriod} label="Period" onChange={handleTimeChange}>
            {time.map((selectedTime, i) => (
              <MenuItem value={selectedTime} key={i}>
                {selectedTime}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={cryptoDetails?.price}
          coinName={cryptoDetails?.name}
        />
      </div>

      <Grid
        container
        spacing={4}
        sx={{
          mt: 3,
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} lg={6}>
          <Typography
            gutterBottom
            variant="h5"
            color="#1a1a40"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {cryptoDetails?.name} Value Statistics
          </Typography>
          <Typography gutterBottom sx={{ textAlign: "center", color: "gray" }}>
            An overview showing the stats of {cryptoDetails?.name}.
          </Typography>
          <Box
            sx={{
              width: "100%",
              minWidth: isLaptop ? "400px" : "",
            }}
          >
            <List>
              {stats.map(({ icon, title, value }) => (
                <ListItemButton divider={true} key={title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                  <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography
            gutterBottom
            variant="h5"
            color="#1a1a40"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Other Statistics
          </Typography>
          <Typography gutterBottom sx={{ textAlign: "center", color: "gray" }}>
            An overview showing other statistics.
          </Typography>
          <Box
            sx={{
              width: "100%",
              minWidth: isLaptop ? "400px" : "",
            }}
          >
            <List>
              {genericStats.map(({ icon, title, value }) => (
                <ListItemButton divider={true} key={title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                  <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
      <div className="crypto-details-3">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Typography
              gutterBottom
              variant="h5"
              color="#1a1a40"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              What is {cryptoDetails?.name}
            </Typography>
            {HTMLReactParser(
              cryptoDetails?.description ? cryptoDetails.description : ""
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography
              gutterBottom
              variant="h5"
              color="#1a1a40"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {cryptoDetails?.name} Links
            </Typography>
            {cryptoDetails?.links?.map((link, i) => (
              <div key={i}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {link.type}
                  </Typography>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    <Typography variant="subtitle1" color="primary">
                      {link.name}
                    </Typography>
                  </a>
                </Stack>
                <Divider />
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CryptoDetail;
