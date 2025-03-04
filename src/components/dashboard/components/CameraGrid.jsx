import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Hls from "hls.js";

export default function CameraGrid({ cameras }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    const hlsInstances = [];

    cameras.forEach((source, index) => {
      if (videoRefs.current[index]) {
        const video = videoRefs.current[index];

        if (typeof source === "string") {
          // Handle HLS Streams
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            hlsInstances.push(hls);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = source;
            video.addEventListener("loadedmetadata", () => {
              video.play().catch((err) => console.error("Auto-play error:", err));
            });
          }
        } else if (source instanceof MediaStream) {
          // Handle WebCam Stream
          video.srcObject = source;
          video.play().catch((err) => console.error("Webcam play error:", err));
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
              {typeof url === "string" ? `Camera ${index + 1}` : "Webcam"}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}