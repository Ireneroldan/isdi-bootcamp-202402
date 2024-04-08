import { useState, useEffect } from "react";
import { logger, showFeedback } from "../utils";
import logic from "../logic";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import EditPost from '../components/EditPost'

function Home(props) {
  const[user, setUser] = useState(null)
  const[view, setView] = useState(null)
  const[stamp, setStamp] = useState(null)
  const[post, setPost] = useState(null)

  useEffect(() => {
    try {
      logic.retrieveUser((error, user) => {
        if(error) {
          showFeedback(error)

          return
        }

        setState({user})
      })
    } catch (error) {
      showFeedback(error)
    }
  }, [])

  const clearView = () => setView(null)

    const handleCreatePostCancelClick = () => clearView()

    const handlePostCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            props.onUserLoggedOut()
        }
    }

    const handleEditPostCancelClick = () => clearView()

    const handleEditPostClick = post => {
        setView('edit-post')
        setPost(post)
    }

    const handlePostEdited = () => {
        clearView()
        setStamp(Date.now())
        setPost(null)
    }

    logger.debug('Home -> render')

    return <main className="main">
        {user && <h1>Hello, {user.name}!</h1>}

        <nav>
            <button>💬</button>
            <button onClick={handleLogoutClick}>🚪</button>
        </nav>

        <PostList stamp={stamp} onEditPostClick={handleEditPostClick} />

        {view === 'create-post' && <CreatePost onCancelClick={handleCreatePostCancelClick} onPostCreated={handlePostCreated} />}

        {view === 'edit-post' && <EditPost post={post} onCancelClick={handleEditPostCancelClick} onPostEdited={handlePostEdited} />}

        <footer className="footer">
            <button onClick={handleCreatePostClick}>➕</button>
        </footer>
    </main>
}

export default Home