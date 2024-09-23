import { atom } from 'recoil';


interface AssociateForm {
  firstName: string;
  lastName: string;
  contactNumber: string;
  gmail: string;
  qualification: string;
  age: number;
  occupation: string;
  address: string;
  country: string;
}

export const associateAtom = atom<AssociateForm>({
  key: 'associateFormState',
  default: {
    firstName: '',
    lastName: '',
    contactNumber: '',
    gmail: '',
    qualification: '',
    age: 0,
    occupation: '',
    address: '',
    country: '',
  },
});
