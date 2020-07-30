import React from 'react';
import SEO from '../components/SEO';
import ResumePDF from '../../static/resume.pdf';
class Resume extends React.Component {
  render() {
    return (
      <>
        <SEO
          lang="en"
          title="Mert Koseoglu Resume"
          description="Mert Koseoglu Resume"
          slug="Mert Koseoglu Resume"
          keywords={['Mert Koseoglu Resume']}
        />
        <iframe
          style={{ height: '100vh', width: '100vw', margin: '0' }}
          src={ResumePDF}
        />
      </>
    );
  }
}

export default Resume;
