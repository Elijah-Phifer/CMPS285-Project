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
      <div className="home-page-container">
        <Header className="head">Dash Board</Header>
      </div>
      <div className="ui  vertical buttons">
        <div>
          <Button
            className="ui left labeled icon button"
            onClick={() => history.push(routes.bulletJournal.create)}>
            <i className="list ul icon"></i>
            Add to your bullet journal!
          </Button>
        </div>

        <div>
          <Button
            className="ui left labeled icon button btn-border"
            onClick={() => history.push(routes.EmailNewsletters.create)}>
            <i className="newspaper icon"></i>
            Draft up a Newsletter!
          </Button>
        </div>

        <div>
          <Button
            className="ui left labeled icon button"
            onClick={() => history.push(routes.inventory.InventoryCreate)}>
            <i className="shop icon"></i>
            Create a new inventory item!
          </Button>
        </div>
      </div>
    </div>
  );
};
