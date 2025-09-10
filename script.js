// Année dynamique
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
});