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
            <div dangerouslySetInnerHTML={{__html: `Tạo một phần Custom HTML ở vị trí mong muốn hiển thị Facebook comment, thay thế link "http://test.edumall.vn" bằng landingpage của mình, sau đó copy đoạn mã dưới vào`}}/>
            <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
              {`<div id="fb-root"></div>
<div class="fb-comments row" data-href="http://test.edumall.vn" data-numposts="5" data-width="100%"></div>`}
            </SyntaxHighlighter>

            <div dangerouslySetInnerHTML={{__html: `Chèn đoạn code sau vào phần Javascript:`}}/>
            <SyntaxHighlighter language='html' style={tomorrowNightEighties}>
              {`<script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=781404068653965";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>`}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    )
  }
}

export default FacebookComment