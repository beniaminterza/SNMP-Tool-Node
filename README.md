# Beschreibung

Ich werde Node JS verwenden um dieses SNMP Tool zu machen.


Ich werde folgende Bibliothek verwenden:**https://www.npmjs.com/package/net-snmp**

# Installation/Ausführung

Ich hab bis jetzt nocht nicht viel programmiert aber für die Ausführung folgt man folgeneden Schritten

1. In der Cmd kontrollieren ob man Node JS schon installiert hat

```
node -v
```

Wenn man nicht Node JS installiert hat, dann sollte man es installieren **https://nodejs.org/en/download/**

2. Script ausführen: 
In der Cmd das richtige Verzeichnis auswählen und dann folgendes eingeben

```
node app.js
```

3. API verwenden:
Um zu testen obs funktioniert kann man eine API im Netz aufrufen
Api die zurzeit verfügbar sind:

* http://localhost:3000/checkIP/GEWÜNSCHTEIPEINGEBEN
 Diese API gibt in ein boolean zurück ob die IP Adresse SNMP unterstützt
 Verbessern: wenn SNMP bei einer IP Adresse nicht aktivert ist, dann kann dass sehr lange dauern

* http://localhost:3000/scanNetwork/GEWÜNSCHTEIPEINGEBEN/SUBNETZMASKEINKURZSCHREIBWEIßE
 Beispiel SN Netz: http://localhost:3000/scanNetwork/10.10.30.0/24
 Achtung: Zurzeit nur mit /24 möglich

* http://localhost:3000/allInformations/GEWÜNSCHTEIPEINGEBEN
 Beispiel: http://localhost:3000/allInformations/127.0.0.1
 Achtung könnte sehr lang dauern!

* http://localhost:3000/informations/GEWÜNSCHTEIPEINGEBEN
 6 OIDS mit Values werden zurückgegeben
 Beispiel: http://localhost:3000/informations/127.0.0.1
