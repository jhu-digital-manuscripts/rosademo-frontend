import React, { Component } from 'react';
import StyledExpansionPanel from './styledExpansionPanel';
import { Map, Markerm, Popup, TileLayer } from 'react-leaflet';
/**
 * Render an annotation body. Specifics of how it is rendered may
 * depend on the properties of the annotation body, such as type,
 * format, etc
 *
 * We could break out different annotation 'purposes' into separate
 * components if we think it would help.
 *
 * props: {
 *    body: { ... }
 *  }
 */

export default class AnnotationBody extends Component {
  constructor(props) {
    super(props);
    this.state = { georef: Object, position: ['', ''] };
    this.getGeorefMapData = this.getGeorefMapData.bind(this);
  }

  getGeorefMapData(georefUrl) {
    fetch(georefUrl, { method: 'GET' })
      .then((result) => result.json())
      .then((data) => {
        this.setState({ georef: data, position: data.reprPoint });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { body } = this.props;

    let content;

    if (body.purpose === 'tagging') {
      content = (
        <>
          <div>
            <span style={{ fontStyle: 'italic' }}>Tag: </span>
            <span>{body.value}</span>
          </div>
        </>
      );
    } else if (body.purpose === 'commenting') {
      content = (
        <>
          <div>
            <span style={{ fontStyle: 'italic' }}>Comment: </span>
            <span>{body.value}</span>
          </div>
        </>
      );
    } else if (body.purpose === 'identifying') {
      let georefUrl;
      if (body.source != undefined && body.source.includes('pleiades')) {
        georefUrl = body.source + '/json';
        this.getGeorefMapData(georefUrl);
      }
      content = (
        <Map
          center={this.state.position}
          zoom={13}
          style={{ height: '250px' }}
        ></Map>
      );
      // content = (
      //   <div>
      //     <a href={body.source} target='_blank'>
      //       {body.source}
      //     </a>
      //   </div>
      // );
    } else if (body.type === 'TextualBody') {
      if (body.language === 'en') {
        content = (
          <StyledExpansionPanel
            title='Translation'
            annotation={body.value}
          ></StyledExpansionPanel>
        );
      } else if (body.language) {
        content = (
          <div className='transcription' style={{ paddingTop: '8px' }}>
            {body.value}
          </div>
        );
      }
    }

    return <div className='annotation-body'>{content}</div>;
  }
}
