import { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    posts: [
      {
        id: 1,
        title: 'Título do post 1',
        body: 'Corpo do post com título 1',
      },
      {
        id: 2,
        title: 'Título do post 2',
        body: 'Corpo do post com título 2',
      },
      {
        id: 3,
        title: 'Título do post 3',
        body: 'Corpo do post com título 3',
      },
    ],
    counter: 0,
  }
  timeoutUpdate = null

  componentDidMount() {
    this.handleTimeout()
  }

  componentDidUpdate() {
    this.handleTimeout()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate)
  }

  handleTimeout = () => {
    const { posts, counter } = this.state
    posts[0].title = 'O título 1 mudou'
    this.timeoutUpdate = setTimeout( () => {
      this.setState({ posts: posts, counter: counter + 1 })
    }, 2000 )
  }

  render() {
    const { posts, counter } = this.state

    return (
      <div className="App">
        <h1>{counter}</h1>
        { posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        )) }
      </div>
    );
  }
}

export default App;
