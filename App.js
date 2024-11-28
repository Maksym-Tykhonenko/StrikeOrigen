import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, AppState, Animated, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContextProvider} from './store/context';
import TabContainer from './TabNavigation/TabContainer';
import {
  StackAllCollectionsScreen,
  StackCreateCollectionScreen,
  StackCollectionDetailsScreen,
  StackItemDetailsScreen,
  WelcomeScreen,
} from './screen/stack';
import StackCreateCollectionItemScreen from './screen/stack/StackCreateCollectionItemScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
  ////////////////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <ContextProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              //backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/bg/Loader1.png')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/bg/Loader2.png')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Tab" component={TabContainer} />
            <Stack.Screen
              name="StackAllCollectionsScreen"
              component={StackAllCollectionsScreen}
            />
            <Stack.Screen
              name="StackCreateCollectionScreen"
              component={StackCreateCollectionScreen}
            />
            <Stack.Screen
              name="StackCollectionDetailsScreen"
              component={StackCollectionDetailsScreen}
            />
            <Stack.Screen
              name="StackCreateCollectionItemScreen"
              component={StackCreateCollectionItemScreen}
            />
            <Stack.Screen
              name="StackItemDetailsScreen"
              component={StackItemDetailsScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </ContextProvider>
  );
};

export default App;
