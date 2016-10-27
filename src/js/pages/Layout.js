import React from "react";
import {Link} from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
    render(){
        const {history} = this.props;
        const containerStyle = {
          height: "100%"
        }
        return (
            <div style={containerStyle}>
               <Nav history={history} />
               {this.props.children}
               <Footer/>
            </div>
         )
    }
}
