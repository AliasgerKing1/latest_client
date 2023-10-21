/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import NavLinks from './shared/NavLinks'
import {KJUR} from 'jsrsasign'
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
let Meeting = () => {
  const [manageZIndex, setManageZIndex] = useState(0);

  var sdkKey = 'TQkzoP8MSQOOE0YaY_2fbg';
  var meetingNumber = '83542663136';
  var passWord = 'Y9s0wQ';
  var role = 0;
  var userName = 'React';
  var userEmail = 'aliasgersub34@gmail.com';
  var leaveUrl = 'http://localhost:3000';

  let getSignature = async (e) => {
    e.preventDefault();
  //    let obj = {
  // meetingNumber : meetingNumber,
  // role : role
  //    }
    // let result = await axios.post('http://localhost:4000', obj)
    
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: 'TQkzoP8MSQOOE0YaY_2fbg',
    mn:meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: 'TQkzoP8MSQOOE0YaY_2fbg',
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, 'mOxIcpXsoSLu9E6Ldz61rJ7MQNZDyNQ3')
    startMeeting(signature)
  }

  let startMeeting = (signature) => {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          success: (success) => {
            console.log('success', success);
            ZoomMtg.getAttendeeslist({
              success: (res) => {
                const sortedParticipants = res.result.attendeesList.sort((a, b) =>
                a.userName.localeCompare(b.userName)
                );
                localStorage.setItem('participants', sortedParticipants)
                setManageZIndex(sortedParticipants.length)
              }
            });
          },
          error: (error) => {
            console.log('error in join', error);
          }
        });
      },
      error: (error) => {
        console.log('error in init', error);
      }
    });
  }
  return (
    <div className="Meeting" style={{ display: 'flex' }}>
      <div style={{zIndex : manageZIndex == 0 ? 5 : 0}}>
    <aside style={{ flex: '1' }}>
      <NavLinks />
      </aside>
      <main style={{ flex: '3' }}>
        <h1>Zoom Meeting React</h1>
        <button style={{
           marginTop: '20px',
           backgroundColor: '#2D8CFF',
           color: '#ffffff',
           textDecoration: 'none',
           paddingTop: '10px',
           paddingBottom: '10px',
           paddingLeft: '40px',
           paddingRight: '40px',
           display: 'block',
           borderRadius: '10px',
           cursor: 'pointer',
           border: 'none',
           outline: 'none',
        }} onClick={getSignature} type="button">
          Join Meeting
        </button>
      </main>
      </div>
    </div>
  );
}

export default Meeting;
