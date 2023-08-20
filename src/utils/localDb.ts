const CREDENTIAL_IDS = 'CREDENTIAL_IDS';
const WALLET_PUBLIC_KEYS = 'WALLET_PUBLIC_KEYS';

const localDb = {
  getUserCredentialId(username: string) {
    const idsString = localStorage.getItem(CREDENTIAL_IDS);
    const ids = idsString ? JSON.parse(idsString) : {};
    console.log('ids',ids)
    return ids[username];
  },

  setUserCredentialId(username: string, id: string) {
    const idsString = localStorage.getItem(CREDENTIAL_IDS);
    const ids = idsString ? JSON.parse(idsString) : {};
    ids[username] = id;

    localStorage.setItem(CREDENTIAL_IDS, JSON.stringify(ids));
  },

  getWalletPublicKey(username: string) {
    const publicKeysString = localStorage.getItem(WALLET_PUBLIC_KEYS);
    const publicKeys = publicKeysString ? JSON.parse(publicKeysString) : {};
    return publicKeys[username];
  },

  setWalletPublicKey(username: string, address: string) {
    const publicKeysString = localStorage.getItem(WALLET_PUBLIC_KEYS);
    const publicKeys = publicKeysString ? JSON.parse(publicKeysString) : {};
    publicKeys[username] = address;

    localStorage.setItem(WALLET_PUBLIC_KEYS, JSON.stringify(publicKeys));
  },

  getUserNameByCredentialId(credentialId: string) {
    const idsString = localStorage.getItem(CREDENTIAL_IDS);
    const ids = idsString ? JSON.parse(idsString) : {};
    let username = '';
    Object.entries(ids).forEach(([currentUserName, id]) => {
      if (id === credentialId) {
        username = currentUserName;
      }
    });

    return username;
  },
};

export default localDb;
