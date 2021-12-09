import Home from "./component/home";
import Navbar from './component/navbar'
import NoteState from './component/context/notes/noteState'
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type, head, msg) => {
    setAlert({ type: type, head: head, msg: msg });
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container-sm my-2">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
