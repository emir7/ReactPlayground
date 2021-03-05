import React, {useState} from 'react';
import { 
    StyleSheet, 
    SafeAreaView 
} from 'react-native';

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (<AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => setDataLoaded(true)} 
              onError={(err) => console.log(err)} />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
    setGameOver(false);
  };

  const restartGameHandler = () => {
    setGameOver(false);
    setGuessRounds(0);
    setUserNumber();
  };

  const handleGameOverValue = (objInfo) => {
    setGameOver(true);
    setGuessRounds(objInfo.guessRounds);
  }

  let content = <StartGameScreen startGameHandler={startGameHandler} />;

    
  if(userNumber) {
    content = (<GameScreen 
                userChoice={userNumber} 
                onGameOver={handleGameOverValue}  />);
  }

  if(gameOver) {
    content = (<GameOver 
                nRounds={guessRounds} 
                userNumber={userNumber} 
                onStartNewGame={restartGameHandler} />);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
