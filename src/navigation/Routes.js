import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';

import BottomTabs from './BottomTabs';

const Routes = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (result) => {
    setUser(result);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  return <>{user === null ? <AuthStack /> : <BottomTabs />}</>;
};

const styles = StyleSheet.create({});

export default Routes;
