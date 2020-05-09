import React, { Component } from "react"
 
import { initGA, logPageView } from "./init.js"
 
export default class Layout extends Component {
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
 
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}