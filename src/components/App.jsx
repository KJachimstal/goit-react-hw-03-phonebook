import { Component } from 'react';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { Contacts } from './Contacts';
import { FindContacts } from './FindContacts';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  constructor(props) {
    super(props);
    const contacts = JSON.parse(this.props.localStorageContacts);
    if (contacts.length > 0) this.state.contacts = contacts;
  }

  saveToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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

  handleDelete = async id => {
    await this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
    this.saveToLocalStorage();
  };

  searchContacts = data => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(data.toLowerCase())
    );
  };

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFilterChange = event => {
    this.handleChange(event);
    this.searchContacts(event.target.value);
  };

  addContact = async data => {
    await this.setState(state => ({
      contacts: [...state.contacts, data],
    }));
    this.saveToLocalStorage();
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
