import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Flame, Droplets, Mountain, Wind, User, Palette, Sparkles, Image as ImageIcon, Info, RotateCcw } from 'lucide-react';

interface ArtGalleryProps {
  userElement: string | null;
  userSubtype: string | null;
}

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  image: string;
  element: string;
  subtype: string;
  medium: string;
  dimensions: string;
  location: string;
  artistBio: string;
  artistLifespan: string;
  artistNationality: string;
  description: string;
  elementalConnection: string;
  movement: string;
}

const artworks: Artwork[] = [
  // FIRE artworks
  {
    id: 'great-wave',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    year: 'c. 1831',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871445349_f7e5700f.png',
    element: 'fire',
    subtype: 'fire-fire',
    medium: 'Woodblock print (nishiki-e)',
    dimensions: '25.7 × 37.9 cm',
    location: 'Metropolitan Museum of Art, New York',
    artistBio: 'Katsushika Hokusai was a Japanese ukiyo-e artist of the Edo period, known for his woodblock print series "Thirty-six Views of Mount Fuji." He worked in various genres including landscapes, portraits, and erotica, producing an estimated 30,000 works in his 90-year lifetime. His influence extended to the Impressionist and Post-Impressionist movements in Europe.',
    artistLifespan: '1760-1849',
    artistNationality: 'Japanese',
    description: 'This iconic woodblock print depicts an enormous wave threatening boats near the Japanese coast, with Mount Fuji visible in the background. The wave\'s foam crests appear like claws reaching down toward the boats, creating a moment of suspended tension between human endeavor and natural force.',
    elementalConnection: 'The Electric Arc (Fire + Fire) resonates with this work through its depiction of sudden, striking energy. The foam crests frozen in time represent the lightning-like connection between elements—water shaped by wind into something that appears almost electrical. The wave captures that moment of pure potential energy about to discharge.',
    movement: 'Ukiyo-e / Japanese Woodblock'
  },
  {
    id: 'cyanotype',
    title: 'Cyanotype Botanical Studies',
    artist: 'Anna Atkins',
    year: '1843-1853',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871691989_3de1c5b1.jpg',
    element: 'fire',
    subtype: 'fire-water',
    medium: 'Cyanotype photogram',
    dimensions: 'Various',
    location: 'Various collections worldwide',
    artistBio: 'Anna Atkins was an English botanist and photographer, considered the first person to publish a book illustrated with photographic images. She learned the cyanotype process from its inventor, Sir John Herschel, and applied it to document botanical specimens with scientific precision and unexpected artistic beauty.',
    artistLifespan: '1799-1871',
    artistNationality: 'British',
    description: 'These cyanotype prints capture botanical specimens in striking Prussian blue and white, creating ghostly silhouettes of algae, ferns, and other plants. The process involves placing specimens directly on light-sensitive paper and exposing them to sunlight, resulting in detailed negative images.',
    elementalConnection: 'The Blue Flame (Fire + Water) finds its visual expression in the cyanotype\'s cool intensity. The deep blue represents the hottest part of a flame—precise, pure, almost intellectual. Like a scientist\'s controlled experiment, these prints distill nature to its essential forms through the alchemy of light and chemistry.',
    movement: 'Scientific Photography / Early Photographic Art'
  },
  {
    id: 'knife-grinder',
    title: 'The Knife-Grinder',
    artist: 'Kazimir Malevich',
    year: '1912-1913',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871753434_e2017173.jpg',
    element: 'fire',
    subtype: 'fire-earth',
    medium: 'Oil on canvas',
    dimensions: '79.5 × 79.5 cm',
    location: 'Yale University Art Gallery',
    artistBio: 'Kazimir Malevich was a Russian avant-garde artist and art theorist, pioneer of geometric abstract art and the originator of Suprematism. His work evolved from Impressionism through Cubism and Futurism before arriving at pure geometric abstraction. His "Black Square" (1915) is considered one of the most radical paintings in art history.',
    artistLifespan: '1879-1935',
    artistNationality: 'Russian (Ukrainian-born)',
    description: 'This Cubo-Futurist painting fragments a knife-grinder at work into multiple overlapping planes and geometric forms. The figure appears in constant motion, their repetitive labor captured in a dizzying array of angles that suggest both the mechanical rhythm of work and the transformation of raw material through fire and friction.',
    elementalConnection: 'The Forge Iron (Fire + Earth) manifests in this depiction of transformative labor. The knife-grinder represents fire as tool—the spark of the grinding wheel, the heat of friction, the heavy industry of making and remaking. This is fire that works, that carries memory of both destruction and creation.',
    movement: 'Cubo-Futurism / Russian Avant-Garde'
  },
  {
    id: 'fireflies',
    title: 'Fireflies on the Water',
    artist: 'Yayoi Kusama',
    year: '2002',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871672990_6c842c2f.jpg',
    element: 'fire',
    subtype: 'fire-air',
    medium: 'Mixed media installation',
    dimensions: 'Room-sized installation',
    location: 'Whitney Museum of American Art, New York',
    artistBio: 'Yayoi Kusama is a Japanese contemporary artist who works primarily in sculpture and installation, and is also active in painting, film, and other media. Known for her polka dots and infinity rooms, she has been creating art for over seven decades. Her work explores themes of infinity, self-obliteration, and cosmic connection.',
    artistLifespan: '1929-present',
    artistNationality: 'Japanese',
    description: 'This immersive installation creates an infinite field of light using 150 small lights suspended from the ceiling and reflected in water covering the floor. Visitors stand on a small platform surrounded by what appears to be an endless cosmos of floating lights, creating a meditative experience of boundlessness.',
    elementalConnection: 'The Illuminating Spark (Fire + Air) finds perfect expression in Kusama\'s points of light suspended in darkness. Each light is a small beginning, a fragile spark that together creates infinite possibility. This is not the blaze but the possibility of blaze—the first light in darkness, the idea-igniter.',
    movement: 'Contemporary Installation / Infinity Art'
  },
  // WATER artworks
  {
    id: 'impression-sunrise',
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    year: '1872',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871636359_6dcb931e.jpg',
    element: 'water',
    subtype: 'water-air',
    medium: 'Oil on canvas',
    dimensions: '48 × 63 cm',
    location: 'Musée Marmottan Monet, Paris',
    artistBio: 'Claude Monet was a French painter and founder of Impressionism. His dedication to capturing the transient effects of light and atmosphere revolutionized painting. He is best known for his water lily paintings, his series works depicting haystacks and Rouen Cathedral, and his garden at Giverny.',
    artistLifespan: '1840-1926',
    artistNationality: 'French',
    description: 'This painting of Le Havre harbor at sunrise gave the Impressionist movement its name. The orange sun and its reflection cut through blue-gray mist, while boats and industrial structures emerge as ghostly silhouettes. Monet captures not the harbor itself, but the impression of light dissolving solid forms.',
    elementalConnection: 'The Misty Shore (Water + Air) is embodied in this liminal moment where water remembers it was air. The painting captures the transitional space between night and day, between solid and dissolved, between seeing and sensing. It is the place of arrivals and departures, seen through a softening lens.',
    movement: 'Impressionism'
  },
  {
    id: 'ophelia',
    title: 'Ophelia',
    artist: 'John Everett Millais',
    year: '1851-1852',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871540741_d0f50baa.jpg',
    element: 'water',
    subtype: 'water-water',
    medium: 'Oil on canvas',
    dimensions: '76.2 × 111.8 cm',
    location: 'Tate Britain, London',
    artistBio: 'Sir John Everett Millais was an English painter and illustrator, a founder of the Pre-Raphaelite Brotherhood. His early works were characterized by meticulous attention to natural detail and rich symbolism. He later became one of the wealthiest and most successful artists of his generation.',
    artistLifespan: '1829-1896',
    artistNationality: 'British',
    description: 'This painting depicts Ophelia from Shakespeare\'s Hamlet, floating in a stream surrounded by flowers as she drowns. Millais painted the background on location in Surrey, capturing every leaf and flower with scientific precision. The model, Elizabeth Siddal, posed in a bathtub for months to achieve the effect.',
    elementalConnection: 'The Forest Lake (Water + Water) finds its deepest expression in this image of water as final resting place. The still surface holds beauty even in tragedy, reflecting the world while absorbing Ophelia into its depths. This is the mirror that shows the world its true face when it stops moving.',
    movement: 'Pre-Raphaelite Brotherhood'
  },
  {
    id: 'water-lilies',
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: '1906',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871477001_b6689200.png',
    element: 'water',
    subtype: 'water-fire',
    medium: 'Oil on canvas',
    dimensions: '89.9 × 94.1 cm',
    location: 'Art Institute of Chicago',
    artistBio: 'Claude Monet spent the last thirty years of his life painting his water garden at Giverny, creating over 250 oil paintings of water lilies. Despite failing eyesight, he continued to paint, his late works becoming increasingly abstract and influential on later abstract expressionists.',
    artistLifespan: '1840-1926',
    artistNationality: 'French',
    description: 'This painting from Monet\'s famous series captures the surface of his lily pond at Giverny. Light fragments across the water, creating a tapestry of color where reflections of sky and clouds mingle with floating lily pads. The horizon line is eliminated, creating an immersive field of color and light.',
    elementalConnection: 'The Sun-Dappled Pond (Water + Fire) celebrates light playing on water as water plays with light. The painting captures fractured joy, the broken-whole beauty of photons dancing on liquid. It is a celebration of the temporary, the ephemeral moment when fire and water create something neither could alone.',
    movement: 'Impressionism / Late Period'
  },
  {
    id: 'course-of-empire',
    title: 'The Course of Empire: The Pastoral State',
    artist: 'Thomas Cole',
    year: '1836',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871783611_77c8f7e1.png',
    element: 'water',
    subtype: 'water-earth',
    medium: 'Oil on canvas',
    dimensions: '99.7 × 160.6 cm',
    location: 'New-York Historical Society',
    artistBio: 'Thomas Cole was an English-born American artist regarded as the founder of the Hudson River School, an American art movement that flourished in the mid-19th century. His allegorical and romantic landscapes expressed the American sense of nature as a source of spiritual renewal.',
    artistLifespan: '1801-1848',
    artistNationality: 'American (English-born)',
    description: 'Part of a five-painting series depicting the rise and fall of civilization, this work shows a pastoral landscape with a river winding through gentle hills. Shepherds tend flocks while a temple emerges in the distance, suggesting humanity\'s harmonious relationship with nature before the corruption of empire.',
    elementalConnection: 'The Languid River (Water + Earth) flows through this narrative landscape, carrying the sediment of meaning from source to delta. The river is protagonist, storyteller, and witness to the cycles of civilization. Water here is time itself, connecting landscapes and carrying history in its current.',
    movement: 'Hudson River School / American Romanticism'
  },
  // EARTH artworks
  {
    id: 'moon-half-dome',
    title: 'Moon and Half Dome',
    artist: 'Ansel Adams',
    year: '1960',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871493148_52873a36.jpg',
    element: 'earth',
    subtype: 'earth-fire',
    medium: 'Gelatin silver print',
    dimensions: 'Various print sizes',
    location: 'Various collections',
    artistBio: 'Ansel Adams was an American landscape photographer and environmentalist known for his black-and-white images of the American West, especially Yosemite National Park. He developed the Zone System, a technique for achieving optimal exposure and development, and was a founder of Group f/64.',
    artistLifespan: '1902-1984',
    artistNationality: 'American',
    description: 'This photograph captures Yosemite\'s iconic Half Dome with a gibbous moon rising above its sheer granite face. Adams\'s masterful use of contrast transforms the scene into a study of light and shadow, monumentality and delicacy. The moon appears both celestial companion and humble witness to earth\'s grandeur.',
    elementalConnection: 'The Mountain Stone (Earth + Fire) is captured in this image of earth\'s bone structure meeting sky. The granite face remembers being molten, will become sand, but currently defines "here" with absolute authority. The moon adds the element of air—lightness against weight, the celestial touching the terrestrial.',

    movement: 'Straight Photography / American Modernism'
  },
  {
    id: 'hay-wain',
    title: 'The Hay Wain',
    artist: 'John Constable',
    year: '1821',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871578217_85f47983.jpg',
    element: 'earth',
    subtype: 'earth-earth',
    medium: 'Oil on canvas',
    dimensions: '130.2 × 185.4 cm',
    location: 'National Gallery, London',
    artistBio: 'John Constable was an English Romantic painter known for his landscape paintings of Dedham Vale, the area surrounding his home. He is considered one of the greatest British artists, though he achieved recognition in France before England. His work influenced the Barbizon school and the Impressionists.',
    artistLifespan: '1776-1837',
    artistNationality: 'British',
    description: 'This painting depicts a rural scene on the River Stour, with a hay wagon (wain) crossing the shallow water near Flatford Mill. The lush English countryside, dramatic clouds, and ordinary agricultural activity combine to create an image of pastoral harmony and the quiet dignity of rural labor.',
    elementalConnection: 'The Forest Floor (Earth + Earth) finds expression in Constable\'s muddy wheels and lush landscape. This is where death becomes life becomes soil becomes life again—the quiet, dark, necessary transformation beneath the showy canopy. The painting celebrates the layered, decaying, fertile reality of earth.',
    movement: 'English Romanticism / Naturalism'
  },
  {
    id: 'unicorn-tapestries',
    title: 'The Unicorn in Captivity',
    artist: 'Unknown (South Netherlandish)',
    year: 'c. 1495-1505',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871736719_69d89a8f.jpg',
    element: 'earth',
    subtype: 'earth-water',
    medium: 'Wool warp, wool, silk, silver, and gilt wefts',
    dimensions: '368 × 252 cm',
    location: 'The Met Cloisters, New York',
    artistBio: 'The Unicorn Tapestries were created by unknown artists in the Southern Netherlands (modern Belgium). These masterworks of medieval textile art required teams of highly skilled weavers working for years. The tapestries combine religious symbolism, courtly romance, and botanical accuracy in their intricate designs.',
    artistLifespan: 'Late 15th century',
    artistNationality: 'South Netherlandish',
    description: 'The final tapestry in the series shows the unicorn alive and well, enclosed within a circular fence in a flowery meadow. Over 100 species of plants are depicted with botanical accuracy. The unicorn wears a collar chained to a pomegranate tree, symbolizing fertility and the resurrection.',
    elementalConnection: 'The Velvet Moss (Earth + Water) is woven into every thread of this tapestry. The millefleur background represents earth\'s patience made visible—not aggressive growth but gentle colonization, the collaboration of miniature worlds creating softness over hardness. Each tiny flower rewards close attention.',
    movement: 'Medieval Tapestry / Gothic Art'
  },
  {
    id: 'harvesters',
    title: 'The Harvesters',
    artist: 'Pieter Bruegel the Elder',
    year: '1565',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871607621_09808258.png',
    element: 'earth',
    subtype: 'earth-air',
    medium: 'Oil on wood',
    dimensions: '119 × 162 cm',
    location: 'Metropolitan Museum of Art, New York',
    artistBio: 'Pieter Bruegel the Elder was the most significant artist of Dutch and Flemish Renaissance painting. Known for his landscapes and peasant scenes, he brought a new level of dignity and complexity to genre painting. His works often contain moral and philosophical messages beneath their seemingly simple surfaces.',
    artistLifespan: 'c. 1525-1569',
    artistNationality: 'Netherlandish',
    description: 'Part of a series depicting the months or seasons, this painting shows peasants harvesting wheat on a hot August day. Some workers continue cutting grain while others rest under a pear tree, eating bread and drinking. The golden fields stretch to a distant village and harbor.',
    elementalConnection: 'The Golden Harvest (Earth + Air) captures earth\'s generosity in its time-limited fullness. The sun-ripened wheat represents the moment of abundance before emptiness, the result of all the other earth-types working together. Human rhythm moves with earth\'s cycle in this celebration of cyclical plenty.',
    movement: 'Northern Renaissance / Genre Painting'
  },
  // AIR artworks
  {
    id: 'sky-above-clouds',
    title: 'Sky Above Clouds IV',
    artist: 'Georgia O\'Keeffe',
    year: '1965',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871514343_cde3214b.png',
    element: 'air',
    subtype: 'air-air',
    medium: 'Oil on canvas',
    dimensions: '243.8 × 731.5 cm',
    location: 'Art Institute of Chicago',
    artistBio: 'Georgia O\'Keeffe was an American modernist artist known for her paintings of enlarged flowers, New York skyscrapers, and New Mexico landscapes. She is recognized as the "Mother of American Modernism" and was one of the first American artists to practice pure abstraction.',
    artistLifespan: '1887-1986',
    artistNationality: 'American',
    description: 'O\'Keeffe\'s largest painting depicts an aerial view of clouds stretching to the horizon, inspired by her frequent flights between New Mexico and New York. The 24-foot canvas creates an immersive experience of infinite space, with clouds becoming abstract forms that suggest both vastness and intimacy.',
    elementalConnection: 'The Clear Morning Sky (Air + Air) is pure expanse made visible. This is air at its most essential—the blank canvas, the inhale before speech, the space where anything might appear but nothing yet has. O\'Keeffe makes emptiness the subject, potential more important than manifestation.',
    movement: 'American Modernism / Precisionism'
  },
  {
    id: 'calder-mobile',
    title: 'Lobster Trap and Fish Tail',
    artist: 'Alexander Calder',
    year: '1939',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871652574_f14f3341.png',
    element: 'air',
    subtype: 'air-fire',
    medium: 'Painted steel wire and sheet aluminum',
    dimensions: '260 × 290 cm',
    location: 'Museum of Modern Art, New York',
    artistBio: 'Alexander Calder was an American sculptor known for his innovative mobiles and large-scale public sculptures (stabiles). Trained as an engineer, he revolutionized sculpture by introducing movement as a fundamental element. Marcel Duchamp coined the term "mobile" for Calder\'s kinetic sculptures.',
    artistLifespan: '1898-1976',
    artistNationality: 'American',
    description: 'This hanging mobile consists of nine steel-wire boomerang shapes and sheet aluminum elements that move independently in response to air currents. The asymmetrical composition creates an ever-changing dance of forms, with the red "lobster trap" shape balanced against black "fish tail" elements.',
    elementalConnection: 'The Playful Breeze (Air + Fire) is captured in perpetual motion. Calder\'s mobile embodies air that touches things lightly, that reminds shapes they can dance. The sculpture requires movement to exist fully—it is capriciousness without chaos, playfulness given physical form.',
    movement: 'Kinetic Art / American Modernism'
  },
  {
    id: 'birth-of-venus',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: 'c. 1484-1486',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871561971_31831fe9.jpg',
    element: 'air',
    subtype: 'air-earth',
    medium: 'Tempera on canvas',
    dimensions: '172.5 × 278.9 cm',
    location: 'Uffizi Gallery, Florence',
    artistBio: 'Sandro Botticelli was an Italian painter of the Early Renaissance, part of the Florentine School under the patronage of Lorenzo de\' Medici. His mythological paintings are among the most beloved works of the Renaissance. After the rise of Savonarola, his later works became more austere and religious.',
    artistLifespan: 'c. 1445-1510',
    artistNationality: 'Italian',
    description: 'This masterpiece depicts the goddess Venus emerging from the sea as a fully grown woman, blown toward shore by the wind gods Zephyrus and Aura. On the right, a Hora of Spring waits to clothe her in a flowered mantle. The painting exemplifies Renaissance ideals of beauty and classical mythology.',
    elementalConnection: 'The Gilded Zephyr (Air + Earth) breathes through this painting as divine attendant. The wind feels luxurious, warming, carrying the scent of spring flowers. Botticelli creates opulence from lightness, making beauty feel effortless—as if the wind just happened to arrange everything perfectly.',
    movement: 'Italian Renaissance / Florentine School'
  },
  {
    id: 'lady-lilith',
    title: 'Lady Lilith',
    artist: 'Dante Gabriel Rossetti',
    year: '1866-1868',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1768871813882_bbfbf60c.png',
    element: 'air',
    subtype: 'air-water',
    medium: 'Oil on canvas',
    dimensions: '96.5 × 85.1 cm',
    location: 'Delaware Art Museum',
    artistBio: 'Dante Gabriel Rossetti was an English poet, illustrator, painter, and translator, and a founder of the Pre-Raphaelite Brotherhood. His art was characterized by sensuality and medieval revivalism. He was also a major poet of the Victorian era, and his sister Christina Rossetti was also a celebrated poet.',
    artistLifespan: '1828-1882',
    artistNationality: 'British',
    description: 'This painting depicts Lilith, Adam\'s legendary first wife according to Jewish folklore, as a dangerous beauty combing her abundant golden hair while gazing into a mirror. Surrounded by roses and foxgloves, she represents the femme fatale—beautiful, self-absorbed, and spiritually perilous.',
    elementalConnection: 'The First Whisper (Air + Water) breathes through this intimate scene. The mirror reveals self to self in private space, the almost-sound before it becomes word. Rossetti creates art that requires intimacy to experience—secrets worth leaning close to hear, vulnerability shaped by breath.',
    movement: 'Pre-Raphaelite Brotherhood / Aestheticism'
  }
];

