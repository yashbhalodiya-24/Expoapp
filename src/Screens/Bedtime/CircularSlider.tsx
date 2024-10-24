import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";
import { Audio } from 'expo-av';
import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "../../Component/time/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

const CircularSlider = ({ start, end }: CircularProps) => {
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );

  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    async function loadAndPlaySound() {
      try {
        await sound.current.loadAsync(require('./path-to-your-sound-file.mp3'));
        await sound.current.playAsync();
      } catch (error) {
        console.log('Error loading or playing sound:', error);
      }
    }

    loadAndPlaySound();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const p1 = startPos.value;
    const p2 = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });

  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              stroke="#fff000"
              strokeWidth={STROKE}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} />
        <Cursor pos={endPos} />
      </Svg>
      <Gesture start={start} end={end} startPos={startPos} endPos={endPos} />
    </View>
  );
};

export default CircularSlider;
