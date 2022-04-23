import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Chats from "./components/Chats";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/chats" component={Chats} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
