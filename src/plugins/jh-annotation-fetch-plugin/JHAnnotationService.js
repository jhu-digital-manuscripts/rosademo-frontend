import { fetchAnnotationPage } from './webAnnotationUtils';

/**
 * 
 * @param {array} canvas list of IIIF Canvas objects
 * @param {function} receiveAnnotation callback to invoke to announce when an
 *                                      AnnotationPage has been received
 */
export function getRosaWebAnnotations(canvases, receiveAnnotation) {
  console.assert(
    Array.isArray(canvases),
    'JHAnnotationService#getRosaWebAnnotations: property "canvases" must be an array'
    );

  if (!Array.isArray(canvases)) {
    return;
  }

  canvases.forEach((canvas) => {
    const iiifUrl = canvas.id;
    const annoUrl = iiifUrl.replace(/\/iiif\/|\/iiif3\//, '/wa/');

    fetchAnnotationPage(annoUrl).then((results) => {
      if (!results) {
        return;
      }

      if (!Array.isArray(results)) {
        // TODO: Here we can select our TEI XML fragments to be processed
        /*
         * As far as TEI XML processing, XSLT is still probably the simplest solution.
         * Once the XML string is parsed into a Document, you should be able to apply an XSL
         * stylesheet to it to transform it into HTML. We should probably then change the
         * annotation's format to 'text/html'?
         *
         * XSLT processing in browser (WARNING: non-standard browser feature, check compatibility tables)
         *    https://developer.mozilla.org/en-US/docs/Web/API/XSLTProcessor
         *
         * TEI Stylesheets
         *    https://github.com/TEIC/Stylesheets
         *    https://github.com/jhellingman/tei2html
         *
         * Otherwise, we can look at using this tool again
         *    https://github.com/TEIC/CETEIcean
         *
         * Or this random tool
         *    https://github.com/TEI-Boilerplate/TEI-Boilerplate
         *
         */
        // if (Array.isArray(results.body) && results.body.some(b => b.format === 'application/xml')) {
        //   const xmlBody = results.body.find(b => b.format === 'application/xml'); // Assumes only 1 body has XML format
        //   const xml = xmlBody.value;
        //   _parseXml(xml);
        // }
        results = [results];
      }

      const annoPage = {
        id: annoUrl,
        type: 'AnnotationPage',
        canvas: iiifUrl,
        items: results
      };

      // console.log(`%cMoo! iiifUrl: ${iiifUrl}, annoUrl: ${annoUrl}`, 'color:blue;');
      // console.log(annoPage);
      receiveAnnotation(iiifUrl, annoUrl, annoPage);
    });
  });
}