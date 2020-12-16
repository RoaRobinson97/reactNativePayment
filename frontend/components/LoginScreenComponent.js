import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { validateUser, validateUserAsync } from '../features/login/loginSlice'
import store from '../redux/store';

const mapStateToProps = state => {
  return { status: state.login.status};
};

const mapDispatchToProps = dispatch => ({
  validateUser: (user) => dispatch(validateUser(user)),
  validateUserAsync: (user) => dispatch(validateUserAsync(user)),
})

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      user :{
        email: '',
        password: ''
      }
    };
  }
    
  validate(user){
    this.props.validateUser(user)
    console.log(store.getState().login.user)
    console.log(store.getState().login.status)
    if (store.getState().login.status == 'connected'){
      this.props.navigation.navigate('Main',  { transition: 'horizontal' });
    }
  } 

  signUp(){
    this.props.navigation.navigate('SignUp',  { transition: 'horizontal' });
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>SmartPago </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                email: text
              }
            }))}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                password: text
              }
            }))}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.validate(this.state.user)} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.signUp()} style ={styles.signup}>
          <Text style={styles.loginText}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor: "#eeeeee",
    borderRadius:100,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"black",
    fontSize:12
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"black"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);