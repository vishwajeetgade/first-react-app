import React, { Component } from 'react';
import './HackerNews.css';


export default class HackerNews extends Component {
    render() {
        let views = <div>Loading ...</div>
        const {stories} = this.props;
        if(stories && stories.length > 0){
            views = stories.map((s ,i)=>(
                <div key={s.id}>
                    <p>{s.title} - <strong>{s.by}</strong></p>
                </div>
            ))
        }
        return (
            <div className="text-center">
                <h4>Hacker News</h4>
                {views}
            </div>
        )
    }
}
