import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Spell from "./components/pages/Spell";
import Results from "./components/pages/Results";
import CreateWordBag from "./components/pages/CreateWordBag";
import BagList from "./components/BagList";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Header />
        <Switch>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/dashboard/:page" component={Dashboard} />
          <Route path="/new-bag" component={CreateWordBag} />
          <Route path="/results" component={Results} />
          <Route path="/spell/:id" component={Spell} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <Route exact path="/wordbags" component={BagList} />
          <Route exact path="/" component={BagList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
