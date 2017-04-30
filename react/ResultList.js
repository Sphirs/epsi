
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Share,
} from 'react-native';

class ResultList extends Component {

    constructor(props) {
        super(props);

        // Fonctions
        this.handleItemPress = this.handleItemPress.bind(this);
        this.handlePressSearch = this.handlePressSearch.bind(this);
    }
    
    // Rendu
    render() {
        return (
            <View style={styles.resultList}>
                <View style={styles.headerResultList}>
                    <Text style={styles.headerResultListText}>
                        Résultats : 
                    </Text>
                </View>
                <View style={styles.resultListListView}>
                    <ListView  
                        style={{flex:1}}
                        dataSource={this.props.dataSource}
                        renderRow={
                            (result) => {
                                return <ItemRenderer
                                            name={result.listing.name}
                                            image={result.listing.picture_url}
                                            onPress={this.handleItemPress}
                                        />
                            } 
                        } 
                    />
                </View>
                <View style={styles.resultListViewButton}>
                    <TouchableOpacity style={styles.resultListButtonTouchable} onPress={this.handlePressSearch}>
                        <Text style={styles.resultListButtonText}>Rerchercher</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Action lorsqu'une image a été sélectionnée
    handleItemPress(title, image){
        // Si la propriété existe
        if ( this.props.onSubmit )
        {
            // Transfert les données
            this.props.onSubmit( title, image);
        }
    }

    // Affiche le formulaire
    handlePressSearch(){
        // Si la propriété existe
        if ( this.props.onSearch ){
            // Affiche le formulaire
            this.props.onSearch();
        }
    }

}

class ItemRenderer extends Component {

    constructor(props) {
        super(props);

        // Fonction
        this.handlePress = this.handlePress.bind(this);
    }

    // Rendu
    render() {
        return (
            <View style={styles.viewItemRender}>
                <TouchableOpacity style={{flex:1, alignItems: 'stretch'}} onPress={this.handlePress}>
                    <Image 
                        source={{uri: this.props.image}} 
                        style={{ minHeight : 300}} />
                    <Text style={styles.itemRenderText}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Item selectionné
    handlePress(){

        // Si la propriété existe
        if ( this.props.onPress ){

            // Transfert de données
            this.props.onPress( this.props.name, this.props.image);
        }
    }
}

export default ResultList;

// Design
const styles = StyleSheet.create({
  resultList:{
    flex : 1
  },
  headerResultList :{
    flex : 1,
    backgroundColor : "#FF5A5F",
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultListListView :{
    flex : 10
  },
  resultListViewButton:{
    flex : 1,
    backgroundColor : "#FF5A5F",
    justifyContent: 'center'
  },
  resultListButtonTouchable:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultListButtonText:{
    color : 'white',
    fontSize : 22,
    fontWeight : 'bold' 
  },
  headerResultListText :{
    color : 'white',
    fontSize : 22,
    textAlign : 'center',
    fontWeight : 'bold',
  },
  itemRenderText:{
    color : '#FF5A5F',
    textAlign:'center',
    paddingTop:20,
    paddingBottom :20,
    fontSize:15
  },
  viewItemRender :{
    borderBottomWidth :1,
    borderColor : '#FF5A5F',
    flex : 1,
    alignItems: 'stretch'
  }
});