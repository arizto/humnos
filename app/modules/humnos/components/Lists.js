'use strict';


import React, { Component } from 'react';
import { InteractionManager, View, FlatList, Animated, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { List } from 'immutable';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import * as configs from '../../../constants/configs';

import BackButton from '../../../components/icons/BackButton';
import EmptyItem from '../../../components/EmptyItem';
import Row from './Row';
import Detail from './Detail';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class Lists extends Component {

    
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <BackButton onPress={() => navigation.goBack()} color={configs.color.font.accent}/>
            ),
        }
    }


    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            loading: true,
            loadingFilter: false,
            loading2: false,
            openLink: true,
            filterText: '',
            index: 0
        }

        this.goToDetail = this.goToDetail.bind(this);

        this._onEndReached = this._onEndReached.bind(this);

        this.renderItem = this.renderItem.bind(this);
        

    }

    _listRef: FlatList<*>;

    componentDidMount() {

        //console.log('list humnos mount')

        InteractionManager.runAfterInteractions(() => {
            this.props.actions.filterByID(true);
        });

    }


    componentWillReceiveProps(nextProps) {
        
        if( nextProps.humnos.get('status') === 'FILTER_DONE' )
        {
            //InteractionManager.runAfterInteractions(() => {
                this.props.actions.setIdle();

                this.setState({
                    loading: false, 
                    loadingFilter: false,
                    data: nextProps.humnos.get('filter').get('data').toArray(),
                    

                });
            //});
            
        }

        if( nextProps.navigation.state.params ) {
            if(nextProps.navigation.state.params.from === 'Detail')
                this.setState({openLink: true})
        }

    }

    componentWillUnmount(){
        this.props.navigation.state.params.routes.actions.setStatus('IDLE')
    }
    

    goToDetail(item) {
        if( this.state.openLink )
            InteractionManager.runAfterInteractions(() => {
                this.setState({openLink: false});
                this.props.navigation.navigate('HumnosDetail',{item: item, key: this.props.navigation.state.key})
            });

        return
    }


    filterLagu(text) {
        
        this.setState({loading: true, loadingFilter: true})
        //this.setState({loadingFilter: true})
        requestAnimationFrame(() => {
            //console.log(text)
            if( text !== '' && text !== ' ' ) {
                this.props.actions.filterByText(text)
            }
            else {
                this.props.actions.filterByID(true)
            }
       });
    }


    _onEndReached(distance) {
        
        if( !this.state.loadingFilter && this.props.humnos.get('filter').get('next') > 0 && !this.props.humnos.get('filter').get('text') )
        {
                //console.log('end reached');
                this.setState({loadingFilter: true})
                this.props.actions.filterByID()
            
        }

    }

    _onScroll(e) {
       if(e.nativeEvent.contentOffset.y > (configs.dimension.height ) - 100 ) {
            InteractionManager.runAfterInteractions(() => {
                this._onEndReached();
            });
       }
    }


    _getItemLayout = (data: any, index: number) => {
        return {length: 60, offset: ( 60 + 5 ) * index, index: index  }
    };

    renderFooter() {

        return <View style={{paddingBottom: 50}} />;

    }


    renderItem(data) {

        var background = ( data.index % 2 ) === 0 ? '#FFFFFF' : '#FAFAFA';

        return (

            <Row key={data.item.id} background={background} data={data.item} onPress={() => this.goToDetail(data.item) } />
                
        );
    }
  

    render() {

        
        if(this.state.loading) {
            var content = <View style={configs.styles.center}>
                                <ActivityIndicator size="large" style={[configs.styles.center, configs.styles.large]} />
                            </View>;
        }
        else {
            var content = (this.props.humnos.get('filter').get('data').size === 0) ?
                <EmptyItem text="Belum ada lagu"/> :
                <FlatList
                    ref={(ref) => { this._listRef = ref } }
                    style={styles.contentContainer}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    data={this.props.humnos.get('filter').get('data').toArray()}
                    extraData={this.state.data}
                    onScroll={this._onScroll.bind(this)}
                    keyExtractor={(item, index) => String(index)}
                    getItemLayout={this._getItemLayout}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    windowSize={51}
                    //onEndReachedThreshold={20}
                    //onEndReached={({distanceFromEnd}) => this._onEndReached(distanceFromEnd)}
                    renderItem={ data => this.renderItem(data) }/>;
        }

        return (
            
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    textInputRef='textSearch'
                    containerStyle={{backgroundColor: configs.color.themes.primary,borderTopWidth: 0}}
                    onChangeText={(text) => this.filterLagu(text)}
                    clearIcon={{ color: '#86939e', name: 'close', style: {paddingLeft: 10, paddingRight: 5, paddingTop: 2} }}
                    placeholder='nomor / judul' />
                {content}
            </View>
                
            
        );
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#E0E0E0'
    },
    contentContainer: {
        
    }
});

export default connect(state => ({
    humnos: state.get('humnos')
}),
(dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
})
)(Lists);












