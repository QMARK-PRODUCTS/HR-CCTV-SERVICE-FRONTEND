import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FaEye } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Hls from "hls.js";

export default function CameraGrid({ cameras }) {
  const videoRefs = useRef([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  // Dummy Cast Details
  const castDetails = [
    {
      name: "John Doe",
      role: "Security Officer",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Supervisor",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Mark Wilson",
      role: "Technician",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Anna Johnson",
      role: "Analyst",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];
  useEffect(() => {
    const hlsInstances = [];

    cameras.forEach((source, index) => {
      if (videoRefs.current[index]) {
        const video = videoRefs.current[index];

        if (typeof source === "string") {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(source);
            hls.attachMedia(video);
            hlsInstances.push(hls);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = source;
          }
        } else if (source instanceof MediaStream) {
          video.srcObject = source;
        }
      }
    });

    return () => {
      hlsInstances.forEach((hls) => hls.destroy());
    };
  }, [cameras]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {cameras.map((url, index) =>
        fullScreenIndex === null || fullScreenIndex === index ? (
          <Grid
            item
            xs={fullScreenIndex === index ? 12 : 10}
            sm={fullScreenIndex === index ? 12 : 6}
            md={fullScreenIndex === index ? 12 : 4}
            key={index}
            sx={{
              transition: "all 0.3s ease-in-out",
              display:
                fullScreenIndex === null || fullScreenIndex === index
                  ? "block"
                  : "none",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: fullScreenIndex === index ? "95vh" : "250px",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => setFullScreenIndex(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                autoPlay
                muted
                playsInline
                controls={fullScreenIndex === index}
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                }}
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
              {/* Cast Details (Visible in Full-Screen Mode) */}
              {fullScreenIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.42)",
                    padding: "15px",
                    color: "#fff",
                    maxWidth: "300px",
                    borderBottomRightRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography variant="h6">Peoples</Typography>

                    {/* Eye Icon Button Showing Cast Count */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FaEye size={20} />
                      <Typography variant="body1">
                        {castDetails?.length}
                      </Typography>
                    </div>
                  </div>

                  {castDetails?.map((cast, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Avatar
                        src={cast.avatar}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <div>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          {cast.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "13px",  }}
                        >
                          {cast.role}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Grid>
        ) : null
      )}

      {/* Close Button when in Full-Screen Mode */}
      {fullScreenIndex !== null && (
        <IconButton
          onClick={() => setFullScreenIndex(null)}
          sx={{
            position: "absolute",
            top: 96,
            right: 33,
            color: "#fff",
            background: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            "&:hover": {
              background: "rgba(0,0,0,1)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>
      )}
    </Grid>
  );
}
