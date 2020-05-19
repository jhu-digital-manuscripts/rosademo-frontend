import React from 'react';
import PropTypes from 'prop-types';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import {
  ExpansionPanelSummary,
  withStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';

const styles = (theme) => ({
  root: {
    padding: '0px',
    '&$expanded': {
      minHeight: '48px',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    '&$expanded': {
      margin: '0px',
    },
  },
  expanded: { color: '#3F51B5' },
});

function content() {

}

function StyledExpansionPanel(props) {
  const { classes } = props;
  let className;
  let annotationContent;
  const annotation = props.annotation;
  if (typeof annotation === 'string') {
    className = 'stringAnno';
    annotationContent = (
      <SanitizedHtml
        ruleSet='mirador2'
        htmlString={props.annotation}
        style={{ padding: '8px' }}
      />
    );
  } else if (typeof annotation === 'object') {
    className = 'mapAnno';
    annotationContent = annotation;
  }
  return (
    <div className={classes.root}>
      <ExpansionPanel
        square={true}
        style={{
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          boxShadow: 'none',
        }}
      >
        <ExpansionPanelSummary
          classes={{
            root: classes.root,
            content: classes.content,
            expanded: classes.expanded,
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.root }}>
          <div className={className}>{annotationContent}</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

StyledExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledExpansionPanel);
