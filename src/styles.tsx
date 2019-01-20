import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#2c3e50',
  },

  contHistory:{
    flex: 0.35,
    borderBottomWidth: 1,
    borderColor: '#364d63',
  },

  contOutput:{
    flex: 0.25,
    backgroundColor: '#34495e',
  },

  contButtons:{
    flex: 0.4,
  },

  placeHolderOutput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingLeft: 15
  },

  txtDefault: {
    color: '#ecf0f1',
    fontFamily: 'Helvetica-Light',
    fontSize: 30
  }
});

export default styles;
