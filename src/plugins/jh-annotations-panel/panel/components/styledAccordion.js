import React from 'react';
import PropTypes from 'prop-types';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import {
  AccordionSummary,
  withStyles,
  Accordion,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

function StyledAccordion(props) {
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
      <Accordion
        square={true}
        style={{
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          classes={{
            root: classes.root,
            content: classes.content,
            expanded: classes.expanded,
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.root }}>
          <div className={className}>{annotationContent}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

StyledAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledAccordion);
