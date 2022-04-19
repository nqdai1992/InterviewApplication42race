import { atom } from "recoil";

const accountState = atom({
    key: 'Account',
    default: {
        id: null,
        username: '',
        firstname: '',
        lastname: ''
    }
})

export default accountState