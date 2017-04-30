import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    Image,
    Button,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarManager from 'react-native-calendar-manager';
import Communications from 'react-native-communications';


class OneResult extends Component {

    constructor(props) {
        super(props);

        // Etats
        this.state = {
            showErrorCalendar : false,
            showErrorShare : false,
            showSuccessCalendar : false,
            showSuccessShare : false,
            loaderCalendar : false,
            loaderShare : false,
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleCalendar = this.handleCalendar.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.formattedDate = this.formattedDate.bind(this);
    }
    
    // Rendu
    render() {
        return (
            <View style={styles.oneResult}>
                <View style={styles.oneResultHeader}>
                    <View style={styles.oneResultHeaderImage}>
                       <Image 
                            source={{uri: this.props.image}} 
                            style={styles.imageCover} />
                    </View>
                    <View style={styles.oneResultHeaderTextView}>
                        <Text style={styles.oneResultHeaderText}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={styles.oneResultAction}>
                    <View style={styles.oneResultActionCalendar}>
                        <View style={styles.oneResultActionCalendarIcon}>
                            <Icon.Button name="calendar" backgroundColor="#1bbaeb" onPress={this.handleCalendar}>
                                <Text style={styles.oneResultIconText}>Ajout à l'agenda</Text>
                            </Icon.Button>
                        </View>
                        { this.state.loaderCalendar && <ActivityIndicator size="large" style={{marginTop:30}} /> }
                        { this.state.showSuccessCalendar && <Text style={styles.successAction}>Cet événement a bien été ajouté !</Text> }
                        { this.state.showErrorCalendar && <Text style={styles.errorAction}>Une erreur est survenue !{"\n"}Veuillez recommencer</Text> }
                    </View>
                    <View style={styles.oneResultActionShare}>
                        <View style={styles.oneResultActionCalendarIcon}>                      
                            <Icon.Button name="share-alt" backgroundColor="#1b8aeb" onPress={this.handleShare}>
                                <Text style={styles.oneResultIconText}>Partager</Text>
                            </Icon.Button>
                        </View>
                        { this.state.loaderShare && <ActivityIndicator size="large" style={{marginTop:30}} /> }
                        { this.state.showSuccessShare && <Text style={styles.successAction}>Le partage a réussi !</Text> }
                        { this.state.showErrorShare && <Text style={styles.errorAction}>Une erreur est survenue !{"\n"}Veuillez recommencer</Text> }
                    </View>
                </View>
                
                <View style={styles.oneResultNavigation}>
                    <View style={styles.oneResultNavigationButton}>
                        <Button style={{borderRadius:0}}  color="#FF5A5F" title="Recherche" onPress={this.handleSearch} />
                    </View>
                    <View style={styles.oneResultNavigationButton}>
                        <Button  color="#c1262b" title="Liste" onPress={this.handleBack} />
                    </View>
                </View>
            </View>
        );
    }

    // AJoute a l'agenda
    handleCalendar(){

        // Affiche le loader et retire les messages 
        this.setState({loaderCalendar:true, showSuccessCalendar : false, showErrorCalendar : false});

        // Ajout de l'évenement
        CalendarManager.addEvent({
          name: this.props.title,
          location: '',
          startTime: new Date(this.props.du).getTime(),
          endTime: new Date(this.props.au).getTime(),
        });

        // Retire le loader
        this.setState({loaderCalendar:false});

    }

    // Partage
    handleShare(){

        // Affiche le loader et retire les messages
        this.setState({loaderShare:true, showSuccessShare : false, showErrorShare : false});

        // Partage par SMS
        Communications.text(null,this.props.title + ' du '+this.formattedDate(new Date(this.props.du))+' au '+this.formattedDate(new Date(this.props.au)));

        // Retire le loader
        this.setState({loaderShare:false});

    }  

    // Format de date
    formattedDate(date) {

        // Récupération
        var month = String(date.getMonth() + 1);
        var day = String(date.getDate());
        var year = String(date.getFullYear());

        // Ajout du 0
        if (month.length < 2) 
        month = '0' + month;

        // Ajout du 0
        if (day.length < 2) 
        day = '0' + day;

        return day+'/'+month+'/'+year;
    }

    // Affiche le formulaire
    handleSearch(){

        if(this.props.onSearch){

            this.props.onSearch();
        }
    }

    // Affiche la liste
    handleBack(){

        if(this.props.onBack){

            this.props.onBack();
        }
    }

}

export default OneResult;

const styles = StyleSheet.create({
    oneResult :{
        flex : 1,
        justifyContent: 'center',
    },
    oneResultHeader :{
        flex: 3
    },
    oneResultAction :{
        flex :3,
        flexDirection : 'column',
    },
    oneResultNavigation: {
        flex:1,
        flexDirection: 'row',
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0
    },
    oneResultNavigationButton:{
        flex:1
    },
    oneResultActionCalendar :{
        alignItems: 'center',
    },
    oneResultActionShare :{
        flex:1,
        alignItems: 'center',
    },
    oneResultHeaderImage :{
        flex:5,
        alignItems: 'stretch'
    },
    oneResultHeaderTextView: {
        flex : 1
    },
    successAction:{
        color: 'green',
        fontSize: 17,
        textAlign :'center'
    },
    errorAction:{
        color: 'red',
        fontSize: 17,
        textAlign :'center'
    },
    oneResultHeaderText:{
        textAlign:'center',
        fontSize : 17,
        color : '#FF5A5F',
        paddingTop:10
    },
    oneResultIconText :{
        color : 'white',
        fontSize : 22,
        borderRadius: 5,
        width : 200
    },
    oneResultActionCalendarIcon:{
        marginTop:20,
        marginBottom:20
    },
    imageCover :{
        flex:1
    }
});