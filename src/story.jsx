import React from 'react';
import {transformTime, transformURL} from './stories';

const renderURL = (url) => {
    const hostname = transformURL(url);

    return <a href={`https://news.ycombinator.com/from?site=${hostname}`}>({hostname})</a>;
}

export const Story = (props) => {
    const {by, title, time, score, descendants, url, id} = props.story;
    const itemURL = `https://news.ycombinator.com/item?id=${id}`;

    return (
        <div className='w3-container w3-sand w3-section' >
            <div className='title w3-panel w3-border-lime w3-leftbar'>
                <a href={url || itemURL} target='_blank' rel='noopener noreferrer' className='w3-white'>{title}</a>    
                {' '}<span className='w3-tiny'>{ url && renderURL(url) }</span>
            </div>
            <div className='info'>
                <p className='w3-tiny'>
                    <span className='w3-black w3-text-white'>{score}</span> points by ${by}. ${transformTime(time * 1000)}
                </p>  
            </div>
            <div className='w3-tiny'>
                <div classname='comments'>{descendants} 
                    <a href=' ' target='_blank' rel='noopener noreferrer' > comments</a>
                    <p className='hide'>
                        <span className='w3-grey w3-text-white w3-circle w3-border-dark-grey w3-leftbar w3-rightbar'>hide</span>
                    </p>
                </div>
            </div>
            <hr className='w3-light-grey'/>
        </div>
    );
}