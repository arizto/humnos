import React, { PureComponent } from 'react'; 
import { View, StyleSheet, Image, Text } from 'react-native';

import * as configs from '../constants/configs';

class Info extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.textInfo}>Aplikasi ini atas inisiatif</Text>
                    <Text style={styles.textInfo}>Sinode Gereja Eleos Indonesia</Text>
                    <Image source={require('../images/logo_info.png')} style={styles.imgInfo} resizeMode={'contain'}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0E0E0'
    },
    infoContentContainer: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        width: configs.dimension.width - 10,
        height: configs.dimension.height - 135,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        borderRadius: 2
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: configs.color.font.secondary,
        margin: 10
    },
    textInfo: {
        textAlign: 'center',
        fontSize: 18,
        //color: '#455A64',
        color: configs.color.font.dark,
        marginTop: 10,
    },
    imgInfo: {
        width: 150,
        height: 150,
        marginTop: 10,
        marginBottom: 10
    }
});

export default Info;