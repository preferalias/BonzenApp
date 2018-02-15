import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Dimensions, TouchableHighlight, ActivityIndicator, FlatList, Image, ImageBackground} from 'react-native';
import Modal from 'react-native-modal';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Moment from 'moment';

import { Icon } from 'react-native-elements';

const GLOBAL = require("../../../../Globals")
const Equip = 'equipment'
const Area = 'area'
const Customer = 'customer'

var screen = Dimensions.get('window');

export default class ServicesList extends React.Component{
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
        headerTitle: 'Services',
        title: 'Services',
        headerLeft: null,
        headerRight: (<TouchableOpacity onPress={() => params.handleFilter()}> 
        <Icon name='menu' color='white' containerStyle={{paddingRight:15}} />
        </TouchableOpacity>),
        tabBarIcon : ({tintColor}) => (<Icon name="list" size={30} color={tintColor} />),
        }
    }

    constructor(){
        super();
        this.state = {
            modalVisible: false,
            ddlAreaVisible: false,
            ddlEquipVisible: false,
            ddlCustomerVisible: false,
            equipPicked: null,
            areaPicked: null,
            customerPicked: null,
            equipData : [],
            areaData : [],
            customerData: [],
            equipLabelPicked: null,
            areaLabelPicked: null,
            customerLabelPicked: null,
            data: [],
            isLoaded: false,
        };
    }

    fetchPickerData(method, stateName){
        var form = new FormData();
        form.append('method', method);
        var keyName;
        var labelName;
        var searchKeyName;
        switch(stateName){
            case "equipData" :
                keyName = "equipID" ;
                labelName = "equipCode" ;
                searchKeyName = "equipName" ;
                break;
            case "areaData" :
                keyName = "areaID" ;
                labelName = "areaCode" ;
                searchKeyName = "areaName" ;
                break;
            case "customerData" : 
                keyName = "customerID" ;
                labelName = "customerName" ;
                searchKeyName = "customerNameEn" ;
                break;
            default: 
                keyName = "unknown" ;
                labelName = "unknown" ;
                searchKeyName = "unknown" ; 
        }

        fetch(GLOBAL.SITE_URL, {
          method: 'POST' ,
          headers: {
            'token' : 'JH59',
          },
          body : form
        })
          .then((response) => response.json())
          .then((response) => {
            this.setState({[stateName]: response, isLoaded: true,},
            function(){this.convertToPickerObj(this.state[stateName],keyName,labelName,searchKeyName,stateName)} )})
          .catch((err) => alert(err)
          );
    }

    getPickerData(method,stateName) {
        return Promise.all([this.fetchPickerData(method,stateName)])
    }

    onEquipShow = () => {
        this.setState({ddlEquipVisible: true})
    }
    onAreaShow = () => {
        this.setState({ddlAreaVisible: true})
    }
    onCustomerShow = () => {
        this.setState({ddlCustomerVisible: true})
    }
    
    onEquipSelect(key){
        this.setState({
            equipPicked: key,
            ddlEquipVisible: false,
        })
    }
    onAreaSelect = (picked) => {
        this.setState({
            areaPicked: picked,
            ddlAreaVisible: false,
        })
    }
    onCustomerSelect = (picked) => {
        this.setState({
            customerPicked: picked,
            ddlCustomerVisible: false,
        })
    }

    onAreaCancel = () => {
        this.setState({
            ddlAreaVisible: false,
        })
    }
    onEquipCancel = () => {
        this.setState({
            ddlEquipVisible: false,
        })
    }
    onCustomerCancel = () => {
        this.setState({
            ddlCustomerVisible: false,
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({handleFilter: this.openFilter})
        this.fetchPickerData("GetEquipment","equipData");
        this.fetchPickerData("GetAreaTree", "areaData");
        this.fetchPickerData("GetCustomer", "customerData");
    }
    
    openFilter = () => {
        if (this.state.modalVisible) {
            this.setState({modalVisible: false,})
        } else {
            this.setState({modalVisible: true,})
        }
    }

    convertToPickerObj(obj,key, label,searchKey, stateName) {
        var jsonObj = JSON.stringify(obj);
        var parsed = JSON.parse(jsonObj, function(k,v){
            if (k === label)
                this.label = v;
            else if ( k === searchKey)
                this.searchKey = v;
            else if (k === key)
                this.key = v;
            else
                return v;
        });
        this.setState({
            [stateName]: parsed
        })
    }
    
    clearControl(stateName) {
        this.setState({
            [stateName]: null,
        })
    }
    onSubmit = () => {
        var equipLabel = this.state.equipPicked;
        var areaLabel = this.state.areaPicked;
        var customerLabel = this.state.customerPicked;
        this.setState({
            modalVisible: false,
            equipLabelPicked : equipLabel,
            areaLabelPicked: areaLabel,
            customerLabelPicked: customerLabel, 
        }
    )
        var form = new FormData();
        form.append('method', 'GetServiceRecords');
        if (equipLabel) { form.append('equipID', equipLabel) }
        if (areaLabel) { form.append('areaID', areaLabel) } 
        if (customerLabel) {form.append('reportID', customerLabel)} 

        fetch(GLOBAL.SITE_URL, {
            method: 'POST' ,
            headers: {
              'token' : 'JH59',
            },
            body : form
          })
            .then((response) => response.json())
            .then((response) => {
              this.setState({data: response},
              )})
            .catch((err) => alert(err)
            );
        
    }
    
    _ddlRender(rowData, methodName) {
        var selectMethod ;
        switch(methodName){
            case Equip : selectMethod = this.onEquipSelect.bind(this); break;
            case Area : selectMethod = this.onAreaSelect.bind(this); break;
            case Customer : selectMethod = this.onCustomerSelect.bind(this); break;
        }
     return(
            <TouchableOpacity activeOpacity={0.7}
                style={styles.optionStyle}
                onPress={() => selectMethod(rowData.key)}
            >
                <Text style={styles.optionTextStyle}>{rowData.label}</Text>
                <Text>{rowData.searchKey}</Text>
            </TouchableOpacity>
        )
    }

    GetLabelbyKey(label, stateName){
        var returnStr = '';
        switch(label){
            case Equip : 
                this.state[stateName] == null ? 
                    returnStr = "Select Equipment" : 
                    returnStr = this.state.equipData.find(o => o.key == this.state[stateName]).label 
                break;
            case Area :
                this.state[stateName] == null ? 
                    returnStr = "Select Area Tree" : 
                    returnStr = this.state.areaData.find(o => o.key == this.state[stateName]).label 
                break;
            case Customer : 
                this.state[stateName] == null ? 
                    returnStr = "Select Customer" : 
                    returnStr = this.state.customerData.find(o => o.key == this.state[stateName]).label 
                break;
        }
        return returnStr
    }

    _renderItem = ({item}) => (
        <MyListItem item={item} />
    )

    _keyExtractor = (item, index) => item.serv_id;

    render(){
        return (
            <View style={styles.container}>
                <Modal
                    isVisible={this.state.modalVisible}
                    transparent={true}
                    backdropColor={'black'}
                    backdropOpacity={0.7}
                    onBackdropPress={this.openFilter}
                    style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.headerCon}>
                            <Text style={styles.headerText}>FILTER</Text>
                        </View>
                        <ModalFilterPicker
                                    visible={this.state.ddlEquipVisible}
                                    onSelect={this.onEquipSelect}
                                    onCancel={this.onEquipCancel}
                                    listContainerStyle={styles.listContainer}
                                    options={this.state.equipData}
                                    placeholderText='Search Equipment..'
                                    renderOption={(rowData) => this._ddlRender(rowData,Equip)}
                            /> 
                        <ModalFilterPicker
                                visible={this.state.ddlAreaVisible}
                                onSelect={this.onAreaSelect}
                                onCancel={this.onAreaCancel}
                                listContainerStyle={styles.listContainer}
                                options={this.state.areaData}
                                renderOption={(rowData) => this._ddlRender(rowData,Area)}
                                placeholderText='Search Area Tree..'
                        /> 
                        <ModalFilterPicker
                                visible={this.state.ddlCustomerVisible}
                                renderOption={(rowData) => this._ddlRender(rowData,Customer)}
                                onSelect={this.onCustomerSelect}
                                onCancel={this.onCustomerCancel}
                                listContainerStyle={styles.listContainer}
                                options={this.state.customerData}
                                placeholderText='Search Customer..'
                        />  
                        <View style={styles.controlCon}>
                            <TouchableOpacity activeOpacity={0.6} onPress={this.onEquipShow} style={styles.ddlCon} >
                                <View style={styles.ddlTextCon}>
                                    <Text style={styles.ddlText}>{this.GetLabelbyKey(Equip, 'equipPicked')}</Text>
                                </View>
                                <View style={styles.iconCon}>
                                    <Icon name="keyboard-arrow-down" size={30} color="#939393" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clearCon} onPress={() => this.clearControl('equipPicked')} >
                                    <Icon name="cancel" size={25} color="#939393" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controlCon}>
                        <TouchableOpacity activeOpacity={0.6} onPress={this.onAreaShow} style={styles.ddlCon} >
                            <View style={styles.ddlTextCon}>
                                <Text style={styles.ddlText}>{this.GetLabelbyKey(Area, 'areaPicked')}</Text>
                            </View>
                            <View style={styles.iconCon}>
                                <Icon name="keyboard-arrow-down" size={30} color="#939393" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearCon} onPress={() => this.clearControl('areaPicked')}>
                                    <Icon name="cancel" size={25} color="#939393" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.controlCon}>
                        <TouchableOpacity onPress={this.onCustomerShow} activeOpacity={0.6} style={styles.ddlCon} >
                            <View style={styles.ddlTextCon}>
                            <Text style={styles.ddlText}>{this.GetLabelbyKey(Customer, 'customerPicked')}</Text>
                            </View>
                            <View style={styles.iconCon}>
                                <Icon name="keyboard-arrow-down" size={30} color="#939393" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearCon} onPress={() => this.clearControl('customerPicked')}>
                                    <Icon name="cancel" size={25} color="#939393" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.onSubmit} style={styles.submitButton} >
                            <Text style={{color: 'white'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Modal >
                <ImageBackground source={require('../../../../images/header.jpg')}
                        style={styles.imgCon} >
                <View style={styles.headerDetail}>
                    <View style={styles.headerTextCon}>
                        <Text style={styles.headerInsideText1}>Equipment</Text>
                        <Text style={styles.headerInsideText2}>{this.GetLabelbyKey(Equip, 'equipLabelPicked')}</Text>
                    </View>
                    <View style={styles.headerTextCon}>
                        <Text style={styles.headerInsideText1}>Area Tree</Text>
                        <Text style={styles.headerInsideText2}>{this.GetLabelbyKey(Area, 'areaLabelPicked')}</Text>
                    </View>
                    <View style={styles.headerTextCon}>
                        <Text style={styles.headerInsideText1}>Customer</Text>
                        <Text style={styles.headerInsideText2}>{this.GetLabelbyKey(Customer, 'customerLabelPicked')}</Text>
                    </View>
                </View>
                </ImageBackground>
                { this.state.isLoaded ? 
                <FlatList
                    style={{paddingTop: 20}}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    
                />
                :
                <ActivityIndicator style={{backgroundColor:'rgba(0,0,0,0.0)', marginTop: 20}} size="small" color="black" />
                } 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCon: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#939393',
        padding: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#939393',
    },
    ddlCon: {
        height: 40,
        padding: 20,
        width: '67%',
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        borderColor: '#d3d3d3',
        flexDirection: 'row',
        marginVertical: 10,
        marginRight: 10,
    },
    modalContainer: {
        height: 370,
        width: screen.width - 80,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderRadius: 20,
        shadowRadius: 10,
        backgroundColor: 'white', 
    },
    listContainer: {
        padding: 4,
        paddingBottom: 7,
        marginBottom: 10,
        height: 420,
        width: screen.width -80,
        justifyContent: 'center',
        borderRadius: 20,
        shadowRadius: 10,
        backgroundColor: 'white',
    },
    iconCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 7,
    },
    ddlText: {
        color: '#bdbdbd',
    },
    ddlTextCon: {
        flex: 6,
    },
    submitButton: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
    },
    optionStyle : {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
      },
      
    optionTextStyle : {
        flex: 1,
        textAlign: 'left',
        color: '#000',
        fontSize: 18
    },
    headerDetail : {
        height: 150,
        paddingTop: 15,
        paddingLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    headerTextCon : {
        padding: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.0)'
    },
    headerInsideText1 : {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
    },
    headerInsideText2 : {
        flex: 2,
        color: 'white',
    },
    imgCon : {
        height:150,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
    },
    itemSeparator : {
        
    },
    renderItemCon : {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 3,
        height: 150,
    },
    listItemCon : {
       flex: 1,
       backgroundColor: 'white', 
       flexDirection: 'row',
       paddingHorizontal: 17,
       paddingVertical: 13,
       borderColor: '#d3d3d3',
       borderWidth: 1,
    },
    textListHeader : {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 10,
    },
    textSubHeader: {
        marginTop: 3,
        fontWeight: '600',
        fontSize: 13,
        color: '#979797',
    },
    leftListCon: {
        flex: 8,
    },
    rightListCon: {
        flex: 4,
        alignItems: 'flex-end',
    },
    timeText : {
        fontSize: 13,
        fontWeight: '500',
        color: '#979797'
    },
    clearCon : {
        height: 40,
        padding: 0,
        width: '15%',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d3d3d3',
        flexDirection: 'row',
        marginVertical: 10,
    },
    controlCon: {
        flexDirection: 'row'
    },
});

class MyListItem extends React.PureComponent {
    render() {
      return (
        <View style={styles.renderItemCon}>
            <View style={styles.listItemCon}>
            <View style={styles.leftListCon}>
                <Text style={styles.textListHeader}>{this.props.item.serv_code}</Text>
                <Text style={styles.textSubHeader}>{this.props.item.title}</Text>
                {this.props.item.equip_code ? <Text style={styles.textSubHeader}>อุปกรณ์ {this.props.item.equip_code}</Text> : <View></View>}
                {this.props.item.area_name ? <Text style={styles.textSubHeader}>พื้นที่ {this.props.item.area_name}</Text> : <View></View>}
                {this.props.item.assign_staff_name ? <Text style={styles.textSubHeader}>โดย {this.props.item.assign_staff_name}</Text> : <View></View>}
            </View> 
            <View style={styles.rightListCon}>
                <Text style={styles.timeText}>{Moment(this.props.item.report_date).calendar(null,{
                    sameDay: 'hh:mm A',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: 'dddd',
                    sameElse: 'DD/MM/YYYY'
                })}</Text>
            </View>
            </View>
        </View>
      )
    }
  }