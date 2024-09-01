
# Configuration de l'environnement de test React avec Vitest

Ce guide explique comment configurer un environnement de test pour une application React en utilisant Vitest.

## Dépendances nécessaires

Les dépendances suivantes sont requises pour l'environnement de test :

- **Vitest** : Le framework de test principal.
- **@testing-library/react** : Pour rendre et interagir avec vos composants React dans les tests.
- **@testing-library/jest-dom** : Pour des assertions supplémentaires spécifiques au DOM.
- **jsdom** : Pour simuler un environnement DOM dans Node.js (nécessaire pour tester des composants React).
- **redux-mock-store** : Si vous testez des composants qui utilisent Redux.

## Installation

Installez les dépendances en utilisant npm :

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom redux-mock-store
```

## Configuration de vite 

```javascript 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

##Fichier de configuration des tests

Creez un dossier 'test' dans votre dossier 'src'

## Ajouter un script de test dans "package.json"

{
  "scripts": {
    "test": "vitest"
  }
}

## Ecriture des tests

Creez vos fichiers de tests directement dans le dossier du composant tester 

## Execution des tests 

Pour executer vos tests utilisez la commande 

```bash
npm run test
```

## documentation vitest 

[vous trouverez ici la documentation de vitest](https://vitest.dev/guide/)