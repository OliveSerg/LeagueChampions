import React from "react";
import FeaturedMatch from "./FeaturedMatches"

export default class Carousel extends React.Component {
    constructor(props){
        super()
        this.state = {
          gameList: props.gameList,
          currentSlide: 0
        }
    }

    prevSlide(){
      const {currentSlide, gameList} = this.state
      let prev = currentSlide - 1
      if (prev < 0) {
        prev = gameList.length - 1
      }
      this.setState({
        currentSlide: prev
      })
    }

    nextSlide(){
      const {currentSlide, gameList} = this.state
      let next = currentSlide + 1
      if (next > gameList.length - 1) {
        next = 0
      }
      this.setState({
        currentSlide: next
      })
    }

    render() {
      const {gameList, currentSlide} = this.state
      const MatchComponents = gameList.map((match, index) => {
        let isActive = currentSlide === index
        return <FeaturedMatch active={isActive} key={match.gameId} {...match}/>
      })
      return(
          <div class="my-carousel">
            <button onClick={this.prevSlide.bind(this)}>Previous</button>
            <button onClick={this.nextSlide.bind(this)}>Next</button>
            {MatchComponents}
          </div>
      )
    }
}
