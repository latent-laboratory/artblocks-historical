import React from "react"
import { get_contract_token_ids } from "../utils/artblocks.js"
import { get_sales } from "../utils/zora.js"
import History from "./History"

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      sales : []
    }
    this.update_address = this.update_address.bind(this) 
    this.input = this.input.bind(this);
  }
  update_address(address) {
    get_contract_token_ids(address).then((x) => {
      get_sales(x, 500, 1).then((y) => {
        this.setState({
          sales: y
        })
      })
    })
  }
  input(e) {
    setTimeout(() => {
      this.update_address(e.target.value)
    }, 2000)
  }
  render() {
    return (
      <div>
        <div>
          <div className="header">
            historical
          </div>
          <div className="subheader">
            built with <a href="https://docs.zora.co/" target="_blank" className="highlight">Zora</a>
          </div>
          <div className="input">
           <input 
              className="address"
              placeholder="0x"
              onChange={this.input}
              >
            </input>
          </div>
        </div>
        <History sales={this.state.sales}/>
      </div>
    )
  }
}
