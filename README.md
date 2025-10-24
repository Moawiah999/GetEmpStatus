## Prerequisites
- Node.js v22.14.0+
- npm v9+ (comes with Node.js)
- PostgreSQL installed and running

1. **Clone the repository and go to the project folder**
git clone <repo-url>
cd <repo-folder>
2. **Install dependencies**
npm install  or npm i
3. **Set up environment variables**
Rename .env.example to .env
4. **Create Database**
Remove the comment from this section to create the database in config\db.js.
5. **Server operation**
Use this command to start the server
npm run dev
6. **Create tables**
Use this command to create tables
node createTables.js
7. **adding data to tables**
Use this command to add date to tables
node sampleData.js

## Architecture

- **config/**: Contains configuration files, `db.js` for PostgreSQL connection.
- **controllers/**: Holds business logic for endpoints `GetEmpStatus.js`.
- **utils/**: Reusable helper functions, `logger.js` for centralized logging.
- **models/**: SQL scripts and database schema (`schema.sql`) for table creation.
- **routes/** : Defines the API routes and connects them to controllers.
- **logs table**: Stores info and error logs for auditing and debugging.

**Workflow:**
1. A client sends a request to an endpoint.
2. The controller handles the request, executes queries via `db.js`.
3. Business logic is applied (salary calculations, adjustments, status determination).
4. Actions and errors are logged using `logger.js` into the `logs` table.
5. The server returns a JSON response to the client.

## API Endpoint

### Get Employee Status

- **Endpoint:** `api/getEmpStatus`  
- **Request Type:** `POST`  
- **Request Body:** JSON  

```json
{
  "NationalNumber": "1234567890"
}