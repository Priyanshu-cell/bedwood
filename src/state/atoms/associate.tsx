import { atom } from 'recoil';
import { TAssociate } from '@/src/services/assiociate/assiociate.type';

export const associateAtom = atom<TAssociate>({
    key: 'associateFormState',
    default: {
        firstName: '',
        lastName: '',
        phone: '', 
        email: '', 
        qualification: '',
        age: 0,
        occupation: '',
        address: '',
        country: '',
    },
});
