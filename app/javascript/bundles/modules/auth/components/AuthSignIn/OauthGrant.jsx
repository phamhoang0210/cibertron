import React from 'react'
import {Link} from 'react-router'


class OauthGrant extends React.Component{

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ boxShadow: '5px 1px 1px #e6e3e3',borderRadius: '10px',width: '500px', paddingBottom: '50px', position: 'fixed', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fffafa', textAlign: 'left'}}>
                <div style={{borderBottom: '1px solid #e8e5e5', textAlign: 'center'}}><h1 style={{fontSize: '35px'}}>Authorization</h1></div>
                <p style={{marginLeft: '30px'}}>ews would like to perform action on your behalf and access your information</p>
                <ul>
                    {this.props.scope.split(',').map((a, idx) => <li key={idx}>{a}</li>)}
                </ul>
                <Link href={this.props.url+"state=allow"} style={{display: 'inline-block' ,outline: 'none' ,margin: '60px 30px 0 50px',color: 'white', backgroundColor: '#3584c2', border: 'none', padding: '10px 50px', borderRadius: '20px'}}>Allow</Link>
                <Link href={this.props.url+"state=deny"} style={{display: 'inline-block' ,outline: 'none' ,margin: '60px 30px 0 30px', color: 'white', backgroundColor: '#df5d55', border: 'none', padding: '10px 50px', borderRadius: '20px'}}>Deny</Link>
            </div>
        );
    }
}

export default OauthGrant;