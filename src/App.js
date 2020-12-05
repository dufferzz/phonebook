
import React, {useState} from 'react'

function InputForm({book, addToPhoneBook}) {
  const [firstName, setFirstName] = useState('Some')
  const [lastName, setLastName] = useState('DefaultValues')
  const [phoneNumber, setPhoneNumber] = useState('9999999')

  const handleFirstNameChange = (e) =>{
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) =>{
    setLastName(e.target.value)
  }

  const handlePhoneNumberChange = (e) =>{
    setPhoneNumber(e.target.value)
  }

  function addToTable(e){
    e.preventDefault();

    if(firstName === '' || lastName === '' || phoneNumber === ''){
      alert('Please suppply all values!')
      return;
    }
    addToPhoneBook([...book, {firstName, lastName, phoneNumber}])
    setLastName('')
    setFirstName('')
    setPhoneNumber('')
  }

  return(
    <div>
      <form onSubmit={addToTable}>
        <input 
          value={firstName}
          placeholder="First Name"
          onChange={handleFirstNameChange}
          type="text"
          name="firstName"></input>

        <input value={lastName}
          placeholder="Last Name"
          onChange={handleLastNameChange}
          type="text"
          name="lastName"></input>

        <input value={phoneNumber}
          placeholder="Phone Number"
          onChange={handlePhoneNumberChange}
          type="text"
          name="phoneNumber"></input>

        <button>Add</button>
      </form>
    </div>
  )
}

function Table(props)
{
  return(
    <div>
      <table>
        <thead>
          <tr>
            <td>First name</td>
            <td>Last Name</td>
            <td>Phone Number</td>
          </tr>
        </thead>
        <tbody>
          {props.data.sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) 
          return -1 
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase())
          return 1
      return 0
  }).map((person, index)=>(
            <tr key={index}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.phoneNumber}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}


function App() {
  const [phoneBook, addToPhoneBook] = useState([])
  return (
    <div className="App">
      <InputForm book={phoneBook} addToPhoneBook={addToPhoneBook}/>
      <Table data={phoneBook}/>
    </div>
  );
}

export default App;
