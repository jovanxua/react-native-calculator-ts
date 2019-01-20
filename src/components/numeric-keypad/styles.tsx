/**************************************************************
 *  FileName:           styles.js
 *  Description:        Custom Calculator Number Keyboard component styles
 *  Copyright:          jovanxua©2018
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2018-01-02

 *  Modification History:
        Date              By            Description

**************************************************************/
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  txtDefault: {
    color: '#ecf0f1',
    fontFamily: 'Helvetica-Light',
    fontSize: 20
  },

  contRow: {
    flex: 1,
    flexDirection: 'row',
  },

  contButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#364d63'
  }
});

export default styles;
