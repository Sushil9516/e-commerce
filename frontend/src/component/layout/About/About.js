import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/___soni___sushil___9516/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dtjultcaf/image/upload/v1698431099/avatars/qusmprphogapdkbyrd66.jpg"
              alt="Founder"
            />
            <Typography>Sushil Kumar Soni</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by <span style={{ color: "black" }} >@sushilSoni</span> Only with the
              purpose to learn Full Stack Developent.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a 
              href="https://www.youtube.com/channel/UCTOibT9hDlRirz0mYE5R8QA"
              target="blank"
            >
              <YouTubeIcon style={{ color: "red" }}/>
            </a>

            <a
              href="https://www.instagram.com/___soni___sushil___9516/"
              target="blank"
            >
              <InstagramIcon style={{ color: "rgb(228, 64, 95)" }} />
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <LinkedInIcon style={{ color: "blue" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
