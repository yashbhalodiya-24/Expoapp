import { Image, type ImageSource } from 'expo-image';
import { Dimensions } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const WindowWidth = Dimensions.get('window').width;
export const StoryListItemWidth = WindowWidth * 0.8;
export const StoryListItemHeight = (StoryListItemWidth / 3) * 4;

type StoryListItemProps = {
  imageSource: ImageSource;
  index: number;
  scrollOffset: SharedValue<number>;
};

export const StoryListItem: React.FC<StoryListItemProps> = ({
  imageSource,
  index,
  scrollOffset,
}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / StoryListItemWidth;

    const paddingLeft = (WindowWidth - StoryListItemWidth) / 4;

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1], // input range [-1 ,0 , 1]
      [120, 60, 0, -StoryListItemWidth - paddingLeft * 2], // output range
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1], // output range
      Extrapolation.CLAMP,
    );

    return {
      left: paddingLeft,
      transform: [
        {
          translateX: scrollOffset.value + translateX,
        },
        { scale },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          zIndex: -index,
        },
        rContainerStyle,
      ]}>
      <Image
        source={imageSource}
        style={{
          width: StoryListItemWidth,
          height: StoryListItemHeight,
          position: 'absolute',
          borderRadius: 25,
        }}
      />
    </Animated.View>
  );
};
