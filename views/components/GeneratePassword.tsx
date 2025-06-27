
import Clipboard from '@react-native-clipboard/clipboard';
import CheckBox from 'react-native-check-box';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';

type GeneratePasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'GeneratePassword'
>;

const GeneratePassword = ({navigation}: GeneratePasswordProps) => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);


  useEffect(() => {
    generatePass();

  }, [passwordLength, includeSymbols, includeNumbers]);

  const generatePass = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) {
      charset += '012345678901234567890123456789';
    }
    if (includeSymbols) {
      charset += '!@#$%^&*()_+!@#$%^&*()_+';
    }
    let retVal = '';
    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  };

  const copyToClipboard = () => {
    Clipboard.setString(password);
    ToastAndroid.show('Password copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
      <><StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        {/* color mode switcher */}
        <CheckBox
          style={{
            padding: 5,
            paddingVertical: 10,
            marginHorizontal: 2,
            backgroundColor: 'gray',
            borderRadius: 2,
          }}
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
          isChecked={isDarkMode}
          leftText={'Dark Mode'}
          leftTextStyle={{color: isDarkMode ? Colors.white : Colors.black}}
        />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[
          backgroundStyle,
          {
            height: '100%',
          },
        ]}>
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
                width: '100%',
                flex: 1,
                textAlign: 'center',
              },
            ]}>
            Password Generator
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              {marginTop: 30, color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            password
          </Text>

          <TextInput
            style={[
              styles.textBox,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}
            placeholder="password"
            readOnly={true}
            value={password}
          />
          <Text
            style={[
              styles.sectionDescription,
              {marginTop: 0, color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            password length
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              // marginVertical: 10,
            }}>
            <Slider
              style={{width: 280, height: 40}}
              minimumValue={8}
              maximumValue={72}
              step={1}
              value={passwordLength}
              onValueChange={value => setPasswordLength(value)}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{color: isDarkMode ? Colors.white : Colors.black}}>
                {passwordLength}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginVertical: 10,
            }}>
            <CheckBox
              style={[
                {
                  flex: 1,
                  padding: 5,
                  paddingVertical: 10,
                  marginHorizontal: 2,
                  backgroundColor: 'gray',
                  borderRadius: 2,
                },
                isDarkMode
                  ? {backgroundColor: 'gray'}
                  : {backgroundColor: Colors.lighter},
              ]}
              onClick={() => {
                setIncludeNumbers(!includeNumbers);
              }}
              isChecked={includeNumbers}
              leftText={'Include Numbers'}
              leftTextStyle={{color: isDarkMode ? Colors.white : Colors.black}}
            />
            <CheckBox
              style={[
                {
                  flex: 1,
                  padding: 5,
                  paddingVertical: 10,
                  marginHorizontal: 2,
                  backgroundColor: 'gray',
                  borderRadius: 2,
                },
                isDarkMode
                  ? {backgroundColor: 'gray'}
                  : {backgroundColor: Colors.lighter},
              ]}
              onClick={() => {
                setIncludeSymbols(!includeSymbols);
              }}
              isChecked={includeSymbols}
              leftText={'Include Symbols'}
              leftTextStyle={{color: isDarkMode ? Colors.white : Colors.black}}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Button
              title="Copy to Clipboard"
              onPress={() => copyToClipboard()}
            />
          </View>
        </View>
      </ScrollView></>
    // {/* </SafeAreaView> */}
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    marginVertical: 10,
  },
});

export default GeneratePassword;
