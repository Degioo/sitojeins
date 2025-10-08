# 📸 Configurazione Vercel Blob Storage per Upload Immagini

## ✅ Hai già il Token!

Hai già il token: `vercel_blob_rw_mrLuTv2DyRkwL6MA_HX2lxUQvpMkc2F4FR4F8bj0mf4FpRn`

## 1. Aggiungi la Variabile d'Ambiente

### **Sviluppo Locale** (`.env.local`):

Aggiungi questa riga al file `.env.local`:

```env
# Database
DATABASE_URL="mongodb+srv://..."

# NextAuth  
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Vercel Blob
jeins_READ_WRITE_TOKEN="vercel_blob_rw_mrLuTv2DyRkwL6MA_HX2lxUQvpMkc2F4FR4F8bj0mf4FpRn"
```

### **Produzione Vercel**:

1. Vai su **Vercel Dashboard** → **Tuo Progetto** → **Settings** → **Environment Variables**
2. Aggiungi:

| Nome | Valore | Ambiente |
|------|--------|----------|
| `jeins_READ_WRITE_TOKEN` | `vercel_blob_rw_mrLuTv2DyRkwL6MA_HX2lxUQvpMkc2F4FR4F8bj0mf4FpRn` | Production, Preview, Development |

3. Clicca **Save**
4. **NON serve redeploy** - Vercel Blob è già configurato!

## 2. Come Funziona

### Upload:
1. Vai su `/admin/team/new`
2. Clicca su **"Scegli file"** nella sezione "Foto Membro"
3. Seleziona un'immagine (max 4.5 MB)
4. L'immagine viene caricata automaticamente
5. Vedrai la preview e l'URL sarà salvato

### Storage:
- Le immagini sono salvate su Vercel Blob Storage
- Accessibili pubblicamente via CDN globale
- URL formato: `https://[hash].public.blob.vercel-storage.com/team/[filename]`

## 3. Limiti Piano Free Vercel

### Vercel Hobby (Free):
- ✅ 500 MB storage totale
- ✅ 1 GB bandwidth al mese
- ✅ Upload fino a 4.5 MB per file

### Se hai bisogno di più:
- **Pro**: $20/mese (100 GB storage, 1 TB bandwidth)
- **Enterprise**: Personalizzato

## 4. Gestione File su Vercel

### Visualizzare file caricati:
1. Vai su **Vercel Dashboard**
2. **Storage** tab → **Blob**
3. Vedrai tutti i file caricati

### Eliminare file vecchi:
- Dalla dashboard Vercel Blob
- Oppure programmaticamente via API

### Monitorare l'uso:
- Dashboard → **Storage** → Usage

## 5. Vantaggi Vercel Blob

✅ **Integrazione nativa** - Nessuna configurazione esterna  
✅ **CDN globale** - Caricamento veloce ovunque  
✅ **Semplice** - Solo 1 variabile d'ambiente  
✅ **Sicuro** - Token con permessi specifici  
✅ **Automatico** - Funziona subito su Vercel  

## 6. Ottimizzazione Immagini (Opzionale)

Per ottimizzare le immagini, puoi usare **Vercel Image Optimization**:

```tsx
import Image from 'next/image'

<Image
  src={member.image}
  alt={member.name}
  width={500}
  height={500}
  className="rounded-full"
/>
```

Questo:
- Ridimensiona automaticamente
- Converte in WebP quando supportato
- Lazy loading automatico
- Ottimizza per dispositivi diversi

## 📝 Note Importanti

1. **Limiti dimensione**: Max 4.5 MB per immagine (puoi aumentare con piano Pro)
2. **Formati supportati**: JPG, PNG, GIF, WebP, SVG
3. **Sicurezza**: Il token è read-write, proteggilo
4. **Backup**: Vercel mantiene i file finché non li elimini

## ❓ Troubleshooting

### "Upload error"
- Verifica che `jeins_READ_WRITE_TOKEN` sia configurato
- Controlla dimensione file < 4.5 MB
- Verifica formato immagine valido

### "File troppo grande"
- Riduci dimensione immagine prima dell'upload
- Oppure upgrade a Vercel Pro per limite più alto

### Token non funziona
- Verifica di aver copiato tutto il token
- Assicurati non ci siano spazi extra
- Riprova a copiarlo da Vercel Dashboard

## 🔄 Come ottenere nuovo token (se necessario)

1. Vai su **Vercel Dashboard**
2. **Storage** → **Blob**  
3. **Create New Store** (se non esiste)
4. Copia il **Read-Write Token**

## 📊 Monitoraggio Uso

Per vedere quanto storage usi:
```
Dashboard → Storage → Blob → Usage
```

Vedrai:
- Storage totale usato
- Bandwidth mensile
- Numero di file
- Costo previsto (se a pagamento)
