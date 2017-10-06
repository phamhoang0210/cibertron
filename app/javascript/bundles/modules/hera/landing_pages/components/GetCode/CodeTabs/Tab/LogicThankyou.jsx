import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'

class LogicThankyou extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState, sharedState} = this.props
    const landingPageCodes = getCodeState.get('landingPageCodes')
    const thankYouLogics = landingPageCodes.get('thankyou_logics')
    const logicItemKeys = sharedState.getIn(['landingPageItemKeys', 'thankyou_logics'])
    return (
      <div>
        {thankYouLogics && !thankYouLogics.isEmpty() && logicItemKeys.map(key => (
          <div key={key.get('key')}>
            <h2 dangerouslySetInnerHTML={{__html: thankYouLogics.getIn([key.get('key'), 'title'])}}/>
            <div dangerouslySetInnerHTML={{__html: thankYouLogics.getIn([key.get('key'), 'description'])}}/>
            <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
              {thankYouLogics.getIn([key.get('key'), 'code'])}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    )
  }
}

export default LogicThankyou