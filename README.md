# Simulateur d'Épargne & Calculatrice d'Intérêts Composés

Une application web interactive et moderne permettant de calculer et de visualiser la croissance d'un capital au fil du temps grâce aux intérêts composés.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

---

## Fonctionnalités

* **Calcul dynamique d'intérêts composés** : Prise en compte du capital initial, des versements mensuels réguliers, du taux d'intérêt annuel et de la durée.
* **Support multi-devises** : Prise en charge dynamique de 4 devises (**Franc CFA `FCFA`**, **Euro `€`**, **Dollar `$`**, et **Naira `₦`**).
* **Graphique interactif** : Visualisation claire année par année du capital versé vs. intérêts cumulés grâce à la bibliothèque **Chart.js**.
* **Exportation de données CSV** : Génération et téléchargement de l'échéancier complet sous forme de fichier `.csv` compatible avec Microsoft Excel et Google Sheets.
* **Interface Responsive & Dark Mode** : Design adapté aux écrans d'ordinateurs, tablettes et smartphones.

---

## Technologies Utilisées

* **HTML5** : Structure sémantique du formulaire et du tableau de bord.
* **CSS3** : Flexbox, CSS Grid, variables et animations pour le design moderne.
* **JavaScript (ES6+)** : Logique de calcul financière, manipulation du DOM et formatage dynamique `Intl.NumberFormat`.
* **[Chart.js](https://www.chartjs.org/)** : Génération et rendu des graphiques dynamiques.

---

## Formule Mathématique Appliquée

L'application utilise la formule composée mensuelle :

$$A = P \times (1 + r)^t + M \times \frac{(1 + r)^t - 1}{r}$$

Où :
* **$A$** = Montant total cumulé
* **$P$** = Capital initial
* **$r$** = Taux d'intérêt mensuel ($Taux\_Annuel / 12$)
* **$t$** = Nombre total de mois ($Années \times 12$)
* **$M$** = Versement mensuel

---

## Installation & Utilisation Locale

Aucune dépendance lourde ni installation de serveur n'est requise.

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/VOTRE_PSEUDO/simulateur-epargne.git](https://github.com/VOTRE_PSEUDO/simulateur-epargne.git)
