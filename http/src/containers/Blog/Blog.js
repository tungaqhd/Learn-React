import React, { Component } from "react";
import { Route, Link, NavLink, Switch, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import Post from "../../components/Post/Post";
import "./Blog.css";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/posts" activeClassName="active">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not Found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
