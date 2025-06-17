# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Fonctionnement général d’un lien d’activation
* L’utilisateur s’inscrit avec email + mot de passe
* Le backend crée un token temporaire (JWT ou aléatoire)
* Un email est envoyé à l’utilisateur avec un lien du type:
    ```bash
    http://localhost:5000/activate/<token>
    ``` 

# Installer Nodemailer pour envoyer les emails
    ```bash
    npm install nodemailer
    ``` 
    Et configurer un transport SMTP (Gmail ou autre).

