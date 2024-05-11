import { AddressBook } from "./AddressBook/AddressBook";
import { useState } from "react";

export const UserDetails = () => {
  const [showAddressBook, setShowAddressBook] = useState(false);

  const onAddressBookClick = async () => {
    document.body.style.overflow = "hidden";
    setShowAddressBook(true);
  };

  const onAddressBookSubmit = () => {
    setShowAddressBook(false);
  } 

  const onCloseAddressBook = () => {
    setShowAddressBook(false);
  };

  return (
    <>
      {" "}
      {showAddressBook && (
        <AddressBook
          onCloseAddressBook={onCloseAddressBook}
          onAddressBookSubmit={onAddressBookSubmit}
        />
      )}
      <button onClick={() => onAddressBookClick()}>Add new address book</button>
    </>
  );
};
