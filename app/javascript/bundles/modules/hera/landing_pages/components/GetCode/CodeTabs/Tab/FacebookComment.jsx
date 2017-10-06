import React from 'react'
import { getFilterParams } from 'helpers/applicationHelper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles'

class FacebookComment extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {getCodeState, sharedState} = this.props
    const landingPageCodes = getCodeState.get('landingPageCodes')
    const facebookCommentLogics = landingPageCodes.get('facebook_comment')
    const logicItemKeys = sharedState.getIn(['landingPageItemKeys', 'facebook_comment'])
    return (
      <div>
        {facebookCommentLogics && !facebookCommentLogics.isEmpty() && logicItemKeys.map(key => (
          <div key={key.get('key')}>
            <h2 dangerouslySetInnerHTML={{__html: facebookCommentLogics.getIn([key.get('key'), 'title'])}}/>
            <div dangerouslySetInnerHTML={{__html: facebookCommentLogics.getIn([key.get('key'), 'description'])}}/>
            <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
              {facebookCommentLogics.getIn([key.get('key'), 'code'])}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    )
  }
}

export default FacebookComment