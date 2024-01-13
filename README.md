# Thesis-Squinvoice

Thesis project illustrating how a centralized system for exchanging invoices data with a standard formtat might help companies in the accounting processes.

Nowadays most of the countries have electronic systems for e-invoices without being able to merge them into one single format which causes the most issues.

With the implemented service, which is not meant to replace the existing solution but simply provide a service on top of it, companies would be able to easily share such information with no impact on their actual processes.

## Installation

```bash
mkdir project
cd project
git pull https://github.com/SisioGio/Thesis-Squinvoice
cd 'Thesis-Squinvoice'
# Install server dependencies
npm install
# Install client dependencies
cd client
npm install
```

Mysql is required and it must be configured in the file

```
server/config/db.config.js
```

## Usage

The system is using a database service to store the data, that's why it's required to set-up the required tokens in the **.env** file

```javascript
DB_PORT = "DB_PORT";
DB_USER = "DB:USER";
DB_PASSWORD = "DB_PASSWORD";
DB_HOST = "DB_HOST";
```

### Server

```bash
npm start

```

### Client

```bash
cd client
npm start

```
