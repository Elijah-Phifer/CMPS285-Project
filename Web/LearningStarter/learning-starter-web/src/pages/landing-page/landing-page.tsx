import React from "react";
import { Button, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./landing-page.css";
import { routes } from "../../routes/config";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page
export const LandingPage = () => {
  const history = useHistory();
  return (
    <div className="background">
      {/* <div className="home-page-container">
        <Header className="head">Home Page</Header>
      </div>
      <Button
        className="ui fluid button"
        onClick={() => history.push(routes.bulletJournal.create)}
      >
        Create An Entry
  </Button> */}
    </div>
  );
};
