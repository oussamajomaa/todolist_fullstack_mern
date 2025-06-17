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



