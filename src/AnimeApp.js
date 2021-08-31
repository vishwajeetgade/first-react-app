import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './AnimeApp.css';
import AnimeList from './AnimeList';
import ColoredBoxes from './ColoredBoxes';
import NavBar from './NavBar';
import RandomRemove from './RandomRemove';
import ClickExample from './ClickExample';
import SimpleTodo from './SimpleTodo';
import AnimeInputForm from './AnimeInputForm';
import shuffle from 'shuffle-array';
import Card from './Card';
import HackerNews from './HackerNews';
import GuessFlag from './GuessFlag';


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

export default class AnimeApp extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 1, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 2, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 3, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 4, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 5, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 8, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 9, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 10, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 11, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 12, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 13, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' },
      { id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' }
    ];
    cards = shuffle(cards);

    this.state = {
      animeChars: [
        {
          id: 0,
          name: "Hinata Hyuga",
          img: "https://d1lxrd8xkfqt44.cloudfront.net/wp-content/uploads/2021/07/09201510/MEHO831614-1.jpg",
          skills: ["Bakugan", "Keke Gen Kai", "64 palm tigger"],
          desc: "Hinata is a princess of hyuga clan and older sister of hanabi"
        },
        {
          id: 1,
          name: "Nami",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZh79uRIHfk7Fgs3GUfiI3XjQi04Gn9idbAg&usqp=CAU",
          skills: ["Climate tatics", "Zeus"],
          desc: "Nami is a pirate. She belong to Straw hats pirate which is lead by Monkey D. Luffy"
        }
      ],
      nextId: 2,
      showForm: false,
      cards: cards,
      noClick: false,
      stories: []
    }


    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCardReset = this.handleCardReset.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    const topStoryURL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyURL = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(topStoryURL)
      .then(data => data.json())
      .then(data => data.map(id => {
        const baseURL = `${storyURL}${id}.json`
        return fetch(baseURL)
          .then(d => d.json())
      }))
      .then(promises => Promise.all(promises))
      .then(stories => this.setState({ stories }))
  }

  handleDelete(index) {
    const animeChars = this.state.animeChars.filter(char => char.id !== index);
    this.setState({ animeChars })
  }

  handleSave(animechar) {
    this.setState((prevState, props) => {
      const newChar = { ...animechar, id: this.state.nextId };
      return {
        nextId: prevState.nextId + 1,
        animeChars: [...this.state.animeChars, newChar],
        showForm: false
      }
    })
  }

  handleCardReset() {
    let cards = this.state.cards.map((c, i) => ({
      ...c,
      cardState: CardState.HIDING
    }))
    cards = shuffle(cards);
    this.setState({ cards });
  }

  handleCardClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);

    const ids = showingCards.map(c => c.id);

    if (showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;

      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1300);
      });
      return;
    }

    this.setState({ cards, noClick });
  }

  render() {
    const { showForm } = this.state;
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleCardClick(card.id)}
      />
    ));
    return (
      <Router>
        <NavBar onShowForm={() => this.setState({ showForm: true })} onResetCard={this.handleCardReset} />
        <Switch>
          <Route path="/hackernews">
            <HackerNews stories={this.state.stories}/>
          </Route>
          <Route path="/click">
            <ClickExample />
          </Route>
          <Route exact path="/">
            {
              showForm ? <AnimeInputForm onSave={this.handleSave} onClose={() => this.setState({ showForm: false })} /> : null
            }
            <AnimeList animeChars={this.state.animeChars} onDelete={this.handleDelete} />
          </Route>
          <Route exact path="/coloredboxes"><ColoredBoxes /></Route>
          <Route exact path="/randomremove"><RandomRemove /></Route>
          <Route exact path="/todo"><SimpleTodo /></Route>
          <Route exact path="/cardgame">
            <div className="container">
              {cards}
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}

