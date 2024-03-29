import { Component } from "react";
import { showFeedback } from "../utils/index.mjs";
import logic from "../logic.mjs";

class Register extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <h1>Register</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target;

            const name = form.name.value;
            const birthdate = form.birthdate.value;
            const email = form.email.value;
            const username = form.username.value;
            const password = form.password.value;

            try {
              logic.registerUser(name, birthdate, email, username, password);

              form.reset();

              this.props.onUserRegistered();
            } catch (error) {
              showFeedback(error);
            }
          }}
        >
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />

          <label htmlFor="birthdate">Birthdate</label>
          <input type="date" id="birthdate" />

          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" />

          <label htmlFor="username">Username</label>
          <input type="text" id="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" />

          <button type="submit" className="submit-button">
            Send register
          </button>
        </form>

        <a
          href=""
          onClick={(event) => {
            event.preventDefault();

            this.props.onLoginClick();
          }}
        >
          Login
        </a>
      </main>
    );
  }
}
export default Register;
