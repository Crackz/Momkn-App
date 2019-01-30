
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
    position: 'absolute', top: 20, right: 20
  },

  scrollableTabView: {
    flex: 2
  },

  tabUnderLine: {
    backgroundColor: '#0691ce',
  },

  fakeContent: {
    width: "100%",
    height: 600,
    backgroundColor: "#ccc"
  }
});

export default styles;
