import { Tooltip } from '@rneui/base';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
// import { Tooltip as RNETooltip } from 'react-native-elements';

const TOOLTIP_WIDTH = 200;
const TOOLTIP_PADDING = 105;

function MainTooltip({ popover, children, width, height, padding, visible, onOpen, onClose }) {
  const [tooltipHeight, setToolHeight] = useState(105)
  const TOOLTIP_WIDTH = width || 200;
  const TOOLTIP_HEIGHT = height || 105;
  const TOOLTIP_PADDING = padding || 10;

  function renderHiddenBoxToGetHeight() {
    return (
      <View
        style={[
          { width: TOOLTIP_WIDTH, padding: TOOLTIP_PADDING },
          styles.tooltipHiddenBox,
        ]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setToolHeight(height)
        }}
      >
        <View style={styles.tooltipHiddenText}>
          {popover}
        </View>
      </View>
    );
  }

  return (
    <Tooltip
      visible={visible}
      width={TOOLTIP_WIDTH}
      height={TOOLTIP_HEIGHT}
      withOverlay={true}
      popover={popover}
      withPointer={false}
      containerStyle={{}}
      onClose={onClose}
      onOpen={onOpen}
    >
      {children}
      {/* {renderHiddenBoxToGetHeight()} */}
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  tooltipHiddenBox: {
    position: 'absolute',
    right: 10000000000,
  },
  tooltipHiddenText: {
    color: 'transparent',
  },
});

export default MainTooltip;
