import React, { useState } from 'react';

const InputForm = ({ book, addToPhoneBook }) => {
  const [firstName, setFirstName] = useState('Some');
  const [lastName, setLastName] = useState('DefaultValues');
  const [phoneNumber, setPhoneNumber] = useState('9999999');

  const addToTable = (e) => {
    e.preventDefault();

    if (firstName === '' || lastName === '' || phoneNumber === '') {
      alert('Please suppply all values!');
      return;
    }
    addToPhoneBook([...book, { firstName, lastName, phoneNumber }]);
    setLastName('');
    setFirstName('');
    setPhoneNumber('');
  };

  return (
    <div>
      <form onSubmit={addToTable}>
        <input
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="firstName"
        ></input>

        <input
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="lastName"
        ></input>

        <input
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          name="phoneNumber"
        ></input>

        <button>Add</button>
      </form>
    </div>
  );
};

const BookItem = ({ person, index }) => {
  return (
    <tr key={index}>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.phoneNumber}</td>
    </tr>
  );
};

const Table = ({ data }) => {
  const sortedTable = data.sort((a, b) => {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <td>First name</td>
          <td>Last Name</td>
          <td>Phone Number</td>
        </tr>
      </thead>
      <tbody>
        {sortedTable.map((person, index) => (
          <BookItem key={index} person={person} />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [phoneBook, addToPhoneBook] = useState([]);
  return (
    <div>
      <InputForm book={phoneBook} addToPhoneBook={addToPhoneBook} />
      <Table data={phoneBook} />
    </div>
  );
};

export default App;
