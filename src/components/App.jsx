import { Component } from 'react';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { Contacts } from './Contacts';
import { FindContacts } from './FindContacts';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Rormione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const id = nanoid();

    if (this.searchContacts(name).length !== 0) {
      alert(`${name} is already in contacts.`);
    } else {
      this.addContact({ name, number, id });
    }
  };

  handleDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  searchContacts = data => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(data.toLowerCase())
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFilterChange = event => {
    this.handleChange(event);
    this.searchContacts(event.target.value);
  };

  addContact = data => {
    this.setState(state => ({
      contacts: [...state.contacts, data],
    }));
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Section title="Phonebook">
          <ContactForm
            handleSubmit={this.handleSubmit}
            name={this.state.name}
            number={this.state.number}
            handleChange={this.handleChange}
          />
        </Section>
        <Section title="Contacts">
          <FindContacts
            filter={this.state.filter}
            handleChange={this.handleFilterChange}
          />
          <Contacts
            contacts={this.searchContacts(this.state.filter)}
            handleDelete={this.handleDelete}
          />
        </Section>
      </div>
    );
  }
}
