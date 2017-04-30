import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Button,
    View,
    AppRegistry
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class SearchForm extends Component {

    constructor(props) {
        super(props);

        // Etats
        this.state = {
            lieu : '',
            voyageurs : '',
            du : '',
            au : '',
            loaderSubmit : false,
            showErrorSizeLieu : false,
            showErrorSizeVoyageurs : false,
            showErrorSizeDu : false,
            showErrorSizeAu : false,
            showErrorDate : false,
            showErrorNow : false
        };

        // Fonction
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Rendu
    render() {
        return (
            <View style={styles.formSearch}>
                <View style={styles.formInput}> 
                    <Text style={styles.textFormInput}>Lieu</Text>
                    <TextInput
                        style={styles.formText}
                        placeholder="Lieu"
                        onChangeText={(lieu) => this.setState({lieu})}
                    />
                </View>
                <View style={styles.formInput}>
                    <Text style={styles.textFormInput}>Voyageurs</Text>
                    <TextInput
                        style={styles.formText}
                        placeholder="Nombre de voyageurs"
                        keyboardType = 'numeric'
                        value = {this.state.voyageurs}
                        onChangeText={(voyageurs) => this.setState({voyageurs})}
                    />
                </View>
                <View style={styles.test}>
                    <Text style={styles.textDatePicker}>Date</Text>
                    <View style={styles.formInputDate}>
                        <Text style={styles.textFormInput}>Du</Text>                   
                        <DatePicker
                            style={styles.formDate}
                            date={this.state.du}
                            mode="date"
                            placeholder="Du"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36,
                                borderWidth : 0,
                                borderBottomWidth : 1,
                              }
                            }}
                            onDateChange={(date) => {this.setState({du: date})}}
                        />
                    </View>
                    <View style={styles.formInputDate}>
                        <Text style={styles.textFormInput}>Au</Text>
                        <DatePicker
                            style = {styles.formDate}
                            date={this.state.au}
                            mode="date"
                            placeholder="Au" 
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36,
                                borderWidth : 0,
                                borderBottomWidth : 1,
                              }
                            }}
                            onDateChange={(date) => {this.setState({au: date})}}
                        />
                    </View>
                </View>
                <View style={styles.formViewButton}>
                    <Button  color="#FF5A5F" title="Recherche" onPress={this.handleSubmit} />
                    { this.state.loaderSubmit && <ActivityIndicator size="large" style={{marginTop:30}} /> }
                    { this.state.showErrorSizeLieu && <Text style={styles.errorMessageForm}>Le lieu ne doit pas être vide.</Text> }
                    { this.state.showErrorSizeVoyageurs && <Text style={styles.errorMessageForm}>Le nombre de voyageurs doit être plus grand que 0. </Text> }
                    { this.state.showErrorSizeDu && <Text style={styles.errorMessageForm}>La date "Du" ne doit pas être vide.</Text> }
                    { this.state.showErrorSizeAu && <Text style={styles.errorMessageForm}>La date "Au" ne doit pas être vide.</Text> }
                    { this.state.showErrorNow && <Text style={styles.errorMessageForm}>La date "Du" doit être supérieur à celle d'aujourd'hui. </Text> }
                    { this.state.showErrorDate && <Text style={styles.errorMessageForm}>La date "Au" doit être supérieur à la date "Du". </Text> }
                </View>
            </View>
        );
    }

    // Lorsque la recherche est lancer
    handleSubmit( event )
    {   
        // Annule l'évenement par défaut
        event.preventDefault();

        // Si la propriété existe
        if ( this.props.onSubmit )
        {
            // Vérifications
            if(this.verifLieu() && this.verifVoyageurs() && this.verifDate()) 
                this.props.onSubmit( this.state.lieu, this.state.voyageurs, this.state.du, this.state.au);
        }
    }

    // Fonction qui vérifie le lieu
    verifLieu(){
        // Lieu non vide
        if(this.state.lieu.length > 0){
            // Retire le message d'erreur
            this.setState({ showErrorSizeLieu : false});
            return true;
        }else{
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorSizeLieu : true});
            return false;
        }
    }

    // Fonction qui vérifie les voyageurs
    verifVoyageurs(){
        // Voyageur non vide
        if (parseInt(this.state.voyageurs) > 0){
            // Retire le message d'erreur
            this.setState({ showErrorSizeVoyageurs : false});
            return true;
        }else{
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorSizeVoyageurs : true});
            return false;
        }
    }

    // Fonction qui vérifie la date
    verifDate(){

        // Date non vide
        if(this.state.du.length > 0){
            // Retire le message d'erreur
            this.setState({ showErrorSizeDu : false});
        }else{
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorSizeDu : true});
            return false;
        }

        // Date non vide
        if(this.state.au.length > 0){
            // Retire le message d'erreur
            this.setState({ showErrorSizeAu : false});
        }else{
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorSizeAu : true});
            return false;
        }

        // Initialisation
        var now = new Date();
        var dateStart = new Date(this.state.du);
        var dateEnd = new Date(this.state.au);

        // Now > date de début
        if(now.getTime() > dateStart.getTime()){
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorNow : true});
            return false;
        }else{
            // Retire le message d'erreur
            this.setState({ showErrorNow : false});
        }

        // Date de debut > date de fin
        if(dateStart.getTime() > dateEnd.getTime()){
            // Affiche le message d'erreur
            this.setState({ loaderSubmit:false, showErrorDate : true});
            return false;
        }else{
            // Retire le message d'erreur
            this.setState({ showErrorDate : false});
        }

        return true;
    }
               
}

export default SearchForm;

// Design
const styles = StyleSheet.create({ 
  formSearch: {
    alignSelf : 'stretch',
    flex : 1
  },
  formInput :{ 
    flex : 1,
    padding : 10, 
  },
  textDatePicker : {
    paddingLeft : 10,
    paddingRight : 10,
    color : '#FF5A5F',
    fontSize : 17
  },
  formDate:{
    
    width : 300
  },
  textFormInput : {
    color : '#FF5A5F',
    fontSize : 17
  },
  formInputDate :{
    paddingTop : 5,
    paddingBottom : 5,
    paddingLeft : 20,
    paddingRight : 20,
  },
  viewDatePicker : {

    flexDirection: 'column'
  },
  formViewButton : {
    flex : 3,
    paddingTop : 50,
    marginLeft : 20,
    marginRight : 20
  },
  errorMessageForm :{
    color : 'red',
    textAlign : 'center',
    fontSize : 15,
    marginTop: 20
  },
  formText :{
  },
  test : {
    flex:4
  }
});


