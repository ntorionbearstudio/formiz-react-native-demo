/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {H1, Form, Toast, Button, View, Text, Root} from 'native-base';
import {Formiz, FormizStep, useForm} from '@formiz/core';
import FormField from './src/FormField';
import {isEmail} from '@formiz/validations';

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
  formView: {
    marginTop: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    margin: 15,
  },
});

const App: () => React$Node = () => {
  const formWithSteps = useForm();

  const submitForm = () => {
    Toast.show({
      text: 'Good!',
      buttonText: 'Ok',
      type: 'success',
    });
  };

  console.log('values', formWithSteps.values);

  return (
    <>
      <Root>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={style.container}>
          <H1>Formiz React Native demo</H1>
          <ScrollView style={style.formView}>
            <Formiz onValidSubmit={submitForm} connect={formWithSteps}>
              <Form>
                <FormizStep as={View} name="step1">
                  <FormField
                    name="name"
                    label="Name"
                    required="Name is required"
                  />
                  <FormField name="nickname" label="Nickname" />
                </FormizStep>

                <FormizStep as={View} name="step2">
                  <FormField
                    name="email"
                    label="Email"
                    type="email"
                    required="Email is required"
                    validations={[
                      {
                        rule: isEmail(),
                        message: 'Not a valid email',
                      },
                    ]}
                  />
                </FormizStep>

                <FormizStep as={View} name="step3">
                  <FormField name="password" label="Password" type="password" />
                  <FormField
                    name="passwordConfirm"
                    label="Confirm password"
                    type="password"
                    validations={[
                      {
                        rule: value => formWithSteps.values.password === value,
                        deps: [formWithSteps.values.password],
                        message: 'Passwords do not match',
                      },
                    ]}
                  />
                </FormizStep>
              </Form>
            </Formiz>
          </ScrollView>

          <View style={style.buttons}>
            <View>
              {!formWithSteps.isFirstStep && (
                <Button
                  style={style.button}
                  success
                  onPress={formWithSteps.prevStep}>
                  <Text>Previous</Text>
                </Button>
              )}
            </View>
            <Text>
              Step{' '}
              {formWithSteps.currentStep && formWithSteps.currentStep.index + 1}{' '}
              of {formWithSteps.steps.length}
            </Text>
            <View>
              {formWithSteps.isLastStep ? (
                <Button
                  success
                  style={style.button}
                  onPress={formWithSteps.submit}
                  disabled={
                    !formWithSteps.isValid && formWithSteps.isStepSubmitted
                  }>
                  <Text>Submit</Text>
                </Button>
              ) : (
                <Button
                  success
                  style={style.button}
                  onPress={formWithSteps.submitStep}
                  disabled={
                    !formWithSteps.isStepValid && formWithSteps.isStepSubmitted
                  }>
                  <Text>Next</Text>
                </Button>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Root>
    </>
  );
};

export default App;
