import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Spell from "./components/pages/Spell";
import Results from "./components/pages/Results";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Switch>
          <Route path="/results" component={Results} />
          <Route exact path="/" component={Spell} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
