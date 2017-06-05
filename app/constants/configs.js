import { Dimensions, StyleSheet } from 'react-native';

export const server = 'http://api.vivaeleos.org';
export const server_api = server+'/';

//export const server = 'http://192.168.1.3';
//export const server_api = server+'/gk/api/';

export const dbDebug = false;

export const dimension = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export const color = {
	themes: {
		dark: '#0D47A1',
		primary: '#1976D2',
		light: '#64B5F6',
		accent: '#607D8B',
		accent_secondary: '#FFC400',
		divider: '#BDBDBD'
	},
	font: {
		primary: '#FFFFFF',
		secondary: '#757575',
		dark: '#212121',
		accent: '#FFC400'
	},
	icon : {
		primary: '#FFFFFF',
		secondary: '#757575',
		dark: '#212121'
	}
};


export const styles = StyleSheet.create({
	headerPrimary: {
		backgroundColor: color.themes.primary,
		height: 50, 
		justifyContent: 'center', 
		alignItems:'center'
	},
	headerTitle: {
		backgroundColor: color.themes.dark,
		alignSelf: 'center'
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
	    marginTop: 50,
	    paddingTop: 15,
	    paddingBottom: 15,
	    backgroundColor: '#FFD600',
	    justifyContent: 'center'
  	},
  	textBtn: {
	    textAlign: 'center',
	    fontSize: 20,
	    fontWeight: 'bold',
	    color: '#FFFFFF'
  	},
	large: {
	    transform: [{scale: 1.5}]
  	},
  	loadingContainer: {
	    position: 'absolute',
	    top: 0,
	    width: dimension.width,
	    height: dimension.height,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'rgba(0,0,0,0.4)'
  	},
  	textTitle: {
  		fontSize: 18,
  		color: color.font.primary

  	},
  	textContent: {
  		fontSize: 16,
  		color: color.font.primary
  	}
});