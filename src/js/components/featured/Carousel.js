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

    toggleSlide(ev){
      let slide = parseInt(ev.target.name)
      this.setState({
        currentSlide: slide
      })
    }

    render() {
      const {gameList, currentSlide} = this.state
      const MatchComponents = gameList.map((match, index) => {
        let isActive = currentSlide === index
        return <FeaturedMatch active={isActive} key={match.gameId} {...match}/>
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
