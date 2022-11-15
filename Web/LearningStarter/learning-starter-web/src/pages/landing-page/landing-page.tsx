import React from "react";
import { Button, Header } from "semantic-ui-react";
import "./landing-page.css";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page
export const LandingPage = () => {
  return (
    <div>
      <div className="home-page-container">
        <Header>Home Page</Header>
      </div>
      <a
        href="https://localhost:5001/BulletJournal/create"
        /* onClick={() => {
          alert("Redirecting to create page");
        }}*/
      >
        <Button className="ui fluid button">Create An Entry</Button>
      </a>
    </div>
  );
};
