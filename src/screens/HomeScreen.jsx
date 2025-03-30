import React, { useContext, useState } from 'react';
import { FlatList, Alert, View } from 'react-native';
import TimerContext from '../context/TimerContext';
import TimerItem from '../components/TimerItem';
import TimerForm from '../components/TimerForm';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: powderblue;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin: 20px 0px;
  color: #164e63;
`;
const AddButton = styled.TouchableOpacity`
  background-color: #0e7490;
  padding: 12px;
  border-radius: 25px;
  align-items: center;
  margin-bottom: 20px;
  width: 50%;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const EmptyListText = styled.Text`
  font-size: 64px;
  color: #778899; /* Dim gray */
  text-align: center;
  opacity: 0.7;
`;


const HomeScreen = ({ navigation }) => {
  const {state, dispatch} = useContext(TimerContext);
  const [showForm, setShowForm] = useState(false);

  // Handle adding a new timer
  const handleAddTimer = timer => {
    dispatch({type: 'ADD_TIMER', payload: timer});
    setShowForm(false);
  };

  // Handle deleting a timer
  const handleDeleteTimer = id => {
    Alert.alert('Delete Timer', 'Are you sure you want to delete this timer?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => dispatch({type: 'DELETE_TIMER', payload: id}),
      },
    ]);
  };

  return (
    <Container>
      {/* Conditional rendering based on showForm state */}
      {showForm ? (
        <TimerForm
          onSubmit={handleAddTimer}
          onCancel={() => setShowForm(false)}
        />
      ) : (
          <>
            <Title>My Timers</Title>
            {state.timers.length === 0 ? (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <EmptyListText>Timers will be shown here. Add one now!</EmptyListText>
              </View>
            ) : (
              <FlatList
                style={{ marginTop: 0, width: '100%' }}
                data={state.timers}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TimerItem
                    timer={item}
                    onDelete={handleDeleteTimer}
                    onPress={() => navigation.navigate('Timer', { timerId: item.id })}
                  />
                )}
              />
            )}

            {/* Add Timer button */}
            <AddButton onPress={() => setShowForm(true)}>
              <ButtonText>Add Timer</ButtonText>
            </AddButton>
          </>
      )}
    </Container>
  );
};

export default HomeScreen;
