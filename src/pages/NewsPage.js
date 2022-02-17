import React, { useEffect, useState } from "react";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../service/cryptoNewsApi";
import { Avatar, Card, Grid, Stack, Typography } from "@mui/material";
import Loader from "../components/Loader";

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const NewsPage = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const { data } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  useEffect(() => {
    setCryptoNews(data);
  }, [data]);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <div className={simplified ? "" : "news-page"}>
      {!simplified && (
        <Typography variant="h5" sx={{ mb: 2 }}>
          Latest News
        </Typography>
      )}
      <Grid container spacing={2}>
        {cryptoNews?.value?.map((news, i) => (
          <Grid item xs={12} sm={4} lg={4} key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <Card sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ mr: 0.5, fontWeight: "bold" }}
                  >
                    {news.name}
                  </Typography>
                  <img
                    style={{ height: "70px", width: "70px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </Stack>
                <Typography variant="body">
                  {news.description > 100
                    ? news.description.substring(0, 100)
                    : news.description}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Stack
                    direction="row"
                    justifycontent="center"
                    alignItems="center"
                  >
                    <Avatar
                      src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {news?.provider[0]?.name}
                    </Typography>
                  </Stack>
                  <Typography variant="caption">
                    {moment(news?.datePublished).startOf("ss").fromNow()}
                  </Typography>
                </Stack>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsPage;
