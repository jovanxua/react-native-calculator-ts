import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';

interface NumericKeypadProps {
  onKeyPress(value: string): void;
  keyMatrix: string[][];
}

export default class NumericKeypad extends Component<NumericKeypadProps, {}> {
  //This is for optimization
  //Component should render only once
  shouldComponentUpdate(){
    return false;
  }

  // requestAnimationFrame is for optimization
  // see react native optimization tips in official docs
  onKeyPress = (value: string) => {
    const { onKeyPress } = this.props;
    requestAnimationFrame(() => {
      onKeyPress(value);
    });
  }

  render() {
    const { keyMatrix } = this.props;

    return (
      <View style={styles.container}>
        {
          keyMatrix.map((row, rowIndex: number) => (
            <View key={rowIndex} style={styles.contRow}>
              { 
                row.map((col,colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => this.onKeyPress(col)}
                    style={styles.contButton}
                  >
                    <Text style={styles.txtDefault}>{col}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          ))
        }
      </View>
    );
  }
}