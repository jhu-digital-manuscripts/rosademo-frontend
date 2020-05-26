import React, { Component } from 'react';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import StyledExpansionPanel from './styledExpansionPanel';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
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

  componentDidMount() {
    const { body } = this.props;
    let georefUrl;
    if (body.purpose === 'identifying') {
      if (body.source != undefined && body.source.includes('pleiades')) {
        georefUrl = body.source + '/json';
        this.getGeorefMapData(georefUrl);
      }
    }
  }

  getGeorefMapData(georefUrl) {
    fetch(georefUrl, { method: 'GET' })
      .then((result) => result.json())
      .then((data) => {
        this.setState({ georef: data, position: data.reprPoint });
      })
      .catch((error) => {
        console.log('Error fetching map data', error);
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
    } else if (
      body.purpose === 'identifying' &&
      this.state.position !== ['', '']
    ) {
      //console.log(this.state.position);
      // let georefUrl;
      // if (body.source != undefined && body.source.includes('pleiades')) {
      //   georefUrl = body.source + '/json';
      //   this.getGeorefMapData(georefUrl);
      // }
      content = (
        <Map
          center={this.state.position}
          zoom={5}
          style={{ height: '250px' }}
          scrollWheelZoom={false}
          touchZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {/* <Marker position={this.state.position}>
            <Popup>Ayy</Popup>
          </Marker> */}
        </Map>
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
          <SanitizedHtml
            ruleSet='mirador2'
            htmlString={body.value}
            className='transcription'
          />
        );
      }
    }

    return <div className='annotation-body'>{content}</div>;
  }
}
