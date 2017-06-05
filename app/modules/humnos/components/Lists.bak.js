'use strict';


import React, { Component } from 'react';
import { InteractionManager, View, ListView, VirtualizedList, Text, ActivityIndicator, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { List } from 'immutable';

import * as configs from '../../../constants/configs';
import { connect } from 'react-redux';

import BackButton from '../../../components/icons/BackButton';
import EmptyItem from '../../../components/EmptyItem';
import Row from './Row';
import Detail from './Detail';


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
            ds : new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                getRowData: (dataBlob, sID, rID) => dataBlob[sID].get(rID)
            }),
            //data: List([]),
            data: [],
            loading: true,
            loadingFooter: false,
            loading2: false,
        }

        this.requestAnimationFrame = requestAnimationFrame.bind(this);

        this.goToDetail = this.goToDetail.bind(this);

        this.renderFooter = this.renderFooter.bind(this);
        this.renderItem = this.renderItem.bind(this);

    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false, 
                loadingFooter: false,
                //data: this.props.humnos.get('lists'),
                data: this.props.humnos.get('lists').toArray()
                //ds: this.state.ds.cloneWithRows(this.props.humnos.get('lists'), this.props.humnos.get('lists').keySeq().toArray())

            });
        });
    }
    
    

    componentWillReceiveProps(nextProps) {

        if( nextProps.lagu.get('status') === 'GET_LIST_DONE' )
        {
            this.requestAnimationFrame(() => {
                this.setState({
                    loading: false, 
                    loadingFooter: false,
                    ds: this.state.ds.cloneWithRows(nextProps.lagu.get('lists'), nextProps.lagu.get('lists').keySeq().toArray())

                });
            });
            
        }

    }

    goToDetail(item, index) {
        InteractionManager.runAfterInteractions(() => {

            this.props.toRoute({
                name: 'Detail',
                component: Detail,
                hideNavigationBar: true,
                passProps: { item: item, current_index: index }
            })
        });
    }
    

    renderFooter() {

        return <View style={{paddingBottom: 50}} />;        
    }

    renderRow = (item: Object, sectionID, rowID) => {

        var background = ( item.id % 2 ) === 0 ? '#FFFFFF' : '#FAFAFA';

        return (
            
            <Row key={rowID} background={background} data={item} onPress={() => this.goToDetail(item, rowID) } />
        
        );

    };

    renderItem({ item, index }) {

        //console.log(item);

        var background = ( index % 2 ) === 0 ? '#FFFFFF' : '#FAFAFA';

        return (

            <Row key={index} background={background} data={item} onPress={() => this.goToDetail(item, rowID) } />
            
        
        );
    }

    getValueFromKey(key, data) {
        return data.get ? data.get(key) : data[key];
    }
  

    render() {


        if( !this.state.loading )
        {   
            
            /*
            var content = (this.state.ds.getRowCount() === 0) ?
                <EmptyItem text="Belum ada lagu"/> :
                <ListView
                  style={styles.contentContainer}
                  initialListSize={10}
                  scrollRenderAheadDistance={250}
                  pageSize={10}
                  removeClippedSubviews={true}
                  dataSource={this.state.ds}
                  renderRow={this.renderRow}
                  renderFooter={this.renderFooter}/>;
            */

            var content = (this.props.humnos.get('lists').size === 0) ?
                <EmptyItem text="Belum ada lagu"/> :
                <VirtualizedList
                  style={styles.contentContainer}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  data={this.state.data}
                  //getItem={(items, index) => this.getValueFromKey(index, items)}
                  getItemCount={(items) => (items.size || items.length || 0)}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.renderItem}
                  renderFooter={this.renderFooter}/>;
            

            return (
                
                <View style={styles.container}>
                    {content}
                </View>
                    
                
            );

        }
        
        
        return (
            <View style={configs.styles.center}>
                <ActivityIndicator size="large" style={[configs.styles.center, configs.styles.large]} />
            </View>
        );
        

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0'
    },
    contentContainer: {
        marginTop: 5
    }
});

export default connect(state => ({
    humnos: state.get('humnos')
})
)(Lists);












