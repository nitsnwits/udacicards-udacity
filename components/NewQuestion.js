import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions';
import { View, Text, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Card, Button } from 'react-native-elements';


class NewQuestion extends Component {

  constructor(options) {
    super(options);
    this.state = {
      question: '',
      answer: '',
      error: false
    };
  }

  onPress = () => {
    const { question, answer } = this.state;
    if (!question || !answer) {
      return this.setState({ error: true });
    }

    this.props.submit(this.props.title, { question, answer });
    this.props.navigation.goBack();
  };

  render() {

    return (
      <KeyboardAvoidingView style={styles.newDeck}>
        <Card title="Write your question">
          <FormLabel>question</FormLabel>
          <FormInput 
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
          <FormValidationMessage>
            {
              this.state.error ? 'Question is required': ''
            }
          </FormValidationMessage>
          <FormLabel>answer</FormLabel>
          <FormInput 
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
          />
          <FormValidationMessage>
            {
              this.state.error ? 'Answer is required': ''
            }
          </FormValidationMessage>
          <Button
            raised
            icon={{name: 'done'}}
            title='Submit'
            onPress={this.onPress.bind(this)}
          />
        </Card>
      </KeyboardAvoidingView>
    )

  }

}

const styles = StyleSheet.create({
  newDeck: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    title: navigation.state.params.title,
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (title, card) => dispatch(addCardToDeck(title, card))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);
