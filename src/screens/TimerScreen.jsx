import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import TimerContext from '../context/TimerContext';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const IntroText = styled.Text`
  font-size: 18px;
  color: #212121;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 900;
  color: #212121;
  margin-bottom: 20px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
`;

const ElapsedTime = styled.Text`
  font-size: 96px;
  font-weight: 900;
  color: #1e88e5;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #90caf9; 
  padding: 15px 30px; 
  border-radius: 50px; 
  margin: 0 10px;
  align-items: center;
  justify-content: center;
`;

const ActiveButtonText = styled.Text`
  color: #1e88e5; 
  font-size: 18px;
`;

const InactiveButtonText = styled.Text`
  color: #fff; 
  font-size: 18px;
`;

const BlurOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BackButtonText = styled.Text`
  color: #00838f;
  font-size: 18px;
`;

const TimerScreen = ({route, navigation}) => {
  const { timerId } = route.params;
  const { state, dispatch } = useContext(TimerContext);
  const timer = state.timers.find(t => t.id === timerId);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timer ? timer.duration : 0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            clearInterval(id);
            setIsModalVisible(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      clearInterval(intervalId);
      return () => {};
      }
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
      setIsRunning(false);
      setRemainingTime(timer.duration);
      setIsModalVisible(false)
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <IntroText>Set a new timer</IntroText>
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <BlurOverlay>
            <ModalContainer>
              <ModalText>Time's Up!</ModalText>
               <ButtonContainer>
                <StyledButton onPress={handleReset}>
                  <InactiveButtonText>
                  Reset
                  </InactiveButtonText>
                </StyledButton>
                <StyledButton onPress={() => navigation.navigate('Home')}>
                  <InactiveButtonText>
                  Home
                  </InactiveButtonText>
                </StyledButton>
              </ButtonContainer>
            </ModalContainer>
          </BlurOverlay>
        </Modal>

      <Title>{timer?.title}</Title>
       <TouchableOpacity onPress={toggleTimer}>
        <ElapsedTime>{remainingTime}</ElapsedTime>
      </TouchableOpacity>
      <ButtonContainer>
        <StyledButton onPress={toggleTimer}>
          {isRunning ? (
            <ActiveButtonText>Pause</ActiveButtonText>
          ) : (
            <InactiveButtonText>Start</InactiveButtonText>
          )}
        </StyledButton>
      </ButtonContainer>

      <StyledButton onPress={handleBack} style={{backgroundColor: '#e0f7fa'}}>
        <BackButtonText>Back to Home</BackButtonText>
      </StyledButton>
    </Container>
  );
};

export default TimerScreen;
