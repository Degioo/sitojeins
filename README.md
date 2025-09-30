# JEIns - Sito Istituzionale

Sito web istituzionale per **JEIns - Junior Enterprise Insubria** sviluppato con Next.js 14, Tailwind CSS e font Montserrat.

## 🚀 Avvio Rapido

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri http://localhost:3000 nel browser
```

## 🎨 Design System

### Palette Colori Insubria

Il sito utilizza una palette di colori ispirata all'Università dell'Insubria con variabili CSS personalizzate:

```css
:root {
  --insubria-green-700: #15803d;  /* Verde scuro per testi/elementi */
  --insubria-green-500: #86efac;  /* Verde primario pastello per CTA */
  --insubria-green-100: #f0f9f4;  /* Verde chiarissimo per background */
  --neutral-900: #171717;          /* Testo principale */
  --neutral-700: #404040;          /* Testo secondario */
  --neutral-500: #737373;          /* Testo terziario */
  --neutral-100: #f5f5f5;         /* Background neutro */
}
```

### Personalizzazione Colori

Per modificare la palette colori:

1. **Tailwind Config**: Modifica `tailwind.config.js`
2. **CSS Variables**: Aggiorna `app/globals.css`
3. **Componenti**: I colori sono utilizzati tramite classi Tailwind

### Tipografia

- **Font**: Montserrat (Google Fonts)
- **Pesi**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Gerarchia**: Titoli bold/semibold, body regular/medium

## 🖼️ Immagini

### Hero Background

Per cambiare l'immagine di sfondo della homepage:

1. Sostituisci l'URL in `app/page.tsx`:
```tsx
<Hero
  backgroundImage="/images/hero-universita.jpg"
  // ... altre props
/>
```

2. **Raccomandazioni**:
   - Dimensioni: 1920x1080px o superiori
   - Formato: JPG/PNG
   - Contenuto: Facciata universitaria o ambiente accademico
   - Stile: Immagine in bianco e nero o sbiancata al 85%

### Logo JEIns

Per aggiungere il logo JEIns:

1. Carica il file in `public/images/logo-jeins.png`
2. Il logo apparirà automaticamente nella navbar
3. **Raccomandazioni**:
   - Dimensioni: 200x60px (o proporzioni simili)
   - Formato: PNG con sfondo trasparente
   - Stile: Pulito, minimale, leggibile

### Portfolio Images

Per aggiungere immagini ai progetti:

1. Carica le immagini in `public/images/portfolio-1.jpg` fino a `portfolio-6.jpg`
2. Le immagini appariranno automaticamente nelle card portfolio
3. **Raccomandazioni**:
   - Dimensioni: 800x600px
   - Formato: JPG
   - Contenuto: Screenshot o foto dei progetti realizzati

### 📋 Checklist Immagini

- [ ] `public/images/logo-jeins.png` - Logo JEIns
- [ ] `public/images/hero-universita.jpg` - Sfondo hero università
- [ ] `public/images/portfolio-1.jpg` - Progetto 1
- [ ] `public/images/portfolio-2.jpg` - Progetto 2
- [ ] `public/images/portfolio-3.jpg` - Progetto 3
- [ ] `public/images/portfolio-4.jpg` - Progetto 4
- [ ] `public/images/portfolio-5.jpg` - Progetto 5
- [ ] `public/images/portfolio-6.jpg` - Progetto 6

### Ottimizzazione Immagini

Il progetto utilizza `next/image` per l'ottimizzazione automatica. Per aggiungere nuove immagini:

1. Carica le immagini in `public/images/`
2. Utilizza il componente `Image` di Next.js:
```tsx
import Image from 'next/image'

<Image
  src="/images/tua-immagine.jpg"
  alt="Descrizione"
  width={800}
  height={600}
/>
```

## 📝 Form e Integrazioni

### Form Contatti (`/contatti`)

**Stato attuale**: Simulazione con alert
**Integrazione futura**:
- Google Forms
- EmailJS
- API endpoint personalizzato

**TODO nel codice**:
```tsx
// TODO: Integrare con endpoint reale o Google Forms
// Per ora simuliamo l'invio
```

### Form Recruitment (`/recruitment`)

**Stato attuale**: Simulazione con alert
**Integrazione futura**:
- Google Forms con upload file
- Airtable
- Database personalizzato

**TODO nel codice**:
```tsx
// TODO: Integrare con endpoint reale o Google Forms
// Per ora simuliamo l'invio
```

### Newsletter (`components/NewsletterBox.tsx`)

**Stato attuale**: Simulazione con alert
**Integrazione futura**:
- Brevo (ex Sendinblue)
- Mailchimp
- ConvertKit

**TODO nel codice**:
```tsx
// TODO: Integrare con Brevo/Mailchimp
// Per ora simuliamo l'invio
```

## 🔧 Personalizzazione Contenuti

### Team Members (`app/chi-siamo/page.tsx`)

Per aggiornare i membri del team:

```tsx
<TeamMember
  name="Nome Cognome"
  role="Ruolo"
  description="Breve descrizione"
  image="url-immagine" // opzionale
