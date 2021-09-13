const contactsFunctions = require("./contacts");
// console.log(contactsFunctions);

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getContacts = await contactsFunctions.listContacts();
      console.table(getContacts);
      break;

    case "get":
      const getOneContact = await contactsFunctions.getContactById(id);
      console.table(getOneContact);
      break;

    case "add":
      const addContact = await contactsFunctions.addContact(name, email, phone);
      console.table(addContact);
      break;

    case "remove":
      const removeContact = await contactsFunctions.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// =========================================================================
// Запусти команды в терминале и сделай отдельный скриншот результата выполнения каждой команды.

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3
