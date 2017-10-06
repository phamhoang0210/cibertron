import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'

class LogicHome extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState, sharedState} = this.props
    const landingPageCodes = getCodeState.get('landingPageCodes')
    const homeLogics = landingPageCodes.get('home_logics')
    const logicItemKeys = sharedState.getIn(['landingPageItemKeys', 'home_logics'])
    return (
      <div>
        {homeLogics && !homeLogics.isEmpty() && logicItemKeys.map(key => (
          <div key={key.get('key')}>
            <h2 dangerouslySetInnerHTML={{__html: homeLogics.getIn([key.get('key'), 'title'])}}/>
            <div dangerouslySetInnerHTML={{__html: homeLogics.getIn([key.get('key'), 'description'])}}/>
            <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
              {homeLogics.getIn([key.get('key'), 'code'])}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    )
  }
}

export default LogicHome