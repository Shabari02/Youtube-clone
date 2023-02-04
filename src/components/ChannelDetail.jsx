import { useState, useEffect } from "react";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/fetchApi";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Videos from "./Videos";

const ChannelDetail = () => {
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}&`).then((data) =>
      setChannelDetail(data.items[0])
    );

    fetchFromAPI(
      `search?channelId=${id}&part=snippet&maxResults=50&order=date`
    ).then((data) => setVideo(data.items));
  }, [id]);

  return (
    <Box sx={{ minHeight: "95vh" }}>
      <Box>
        <div
          style={{
            height: "300px",
            zIndex: "5",
            background:
              "linear-gradient(127deg, rgba(110,35,23,1) 0%, rgba(223,38,38,1) 100%)",
          }}
        ></div>

        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box sx={{ display: "flex", p: 2 }}>
        <Box>
          <Videos videos={video} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
