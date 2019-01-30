
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

  divider: {
    height: 5,
    borderStyle: "solid",
    borderColor: "#8c8b8b",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 5
  }
});

export default styles;
