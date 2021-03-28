import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: '',
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

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
    console.log(value)
  }

  filterPosts = (searchValue, allPosts, posts) => {
    if (!!searchValue) {
      return allPosts.filter( (post) => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      } )
    }

    return posts
  }

  render() {
    const {
      posts,
      page,
      postsPerPage,
      allPosts,
      searchValue
    } = this.state
    const noMorePosts = (page + postsPerPage) >= allPosts.length
    const filteredPosts = this.filterPosts(searchValue, allPosts, posts)
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput
            handleChange={this.handleChange}
            searchValue={searchValue}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>Não existem posts.</p>
        )}
        
        <div className="button-container">
        {!searchValue && (
          <Button 
            label="Load More Posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        )}
        </div>
      </section>
    );
  }
}
