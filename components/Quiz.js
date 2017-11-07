import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDeck } from '../actions';
import { isEmpty } from 'lodash';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {

  state = {
    currentQuestion: 0,
    correctQuestions: 0,
    flip: true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz for ${navigation.state.params.title}`
    };
  }

  render() {

    const { questions } = this.props;

    if (isEmpty(questions)) {
      return (
        <View style={styles.card}>
          <Card title="No questions found 😞">
          </Card>
        </View>
      )
    }

    if (this.state.currentQuestion === questions.length) {
      clearLocalNotification()
        .then(setLocalNotification);
      return (
        <View style={styles.card}>
          <Card title={
              `You answered ${this.state.correctQuestions} of ${this.props.questions.length} questions correctly.`
            }>
          </Card>
          <View>
              <Button
                raised
                icon={{name: 'keyboard-backspace'}}
                title='Deck'
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
        </View>
      )
    }
    const question = questions[this.state.currentQuestion];

    return (
        <View style={styles.card}>
          <Card title={
            this.state.flip ?
              `Question: ${question.question}` :
              `Answer: ${question.answer}`
            }>
            <View>
              <Button
                raised
                icon={{name: 'flip-to-back'}}
                title='Lookup Answer'
                onPress={() => {
                  this.setState({
                    flip: !this.state.flip
                  });
                }}
              />
            </View>
            <View>
              <Button
                raised
                icon={{name: 'check-circle'}}
                title='Correct'
                onPress={() => {
                  this.setState({
                    correctQuestions: this.state.correctQuestions + 1,
                    currentQuestion: this.state.currentQuestion + 1
                  });
                }}
              />
            </View>
            <View>
              <Button
                raised
                icon={{name: 'indeterminate-check-box'}}
                title='Incorrect'
                onPress={() => {
                  this.setState({
                    currentQuestion: this.state.currentQuestion + 1
                  });
                }}
              />
            </View>
            <View>
              <Button
                raised
                icon={{name: 'refresh'}}
                title='Restart'
                onPress={() => {
                  this.setState({
                    flip: true,
                    currentQuestion: 0,
                    correctQuestions: 0
                  });
                }}
              />
            </View>
            <View>
              <Button
                raised
                icon={{name: 'keyboard-backspace'}}
                title='Deck'
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
          </Card>
        </View>
    )

  }

}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    title: navigation.state.params.title,
    questions: navigation.state.params.questions
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
)(Quiz);
