import { useState } from 'react';

export function useContacts() {
  const [contacts, setContacts] = useState([]);

  return {
    contacts,
    addContact: (userId: string) => {/* TODO: implement add contact */},
    removeContact: (userId: string) => {/* TODO: implement remove contact */},
    loading: false,
    error: null,
  };
}
