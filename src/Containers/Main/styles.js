
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  settingsMenu: {
    position: 'absolute',
    top: 20,
    right: 20,
    textAlign: "center",
    zIndex: 1
  },

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
  contactIcons: {
    backgroundColor: '#F1FAEE',

  },
  scrollableTabView: {
    flex: 2,
    backgroundColor: "#F1FAEE"
  },
  tabText: {
    textAlign: "center",
    paddingTop: 5,
  },
  tabUnderLine: {
    backgroundColor: '#F1FAEE',
  },



});

export default styles;
