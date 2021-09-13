const { v4 } = require("uuid");

const fs = require("fs/promises");
// const fs = require("fs").promises;
const path = require("path");
// console.log(__dirname);

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log(`contactsPath`, contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    // console.log(`data`, data);
    const contacts = JSON.parse(data);
    // console.log(`contacts`, contacts);
    return contacts;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const oneContact = contacts.find((item) => String(item.id) === contactId);
    // console.log(`oneContact`, oneContact);
    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex((item) => String(item.id) === contactId);
    if (idx === -1) {
      return null;
    }
    const removeContact = contacts[idx];
    contacts.splice(idx, 1);
    // const newConcacts = contacts.filter((_, index) => index !== idx);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    // await fs.appendFile(contactsPath, JSON.stringify(newContact)) - не подходит,т.к.запишет после массива
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { name, email, phone, id: v4() };
    // добавляя в JSON, полностью перезаписываем, сплющивая (stringify)
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

const contactsFunctions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsFunctions;

// =============================================================
// В корне проекта создай файл contacts.js.
// Сделай импорт модулей fs и path для работы с файловой системой.
// const fs = require("fs/promises");
// const path = require("path");
// Создай переменную contactsPath и запиши в нее путь к файле contacts.json. Для составления пути ипользуй методы модуля path.
// Модуль Path
// для подключения файлов необходимо использовать метод
// path.join([path1][, path2][, ...]) — Объединяет все аргументы и нормализует полученный путь.
// для получения точки отсчета - откуда надо проложить путь к нужному файлу используется __dirname - возвращает путь к каталогу текущего исполняемого файла.  И указываем путь  к файлу который хотим подключить.
// const path = require('path');
// const absolutePath = path.join(__dirname, './db/contacts.json');
// =============================================================
// Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и его методы readFile() и writeFile()
// Сделай экспорт созданных функций через module.exports
// =============================================================
