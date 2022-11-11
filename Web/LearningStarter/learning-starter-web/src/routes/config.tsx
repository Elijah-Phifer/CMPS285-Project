import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { InventoriesPage } from "../pages/Inventories-page/Inventories";
import { InventoriesCreatePage } from "../pages/Inventories-page/Inventories-Create";
import { BulletJournalCreatePage } from "../pages/BulletJournalContents/create-page/bullet-journal-contents-create";
import { BulletJournalListingPage } from "../pages/BulletJournalContents/listing-page/bullet-journal-listing";
import { SubscribersPage } from "../pages/Subscribers/subscribers";
import { EmailNewslettersPage } from "../pages/EmailNewsletter/emailNewsletter";

//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: `/user`,

  inventory: {
    Inventory: "/inventories",
    InventoryCreate: "/inventory/create",
  },

  bulletJournal: {
    listing: "/BulletJournal",
    create: "/BulletJournal/create",
  },

  Subscribers: {
    listing: "/subscribers",
  },

  EmailNewsletters: "/emailNewsletters",
};

//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
  const user = useUser();
  return (
    <>
      {/* The page wrapper is what shows the NavBar at the top, it is around all pages inside of here. */}
      <PageWrapper user={user}>
        <Switch>
          {/* When path === / render LandingPage */}
          <Route path={routes.home} exact>
            <LandingPage />
          </Route>
          {/* When path === /user render UserPage */}
          <Route path={routes.user} exact>
            <UserPage />
          </Route>
          <Route path={routes.inventory.Inventory} exact>
            <InventoriesPage />
          </Route>
          <Route path={routes.inventory.InventoryCreate} exact>
            <InventoriesCreatePage />
          </Route>
          {/* Going to route "localhost:5001/" will go to homepage */}
          <Route path={routes.root} exact>
            <Redirect to={routes.home} />
          </Route>

          <Route path={routes.bulletJournal.listing} exact>
            <BulletJournalListingPage />
          </Route>

          <Route path={routes.bulletJournal.create} exact>
            <BulletJournalCreatePage />
          </Route>

          <Route path={routes.EmailNewsletters} exact>
            <EmailNewslettersPage />
          </Route>
          <Route path={routes.Subscribers.listing} exact>
            <SubscribersPage />
          </Route>
          {/* This should always come last.  
            If the path has no match, show page not found */}
          <Route path="*" exact>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
};
