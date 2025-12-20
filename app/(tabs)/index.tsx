import { Text as CustomText } from '@/components/text';
import { Text } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <>
      <Text style={{ margin: 60, fontSize: 36, color: "#ae19e9ff", fontFamily: "Rye_400Regular" }}>
        Welcome to FinWise!
      </Text>

      <CustomText size="logo" weight="regularFontRye" color="#ae19e9ff" style={{ margin: 60 }}>
        Welcome to FinWise!
      </CustomText>
    </>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
