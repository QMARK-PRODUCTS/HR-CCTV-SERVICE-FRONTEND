import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Hls from "hls.js";

export default function CameraGrid({ cameras }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    const hlsInstances = [];

    cameras.forEach((url, index) => {
      if (videoRefs.current[index]) {
        const video = videoRefs.current[index];

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
          hlsInstances.push(hls);

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS.js Error:", event, data);
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = url;
          video.addEventListener("loadedmetadata", () => {
            video.play().catch((err) => console.error("Auto-play error:", err));
          });
        }
      }
    });

    return () => {
      hlsInstances.forEach((hls) => hls.destroy());
    };
  }, [cameras]);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {cameras.map((url, index) => (
        <Grid item xs={10} sm={6} md={4} key={index}>
          <Card sx={{ width: "100%", height: "250px", position: "relative" }}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay
              muted
              playsInline
              width="100%"
              height="100%"
            />
            <Typography
              variant="subtitle2"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Camera {index + 1}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}