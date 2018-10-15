import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {fetchStories, transformTime, transformURL} from './stories';


const renderURL = (url) => {
    const hostname = transformURL(url);

    return <a href={`https://news.ycombinator.com/from?site=${hostname}`}>({hostname})</a>;
}

const Story = (props) => {
    const {by, title, time, score, descendants, url, id} = props.story;
    const itemURL = `https://news.ycombinator.com/item?id=${id}`;

    return (
        <div className='w3-container w3-light-grey' >
            <div className='title w3-panel w3-border-lime w3-leftbar'>
                <a href={url || itemURL} target='_blank' rel='noopener noreferrer' className=''>{title}</a>    
                {' '}<span className='w3-tiny'>{ url && renderURL(url) }</span>
            </div>
            <div className='info w3-white'>
                <p className='w3-tiny'>
                    <span className='w3-black w3-text-white'>{score}</span> points by ${by}. ${transformTime(time * 1000)}`}
                </p>  
            </div>
            <div className='w3-tiny'>
                <div className='hide'>hide</div>
                <div classname='comments'>{descendants} comments</div>
            </div>
        </div>
    );
}

class News extends React.Component {
    state = {
        loading: false,
        stories: [],
        page: 1
    }

    componentWillMount() {
        this.setState({loading: true})
        fetchStories(1).then(stories => {
            this.setState({loading: false, stories})
        })
    }

    jumpPage = (diff) => {
        if (this.state.loading) return;

        this.setState({loading: true})
        fetchStories(this.state.page + diff).then(stories => {
            this.setState({loading: false, stories, page: this.state.page + diff})
        })
    }

    nextPage = () => {
        this.jumpPage(+1);
    }

    prevPage = () => {
        this.jumpPage(-1);
    }

    renderStories () {
        return this.state.stories.map((story)=>{
            return <Story story={story} />
        });
    }

    render() {
        return (
            <div>
                <div>
                    { (this.state.page > 1) && <button className='w3-btn w3-lime w3-margin-right w3-padding-small w3-section' disabled={this.state.loading} onClick={this.prevPage}>Prev</button> }
                    <button className='w3-btn w3-lime w3-padding-small w3-section' disabled={this.state.loading} onClick={this.nextPage}>Next</button>
                </div>
                {
                    this.state.loading ?
                        <p>Loading...</p>
                        :
                        this.renderStories()
                }
            </div>
        )
    }
    
}

ReactDOM.render(<News />, document.getElementById('root'));

serviceWorker.unregister();
