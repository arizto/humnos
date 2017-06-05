'use strict';


import React, { Component } from 'react';
import { InteractionManager, View, ListView, ScrollView, RefreshControl, Text, Share, ActivityIndicator, StyleSheet } from 'react-native';
import { List } from 'immutable';
import { NavigationActions } from 'react-navigation'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import * as configs from '../../../constants/configs';

import BackButton from '../../../components/icons/BackButton';
import EmptyItem from '../../../components/EmptyItem';
import Card from './Card';
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
            loading: true,
            loadingFooter: false,
            loading2: false,
            refreshing: false,
            openLink: true,
            update: false
        }

        this.goToDetail = this.goToDetail.bind(this);
        this.requestAnimationFrame = requestAnimationFrame.bind(this);

        this.renderFooter = this.renderFooter.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        
    }

    componentDidMount() {

        //console.log('list embun pagi mount')
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false, 
                loadingFooter: false,
                update: true,
                ds: this.state.ds.cloneWithRows(this.props.embunPagi.get('lists'), this.props.embunPagi.get('lists').keySeq().toArray())
            });

        });

    }

    componentWillUnmount(){
        this.props.navigation.state.params.routes.actions.setStatus('IDLE')
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        if( nextState.update ) {
            return true
        }
        return true
    }
    */


    componentWillReceiveProps(nextProps) {
        
        if( nextProps.embunPagi.get('status') === 'GET_LIST_DONE' )
        {
            
            this.props.actions.setIdle();

            this.setState({
                loading: false, 
                loadingFooter: false,
                update: true,
                ds: this.state.ds.cloneWithRows(nextProps.embunPagi.get('lists'), nextProps.embunPagi.get('lists').keySeq().toArray())
            });          
            
            
        } else if( nextProps.embunPagi.get('status') === 'GET_UPDATE_DONE' ) {

            this.props.actions.setIdle();
            //console.log(nextProps.embunPagi.get('lists').toArray());
            this.setState({
                refreshing: false,
                update: true,
                ds: this.state.ds.cloneWithRows(nextProps.embunPagi.get('lists'), nextProps.embunPagi.get('lists').keySeq().toArray())
            });            
            
        }

        if( nextProps.navigation.state.params ) {
            if(nextProps.navigation.state.params.from === 'Detail')
                this.setState({openLink: true, update: false})
        }

    }

    goToDetail(item) {

        if( this.state.openLink )
            InteractionManager.runAfterInteractions(() => {
                this.setState({openLink: false, update: true});
                this.props.navigation.navigate('EmbunDetail',{item: item, key: this.props.navigation.state.key})
            });

        return
    }

    onShare(item) {
        this.setState({loading2: true, update: true})

        Share.share({
            message: item.content,
            title: item.title
        }, {
            dialogTitle: 'Share Embun Pagi',
            tintColor: configs.color.font.dark
        })
        .then(this.setState({loading2: false, update: true}))
        .catch((error) => this.setState({loading2: false, update: true}));
    }

    _onScroll() {
        if( this.refs.listview.scrollProperties.offset + (this.refs.listview.scrollProperties.contentLength / 2 ) + 800 >= this.refs.listview.scrollProperties.contentLength  ) {
            this.refs.listview.requestAnimationFrame(() => { 
                //InteractionManager.runAfterInteractions(() => {
                this._onEndReached();
                //});
            });
        }
    }

    _onEndReached() {

        if( this.props.embunPagi.get('next') !== null && !this.state.loadingFooter )
        {
            this.setState({loadingFooter: true, update: true}); 
            this.props.actions.gets();
        }
          
    }

    _onRefresh() {
        
        if( !this.state.refreshing ) {
            this.setState({refreshing: true});
            if( this.props.embunPagi.get('lists').size > 0 ) {
                this.props.actions.getUpdate()
            } else {
                this.props.actions.gets(true)
            }
                
        }
        
    }

    renderLoading() {

        if( this.state.loading2 )
        { 
            return (
                <View  style={configs.styles.loadingContainer}>
                  <ActivityIndicator size="large" style={[ configs.styles.center, configs.styles.large]} color={'grey'}/>
                </View>
            );
          
        }

    }
    
    renderHeader() {

        if ( !this.state.refreshing ) {
            return <View/>;
        }        
        return (
            <View style={{alignItems: 'center', paddingTop: 75}} />
        );
    }

    renderFooter() {

        if ( !this.state.loadingFooter ) {
            return <View style={{paddingBottom: 10}} />;
        }
        
        return (
            <View style={{alignItems: 'center',justifyContent: 'center', paddingBottom: 10, paddingTop: 10}}>
                <ActivityIndicator size="large" color={configs.color.themes.primary}/>
            </View>
        );

    }

    renderRow = (item: Object, sectionID, rowID) => {
        return (
            
            <Card key={item.ep_id} data={item} onPress={() => this.goToDetail(item) } onShare={() => this.onShare(item) } />
        
        );
    };


    render() {
        
        if( !this.state.loading )
        {   
            
            var content = (this.state.ds.getRowCount() === 0) ?
                <ScrollView
                  style={styles.contentContainer}
                  initialListSize={6}
                  scrollRenderAheadDistance={250}
                  pageSize={6}
                  refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={[configs.color.themes.primary]}
                        onRefresh={this._onRefresh.bind(this)}/>
                  }
                  removeClippedSubviews={true}>
                  <EmptyItem text="Belum ada isi" height={configs.dimension.height - 75}/> 
                </ScrollView>
                :
                <ListView
                  ref="listview"
                  style={styles.contentContainer}
                  initialListSize={6}
                  scrollRenderAheadDistance={250}
                  pageSize={6}
                  removeClippedSubviews={true}
                  onScroll={this._onScroll}
                  refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={[configs.color.themes.primary]}
                        onRefresh={this._onRefresh.bind(this)}/>
                  }
                  dataSource={this.state.ds}
                  //onEndReached={this._onEndReached} 
                  //onEndReachedThreshold={0.5}
                  renderRow={this.renderRow}
                  renderHeader={this.renderHeader.bind(this)}
                  renderFooter={this.renderFooter}/>;
            

            return (
                
                <View ref='viewKu' style={styles.container}>
                    {content}
                    {this.renderLoading()}
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
        
    }
});

export default connect(state => ({
    embunPagi: state.get('embunPagi')
}),
(dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
})
)(Lists);












