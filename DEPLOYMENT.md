# Guida al Deploy su Vercel

## 1. Prerequisiti

- Account Vercel
- Database MongoDB Atlas configurato
- Repository GitHub collegato a Vercel

## 2. Variabili d'ambiente su Vercel

Vai su Vercel Dashboard → Settings → Environment Variables e aggiungi:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"
NEXTAUTH_URL="https://tuo-dominio.vercel.app"
NEXTAUTH_SECRET="genera-un-segreto-casuale-lungo"
INIT_SECRET="un-altro-segreto-per-inizializzazione"
```

**Come generare i segreti:**
```bash
# Su Linux/Mac
openssl rand -base64 32

# Su Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## 3. Deploy su Vercel

1. Collega il repository GitHub a Vercel
2. Vercel rileverà automaticamente Next.js
3. Clicca su "Deploy"
4. Attendi il completamento del deploy

## 4. Inizializzazione Database (DOPO IL PRIMO DEPLOY)

### Metodo 1: API Route protetta (Consigliato)

Dopo il deploy, inizializza il database chiamando l'API protetta:

```bash
curl -X POST https://tuo-dominio.vercel.app/api/init-database \
  -H "x-init-secret: IL_TUO_INIT_SECRET" \
  -H "Content-Type: application/json"
```

Oppure usa Postman/Insomnia:
- Method: POST
- URL: `https://tuo-dominio.vercel.app/api/init-database`
- Headers: `x-init-secret: IL_TUO_INIT_SECRET`

**Risposta attesa:**
```json
{
  "success": true,
  "message": "Database inizializzato con successo!",
  "admin": {
    "email": "admin@jeins.it",
    "password": "admin123",
    "note": "IMPORTANTE: Cambia subito la password dopo il primo accesso!"
  }
}
```

### Metodo 2: Esecuzione locale

```bash
# Copia il DATABASE_URL da Vercel
DATABASE_URL="mongodb+srv://..." npm run db:seed
```

## 5. Primo Accesso Admin

1. Vai su `https://tuo-dominio.vercel.app/admin/login`
2. Accedi con:
   - **Email:** `admin@jeins.it`
   - **Password:** `admin123`
3. **IMPORTANTE:** Cambia immediatamente la password dalle impostazioni

## 6. Sicurezza Post-Deploy

### ⚠️ AZIONI OBBLIGATORIE DOPO L'INIZIALIZZAZIONE:

1. **Rimuovi l'endpoint di inizializzazione:**
   ```bash
   # Elimina il file
   rm app/api/init-database/route.ts
   
   # Commit e push
   git add .
   git commit -m "security: Remove init endpoint after database initialization"
   git push
   ```

2. **Cambia la password admin** dal pannello admin

3. **Rimuovi INIT_SECRET** dalle environment variables di Vercel

## 7. Popolare il Database con Dati di Esempio (Opzionale)

Se vuoi aggiungere dati di esempio (servizi, progetti, blog posts):

```bash
# Localmente con DATABASE_URL di produzione
DATABASE_URL="mongodb+srv://..." npm run db:populate
```

## 8. Troubleshooting

### Errore di connessione al database
- Verifica che MongoDB Atlas permetta connessioni da `0.0.0.0/0` (Vercel usa IP dinamici)
- Controlla che il DATABASE_URL sia corretto

### Errore di autenticazione
- Assicurati che NEXTAUTH_SECRET e NEXTAUTH_URL siano configurati correttamente
- Verifica che il database sia stato inizializzato

### Build fallisce
- Verifica che tutte le dipendenze siano installate
- Controlla i log di build su Vercel per dettagli

## 9. Comandi Utili

```bash
# Genera Prisma Client
npm run db:generate

# Push schema a database
npm run db:push

# Inizializza database (locale)
npm run db:seed

# Popola con dati di esempio (locale)
npm run db:populate

# Apri Prisma Studio
npm run db:studio

# Build di produzione
npm run build

# Avvia in produzione
npm start
```

## 10. Monitoraggio

- Controlla i log su Vercel Dashboard → Deployments → View Logs
- Monitora l'uso del database su MongoDB Atlas
- Configura alerting per errori critici

## 11. Domini Personalizzati

1. Vai su Vercel Dashboard → Domains
2. Aggiungi il tuo dominio personalizzato
3. Configura i DNS secondo le istruzioni di Vercel
4. Aggiorna `NEXTAUTH_URL` con il nuovo dominio

