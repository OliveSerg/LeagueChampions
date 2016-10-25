import React from "react";

export default class Carousel extends React.Component {
    constructor(props){
        super()
        this.state = {
          length: props.children.length,
          currentSlide: 0,
          previousSlide: null,
          slideAction: null
        }
    }

    prevSlide(){
      const {currentSlide, length} = this.state
      let prev = currentSlide - 1
      if (prev < 0) {
        prev = length - 1
      }
      this.setState({
        currentSlide: prev,
        previousSlide: currentSlide,
        slideAction: "to-right"
      })
    }

    nextSlide(){
      const {currentSlide, length} = this.state
      let next = currentSlide + 1
      if (next > length - 1) {
        next = 0
      }
      this.setState({
        currentSlide: next,
        previousSlide: currentSlide,
        slideAction: "to-left"
      })
    }

    toggleSlide(ev){
      const {currentSlide} = this.state
      let slide = parseInt(ev.target.name)
      this.setState({
        currentSlide: slide,
        previousSlide: currentSlide,
        slideAction: "to-left"
      })
    }

    render() {
      const DotComponents = this.props.children.map((match, index) => {
        return <button onClick={this.toggleSlide.bind(this)} key={index} name={index}>DOT</button>
      })
      return(
          <div class="my-carousel row">
            <button class="col s1 btn-floating btn-large" onClick={this.prevSlide.bind(this)}>Previous</button>
            <div class="matchWrapper">
              {this.props.children}
            </div>
            <button class="col s1 btn-floating btn-large" onClick={this.nextSlide.bind(this)}>Next</button>
            <div class="col s12">
              {DotComponents}
            </div>
          </div>
      )
    }
}
