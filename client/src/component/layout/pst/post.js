import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../dashboard/spinner';
import { getPost } from '../../../actions/postActions';
import PostItem from '../post/postItem';
import CommentForm from './commentForm';

import { Link,useParams } from 'react-router-dom';
import CommentItem from './commentItem';

 
const Post = ({ getPost, post: { post,loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);


  return (
      <section className="container">
      {post === null||loading ? (
            <Spinner />
          ) : (
                  <div className="container">
                    <div className="row">
                      <div className = "col-md-12">
                        <Link to="/feed" className = "btn btn-light mb-3">
                          Feed
                        </Link>
                        <PostItem post ={post} showActions={false}/>
                        <CommentForm postId={post._id}/>
                        
                        <div className="comments">
        {post.comments?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>              
                      </div>

                  
                    </div>
                  </div>

                )
          }
       
      </section>
    );
  };
  



Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps,{getPost})(Post);
