import React from 'react';
import styled from 'styled-components/native';

const ItemContainerTouchable = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;

const TimerTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #37474f;
`;

const DeleteButtonTouchable = styled.TouchableOpacity`
  background-color: #fca5a5;
  border-radius: 20px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

const DeleteIcon = styled.Text`
  color: #ef4444;
  padding: 10px;
  font-weight: bold;
`;

const TimerItem = ({timer, onDelete, onPress}) => {
  return (
    <ItemContainerTouchable onPress={onPress}>
      <TimerTitleText>{timer.title}</TimerTitleText>
      <DeleteButtonTouchable onPress={() => onDelete(timer.id)}>
        <DeleteIcon>
          DEL
        </DeleteIcon>
      </DeleteButtonTouchable>
    </ItemContainerTouchable>
  );
};

export default TimerItem;
