# Gestion-des-notifications-groupe-2
groupe2

Les notifications sont générés dans le fichier backend\app\helpers\notify.php 
la fonction notify est accessible de partout 
Elle prend en parametre $userId (id de l'utilisateur connecté),  $title( le titre de la notif Informations , Remboursement , Payement ),  $content (contenu et corps de la notif ), $type( type de la notif payment_success , payment_echoue , infos_system ) dans ce ordre 
Pour aller vite des modeles de notifications sont déjà crées et utilisables
Il s'agit de 
notifyPaymentSuccess(int $userId, string $amount)

notifyPaymentFailed(int $userId, string $amount)

notifyPaymentWaited(int $userId, string $amount)

notifyPaymentInfos(int $userId, string $amount)

notifyPaymentRemboursement(int $userId, string $amount)

Ils prennent en parametre juste l'id du user connecté et le montant en question

Par conséquent dans l'une des fonctions qui gère un payment ou alors un remboursement on peut juste ajouter notifyPaymentSuccess(user->id , 100000) pour générer cette notif dans la bdd et la rendere accessible au front
