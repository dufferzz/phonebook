import React, { useState, useReducer } from 'react';

const InputForm = ({ book, addToPhoneBook }) => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'setField':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'cleanForm':
        return {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          formError: false,
        };
      case 'invalid-form':
        return {
          ...state,
          formError: true,
        };
      default:
        break;
    }
    return state;
  };

  const initialState = {
    firstName: 'some',
    lastName: 'defaultValues',
    phoneNumber: '96880514',
    formError: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const { firstName, lastName, phoneNumber, formError } = state;

  const addToTable = (e) => {
    e.preventDefault();

    if (firstName === '' || lastName === '' || phoneNumber === '') {
      dispatch({ type: 'invalid-form' });
      return;
    }
    addToPhoneBook([...book, { firstName, lastName, phoneNumber }]);
    dispatch({ type: 'cleanForm' });
  };

  return (
    <div>
      <form onSubmit={addToTable}>
        <input
          value={firstName}
          placeholder="First Name"
          onChange={(e) =>
            dispatch({
              type: 'setField',
              field: 'firstName',
              value: e.target.value,
            })
          }
          type="text"
          name="firstName"
        ></input>

        <input
          value={lastName}
          placeholder="Last Name"
          onChange={(e) =>
            dispatch({
              type: 'setField',
              field: 'lastName',
              value: e.target.value,
            })
          }
          type="text"
          name="lastName"
        ></input>

        <input
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(e) =>
            dispatch({
              type: 'setField',
              field: 'phoneNumber',
              value: e.target.value,
            })
          }
          type="text"
          name="phoneNumber"
        ></input>
        {formError && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            Please input all fields!
          </div>
        )}
        <div>
          <button>Add</button>
        </div>
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
