import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
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

  componentDidUpdate() {
    this.props.getDeck(this.props.title);
  }

  onAdd = () => {
    this.props.navigation.navigate('NewQuestion', {
      title: this.props.title
    });
  };
  
  onQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      title: this.props.title,
      questions: this.props.deck.questions
    });
  };

  render() {

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
          <Card key={deck.title} title={`Number of questions: ${deck.questions.length}`}>
            <View>
              <Button
                raised
                icon={{name: 'add-circle'}}
                title='Add a question'
                onPress={this.onAdd.bind(this)}
              />
            </View>
            <View>
              <Button
                raised
                icon={{name: 'question-answer'}}
                title='Start a quiz'
                onPress={this.onQuiz.bind(this)}
              />
            </View>
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
