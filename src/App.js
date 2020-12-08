import React, { useState, useReducer, useEffect } from 'react';
import './styles.css';

const InputForm = ({ book, addToPhoneBook }) => {
  let firstNameInput = null;
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
      case 'invalidForm':
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
      dispatch({ type: 'invalidForm' });
      return;
    }
    addToPhoneBook([...book, { firstName, lastName, phoneNumber }]);
    dispatch({ type: 'cleanForm' });
    firstNameInput.focus();
  };

  //Whenever 'book' changes, save to LocalStorage
  useEffect(() => {
    localStorage.setItem('phoneBook', JSON.stringify(book));
  }, [book]);

  return (
    <div className="inputForm">
      <form onSubmit={addToTable}>
        <input
          autoFocus={true}
          ref={(x) => {
            firstNameInput = x;
          }}
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
          <div
            style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}
          >
            Please fill in all fields!
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
    <table className="phoneBookTable">
      <thead>
        <tr>
          <td>First name</td>
          <td>Last Name</td>
          <td>Phone Number</td>
        </tr>
      </thead>
      <tbody>
        {sortedTable.length === 0 && (
          <tr>
            <td style={{ color: 'gray' }} colSpan="3">
              No Data
            </td>
          </tr>
        )}
        {sortedTable.map((person, index) => (
          <BookItem key={index} person={person} />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  let tempState = null;
  if (localStorage.getItem('phoneBook') === null) {
    tempState = [];
  } else {
    tempState = JSON.parse(localStorage.getItem('phoneBook'));
  }

  const [phoneBook, addToPhoneBook] = useState(tempState);
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          Super Amazing Phone Book{' '}
          {phoneBook.length > 0 && `(${phoneBook.length})`}
        </div>
        <Table data={phoneBook} />
        <InputForm book={phoneBook} addToPhoneBook={addToPhoneBook} />
        <div className="footer">Last Updated: 00:30 - 09 Dec 2020</div>
      </div>
    </div>
  );
};

export default App;
