import React from "react";
import FeaturedMatch from "./FeaturedMatches"

export default class Carousel extends React.Component {
    constructor(props){
        super()
        this.state = {
          gameList: props.gameList,
          currentSlide: 0,
          previousSlide: null,
          slideAction: null
        }
    }

    prevSlide(){
      const {currentSlide, gameList} = this.state
      let prev = currentSlide - 1
      if (prev < 0) {
        prev = gameList.length - 1
      }
      this.setState({
        currentSlide: prev,
        previousSlide: currentSlide
      })
    }

    nextSlide(){
      const {currentSlide, gameList} = this.state
      let next = currentSlide + 1
      if (next > gameList.length - 1) {
        next = 0
      }
      this.setState({
        currentSlide: next,
        previousSlide: currentSlide
      })
    }

    toggleSlide(ev){
      const {currentSlide} = this.state
      let slide = parseInt(ev.target.name)
      this.setState({
        currentSlide: slide,
        previousSlide: currentSlide
      })
    }

    render() {
      const {gameList, currentSlide, previousSlide, slideAction} = this.state
      const MatchComponents = gameList.map((match, index) => {
        let isNext = currentSlide === index
        let isPrev = previousSlide === index
        return <FeaturedMatch prevSlide={isPrev} nextSlide={isNext} slideAction={slideAction} key={match.gameId} {...match}/>
      })
      const DotComponents = gameList.map((match, index) => {
        return <button onClick={this.toggleSlide.bind(this)} key={index} name={index}>DOT</button>
      })
      return(
          <div class="my-carousel row">
            <button class="col s1 btn-floating btn-large" onClick={this.prevSlide.bind(this)}>Previous</button>
            {MatchComponents}
            <button class="col s1 btn-floating btn-large" onClick={this.nextSlide.bind(this)}>Next</button>
            <div class="col s12">
              {DotComponents}
            </div>
          </div>
      )
    }
}
