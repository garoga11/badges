import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BadgesStack from './src/components/badgesScreen/BadgesStack';


const App = () => {
  return (
    <NavigationContainer>
      <BadgesStack></BadgesStack>
    </NavigationContainer>
  );
};

export default App;
