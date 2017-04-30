import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StackNavigator,
  View,
  ListView,
  ActivityIndicator
} from 'react-native';
// Fichiers
import SearchForm from './SearchForm';
import ResultList from './ResultList';
import OneResult from './OneResult';

export default class airBnb extends Component {

  constructor(props) {
    super(props);

    // Etats
    this.state = {
      loading : false,
      du : '',
      au : '',
      title : '',
      image : '',
      dataSource : new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      showForm : true,
      showList : false,
      showResult : false
    }

    // Fonctions
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.onSearchFromList = this.onSearchFromList.bind(this);
  }

  // Rendu
  render() {
    return (
      <View style={styles.container}>
        { this.state.showForm && <SearchForm onSubmit={this.handleSearchFormSubmit} /> }
        { this.state.loading && <ActivityIndicator size="large" style={{marginTop:30}} /> }
        { this.state.showList && <ResultList onSearch={this.onSearchFromList}  onSubmit={this.handleItemSubmit} dataSource={this.state.dataSource} /> }
        { this.state.showResult && <OneResult onSearch={this.handleOnSearch} onBack={this.handleOnBack} title={this.state.title} image={this.state.image} du={this.state.du} au={this.state.au} /> }
      </View>
    );
  }

  // Affiche le formulaire
  onSearchFromList(){
    // Affiche le formulaire et cache la liste
    this.setState({ showList:false, showForm:true});
  }

  // affiche la liste
  handleOnBack(){
    // Affiche la liste et cache le résultat 
    this.setState({ showResult:false, showList:true});
  }

  // Affiche le formulaire
  handleOnSearch(){
    // Affiche le formulaire et cache le résultat
    this.setState({ showResult:false, showForm:true});
  }

  // Affiche le résultat
  handleItemSubmit(titleSubmit, imageSubmit) {

    // Affiche le resultat et cache la liste
    this.setState({ title:titleSubmit, image:imageSubmit, showList: false, showResult : true});
  }

  // Recherche à partir des informations du formulaire
  handleSearchFormSubmit( lieu, voyageurs, duSubmit, auSubmit ) {

    // Cache le formulaire et prépare les états
    this.setState({ showForm:false, loading:true, du:duSubmit, au:auSubmit}, function() {
        // Requetes vers Airbnb
        fetch('https://www.airbnb.fr/search/search_results/?location='+lieu+'&guests='+voyageurs+'&checkin='+duSubmit+'&checkout='+auSubmit)
        .then((response) => response.json())
        .then((responseJSON) => {
            
            // Cache le loader et affiche la liste
            this.setState({
                loading:false,
                dataSource: this.state.dataSource.cloneWithRows(responseJSON.results_json.search_results),
                showList : true
            });
        })
        .catch((error) => alert(error));
    });
  }
}

// Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('airBnb', () => airBnb);