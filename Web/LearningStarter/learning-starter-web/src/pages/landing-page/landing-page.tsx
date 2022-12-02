import React, { useState } from "react";
import { Button, Card, Header, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./landing-page.css";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/ens-vars";
import { ApiResponse, BulletJournalEntryGetDTO } from "../../constants/types";
import axios from "axios";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page
export const LandingPage = () => {
  const history = useHistory();
  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO[]>();

  const fetchBulletJournal = async () => {
    const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO[]>>(
      `${BaseUrl}/api/BulletJournal`
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
      /*response.data.errors.forEach(err => {
                console.log(err.message);
            });*/
    } else {
      setBulletJournalEntries(response.data.data);
    }
  };

  return (
    <div className="background">
      <div className="home-page-container">
        <Header className="head">Dash Board</Header>
      </div>

      <div className="ui vertical buttons">
        <div>
          <Button
            className="ui left labeled icon button"
            onClick={() => history.push(routes.bulletJournal.listing)}
          >
            <i className="list ul icon"></i>
            Check your bullet journal!
          </Button>
        </div>

        <div>
          <Button
            className="ui left labeled icon button btn-border"
            onClick={() => history.push(routes.EmailNewsletters.listing)}
          >
            <i className="newspaper icon"></i>
            Draft up a Newsletter!
          </Button>
        </div>

        <div>
          <Button
            className="ui left labeled icon button"
            onClick={() => history.push(routes.inventory.Inventory)}
          >
            <i className="shop icon"></i>
            Check your inventory!
          </Button>
        </div>
      </div>
    </div>
  );
};

/*export const CardExampleCard = () => (
  <Card>
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);
*/
