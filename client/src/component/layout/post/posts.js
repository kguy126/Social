import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostForm from './postForm';
import Spinner from '../dashboard/spinner';
import {Link, Navigate} from 'react-router-dom';
import { getPosts } from '../../../actions/postActions';
import PostFeed from './postFeed';
class Posts extends Component {
  componentDidMount(){
    this.props.getPosts();
  }
  render() {
    const {isAuthenticated} = this.props.auth;
    const {posts,loading} = this.props.post;
    let postContent;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm />
                    {postContent}
                </div>

            </div>

        </div>
        
      </div>
    )
  }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
   
  };
  
  const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth,
   
  });
  
  export default connect( mapStateToProps, {getPosts})(Posts);

