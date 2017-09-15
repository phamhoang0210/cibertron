import React from 'react'
import PromosTableBox from './Promo/PromosTable/PromosTableBox'

class IndexScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {indexState} = this.props
    return (
      <div>
        <h1>This is SOL</h1>
        <PromosTableBox {...this.props}/>
      </div>
    )
  }
}

export default IndexScreen