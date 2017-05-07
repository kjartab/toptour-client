import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = { 
  right:30,
  position:"absolute",
  bottom:30,
  zIndex:200
};

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
const FloatingActionButtonExampleSimple = () => (
  <div> 
    <FloatingActionButton secondary={true} style={style}>
      <ContentAdd />
    </FloatingActionButton> 
  </div>
);

export default FloatingActionButtonExampleSimple;