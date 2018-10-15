import React from 'react';
import {fetchStories} from './stories';
import {Story} from './story';

export class News extends React.Component {
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