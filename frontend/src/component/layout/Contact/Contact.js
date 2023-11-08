import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:sonisushil9516@gmail.com">
        <Button>Name: Sushil Kumar Soni</Button><br></br>
        <Button>Contact: sonisushil9516@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;