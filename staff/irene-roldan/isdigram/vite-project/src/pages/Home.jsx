import { Component } from "react";
import { showFeedback } from "../utils/index.mjs";
import logic from "../logic.mjs";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: null,
      stamp: null,
    };

    try {
      const user = logic.retrieveUser();

      this.user = user;
    } catch (error) {
      showFeedback(error);
    }

    this.onPostCreated = () => this.setState({ stamp: Date.now() });
  }

  render() {
    return (
      <div>
        <main>
          <h1>Hello, {this.user.name}!</h1>

          <div>
            <button
              id="logout-button"
              onClick={(event) => {
                event.preventDefault();

                this.props.onLogoutClick();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="24"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M2,21V3A1,1,0,0,1,3,2H8V0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H8V22H3A1,1,0,0,1,2,21Z" />
                  <path d="M23.123,9.879,18.537,5.293,17.123,6.707l4.264,4.264L5,11l0,2,16.443-.029-4.322,4.322,1.414,1.414,4.586-4.586A3,3,0,0,0,23.123,9.879Z" />
                </g>
              </svg>
            </button>
            <button
              id="chat-button"
              onClick={(event) => {
                event.preventDefault();

                this.props.onChatClick();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="24"
              >
                <path d="m13.5,12c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm3.5-1.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm-10,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm17,1.84v6.66c0,2.757-2.243,5-5,5h-5.917C6.082,24,.47,19.208.03,12.854c-.241-3.476,1.027-6.878,3.479-9.333S9.363-.206,12.836.029c6.26.425,11.164,5.833,11.164,12.312Zm-2,0c0-5.431-4.084-9.962-9.299-10.316-.229-.016-.458-.023-.686-.023-2.656,0-5.209,1.048-7.091,2.933-2.044,2.046-3.101,4.883-2.899,7.782.373,5.38,5.024,9.285,11.059,9.285h5.917c1.654,0,3-1.346,3-3v-6.66Z" />
              </svg>
            </button>
          </div>

          <PostList refreshStamp={this.state.stamp} />

          {this.state.view === "create-post" && (
            <CreatePost
              onCancelClick={() => this.setState({ view: null })}
              onPostCreated={() => {
                this.setState({ view: null, stamp: Date.now() });
              }}
            />
          )}

          <footer>
            <button
              className="button-addPost"
              onClick={() => this.setState({ view: "create-post" })}
            >
              ➕
            </button>
          </footer>
        </main>
      </div>
    );
  }
}

export default Home;