/>
```

### Servizi (`app/servizi/page.tsx`)

Per modificare i servizi offerti:

```tsx
const services = [
  {
    title: "Nome Servizio",
    description: "Descrizione dettagliata",
    sector: "Settore"
  },
  // ... altri servizi
]
```

### Portfolio (`app/page.tsx`)

Per aggiornare i progetti:

```tsx
<PortfolioCard
  title="Nome Progetto"
  description="Descrizione progetto"
  tags={["Tag1", "Tag2", "Tag3"]}
  client="Nome Cliente"
  image="url-immagine" // opzionale
/>
```

## 📱 Responsive Design

Il sito è sviluppato con approccio **mobile-first**:

- **Breakpoints Tailwind**:
  - `sm`: 640px+
  - `md`: 768px+
  - `lg`: 1024px+
  - `xl`: 1280px+

- **Componenti responsive**:
  - Navbar con hamburger menu mobile
  - Grid layout adattivo
  - Form ottimizzati per mobile

## ♿ Accessibilità

- **Contrasto**: Rispetta gli standard AA
- **Navigazione**: Supporto tastiera completo
- **Screen reader**: Labels e alt text appropriati
- **Focus**: Indicatori visibili per focus

## 🚀 Deployment

### Vercel (Raccomandato)

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy la cartella 'out' su Netlify
```

### Altri Provider

Il progetto è compatibile con qualsiasi provider che supporti Next.js:
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📊 SEO e Performance

### Meta Tags

Ogni pagina include meta tags ottimizzati:

```tsx
export const metadata: Metadata = {
  title: 'Titolo Pagina - JEIns',
  description: 'Descrizione della pagina',
  openGraph: {
    title: 'Titolo Pagina - JEIns',
    description: 'Descrizione della pagina',
    type: 'website',
  },
}
```

### Performance

- **Next.js 14**: App Router per performance ottimali
- **Image Optimization**: Automatica con `next/image`
- **Font Optimization**: Google Fonts con `next/font`
- **Code Splitting**: Automatico per ogni pagina

## 🔄 Fasi di Sviluppo

### Fase Zero Budget (Attuale)

✅ **Completato**:
- Design system completo
- Tutte le pagine funzionanti
- Form con simulazione
- Responsive design
- SEO base

### Fase Upgrade (Futura)

🔄 **Da implementare**:
- Integrazione form reali
- CMS per contenuti
- Analytics
- Newsletter automation
- Blog funzionale
- Database progetti

## 📁 Struttura Progetto

```
├── app/                    # App Router Next.js 14
│   ├── globals.css         # Stili globali e variabili CSS
│   ├── layout.tsx          # Layout principale
│   ├── page.tsx            # Homepage
│   ├── chi-siamo/          # Pagina Chi siamo
│   ├── servizi/            # Pagina Servizi
│   ├── recruitment/        # Pagina Recruitment
│   ├── contatti/           # Pagina Contatti
│   └── blog/               # Pagina Blog (placeholder)
├── components/             # Componenti riutilizzabili
│   ├── Navbar.tsx          # Navigazione
│   ├── Footer.tsx          # Footer
│   ├── Hero.tsx            # Sezione hero
│   ├── ServiceCard.tsx     # Card servizi
│   ├── StatsCard.tsx       # Card statistiche
│   ├── TeamMember.tsx      # Card membro team
│   ├── PortfolioCard.tsx   # Card portfolio
│   ├── NewsletterBox.tsx   # Newsletter
│   ├── ContactForm.tsx     # Form contatti
│   └── RecruitmentForm.tsx # Form recruitment
├── public/                 # File statici
├── tailwind.config.js      # Configurazione Tailwind
├── next.config.js          # Configurazione Next.js
└── package.json            # Dipendenze
```

## 🛠️ Script Disponibili

```bash
npm run dev      # Server di sviluppo
npm run build    # Build di produzione
npm run start    # Server di produzione
npm run lint     # Linting ESLint
```

## 📞 Supporto

Per domande o supporto:
- **Email**: info@jeins.it
- **GitHub**: [Repository del progetto]
- **Documentazione**: Questo README

---

**JEIns - Junior Enterprise Insubria**  
*Mostriamo il valore degli studenti dell'Insubria*
