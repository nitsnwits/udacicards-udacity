import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDecks } from '../actions';
import { isEmpty } from 'lodash';

class DeckList extends Component {

  componentDidMount() {
    this.props.getDecks();
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
      {
        decks.map((deck, index) => {
          return (
            <Card key={index} title={deck.title}>
              <Badge containerStyle={{ backgroundColor: 'orange'}}>
                <Text>Questions: {deck.cardCount}</Text>
              </Badge>
            </Card>
          )
        })
      }
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
  return {decks: state};
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
