import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errors: {} };
  }

  /**
   * A listener for value change in the form.
   * @param e: Element to catch: the ID and value
   */
  onChange = e => { this.setState({ [e.target.id]: e.target.value }); };

  /**
   * A handler for form submit event.
   *
   * @param e: The fetched element
   */
  onSubmit = e => {
    e.preventDefault();  // Prevent re-loading the page upon submission

    const userData = {
      email: this.state.email,
      password: this.state.password };

    console.log(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                <Link to="/register">Don't have an account?</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email" />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem" }}
                  type="submit">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;