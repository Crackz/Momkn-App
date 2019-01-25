
import { Platform, StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';


const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F1FAEE",
    flexDirection: 'column'
  },

  header: {
    flex: 1,
    backgroundColor: '#F1FAEE',
    // width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: 'transparent',
    paddingTop: (Metrics.HEIGHT * 0.16),
    elevation: 0
  },
  left: {
    flex: 1,
  },

  body: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    flex: 1
  },

  // headerTitle: {
  //   color: 'white',
  //   fontFamily: Fonts.type.SFUIDisplayBold,
  //   paddingTop: (Platform.OS === 'ios') ? 15 : 0,
  //   fontSize: 17,
  //   letterSpacing: 0.7,
  //   marginVertical: (Metrics.HEIGHT * 0.01)
  // },
  profile: {
    flexDirection: "row",
    backgroundColor: '#F1FAEE',
    width: Metrics.WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#2d324f',
    ...Platform.select({
      ios: {
        padding: 5,
      },
      android: {
        padding: 20
      }
    }),
  },


  imgview: { width: (Metrics.WIDTH) * 0.042, },


  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: (Metrics.WIDTH * 0.025),
    marginVertical: (Metrics.HEIGHT * 0.015),
    paddingBottom: (Metrics.HEIGHT * 0.030),
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-between'
  },

  rowMain: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: (Metrics.WIDTH * 0.445),
    height: (Metrics.WIDTH * 0.445),
    alignItems: 'center',
    margin: (Metrics.WIDTH * 0.015),
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  imageBG: {
    width: (Metrics.WIDTH * 0.445),
    height: (Metrics.WIDTH * 0.445)
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
    marginLeft: (Metrics.WIDTH * 0.03),
    marginRight: (Metrics.WIDTH * 0.04)
  },

  profileContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: (Metrics.HEIGHT * 0.01)
  },

  profileImg: {
    width: (Metrics.WIDTH * 0.065),
    height: (Metrics.WIDTH * 0.065),
    borderRadius: (Metrics.WIDTH * 0.0325),
    borderWidth: 1,
    borderColor: "#FFFFFF",
    resizeMode: 'cover',
  },
  tabUnderLine: {
    backgroundColor: '#0691ce',
  },
  tabUnderLineTrans: {
    backgroundColor: 'transparent'
  },
  roundedButton: {
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.2)',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 40,
    // height: 40,
    // backgroundColor: '#fff',
    // borderRadius: 100,
  }
});

export default styles;
