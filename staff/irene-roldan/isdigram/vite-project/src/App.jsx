import Logger from "./utils/Logger.mjs";
import { Component } from "react";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import "./App.css";
import logic from "./logic.mjs";

class App extends Component {
  logger;

  constructor() {
    super();
    this.logger = new Logger();

    this.logger.debug("App");
    this.state = { view: logic.isUserLoggedIn() ? "home" : "landing" };
  }

  setState(state) {
    this.logger.debug("App -> setState", JSON.stringify(state));

    super.setState(state);
  }

  componentDidMount() {
    this.logger.debug("App -> componentDidMount");
  }

  goToLogin = () => this.setState({ view: "login" });

  handleLoginClick = () => this.goToLogin();

  handleRegisterClick = () => this.setState({ view: "register" });

  handleUserLoggedIn = () => this.setState({ view: "home" });

  handleUserLoggedOut = () => this.goToLogin();

  render() {
    this.logger.debug("App -> render");

    if (this.state.view === "landing")
      return (
        <Landing
          onLoginClick={() => this.setState({ view: "login" })}
          onRegisterClick={() => this.setState({ view: "register" })}
        />
      );
    else if (this.state.view === "login")
      return (
        <Login
          onRegisterClick={() => this.setState({ view: "register" })}
          onUserLoggedIn={() => this.setState({ view: "home" })}
        />
      );
    else if (this.state.view === "register")
      return (
        <Register
          onLoginClick={() => this.setState({ view: "login" })}
          onUserRegistered={() => this.setState({ view: "login" })}
        />
      );
    else if (this.state.view === "home")
      return (
        <Home
          onLogoutClick={() => this.setState({ view: "landing" })}
          onChatClick={() => this.setState({ view: "chat" })}
        />
      );
    else return <h1>😶</h1>;
  }
}

export default App;
