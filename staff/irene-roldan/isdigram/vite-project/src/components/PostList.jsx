import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import Post from './Post'

function PostList(props) {
    const [posts, setPosts] = useState([])

    const loadPosts = () => {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePosts((error, posts) => {
                if(error) {
                    showFeedback(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    //componentWillReceiveProps(newProps) {
        //logger.debug('PostList -> componentWillReceiveProps', JSON.stringify(this.props), JSON.stringify(newProps))

        //if (newProps.stamp !== this.props.stamp) this.loadPosts()
        //newProps.stamp !== this.props.stamp && this.loadPosts()
    //}

    //componentDidMount() {
        //logger.debug('PostList -> componentDidMount')

        //this.loadPosts()
    //}

    useEffect(() => {
        loadPosts()
    }, [props.stamps])
    const handlePostDeleted = () => loadPosts()

    const handleEditClick = post => props.onEditPostClick(post)

    
    logger.debug('PostList -> render')

    return <section>
        {posts.map(post => <Post key={post.id} item={post} onEditClick={handleEditClick} onDeleted={handlePostDeleted} />)}
    </section>
    
}

export default PostList