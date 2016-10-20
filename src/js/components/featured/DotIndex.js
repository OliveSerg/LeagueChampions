import React from "react"

export default class DotIndex extends React.Component {
  constructor(props) {
    super()
  }

  toggleSlide(){
    console.log(this.props);
  }

  render() {
    this.toggleSlide()
    return(
      <button>"DOT"</button>
    )
  }
}
