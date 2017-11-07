import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDeck } from '../actions';
import { isEmpty } from 'lodash';

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    };
  }

  componentWillMount() {
    this.props.getDeck(this.props.title);
  }

  render() {
    console.log('this ', this.props)
    const { deck } = this.props;

    if (isEmpty(deck)) {
      return (
        <View style={styles.deck}>
        <Text> 👋🏼 Deck not found </Text>
        </View>
      )
    }

    return (
        <View style={styles.deck}>
          <Card key={deck.title} title={deck.title}>
          </Card>
        </View>
    )

  }

}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    title: navigation.state.params.title,
    deck: state.deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDeck: (title) => dispatch(getDeck(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
