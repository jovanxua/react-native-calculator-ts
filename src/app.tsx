import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
//Custom Components
import NumericKeypad from './components/numeric-keypad';
import HistoryView from './components/history-view';
// styles
import styles from './styles';
// shared typescript interface
import { CalculatorHistory } from './utils/interfaces';


//constants
const initialOutput = '0';
const maxLength = 57;
const keyMatrix = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '+'],
  ['.', '0', '=','-']
];

interface AppState {
  outputString: string;
  history: CalculatorHistory;
}

export default class App extends Component<{}, AppState> {
  constructor(props: any){
    super(props);
    this.state = {
      outputString: initialOutput,
      history: [],
    }
  }

  onKeyPress = (value: string) => {
    const { outputString } = this.state;

    // NOT A NUMBER OR DECIMAL (.)
    if(!isNaN(+value) || value === keyMatrix[4][0]){ 
      this.concatToOutput(value);
    }
    else{
      switch(value) {
        case keyMatrix[0][0]: // CLEAR
          return this.initOutput();

        case keyMatrix[0][1]: // DEL
          if (outputString.length === 1){
            return this.initOutput();
          }
          return this.replaceLastChar('');

        case keyMatrix[4][2]: // EQUALS
          return this.evaluateExpression();

        default:
          if(isNaN(+outputString.slice(-1))){
            return this.replaceLastChar(value)
          }
          return this.concatToOutput(value);
      }
    }
  }
  
  //Function to concat user input to output screen
  concatToOutput = (value: string) => {
    const { outputString } = this.state;
    if(outputString.length >= maxLength) {
      this.showToast('Maximum Expression Length of ' + maxLength + ' is reached.');
    }
    else{
      if(outputString !== initialOutput){
        this.setState({ outputString: `${outputString}${value}` });
      }
      else{
        this.setState({ outputString: value })
      }
    }
  }

  //Function to replace the last index of the output
  replaceLastChar = (value: string) =>
    this.setState({ outputString: this.state.outputString.replace(/.$/,value) });

  //Validate and Calculate the output state as a Mathematical expression
  evaluateExpression = () => {
    try{
      const { outputString, history } = this.state;
      if(isNaN(+outputString)){
        let result = eval(this.strToMathExp(outputString));

        this.setState({
          outputString: `${result}`,
          history: [...history, { result, expression: outputString }],
        });
      }
    }
    catch(exception){
      this.showToast('Invalid format used.');
    }
  }

  //Function to convert the output state into a valid mathematical expression
  strToMathExp = (value: string) => {
    let strTemp = value.replace(new RegExp(this.escapeRegExp(keyMatrix[1][3]), 'g'), '/');
    strTemp = strTemp.replace(new RegExp(this.escapeRegExp(keyMatrix[2][3]), 'g'), '*');
    return strTemp;
  }

  escapeRegExp = (str: string) => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  //Function to initialize output state
  initOutput = () => this.setState({ outputString: initialOutput });

  //Function to clear the history
  clearHistory = () => this.setState({ history: [] });

  //Function to display an android toast
  showToast = (value: string) => {
    if (Platform.OS === 'ios') {
      return Alert.alert(
        'Error',
        value,
        [{text: 'OK', onPress: () => {}}],
        { cancelable: false }
      );
    }
    return ToastAndroid.show(value, ToastAndroid.SHORT);
  }

  render() {
    const { history, outputString } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contHistory}>
          <HistoryView
            data={history}
            onClear={this.clearHistory}
          />
        </View>
        <View style={styles.contOutput}>
          <View style={styles.placeHolderOutput}>
            <Text style={styles.txtDefault}>
              {outputString}
            </Text>
          </View>
        </View>
        <View style={styles.contButtons}>
          <NumericKeypad
            onKeyPress={this.onKeyPress}
            keyMatrix={keyMatrix}
          />
        </View>
      </SafeAreaView>
    );
  }
}