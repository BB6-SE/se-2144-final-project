# SE 2144 FINAL PROJECT

# HOW TO INITIALIZE

1. Run `npm install`
2. Then On another terminal, `cd frontend` --> `npm install`
3. On another terminal, `cd frontend` --> `npm install`

## SETUP PRETTIER FOR FORMATTING

1. Install [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for vscode
2. Go to File > Preferences > Settings
3. Search for "Format" in the search bar
4. Select Prettier in the "Default Formatter" dropdown
5. Enable "Format on Save"

## SET UP LOCAL POSTGRES DATABASE

1. Open terminal
2. Run `psql -U postgres`
3. Input your password --> `Password for user postgres:`
4. Paste and run `backend/database.sql` contents into prompt
5. Add a `.env` file in the backend folder with the following format:

```
DATABASE_URL= "postgres://[YOUR_PASSWORD]@localhost:5432/notetube_dev?sslmode=disable"
```

# HOW TO RUN

### If you're in the root directory:

- Run `npm run backend`
- Run `npm run frontend`

### or you can:

- `cd frontend` then `npm run dev`
- `cd backend` then `npm run dev`

## LINTING

- `cd frontend` then `npm run lint`
- `cd backend` then `npm run lint`
