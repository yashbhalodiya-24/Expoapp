import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
} from "../../Screens/Bedtime/Constants";

import Label from "../../Component/time/Label";

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2B2D",
    borderRadius: 16,
    padding: PADDING,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duration: {
    fontFamily: "SFProRounded-Medium",
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "white",
  },
});

const Container = ({ start, end, children }: ContainerProps) => {
  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    return formatDuration2(radToMinutes(d));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="Pikup Time" icon="address-card-o" />
        <Label theta={end} label="Drop Time" icon="location-arrow" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

export default Container;
