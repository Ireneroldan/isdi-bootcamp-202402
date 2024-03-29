import { Component } from "react";
import { showFeedback } from "../utils/index.mjs";
import logic from "../logic.mjs";

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <h1>Login</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target;

            const username = form.username.value;
            const password = form.password.value;

            try {
              logic.loginUser(username, password);

              form.reset();

              this.props.onUserLoggedIn();
            } catch (error) {
              showFeedback(error);
            }
          }}
        >
          <label htmlFor="username">Username</label>
          <input id="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" />

          <button className="submit-button" type="submit">
            Login
          </button>
        </form>

        <a
          onClick={(event) => {
            event.preventDefault();

            this.props.onRegisterClick();
          }}
        >
          Register
        </a>
      </main>
    );
  }
}

export default Login;
