import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDecks } from '../actions';
import { isEmpty } from 'lodash';

class DeckList extends Component {

  componentDidMount() {
    this.props.getDecks();
  }

  componentWillUpdate() {
    this.props.getDecks();
  }

  renderCard({item}) {
    const deck = item;
    return (
      <TouchableOpacity
        onPress={ () => {
          this.props.navigation.navigate('Deck', { title: deck.title })
        }}
      >
      <Card title={deck.title}>
        <Badge containerStyle={{ backgroundColor: 'orange'}}>
          <Text >Questions: {deck.cardCount}</Text>
        </Badge>
      </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props;

    if (isEmpty(decks)) {
      return (
        <View style={styles.deckList}>
        <Text> 👋🏼 Add some cards to get started! </Text>
        </View>
      )
    }

    return (
      <View style={styles.deckList}>
        <FlatList
          data={decks}
          renderItem={this.renderCard.bind(this)}
        />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

function mapStateToProps(state) {
  return {decks: state.decks};
}

function mapDispatchToProps(dispatch) {
  return {
    getDecks: () => dispatch(getDecks())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
