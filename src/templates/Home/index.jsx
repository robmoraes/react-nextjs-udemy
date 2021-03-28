import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts()
    const {page, postsPerPage} = this.state
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage,
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, (nextPage + postsPerPage))
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage })
    console.log(nextPosts)
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state

    const noMorePosts = (page + postsPerPage) >= allPosts.length

    return (
      <section className="container">
        <Posts posts={posts} />
        <div className="button-container">
          <Button 
            label="Load More Posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}
