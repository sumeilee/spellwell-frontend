import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Spell from "./components/pages/Spell";
import Results from "./components/pages/Results";
import CreateWordBag from "./components/pages/CreateWordBag";
import BagList from "./components/BagList";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Header />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/new-bag" component={CreateWordBag} />
          <Route path="/results" component={Results} />
          <Route path="/spell/:id" component={Spell} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={BagList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
