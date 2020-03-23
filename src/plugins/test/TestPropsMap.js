import mirador from 'mirador';

export function mapStateToProps(state, { windowId }) {
  return {
    // canvas: mirador.selectors.getSelectedCanvases(state, windowId)
    canvas: mirador.selectors.getVisibleCanvases(state, windowId)
  };
};

export const mapDispatchToProps = {
  // receiveAnnotation: mirador.actions.receiveAnnotation
};
