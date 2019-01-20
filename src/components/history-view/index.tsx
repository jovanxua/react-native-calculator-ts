import React, { PureComponent, createRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { CalculatorHistory } from '../../utils/interfaces';

interface CalculatorHistoryProps {
  data: CalculatorHistory;
  onClear(): void;
}

class HistoryView extends PureComponent<CalculatorHistoryProps, {}> {
  private scrollView: any = createRef();

  onContentChange = () => {
    this.scrollView.scrollToEnd({animated: true});
  }

  render() {
    const { data, onClear } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.clearCont}>
          <TouchableOpacity
            onPress={() => onClear()}
          >
            <Text style={styles.txtClear}>
              CLEAR HISTORY
            </Text>
          </TouchableOpacity>
        </View>
        { data.length > 0 ? (
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={this.onContentChange}     
          >
            {
              data.map((history, index) => (
                <View key={index} style={styles.historyCont}>
                  <View style={styles.placeHolderHistory}>
                    <View style={styles.expressionCont}>
                      <Text style={styles.txtExpression}>
                        {history.expression}
                      </Text>
                    </View>
                    <View style={styles.resultCont}>
                      <Text style={styles.txtResult}>
                        {`=${history.result}`}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </ScrollView>
          ) : (
            <View style={styles.emptyHistoryCont}>
              <Text style={styles.txtEmptyHistory}>
                NO HISTORY
              </Text>
            </View>
          )
        }
      </View>
    );
  }
};

export default HistoryView;