const elementColors: Record<string, { primary: string; secondary: string; bg: string; gradient: string; text: string; border: string }> = {
  fire: {
    primary: '#C41E3A',
    secondary: '#FF6B35',
    bg: 'from-red-50 via-orange-50 to-amber-50',
    gradient: 'from-red-600 via-orange-500 to-amber-500',
    text: 'text-red-600',
    border: 'border-red-300'
  },
  water: {
    primary: '#6B8BA4',
    secondary: '#B4A7D6',
    bg: 'from-blue-50 via-indigo-50 to-purple-50',
    gradient: 'from-blue-500 via-indigo-400 to-purple-400',
    text: 'text-blue-600',
    border: 'border-blue-300'
  },
  earth: {
    primary: '#CC4E3E',
    secondary: '#8B4513',
    bg: 'from-amber-50 via-orange-50 to-yellow-50',
    gradient: 'from-amber-600 via-orange-600 to-amber-700',
    text: 'text-amber-700',
    border: 'border-amber-300'
  },
  air: {
    primary: '#FF7F50',
    secondary: '#FFE135',
    bg: 'from-orange-50 via-yellow-50 to-pink-50',
    gradient: 'from-orange-400 via-yellow-400 to-orange-300',
    text: 'text-orange-600',
    border: 'border-orange-300'
  }
};

