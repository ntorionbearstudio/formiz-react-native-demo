import React from 'react';
import {StyleSheet} from 'react-native';
import {useField} from '@formiz/core';
import {Item, Label, Input, Icon, Text} from 'native-base';
import {PropTypes} from 'prop-types';

const style = StyleSheet.create({
  error: {
    color: '#C60030',
  },
});

const FormField = props => {
  const {errorMessage, isValid, isSubmitted, setValue, value} = useField(props);

  const {label, placeholder, type, required, name, ...otherProps} = props;

  const [isTouched, setIsTouched] = React.useState(false);
  const showError = !isValid && (isTouched || isSubmitted);

  return (
    <>
      <Item stackedLabel error={showError}>
        <Label style={showError ? style.error : {}}>
          {label}
          {required && ' *'}
        </Label>
        <Input
          type={type || 'text'}
          value={value || ''}
          onChangeText={setValue}
          placeholder={placeholder}
          onBlur={() => setIsTouched(true)}
          {...otherProps}
        />
        <Icon name="close-circle" />
      </Item>
      {showError && errorMessage && (
        <Text style={style.error}>{errorMessage}</Text>
      )}
    </>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

FormField.defaultProps = {
  label: '',
  placeholder: '',
};

export default FormField;
