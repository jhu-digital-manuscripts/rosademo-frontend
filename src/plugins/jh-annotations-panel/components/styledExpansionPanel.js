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

function StyledExpansionPanel(props) {
  const { classes } = props;
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
          <SanitizedHtml
            ruleSet='mirador2'
            htmlString={props.annotation}
            className='transcription'
            style={{ padding: '8px' }}
          />
          ;
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

StyledExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledExpansionPanel);
