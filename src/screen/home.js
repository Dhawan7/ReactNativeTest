import React, { Component } from 'react';
import {
    View, Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AppState,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Input, Item, Icon, Toast, Container } from 'native-base';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

// actions of reducers 
import { getEmpList, addEmp } from '../store/reducers/emp/actions'

// importing styles 
import styles from './styles';


class Home extends Component {
    static navigationOptions = {
        title: 'Employees List',
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            name: '',
            age: '',
            salary: '',
            errorColor: 'red',
            errorAge: false,
            errorName: false,
            errorSalary: false,
            appState: AppState.currentState,
            isConnected: false,
        };
    }



    componentDidMount = () => {

        AppState.addEventListener('change', this.handleAppStateChange);

        this.unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({
                isConnected: state.isConnected
            }, () => {
                this.getEmpListData();
            })
        });

    };

    // saving data to local memory
    saveData() {
        if (this.state.name == '') {
            Toast.show({
                text: 'Please enter name'
            })
            this.setState({
                errorName: true,
                errorAge: false,
                errorSalary: false
            })
            return false
        }
        if (this.state.salary == '') {
            Toast.show({
                text: 'Please enter salary'
            })
            this.setState({
                errorSalary: true,
                errorAge: false,
                errorName: false
            })
            return false
        }
        if (this.state.age == '') {
            Toast.show({
                text: 'Please enter age'
            })
            this.setState({
                errorAge: true,
                errorName: false,
                errorSalary: false
            })
            return false
        }
        this.refs.addModal.close()
        let data = {
            "name": this.state.name,
            "salary": this.state.salary,
            "age": this.state.age
        }

        let pendingEmpList = []
        AsyncStorage.getItem('pending_list')
            .then((res) => {
                if (res != null) {
                    pendingEmpList = JSON.parse(res);
                    pendingEmpList.push(data)
                    console.log('adding to async storage', data);
                    AsyncStorage.setItem('pending_list', JSON.stringify(pendingEmpList))
                }
                else {
                    pendingEmpList.push(data)
                    console.log('adding to async storage', data);
                    AsyncStorage.setItem('pending_list', JSON.stringify(pendingEmpList))
                }
            })

        this.setState({
            name: '',
            salary: '',
            age: ''
        })
    }


    // Emp List Get Fn 
    async getEmpListData() {
        this.setState({
            refreshing: this.props.empLoading
        })
        if (this.state.isConnected) {
            this.props.dispatch(getEmpList());
        }
        else {
            Toast.show({
                text: 'No Internet Connection',
                type: 'danger'
            })
        }
        console.log(this.props.empList)

        this.setState({
            refreshing: false
        })
    }

    handleAppStateChange = nextAppState => {
        if (nextAppState == 'active') {
            this.getEmpListData();
        }
        console.log('next app state', nextAppState)

        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);

        });

        this.setState({ appState: nextAppState });
    };

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.unsubscribe();
    }

    render() {
        return (
            <Container>
                <SafeAreaView style={{ flex: 1 }}>
                    {this.props.empList.length > 0 ? (
                        <FlatList
                            data={this.props.empList}
                            renderItem={({ item }) => this.renderItems(item)}
                            keyExtractor={item => item.id + ''}
                            onRefresh={() => this.getEmpListData()}
                            refreshing={this.state.refreshing}
                        />
                    ) : (
                            <View style={styles.noEmpView}>
                                <Text style={styles.noEmpText}>
                                    No Employee Found
                                </Text>
                            </View>
                        )}

                    {/* Floating Button  */}
                    <TouchableOpacity style={styles.floatingButton}
                        onPress={() => this.refs.addModal.open()}>
                        <Icon
                            name={'plus'}
                            type={'MaterialCommunityIcons'}
                            style={{
                                color: '#fff',
                                fontSize: 30
                            }}
                        />
                    </TouchableOpacity>

                    {/* Modal Box  */}
                    <Modal style={styles.modal}
                        backdrop={true}
                        backdropColor={'black'}
                        position={"center"}
                        ref={"addModal"}
                        coverScreen={true}
                        backdropPressToClose={false}
                    >

                        <Text style={styles.modalHeading}>Add Employee</Text>
                        <Item rounded style={{
                            width: '85%',
                            borderColor: this.state.errorName ? this.state.errorColor : '#000'
                        }}>
                            <Input
                                placeholder={'Enter name'}
                                style={styles.input}
                                placeholderTextColor={'#000'}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </Item>
                        <Item rounded
                            style={{
                                width: '85%',
                                marginTop: 25,
                                borderColor: this.state.errorSalary ? this.state.errorColor : '#000'
                            }}>
                            <Input
                                placeholder={'Enter salary'}
                                style={styles.input}
                                placeholderTextColor={'#000'}
                                keyboardType={'numeric'}
                                value={this.state.salary}
                                onChangeText={(salary) => this.setState({ salary })}
                            />
                        </Item>
                        <Item rounded style={{
                            width: '85%',
                            marginTop: 25,
                            borderColor: this.state.errorAge ? this.state.errorColor : '#000'
                        }}>
                            <Input
                                placeholder={'Enter age'}
                                style={styles.input}
                                placeholderTextColor={'#000'}
                                keyboardType={'numeric'}
                                value={this.state.age}
                                onChangeText={(age) => this.setState({ age })}
                            />
                        </Item>


                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => this.saveData()}>
                            <Text style={{
                                color: '#fff',
                                marginVertical: 15
                            }}>
                                SAVE
                        </Text>
                        </TouchableOpacity>

                        {/* Close modal Btn */}
                        <TouchableOpacity style={styles.closeModalBtn}
                            onPress={() => this.refs.addModal.close()}>
                            <Icon name={'close'}
                                type={'MaterialCommunityIcons'}
                            />
                        </TouchableOpacity>
                    </Modal>
                    {/* Modal Ends  */}

                    {/* Net Connection Check  */}
                    {!this.state.isConnected &&
                        <View style={styles.noInternetView}>
                            <Text style={styles.noInternet}>No internet connection </Text>
                        </View>
                    }
                </SafeAreaView>
            </Container>
        );
    }

    // rendering List 
    renderItems(item) {
        return (
            <View style={styles.listBox} key={item.id} >
                <Text style={styles.listText}>Employee Name :- {item.employee_name}</Text>
                <Text
                    style={styles.listText} >
                    Employee Salary :- {item.employee_salary}
                </Text>
                <Text
                    style={styles.listText} >
                    Employee Age :- {item.employee_age}
                </Text>
            </View>
        )
    }
}

// Reducer State 
const mapStateToProps = state => {
    const {
        empList,
        empLoading,
        empData
    } = state.EmpReducer;
    return {
        empList,
        empLoading,
        empData
    }
}


export default connect(mapStateToProps)(Home)

