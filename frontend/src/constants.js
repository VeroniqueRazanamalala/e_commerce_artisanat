import chapeauImg from './assets/image/chapeau.jpg';
import sacImg from './assets/image/sac.png';
import sac1Img from './assets/image/sac1.jpg';
import sac2Img from './assets/image/sac2.png';
import sandaleImg from './assets/image/sandale.png';
import sandale2Img from './assets/image/sandale2.png';

export const PRODUCTS = [
  {
    id: '1',
    name: 'Chapeau Fedora Classique',
    price: 45000,
    description: 'Le chapeau iconique en raphia naturel avec ruban noir, tissé avec une grande finesse.',
    category: 'Chapeaux',
    image: chapeauImg,
    features: ['100% Raphia Naturel', 'Tissage Artisanal', 'Ruban de gros-grain']
  },
  {
    id: '2',
    name: 'Sac Cabas Sihanaka',
    price: 75000,
    description: 'Grand sac hobo en raphia souple, spacieux et élégant pour le quotidien.',
    category: 'Sacs',
    image: sacImg,
    features: ['Durable', 'Poignées robustes', 'Texture souple']
  },
  {
    id: '3',
    name: 'Sandales Tressées Ravinala',
    price: 55000,
    description: 'Sandales avec semelle en liège et brides en raphia tressé, alliant confort et style.',
    category: 'Sandales',
    image: sandaleImg,
    features: ['Confort optimal', 'Semelle liège', 'Tissage main']
  },
  {
    id: '4',
    name: 'Pochette Éventail',
    price: 35000,
    description: 'Sac à main en forme d\'éventail, une pièce artistique pour vos soirées.',
    category: 'Sacs',
    image: sac1Img,
    features: ['Design Unique', 'Forme Éventail', 'Détails fins']
  },
  {
    id: '5',
    name: 'Chapeau de Soleil à Bords Larges',
    price: 60000,
    description: 'Protection solaire maximale avec une touche de glamour malgache.',
    category: 'Chapeaux',
    image: sac2Img, // Using sac2 as a placeholder or another image if chapeau is repetitive
    features: ['Protection UV', 'Pliable', 'Tissage ajouré']
  },
  {
    id: '6',
    name: 'Mules Naturelles',
    price: 40000,
    description: 'Mules plates confortables avec pompons décoratifs en raphia.',
    category: 'Sandales',
    image: sandale2Img,

    features: ['Léger', 'Pompons artisanaux', 'Look naturel']
  }
];

