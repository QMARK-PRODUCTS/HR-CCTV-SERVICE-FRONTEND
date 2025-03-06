import { Box, Typography, Container } from "@mui/material";
import React from "react";

function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          maxWidth: { sm: "100%", md: "1700px" },
          p: { xs: 2, md: 4 },
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 5,
            mt: 5,
            background: "linear-gradient(to right,rgb(103, 107, 114) 52%, white 50%)", 
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Us
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            textAlign: "justify",
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          Previously known as Qmark Technolabs, Qmark is a startup founded in
          2022. With experience in diverse sectors such as Healthcare,
          Education, Real Estate, and Food & Beverages, among others, we are
          committed to creating impactful solutions that address industry
          challenges.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            textAlign: "justify",
            maxWidth: "900px",
            mx: "auto",
            mt: 2,
          }}
        >
          Today, we operate in four key verticals:{" "}
          <b>Qmark AI & Robotics, Qmark IT, Qmark Communications,</b> and{" "}
          <b>Qmark Learning.</b> Each vertical is driven by our dedication to
          delivering high-quality, tailored services that empower businesses and
          drive meaningful progress.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            textAlign: "justify",
            maxWidth: "900px",
            mx: "auto",
            mt: 2,
          }}
        >
          Our passion for research, development, and innovation allows us to
          craft solutions that not only solve today’s challenges but also help
          shape the future of industries worldwide. Whether it’s through
          cutting-edge AI and robotics, transformative IT solutions, or
          impactful learning and communication services, we strive to deliver
          value that leaves a lasting impact on our clients and communities.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            textAlign: "justify",
            maxWidth: "900px",
            mx: "auto",
            mt: 2,
          }}
        >
          We empower companies and inspire innovation by blending technology and
          creativity with a <b>HUMAN-FIRST</b> approach to enhance the
          efficiency and productivity of organizations.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
