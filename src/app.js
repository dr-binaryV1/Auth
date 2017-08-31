import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';

import { Header, Spinner } from './components/common'; 
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBLlQia17sOE2rIWpQ_CEX17sMskjjSD_M",
            authDomain: "auth-e1d8a.firebaseapp.com",
            databaseURL: "https://auth-e1d8a.firebaseio.com",
            projectId: "auth-e1d8a",
            storageBucket: "auth-e1d8a.appspot.com",
            messagingSenderId: "759228895957"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Button
                        onPress={() => firebase.auth().signOut()} 
                        title="Log Out">
                        Log Out 
                     </Button>
                );
            case false: 
                return <LoginForm />
            default:
                return <Spinner size="large" />
        } 
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;