import base64 from '@hexagon/base64';
import { Fido2Lib } from 'fido2-lib';

export class Fido2 {
  f2l: Fido2Lib = new Fido2Lib();
  hasInit: boolean = false;

  async init({ rpId, rpName, timeout }: any) {
    this.f2l = new Fido2Lib({
      timeout,
      rpId,
      rpName,
      challengeSize: 128,
      attestation: 'none',
      cryptoParams: [-8, -7],
      authenticatorAttachment: 'platform',
      authenticatorRequireResidentKey: true,
      authenticatorUserVerification: 'discouraged',
    });

    this.hasInit = true;
  }

  async registration({ username, displayName, id }: any) {
    const registrationOptions = await this.f2l.attestationOptions();
    const user = {
      id: id,
      name: username,
      displayName: displayName,
    };

    const challenge = base64.fromArrayBuffer(
      registrationOptions.challenge,
      true,
    );

    return {
      ...registrationOptions,
      user,
      status: 'ok',
      challenge,
    };
  }

  async attestation({ clientAttestationResponse, origin, challenge }: any) {
    const attestationExpectations: any = {
      challenge: challenge,
      origin: origin,
      factor: 'either',
    };

    const regResult = await this.f2l.attestationResult(
      clientAttestationResponse,
      attestationExpectations,
    );
    return regResult;
  }

  async login() {
    const assertionOptions = await this.f2l.assertionOptions();
    const challenge = base64.fromArrayBuffer(assertionOptions.challenge, true);

    return {
      ...assertionOptions,
      attestation: 'direct',
      challenge,
      status: 'ok',
    };
  }
}
