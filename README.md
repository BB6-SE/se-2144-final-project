# SE 2144 FINAL PROJECT

## How to Initialize the App

1. Run `npm install`
2. Run `cd frontend` then `npm install`
3. Run `cd backend` then `npm install`

### Setup Prettier for Code Formatting

1. Install [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for vscode
2. Go to File > Preferences > Settings
3. Search for "Format" in the search bar
4. Select Prettier in the "Default Formatter" dropdown
5. Enable "Format on Save"

### Set Up Local Postgres Database

1. Open terminal
2. Run `psql -U postgres`
3. Input your password --> `Password for user postgres:`
4. Paste and run `backend/database.sql` contents into prompt
5. Add a `.env` file in the backend folder with the following format:

```
DATABASE_URL= "postgres://postgres:[YOUR_PASSWORD]@localhost:5432/notetube_dev?sslmode=disable"
```

## How to Run the App

### If you're in the root directory:

- Run `npm run backend`
- Run `npm run frontend`

### or you can:

- `cd frontend` then `npm run dev`
- `cd backend` then `npm run dev`

### Linting

- `cd frontend` then `npm run lint`
- `cd backend` then `npm run lint`
