import React from "react";
import "./App.css";
import "./styles/global.css";
import { Routes } from "./routes/config";
import { GlobalStyles } from "./styles/index";
import { AuthProvider } from "./authentication/use-auth";
import { Route, Switch } from 'react-router-dom';
import { SubscribersPage } from "./pages/Subscribers/subscribers";
import { EmailNewslettersPage } from "./pages/EmailNewsletter/emailNewsletter";

//This is almost the base level of your app.  You can also put global things here.
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <AuthProvider>
        <Routes/>
        <Switch>
        <Route path='/Subscribers'>
        <SubscribersPage/>
        </Route>
        <Route path='/EmailNewsletters'>
          <EmailNewslettersPage/>
        </Route>
        </Switch>
        

      </AuthProvider>
    </div>
  );
}

export default App;
