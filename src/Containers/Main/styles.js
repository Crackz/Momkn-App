
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#F1FAEE'
  },

  logo: {
    flex: 2,
  },

  settingButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    textAlign: "center"
  },

  scrollableTabView: {
    flex: 2,

  },
  tabText: {
    textAlign: "center",
    paddingTop: 5,
  },
  tabUnderLine: {
    backgroundColor: '#0691ce',
  },


});

export default styles;
