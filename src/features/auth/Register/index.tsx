import React, { useState } from 'react';
import EnterEmail from './EnterEmail';
import VerifyCode from './VerifyCode';
import CreateWallet from './CreateWallet';
import { Container } from '@mui/material';

const REGISTER_STEPS = {
  ENTER_EMAIL: 'ENTER_EMAIL',
  VERIFY_CODE: 'VERIFY_CODE',
  CREATE_WALLET: 'CREATE_WALLET',
};

const Register = () => {
  const [step, setStep] = useState(REGISTER_STEPS.ENTER_EMAIL);

  return (
    <Container>
      {step === REGISTER_STEPS.ENTER_EMAIL && (
        <EnterEmail goToVerify={() => setStep(REGISTER_STEPS.VERIFY_CODE)} />
      )}
      {step === REGISTER_STEPS.VERIFY_CODE && (
        <VerifyCode
          goToEnterEmail={() => setStep(REGISTER_STEPS.ENTER_EMAIL)}
          goToCreateWallet={() => {
            setStep(REGISTER_STEPS.CREATE_WALLET);
          }}
        />
      )}
      {step === REGISTER_STEPS.CREATE_WALLET && <CreateWallet />}
    </Container>
  );
};

export default Register;
