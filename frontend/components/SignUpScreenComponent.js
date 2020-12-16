import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState }  from 'react'
import { connect } from 'react-redux'
import { addNewUser, removeError } from '../features/signup/signUpSlice'
import store from '../redux/store';

const mapStateToProps = state => {
  return { 
    loading: state.signup.loading,
    error: state.signup.error,
    user :{
      firstname: state.signup.firstname,
      lastname: state.signup.lastname,
      email: state.signup.email,
      password: state.signup.password,
      password2: state.signup.password2,
    }
  };
};

const mapDispatchToProps = dispatch => ({
  addNewUser: (user) => dispatch(addNewUser(user)),
  removeError: () => dispatch(removeError()),
})

const ShowErrorModal = ({error, removeError}) => {

  const data = {error}
  if (data.error != ''){
    useEffect(() => {
      removeError()
    }, [removeError]);
     Alert.alert(
      'There is an error.',
      data.error,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
    );
  }
  return (
    <Text></Text>
  )
}

class SignUpScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          navigation: this.props.navigation,
          isLoading: store.getState().signup.loading,
        };
        this.removeError = this.removeError.bind(this);
    }

    removeError(){
      this.props.removeError()
    }

    showError(title,error){
        Alert.alert(
            title,
            error,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
          );
    }

    validatePassword(password){
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return reg.test(password);
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    inputValidation(user){
        if (user.firstname == ''){
            this.showError('Validation Error', 'Firstname can\'t be empty.')
            return 0
        }  
        if (user.lastname == ''){
            this.showError('Validation Error', 'Lastname can\'t be empty.')
            return 0
        }
        if (user.email == ''){
            this.showError('Validation Error', 'Email can\'t be empty.')
            return 0
        }
        if (user.email == ''){
            this.showError('Validation Error', 'Email can\'t be empty.')
            return 0
        }
        if (this.validateEmail(user.email) == false){
            this.showError('Validation Error', 'Invalid email format.')
            return 0
        }
        if (user.password == ''){
            this.showError('Validation Error', 'Password can\'t be empty.')
            return 0
        }
        if (this.validatePassword(user.password) == false){
            this.showError('Validation Error', 
            `Password needs to contain: \n-At least 1 uppercase character.\n-At least 1 lowercase character.\n-At least 1 digit.\n-At least 1 special character.\n-Minimum 8 characters.`)
            return 0
        }
        if (user.password2 == ''){
            this.showError('Validation Error', 'Re-enter the password.')
            return 0
        }
        if (user.password2 != user.password){
            this.showError('Validation Error', 'The password is not matching.')
            return 0
        }
       this.props.addNewUser(user);
    }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up! </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Firstname" 
            placeholderTextColor="#999999"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                firstname: text
              }
            }))}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            on
            style={styles.inputText}
            placeholder="Lastname" 
            placeholderTextColor="#999999"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                lastname: text
              }
            }))}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#999999"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                email: text.replace(/\s/g, '')
              }
            }))}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#999999"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                password: text
              }
            }))}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Re-enter password" 
            placeholderTextColor="#999999"
            onChangeText={text => this.setState( prevState => ({
              user: {
                ...prevState.user,
                password2: text
              }
            }))}/>
        </View>
        
        <TouchableOpacity onPress={() => this.inputValidation(this.state.user)} style={styles.loginBtn}>
          <Text style={styles.submitText}>SUMBIT</Text>
        </TouchableOpacity>
        {store.getState().signup.loading  && <ActivityIndicator color={"#000"} />}
        <ShowErrorModal removeError ={this.removeError} error={store.getState().signup.error}/>

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
    fontSize:18,
    height:50,
    color:"black"
  },
  forgot:{
    color:"black",
    fontSize:11
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
  submitText:{
    color:"white"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);