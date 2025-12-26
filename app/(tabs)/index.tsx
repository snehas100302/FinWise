import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // 🔹 Typing text state
  const fullText = 'Welcome back to FinWise';
  const [typedText, setTypedText] = useState('Sneha');//useState('') is react hook to render components when state changes
  const [booleanflag, setbooleanflag] = useState(false);
  // 🔹 State for Average Score
  const [avgScore, setAvgScore] = useState<number | null>(null);

  // 🔹 Animations for UI
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // 🔹 Run UI animation on screen load
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 8000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 8000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔹 Typing effect logic
  useEffect(() => {
    let index = 0;
    //console.log("state: ", typedText)
    const interval = setInterval(() => {
      setTypedText(typedText + " " + fullText.slice(0, index + 1));

      index++;
      if (index === fullText.length) {
        clearInterval(interval);

      }
    }, 50); // typing speed

    // return () => clearInterval(interval);
  }, [booleanflag]);

  useEffect(() => {
    console.log('typedText state:', typedText);


  }, [typedText]);

  useEffect(() => {
    console.log(fadeAnim, slideAnim);

  }, [slideAnim, fadeAnim]);

  // 🔹 Generate random average score
  const generateAvgScore = () => {
    const randomScore = Math.floor(Math.random() * 101);
    setAvgScore(randomScore);
    // setbooleanflag(!booleanflag);
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/quiz');
  };

  return (
    <LinearGradient
      colors={['#05152fff', '#5AA9FF']}
      style={styles.container}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }, { translateY: slideAnim }],
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.greeting}>Hi 👋</Text>

        {/* Typing Effect Text */}
        <Text style={styles.welcome}>{typedText}</Text>

        {/* Get Started Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Avg Score Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { marginTop: 16 }]}
          onPress={generateAvgScore}
        >
          <Text style={styles.buttonText}>Avg Score</Text>
        </TouchableOpacity>

        {/* Score Card */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }],
            },
          ]}
        >
          <Text style={styles.cardTitle}>📊 Average Score</Text>

          <Text style={styles.score}>
            {avgScore !== null ? avgScore : '--'}
          </Text>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcome: {
    fontSize: 18,
    color: '#E0E8FF',
    marginBottom: 40,
    minHeight: 22, // prevents UI jump
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#2E7DFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: '100%',
    padding: 24,
    borderRadius: 18,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#777',
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2E7DFF',
  },
});
