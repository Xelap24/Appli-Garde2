# Appli-Garde2
Application pour faciliter la garde de Neurochirurgie à Besançon.

## Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

## Setup
1. Move into the project directory:
   ```bash
   cd project
   ```
2. Install dependencies (use `--legacy-peer-deps` to bypass the React 19 peer conflict):
   ```bash
   npm install --legacy-peer-deps
   ```
   After installation, `patch-package` will automatically adjust
   `lucide-react-native` to work with React 19.
3. Start the development server:
   ```bash
   npm run dev
   ```

Once the server is running, you can scan the QR code with Expo Go or
open the project in an iOS or Android emulator to view the app.

## Quick Start Script

Pour démarrer rapidement l'application, exécutez simplement :

```bash
./start.sh
```

Ce script installe les dépendances si nécessaire puis lance le serveur
de développement Expo.

