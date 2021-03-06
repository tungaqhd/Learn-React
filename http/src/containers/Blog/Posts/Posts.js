import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link, Route } from "react-router-dom";
import classes from "./Posts.css";
import FullPost from "../FullPost/FullPost";
class Posts extends Component {
  state = {
    posts: [],
  };
  postSelectedHandler(id) {
    this.props.history.push({ pathname: "/posts/" + id });
  }

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Tung",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let posts = this.state.posts.map((post) => (
      // <Link to={"/" + post.id}>
      <Post
        key={post.id}
        className={classes.Posts}
        title={post.title}
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)}
      />
      // </Link>
    ));
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
