import React from 'react';
import profilePic from '../assets/profile-pic.png';
import BeerMugs from '../assets/beer-mugs.svg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Mert Koseoglu`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ display: 'flex', flexDirection: 'column', maxWidth: 310 }}>
          <span>
            Personal blog by{' '}
            <a href="https://twitter.com/mksglu">Mert Koseoglu</a>
          </span>
          <span style={{ display: 'flex' }}>
            <span style={{}}>[object Object]</span>
            <img
              src={BeerMugs}
              style={{
                height: rhythm(0.7),
                width: rhythm(1.1),
                marginTop: rhythm(0.15),
              }}
            ></img>
          </span>
        </p>
      </div>
    );
  }
}

export default Bio;
