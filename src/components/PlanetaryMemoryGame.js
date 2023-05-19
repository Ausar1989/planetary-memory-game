import React, { Component } from 'react';
import NavBar from './NavBar';
import Icon from './Icon';
import Footer from './Footer';
import Container from './Container';
import images from '../images';

class PlanetaryMemoryGame extends Component {
    state = {
        score: 0,
        highScore: 0,

        navMsgColor: '',

        navMessage: 'Click a planet to begin!',

        allPlanets: this.shuffleArray(),

        wasClicked: [],

        shake: false
    };

    clickEvent= this.checkClicked.bind(this);

    shuffleArray() {
        // creates a copy of the current characters array to modify it by value, and not by reference
        const newArr = images.slice();
    
        // will store the shuffled array
        const shuffleArr = [];
    
        // each loop through an index gets spliced from newArr, reducing its length
        // gets a random index based off the current length of newArr
        // splices the value from newArr, and pushes it to shuffleArr
        while (newArr.length > 0) {
          shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
        }
    
        return shuffleArr;
      }
    
      checkClicked(clickedElem) {
        // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
        const prevState = this.state.wasClicked.slice();
    
        // shuffles the images
        const shuffled = this.shuffleArray();
    
        // tracks score
        let score = this.state.score;
        let highScore = this.state.highScore;
    
        // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
        if (!this.state.wasClicked.includes(clickedElem)) {
          // if score and highScore are the same, then there is a new highScore value
          if (score === highScore) {
            score++;
            highScore++;
          
    
            // if they are not equal, then only increase the score value
          } else {
            score++;
          }
    
          // adds the clicked item to wasClicked to track that it has been clicked
          prevState.push(clickedElem);
        }
    
        // resets the current score if the same element was clicked twice
        if (this.state.wasClicked.includes(clickedElem)) {
          let score = 0;
          return this.setState({
            score: score,
            highScore: highScore,
            navMsgColor: 'incorrect',
            navMessage: 'Incorrect guess!',
            allPlanets: shuffled,
            wasClicked: [],
            shake: true
          });
        }
    
        // if this runs, then the same element has not been clicked twice and the score is increased
        this.setState({
          score: score,
          highScore: highScore,
          navMsgColor: 'correct',
          navMessage: 'You Guessed Correctly!',
          allPlanets: shuffled,
          wasClicked: prevState,
          shake: false
        });
    
        // removes the green correct indicator on a successful click after .5s to re-render the class on each success
        return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
      }
    
      // renders score to the navbar.
      // passes the randomized state.allCharacters array to Container to create a Character component for each image.
      // passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
      render() {
        const state = this.state;
        return (
          <div>
            <NavBar
              score={this.state.score}
              highScore={this.state.highScore}
              navMessage={this.state.navMessage}
              navMsgColor={this.state.navMsgColor}
            />
            <Container />
            <Icon
              shake={this.state.shake}
              allPlanets={this.state.allPlanets}
              clickEvent={this.clickEvent}
            />
            <Footer />
          </div>
        );
      }
    }
    
    export default PlanetaryMemoryGame;