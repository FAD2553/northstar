// Année dynamique
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu hamburger mobile
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Fermer le menu sur resize si on passe en desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Formulaire -> ouvrir WhatsApp avec message pré-rempli
  const form = document.getElementById('waForm');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const v = id => encodeURIComponent(document.getElementById(id).value.trim());
    const msg = `Bonjour NorthStar,%0AJe souhaite vérifier mon éligibilité.%0A- Nom: ${v('nom')}%0A- Quartier: ${v('quartier')}%0A- Adresse: ${v('adresse')}%0A- Offre: ${v('offre')}%0A- Mon numéro WhatsApp: ${v('numero')}`;
    const phone = '22668077070'; // numéro prioritaire
    const url = `https://wa.me/${phone}?text=${msg}`;
    window.open(url, '_blank');
  });

  // Amélioration de l'expérience mobile
  // Smooth scroll amélioré pour mobile
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Bouton Retour en haut
  const scrollTopBtn = document.getElementById('scrollTop');
  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    if (scrolled > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleScrollTop, { passive: true });
  window.addEventListener('resize', toggleScrollTop);
  toggleScrollTop();

  if (scrollTopBtn){
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Optimisation des images pour mobile (gérer le cache navigateur)
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.style.transition = 'opacity 0.3s ease';
    const reveal = () => { img.style.opacity = '1'; };

    if (img.complete && img.naturalWidth > 0) {
      // Déjà chargée (cache) → afficher tout de suite
      reveal();
    } else {
      // En cours de chargement → masquer puis révéler à la fin
      img.style.opacity = '0';
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', () => { img.style.opacity = '1'; }, { once: true });
    }
  });

  // Amélioration des formulaires pour mobile
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    // Prévenir le zoom sur iOS
    if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
      input.style.fontSize = '16px';
    }
    
    // Améliorer l'expérience de focus
    input.addEventListener('focus', () => {
      input.style.transform = 'scale(1.02)';
      input.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
      input.style.transform = 'scale(1)';
    });
  });
});

