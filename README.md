# MedidoresApp

Nombre: Kevin Muñoz

## Descripción

Esta Aplicación usa como backend a Firebase, junto Ionic Angular con NgModules 

## APK

Para pobrar el apk ir a: [APK MEDIDORES](android/app/build/outputs/apk/debug)

## Pantalla login

El login diseñado para esta aplicación es:

<img width="251" height="341" alt="image" src="https://github.com/user-attachments/assets/162f8333-bc88-4ba7-b2f8-bf283b5d02c0" />

Solo los usuarios registrados en base de datos podrán entrar en la aplicación, para lo cual se tiene el siguiente punto de Registro

## Pantalla registro

La pantalla de registro tiene dos roles, uno de Medidor y otro de Administrador

Para registrarse como Medidor es:

<img width="261" height="451" alt="image" src="https://github.com/user-attachments/assets/f2d4a416-6763-4590-8ea2-5a53cb19fa2a" />

Por otra parte, está el login como Administrador el cual está restringido su registro porque solo aquellos seleccionados podrán tener ese rol:

<img width="264" height="505" alt="image" src="https://github.com/user-attachments/assets/1a1a417c-5351-47de-a556-389d1ee37f0b" />

La clave para probar este rol es Clave de Administrador: AdminABC123_

## Dashboard

Una vez registrado, la app llevará a la pantalla de Inicio de Sesión e ingresar al Dashboard:

### Entrar como Medidor:

<img width="266" height="335" alt="image" src="https://github.com/user-attachments/assets/095d14cb-7b5f-4e30-9c3f-cf31b5400345" />

Una vez se inicie sesión, el sistema mostrará un mensaje de éxito:

<img width="251" height="48" alt="image" src="https://github.com/user-attachments/assets/79222015-dbb1-4991-b033-b3aee5db2e4c" />

Y se tendrá la visualización del Dashboard principal:

<img width="257" height="540" alt="image" src="https://github.com/user-attachments/assets/7ad13e29-86f3-46f3-a608-0fcdeb6f8feb" />

### Agregar un registro:

Para agregar un registro, se procede a ir a la sección de Nueva Medición, donde se podrá llenar datos importantes, captura la ubicación y tomar fotos:

<img width="269" height="389" alt="image" src="https://github.com/user-attachments/assets/8bebc543-f247-4d2f-b752-e3acf33010c6" />

<img width="262" height="386" alt="image" src="https://github.com/user-attachments/assets/95890042-40a6-465d-be1e-32674991966a" />

Al querer obtener la ubicación, pedirá permisos necesarios para hacerlo, en este caso el dispositivo ya cuenta con los permisos por lo que agarra la ubicación inmediatamente:

<img width="201" height="89" alt="image" src="https://github.com/user-attachments/assets/e34e5343-4812-4c9f-8641-f3e69b2334f9" />

<img width="255" height="141" alt="image" src="https://github.com/user-attachments/assets/a665df99-cd6e-49ed-b416-0a44e54f55c1" />

Lo mismo será para la cámara que pide permisos antes:

<img width="252" height="238" alt="image" src="https://github.com/user-attachments/assets/05ac75d2-81c7-49aa-b633-442b8729ecd1" />

Se abrirá la cámara:

<img width="271" height="540" alt="image" src="https://github.com/user-attachments/assets/c14ff01f-a781-40fe-93a0-8a01c2ddd966" />

Y se registrará:

<img width="257" height="317" alt="image" src="https://github.com/user-attachments/assets/0a57fc63-932c-4998-8553-ef96bf247744" />

Lo mismo será para capturar foto de la Fachada.

Al terminar, se presiona en el botón Guardar y dará mensaje de éxito:

<img width="272" height="44" alt="image" src="https://github.com/user-attachments/assets/cafc904d-7dad-42b9-9373-171c7557354a" />

Y se mostrará el registro de ese usuario:

<img width="266" height="291" alt="image" src="https://github.com/user-attachments/assets/327b990c-44f8-4aee-8063-cea8a622240d" />

En la opción Ver Detalles se mostrará lo siguiente:

<img width="260" height="418" alt="image" src="https://github.com/user-attachments/assets/90737324-cdb0-4aca-af98-13a30428d2ce" />

La ubicación tendrá un botón de Google Maps que llevará al mapa para ver el lugar donde se tomó la foto

<img width="263" height="131" alt="image" src="https://github.com/user-attachments/assets/a0cb3699-fd94-418b-8699-74b09593d623" />

<img width="242" height="485" alt="image" src="https://github.com/user-attachments/assets/067722a9-a404-4bf8-8444-a0bbaf89c660" />

### Entrar como Administrador

Se inicia sesión igual que como el Medidor pero en este caso se agarra el usuario de Administrador porque está asociado a las credenciales registradas. Al entrar se podrá visualizar el siguiente Dashboard:

<img width="266" height="526" alt="image" src="https://github.com/user-attachments/assets/2eac5b1e-c9b1-4cf0-a5ca-f23a3644b337" />

Como administrador puede ver todos los registros de los medidores existentes en la BDD

<img width="264" height="537" alt="image" src="https://github.com/user-attachments/assets/5ca1455a-7134-4ab4-8e2d-66fc09293a8f" />

E igualmente puede usar la opción Ver Detalles:

<img width="255" height="539" alt="image" src="https://github.com/user-attachments/assets/ace21f40-313f-4095-9bc2-1e539a753cda" />

## Logout
Además se incluye un botón de logout que se ubica en la parte superior derecha disponible para ambos roles:

<img width="103" height="59" alt="image" src="https://github.com/user-attachments/assets/3ca07b92-4631-4315-b54d-46f733dae283" />

<img width="265" height="47" alt="image" src="https://github.com/user-attachments/assets/e7eeee9d-222f-4f3a-bf30-b514e3c0b46e" />




































