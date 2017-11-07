import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../actions';
import { View, Text, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Card, Button } from 'react-native-elements';
import { gray } from '../utils/colors';


class NewDeck extends Component {

  constructor(options) {
    super(options);
    this.state = {
      title: 'Title of the deck here',
      error: false
    };
  }

  onPress = () => {
    if (!this.state.title) {
      return this.setState({ error: true });
    }

    this.props.submit(this.state.title);
    this.props.navigation.navigate('DeckList');
  };

  render() {

    return (
      <KeyboardAvoidingView style={styles.newDeck}>
        <Card title="Name your deck">
        <FormLabel>Title</FormLabel>
          <FormInput 
            onChangeText={(title) => this.setState({title})}
            value={this.state.text}
          />
          <FormValidationMessage>
            {
              this.state.error ? 'Title is required': ''
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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    submit: title => dispatch(saveDeckTitle(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeck);