// --- i18n simple FR/EN ---
(function(){
  const translations = {
    fr: {
      'meta.title': 'NorthStar Burkina – Internet Haut Débit pas cher',
      'meta.description': "Avec NorthStar Burkina, une connexion accessible à Ouaga et périphéries. Haut débit illimité, sans engagement. Vérifiez votre éligibilité par WhatsApp au 68 07 70 70 ou 54 67 63 63.",
      'nav.benefits': 'Avantages',
      'nav.plans': 'Offres',
      'nav.coverage': 'Zones',
      'nav.location': 'Localisation',
      'nav.contact': 'Contact',
      'hero.badge': 'INTERNET HAUT DÉBIT • PAS CHER',
      'hero.title': 'Connexion illimitée, <span style="color:var(--primary)">sans engagement</span> – à Ouaga et périphéries',
      'hero.lead': 'Avec <strong>NorthStar Burkina</strong>, votre satisfaction est garantie. Naviguez tout le mois en <strong>haut débit illimité</strong>. Vérifiez votre <strong>éligibilité</strong> en 1 clic via WhatsApp.',
      'hero.cta1': 'Vérifier au 68 07 70 70',
      'hero.cta2': 'ou 54 67 63 63',
      'hero.sub': 'Adresse : <strong>Koulouba, Avenue Houari Boumédienne</strong> • Facebook : <a href="#contact">NORTHSTAR BURKINA</a>',
      'benefits.title': 'Pourquoi choisir NorthStar ?',
      'benefits.sub': 'Une technologie fiable, un support local réactif et des prix étudiés pour tous.',
      'benefits.item1.title': 'Illimité',
      'benefits.item1.text': 'Consommez sans compter : pas de hors‑forfait, pas de coupure en fin de volume.',
      'benefits.item2.title': 'Sans engagement',
      'benefits.item2.text': 'Activez, stoppez, reprenez quand vous voulez. Liberté totale à la souscription.',
      'benefits.item3.title': 'Débits élevés',
      'benefits.item3.text': 'Streaming, visio, jeux en ligne et travail à distance dans les meilleures conditions.',
      'benefits.item4.title': 'Support WhatsApp',
      'benefits.item4.text': 'Assistance rapide et suivi client directement sur WhatsApp : 68 07 70 70 / 54 67 63 63.',
      'plans.title': 'Offres simples et transparentes',
      'plans.sub': 'Des formules pensées pour la maison, le bureau et les boutiques.',
      'plans.starter': 'Starter',
      'plans.perMonth': '/mois',
      'plans.starter1': 'Illimité tout le mois',
      'plans.starter2': 'Idéal réseaux sociaux & streaming SD',
      'plans.starter3': 'Installation rapide',
      'plans.choose': 'Choisir cette offre',
      'plans.comfort': 'Confort',
      'plans.comfort1': 'Débits renforcés',
      'plans.comfort2': 'Streaming HD, visio pro',
      'plans.comfort3': 'Support prioritaire',
      'plans.quote': 'Demander un devis',
      'plans.business': 'Business',
      'plans.business1': 'Entreprise, cyber & boutiques',
      'plans.business2': 'Matériel pro & SLA',
      'plans.business3': 'Facturation mensuelle',
      'plans.consult': 'Parler à un conseiller',
      'plans.note': '* Photos d’illustration. Prix susceptibles d’évoluer selon zone et matériel.',
      'coverage.title': 'Zones de couverture à Ouagadougou',
      'coverage.sub': 'Recevez notre « fibre par les airs » dans les quartiers suivants (liste évolutive) :',
      'coverage.cta1': 'Vérifier mon éligibilité',
      'coverage.cta2': 'WhatsApp direct',
      'elig.title': 'Vérifiez votre éligibilité en 10 secondes',
      'elig.sub': 'Renseignez votre quartier et votre adresse. Un conseiller vous répond sur WhatsApp.',
      'form.name': 'Nom et prénom',
      'form.namePh': 'Ex: OUEDRAOGO Aïcha',
      'form.district': 'Quartier',
      'form.districtPh': 'Ex: Karpala, 1200 Logements…',
      'form.address': 'Adresse détaillée',
      'form.addressPh': 'Rue, villa, repère…',
      'form.plan': 'Offre souhaitée',
      'form.planStarter': 'Starter – 12 500 F / mois',
      'form.planComfort': 'Confort – sur devis',
      'form.planBusiness': 'Business – sur devis',
      'form.whatsapp': 'Numéro WhatsApp',
      'form.whatsappPh': 'Ex: 68 07 70 70',
      'form.submit': 'Envoyer sur WhatsApp',
      'gallery.title': 'Connexion pour tous',
      'gallery.sub': 'Des milliers d’utilisateurs nous font confiance chaque mois.',
      'faq.title': 'Questions fréquentes',
      'faq.q1': 'L’offre est-elle vraiment sans engagement ?',
      'faq.a1': 'Oui. Vous payez au mois, sans obligation de reconduction.',
      'faq.q2': 'Quels documents pour souscrire ?',
      'faq.a2': 'Une pièce d’identité et votre adresse. L’installation se planifie par WhatsApp.',
      'faq.q3': 'Comment payer ?',
      'faq.a3': 'Espèces, mobile money ou virement selon les zones. Les détails sont fournis lors de la validation.',
      'location.title': 'Localisation',
      'location.sub': 'Passez nous voir à <strong>Koulouba, Avenue Houari Boumédienne</strong>. Cliquez pour l’itinéraire.',
      'location.note': 'Retrouvez-nous facilement sur Google Maps.',
      'location.directions': 'Voir l’itinéraire',
      'location.messageUs': 'Nous écrire',
      'contact.title': 'Nous contacter',
      'contact.addressL': 'Adresse :',
      'contact.phoneL': 'Téléphone / WhatsApp :',
      'contact.facebookL': 'Facebook :',
      'contact.whatsappBtn': 'Écrire sur WhatsApp',
      'contact.eligBtn': 'Tester mon éligibilité',
      'footer.tagline': 'Au‑delà de la connexion – Internet haut débit pour tous.',
      'footer.quick': 'Liens rapides',
      'footer.linkPlans': 'Offres',
      'footer.linkCoverage': 'Couverture',
      'footer.linkElig': 'Vérifier éligibilité',
      'footer.support': 'Support',
      'footer.rights': 'Tous droits réservés.'
    },
    en: {
      'meta.title': 'NorthStar Burkina – Affordable High-Speed Internet',
      'meta.description': 'With NorthStar Burkina, accessible internet in Ouagadougou and surroundings. Unlimited high speed, no commitment. Check your eligibility via WhatsApp at 68 07 70 70 or 54 67 63 63.',
      'nav.benefits': 'Benefits',
      'nav.plans': 'Plans',
      'nav.coverage': 'Coverage',
      'nav.location': 'Location',
      'nav.contact': 'Contact',
      'hero.badge': 'HIGH-SPEED INTERNET • AFFORDABLE',
      'hero.title': 'Unlimited connection, <span style="color:var(--primary)">no commitment</span> – in Ouaga and suburbs',
      'hero.lead': 'With <strong>NorthStar Burkina</strong>, your satisfaction is guaranteed. Enjoy <strong>unlimited high speed</strong> all month. Check your <strong>eligibility</strong> in 1 click via WhatsApp.',
      'hero.cta1': 'Check via 68 07 70 70',
      'hero.cta2': 'or 54 67 63 63',
      'hero.sub': 'Address: <strong>Koulouba, Avenue Houari Boumédienne</strong> • Facebook: <a href="#contact">NORTHSTAR BURKINA</a>',
      'benefits.title': 'Why choose NorthStar?',
      'benefits.sub': 'Reliable tech, responsive local support and fair pricing for everyone.',
      'benefits.item1.title': 'Unlimited',
      'benefits.item1.text': 'Use without limits: no overage, no cutoff at end of volume.',
      'benefits.item2.title': 'No commitment',
      'benefits.item2.text': 'Start, pause, resume whenever you want. Full flexibility.',
      'benefits.item3.title': 'High speeds',
      'benefits.item3.text': 'Streaming, video calls, gaming and remote work at their best.',
      'benefits.item4.title': 'WhatsApp support',
      'benefits.item4.text': 'Fast assistance and customer care on WhatsApp: 68 07 70 70 / 54 67 63 63.',
      'plans.title': 'Simple and transparent plans',
      'plans.sub': 'Packages for home, office and shops.',
      'plans.starter': 'Starter',
      'plans.perMonth': '/month',
      'plans.starter1': 'Unlimited all month',
      'plans.starter2': 'Great for social media & SD streaming',
      'plans.starter3': 'Quick setup',
      'plans.choose': 'Choose this plan',
      'plans.comfort': 'Comfort',
      'plans.comfort1': 'Boosted speeds',
      'plans.comfort2': 'HD streaming, pro video calls',
      'plans.comfort3': 'Priority support',
      'plans.quote': 'Request a quote',
      'plans.business': 'Business',
      'plans.business1': 'For companies, cyber & shops',
      'plans.business2': 'Pro gear & SLA',
      'plans.business3': 'Monthly billing',
      'plans.consult': 'Talk to an advisor',
      'plans.note': '* Illustrative photos. Prices may vary by area and equipment.',
      'coverage.title': 'Coverage areas in Ouagadougou',
      'coverage.sub': 'Get our “air fiber” in the following districts (evolving list):',
      'coverage.cta1': 'Check my eligibility',
      'coverage.cta2': 'Direct WhatsApp',
      'elig.title': 'Check your eligibility in 10 seconds',
      'elig.sub': 'Enter your district and address. A representative replies on WhatsApp.',
      'form.name': 'Full name',
      'form.namePh': 'e.g., OUEDRAOGO Aïcha',
      'form.district': 'District',
      'form.districtPh': 'e.g., Karpala, 1200 Logements…',
      'form.address': 'Detailed address',
      'form.addressPh': 'Street, house, landmark…',
      'form.plan': 'Desired plan',
      'form.planStarter': 'Starter – 12,500 F / month',
      'form.planComfort': 'Comfort – on quote',
      'form.planBusiness': 'Business – on quote',
      'form.whatsapp': 'WhatsApp number',
      'form.whatsappPh': 'e.g., 68 07 70 70',
      'form.submit': 'Send on WhatsApp',
      'gallery.title': 'Connectivity for everyone',
      'gallery.sub': 'Thousands trust us every month.',
      'faq.title': 'Frequently Asked Questions',
      'faq.q1': 'Is the plan truly without commitment?',
      'faq.a1': 'Yes. You pay monthly with no renewal obligation.',
      'faq.q2': 'What documents are required to subscribe?',
      'faq.a2': 'An ID and your address. Installation is arranged on WhatsApp.',
      'faq.q3': 'How do I pay?',
      'faq.a3': 'Cash, mobile money or bank transfer depending on area. Details are shared upon confirmation.',
      'location.title': 'Location',
      'location.sub': 'Visit us at <strong>Koulouba, Avenue Houari Boumédienne</strong>. Click for directions.',
      'location.note': 'Find us easily on Google Maps.',
      'location.directions': 'Get directions',
      'location.messageUs': 'Message us',
      'contact.title': 'Contact us',
      'contact.addressL': 'Address:',
      'contact.phoneL': 'Phone / WhatsApp:',
      'contact.facebookL': 'Facebook:',
      'contact.whatsappBtn': 'Message on WhatsApp',
      'contact.eligBtn': 'Test my eligibility',
      'footer.tagline': 'Beyond connection – High-speed internet for everyone.',
      'footer.quick': 'Quick links',
      'footer.linkPlans': 'Plans',
      'footer.linkCoverage': 'Coverage',
      'footer.linkElig': 'Check eligibility',
      'footer.support': 'Support',
      'footer.rights': 'All rights reserved.'
    }
  };

  const setHtml = (el, key, locale) => {
    const t = translations[locale][key];
    if (t == null) return;
    el.innerHTML = t;
  };
  const setAttr = (el, key, attr, locale) => {
    const t = translations[locale][key];
    if (t == null) return;
    el.setAttribute(attr, t);
  };

  function applyTranslations(locale){
    const root = document.documentElement;
    root.lang = locale;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      setHtml(el, el.getAttribute('data-i18n'), locale);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      setAttr(el, el.getAttribute('data-i18n-placeholder'), 'placeholder', locale);
    });
    const titleKey = 'meta.title';
    const descKey = 'meta.description';
    const titleEl = document.querySelector('title[data-i18n="meta.title"]');
    if (titleEl) titleEl.textContent = translations[locale][titleKey];
    const descMeta = document.querySelector('meta[name="description"][data-i18n-meta]');
    if (descMeta) descMeta.setAttribute('content', translations[locale][descKey]);
  }

  function initLang(){
    const select = document.getElementById('langSwitch');
    const saved = localStorage.getItem('lang') || 'fr';
    if (select) select.value = saved;
    applyTranslations(saved);
    if (select){
      select.addEventListener('change', () => {
        const val = select.value;
        localStorage.setItem('lang', val);
        applyTranslations(val);
      });
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();