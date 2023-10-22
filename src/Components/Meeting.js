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
  var leaveUrl = 'https://latest-client-9h1e.vercel.app/';

  let getSignature = async (e) => {
    e.preventDefault();
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
                localStorage.setItem('participants', JSON.stringify(res.result.attendeesList))
                setManageZIndex(res.result.attendeesList.length)
              }
            });
            ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
              console.log('inMeetingServiceListener onUserJoin', data);
              
// Retrieve the current array from localStorage
let myArray = JSON.parse(localStorage.getItem('participants'));

// Check if the array exists. If not, initialize it
if (!myArray) {
  myArray = [];
}

// Push the new object into the array
myArray.push(data);

// Set the updated array back into localStorage
localStorage.setItem('participants', JSON.stringify(myArray));
            });
            ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
              console.log('inMeetingServiceListener onUserLeave', data);
              
              // Retrieve the current array from localStorage
              let myArray = JSON.parse(localStorage.getItem('participants'));
            
              // Check if the array exists. If not, initialize it
              if (!myArray) {
                myArray = [];
              }
            
              // Find the index of the user in the array
              let index = myArray.findIndex(user => user.userId === data.userId);
            
              // If the user is found in the array, remove them
              if (index !== -1) {
                myArray.splice(index, 1);
              }
            
              // Set the updated array back into localStorage
              localStorage.setItem('participants', JSON.stringify(myArray));
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
        <h1 style={{color : '#fff'}}>Zoom Meeting React</h1>
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
