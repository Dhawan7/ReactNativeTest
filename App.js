import React, { Component } from 'react';
import AppNavigator from './src/routes/stackNavigation';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import BackgroundService from '@mauron85/react-native-background-geolocation';
import { addEmp } from './src/store/reducers/emp/actions'
import AsyncStorage from '@react-native-community/async-storage';

// Configuring Store 
import configureStore from './src/store';
const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      syncMessage: 'Syncing'
    };

    console.disableYellowBox = true;
  }

  componentWillMount = () => {
    BackgroundService.checkStatus(status => {
      if (status.isRunning) {
        BackgroundService.stop();
      }
    });
  }

    componentDidMount = () => {
      BackgroundService.configure({
        desiredAccuracy: BackgroundService.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background Syncing',
        notificationText: this.state.syncMessage,
        debug: false,
        startOnBoot: true,
        stopOnTerminate: true,
        locationProvider: BackgroundService.ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,        
      });
  
      BackgroundService.on('location', () => {
  
        BackgroundService.startTask(taskKey => {    
          
          this.addLocalDataToServer()
            .then((res) => {
  
              if (res) {                
                BackgroundService.endTask(taskKey);
                BackgroundService.stop();   
              }
            })
        });
      });
  
  
      BackgroundService.on('start', () => {
        console.log('[INFO] BackgroundService service has been started');
      });
  
      BackgroundService.on('stop', () => {
        console.log('[INFO] BackgroundService service has been stopped');
      });
  
      BackgroundService.on('authorization', (status) => {
        console.log('[INFO] BackgroundService authorization status: ' + status);
        if (status !== BackgroundService.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
            setTimeout(() =>
              Alert.alert('App requires location permission', 'Would you like to open app settings?', [
                { text: 'Yes', onPress: () => BackgroundService.showAppSettings() },
                { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
              ]), 1000);
        }
      });
  
      BackgroundService.on('background', () => {
        console.log('[INFO] App is in background');
        BackgroundService.start();
      });
  
      BackgroundService.on('foreground', () => {
        console.log('[INFO] App is in foreground');
        BackgroundService.stop();
      });
  
      BackgroundService.on('abort_requested', () => {
        console.log('[INFO] Server responded with 285 Updates Not Required');
        BackgroundService.stop();
      });
  
      BackgroundService.on('http_authorization', () => {
        console.log('[INFO] App needs to authorize the http requests');
      });
  
      BackgroundService.checkStatus(status => {
        console.log('[INFO] BackgroundService service is running', status.isRunning);
        console.log('[INFO] BackgroundService services enabled', status.locationServicesEnabled);
        console.log('[INFO] BackgroundService auth status: ' + status.authorization);

      });
    };


  // Updating data from local to server   
  addLocalDataToServer() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('pending_list')
        .then((res) => {
          if (res != null) {
            let empList = JSON.parse(res);
            for (a in empList) {
              store.dispatch(addEmp(empList[a]))
            }
            this.setState({
              syncMessage: 'Sync successful'
            })
            AsyncStorage.removeItem('pending_list')
            resolve(true);
          }
          else {
            this.setState({
              syncMessage: 'Sync successful'
            })
            resolve(true);
          }
        })
    })
  }

  componentWillUnmount() {
    BackgroundService.removeAllListeners();
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigator />
        </Root>
      </Provider>
    );
  }

}