const getElementIcon = (element: string) => {
  switch (element) {
    case 'fire': return <Flame className="w-5 h-5" />;
    case 'water': return <Droplets className="w-5 h-5" />;
    case 'earth': return <Mountain className="w-5 h-5" />;
    case 'air': return <Wind className="w-5 h-5" />;
    default: return null;
  }
};

const ArtGallery: React.FC<ArtGalleryProps> = ({ userElement, userSubtype }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'artwork' | 'artist' | 'elemental'>('artwork');
  const [filterElement, setFilterElement] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const filteredArtworks = filterElement 
    ? artworks.filter(a => a.element === filterElement)
    : artworks;

  const currentIndex = selectedArtwork 
    ? filteredArtworks.findIndex(a => a.id === selectedArtwork.id)
    : -1;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
      handleResetZoom();
      setActiveTab('artwork');
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredArtworks.length - 1) {
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
      handleResetZoom();
      setActiveTab('artwork');
    }
  };

  const openArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    handleResetZoom();
    setActiveTab('artwork');
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    handleResetZoom();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtwork) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          closeModal();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, currentIndex]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
        <ImageIcon className="w-10 h-10 mx-auto text-amber-400 mb-4" />
        <h3 className="text-2xl font-serif text-white mb-4">Elemental Art Gallery</h3>
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore the masterworks that embody each elemental energy. Click any artwork to view it in detail, 
          learn about the artist, and discover how it connects to your <span className="text-amber-400 font-medium">elemental essence</span>.
        </p>
      </div>

      {/* Element Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setFilterElement(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            filterElement === null
              ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Elements
        </button>
        {['fire', 'water', 'earth', 'air'].map(element => {
          const colors = elementColors[element];
          const isActive = filterElement === element;
          const isUserElement = element === userElement;
          
          return (
            <button
              key={element}
              onClick={() => setFilterElement(element)}
              className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg`
                  : `bg-white ${colors.text} hover:bg-gray-50 border ${colors.border}`
              }`}
            >
              {getElementIcon(element)}
              <span className="capitalize">{element}</span>
              {isUserElement && (
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">You</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtworks.map(artwork => {
          const colors = elementColors[artwork.element];
          const isUserSubtype = artwork.subtype === userSubtype;
          
          return (
            <button
              key={artwork.id}
              onClick={() => openArtwork(artwork)}
              className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left ${
                isUserSubtype ? 'ring-2 ring-amber-400 ring-offset-2' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Element Badge */}
              <div className={`absolute top-3 left-3 p-2 rounded-full bg-gradient-to-br ${colors.gradient} text-white shadow-lg`}>
                {getElementIcon(artwork.element)}
              </div>
              
              {/* User Badge */}
              {isUserSubtype && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full shadow-lg">
                  Your Art
                </div>
              )}
              
              {/* Zoom Icon on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-3 rounded-full shadow-lg">
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 line-clamp-1">{artwork.title}</h4>
                <p className="text-sm text-gray-500">{artwork.artist}</p>
                <p className="text-xs text-gray-400 mt-1">{artwork.year}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}
          {currentIndex < filteredArtworks.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Main Content */}
          <div className="w-full h-full flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
              {/* Zoom Controls */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 4}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                <div className="w-px h-5 bg-white/30 mx-1" />
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Image Container */}
              <div
                ref={imageContainerRef}
                className="relative overflow-hidden max-w-full max-h-[70vh] lg:max-h-[80vh] rounded-lg cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-[70vh] lg:max-h-[80vh] object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                    cursor: zoomLevel > 1 ? 'grab' : 'default'
                  }}
                  draggable={false}
                />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm">
                  {currentIndex + 1} / {filteredArtworks.length}
                </span>
              </div>
            </div>

            {/* Info Panel */}
            <div className="w-full lg:w-96 bg-white lg:h-full overflow-y-auto">
              {/* Tabs */}
              <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="flex">
                  {[
                    { id: 'artwork', label: 'Artwork', icon: ImageIcon },
                    { id: 'artist', label: 'Artist', icon: User },
                    { id: 'elemental', label: 'Elemental', icon: Sparkles }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-medium transition-colors ${
                        activeTab === tab.id
                          ? `${elementColors[selectedArtwork.element].text} border-b-2 ${elementColors[selectedArtwork.element].border}`
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'artwork' && (
                  <div className="space-y-6">
                    {/* Title & Basic Info */}
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${elementColors[selectedArtwork.element].gradient} text-white text-sm mb-3`}>
                        {getElementIcon(selectedArtwork.element)}
                        <span className="capitalize">{selectedArtwork.element}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedArtwork.title}</h2>
                      <p className="text-lg text-gray-600">{selectedArtwork.artist}</p>
                      <p className="text-gray-500">{selectedArtwork.year}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Medium</span>
                        <span className="text-gray-900 text-right max-w-[60%]">{selectedArtwork.medium}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Dimensions</span>
                        <span className="text-gray-900">{selectedArtwork.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Movement</span>
                        <span className="text-gray-900 text-right max-w-[60%]">{selectedArtwork.movement}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Location</span>
                        <span className="text-gray-900 text-right max-w-[60%]">{selectedArtwork.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About This Work</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedArtwork.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'artist' && (
                  <div className="space-y-6">
                    {/* Artist Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${elementColors[selectedArtwork.element].gradient} flex items-center justify-center`}>
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedArtwork.artist}</h2>
                        <p className="text-gray-500">{selectedArtwork.artistLifespan}</p>
                        <p className="text-gray-500">{selectedArtwork.artistNationality}</p>
                      </div>
                    </div>

                    {/* Biography */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Biography</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedArtwork.artistBio}</p>
                    </div>

                    {/* Other Works by this Artist */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Other Works in Gallery</h3>
                      <div className="space-y-2">
                        {artworks
                          .filter(a => a.artist === selectedArtwork.artist && a.id !== selectedArtwork.id)
                          .map(work => (
                            <button
                              key={work.id}
                              onClick={() => {
                                setSelectedArtwork(work);
                                handleResetZoom();
                              }}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                            >
                              <img
                                src={work.image}
                                alt={work.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{work.title}</p>
                                <p className="text-xs text-gray-500">{work.year}</p>
                              </div>
                            </button>
                          ))}
                        {artworks.filter(a => a.artist === selectedArtwork.artist && a.id !== selectedArtwork.id).length === 0 && (
                          <p className="text-gray-500 text-sm italic">No other works by this artist in the gallery</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'elemental' && (
                  <div className="space-y-6">
                    {/* Elemental Badge */}
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${elementColors[selectedArtwork.element].bg}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full bg-gradient-to-br ${elementColors[selectedArtwork.element].gradient}`}>
                          {getElementIcon(selectedArtwork.element)}
                          <span className="sr-only">{selectedArtwork.element}</span>
                        </div>
                        <div>
                          <p className={`font-bold ${elementColors[selectedArtwork.element].text} capitalize`}>
                            {selectedArtwork.subtype.replace('-', ' + ').toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-600">Elemental Correspondence</p>
                        </div>
                      </div>
                      
                      {selectedArtwork.subtype === userSubtype && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-lg">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-amber-700">
                            This artwork resonates with your elemental energy
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Elemental Connection */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Elemental Connection
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{selectedArtwork.elementalConnection}</p>
                    </div>

                    {/* Related Artworks */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Related {selectedArtwork.element.charAt(0).toUpperCase() + selectedArtwork.element.slice(1)} Artworks</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {artworks
                          .filter(a => a.element === selectedArtwork.element && a.id !== selectedArtwork.id)
                          .slice(0, 4)
                          .map(work => (
                            <button
                              key={work.id}
                              onClick={() => {
                                setSelectedArtwork(work);
                                handleResetZoom();
                              }}
                              className="group relative aspect-square rounded-lg overflow-hidden"
                            >
                              <img
                                src={work.image}
                                alt={work.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                                <p className="p-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                                  {work.title}
                                </p>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Meditation Prompt */}
                    <div className={`p-4 rounded-xl border ${elementColors[selectedArtwork.element].border} bg-white`}>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Contemplation
                      </h3>
                      <p className="text-gray-600 text-sm italic">
                        "As you gaze upon this work, consider how the {selectedArtwork.element} energy manifests in your own creative expression. 
                        What aspects of this artwork speak to your elemental nature?"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Closing Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed italic text-lg">
          "Art is the elemental made visible. Through these masterworks, we glimpse the eternal dance of 
          fire, water, earth, and air—and recognize our own <span className="text-amber-400 font-medium">elemental essence</span> reflected back to us."
        </p>
      </div>
    </div>
  );
};

export default ArtGallery;
