import React, {useState} from 'react';
import styled from 'styled-components/native';
import uuid from 'react-native-uuid';

const FormContainer = styled.View`
  width: 100%;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
`;

const InputField = styled.TextInput`
  border: 1px solid #cfd8dc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  color: black;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #eeeeee;
  padding: 10px 12px;
  border-radius: 8px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #26a69a;
  padding: 10px 12px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.color || 'white'};
`;

const TimerForm = ({onSubmit, onCancel}) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = () => {

    if (!title || !duration) {
      alert('Please fill in all fields');
      return;
    }

    if (isNaN(duration) || parseInt(duration, 10) <= 0) {
      alert('Duration must be a number greater than 0');
      return;
    }



    const newTimer = {

      id: uuid.v4(),
      title,
      duration: parseInt(duration, 10),
      elapsed: 0,
      isRunning: false,
    };
    onSubmit(newTimer);
    setTitle('');
    setDuration('');
  };

  return (
      <FormContainer>
        <InputField
          placeholder="Timer Title"
          placeholderTextColor="#90a4ae"
          value={title}
          onChangeText={setTitle}
        />
        <InputField
          placeholder="Duration in seconds"
          placeholderTextColor="#90a4ae"
          value={duration}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === '') {
              setDuration(text);
            }
          }}

          keyboardType="numeric"
        />
        <ButtonContainer>
          <CancelButton onPress={onCancel}>
            <ButtonText color="#546e7a">Cancel</ButtonText>
          </CancelButton>
          <AddButton onPress={handleSubmit}><ButtonText>Add Timer</ButtonText></AddButton>
        </ButtonContainer>
      </FormContainer>
  );
};

export default TimerForm;
