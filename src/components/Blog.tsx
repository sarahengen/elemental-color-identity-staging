import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Clock, User, Tag, ChevronRight, BookOpen, Flame, Droplets, Mountain, Wind, Sparkles, Calendar, Share2, Copy, Check, Mail } from 'lucide-react';

import BlogShareModal from './BlogShareModal';
import NewsletterSignup from './NewsletterSignup';


interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: 'Fire' | 'Water' | 'Earth' | 'Air' | 'General';
  tags: string[];
  image: string;
  featured?: boolean;
}

interface BlogProps {
  onBack: () => void;
}

const blogArticles: BlogArticle[] = [
  {
    id: 'naming-and-creating-identity',
    title: 'Naming and Creating Identity',
    excerpt: 'I have always been fascinated with attempting to name or give definition to things. These archetypes create context, provide insight, and a new way of understanding ourselves.',
    content: `<blockquote class="text-center" style="border-left:none;padding:0;margin:2rem auto;max-width:32rem"><p><em>"It is a joy to be hidden, and disaster not to be found."</em><br/>― D.W. Winnicott</p></blockquote>

<p>I have always been fascinated with attempting to name or give definition to things.</p>

<p>"You are an 'English Rose'…a 'Wood Nymph'…a 'Siren'. Or, a 'Fire+Water - A Blue Flame'.</p>

<p>Yet, my nature is to not be typecast or boxed. I instinctively rebel if someone tries to tell me who I Am.</p>

<p>What I am looking for, however, is clarification of our nature. To establish our unique qualities and who we are. Not provide a new identity or a costume to wear.</p>

<p>These archetypes I use create context, provide insight, and a new way of understanding ourselves.</p>

<p>They aren't intended to contain nor diminish, but to emphasis what makes something extraordinary. Because, nature really is extraordinary.</p>

<blockquote><p>The Gnostics called it the 'Spark'.<br/>Gurdjieff called it 'Essence'.<br/>Empedocles referred to it as 'Root'.<br/>Aristotle later changed Root to 'Element'.</p></blockquote>

<p>To attempt to define our spark, essence, root or element is how we can celebrate it, in my view.</p>

<p>It also illuminates. Naming 'It' makes visible what is invisible.</p>

<h3>Vertical Knowledge</h3>

<p>Ouspensky called information that illuminates 'Vertical' knowledge. Rather than categorizing simply to label as 'Horizontal' knowledge achieves — "This is blue, this is not" — Vertical knowledge seeks to reveal, to provide an 'aha' moment, recognition but also resonance.</p>

<h3>The Seed, Not the Flower</h3>

<p>Working with archetypes can be compared to defining the Seed and not the Flower.</p>

<p>It's about examining the core self — our innate nature, and not about what we just see.</p>

<p>Whilst the flower is pretty to look at, it isn't the original element of nature. It isn't the source.</p>

<p>The source of our nature is where our own mystery lies. It's why examining our elemental self can be so illuminating and not feel like a box or label, but a revelation.</p>

<h3>Elemental Color Identity</h3>

<p>Elemental Color Identity looks at the source. It defines your energy and color. It's vertical knowledge that illuminates and provides a new way of celebrating who you are.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-03-28',
    readTime: '4 min read',
    category: 'General',
    tags: ['Identity', 'Philosophy', 'Elements', 'Archetypes', 'Inner Self'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775054733041_684262f7.png',


    featured: true,

  },

  {
    id: 'your-element-as-inner-self',
    title: 'Your Element as Inner Self',
    excerpt: 'Your Elemental Type is not a style preference. It is an expression of your inner nature—the deep, unconscious self that exists beneath the surface of your daily personality.',
    content: `<p>Your Elemental Type is not a style preference. It is not a trend you've adopted or an aesthetic you admire. It is an expression of your inner nature—the deep, unconscious self that exists beneath the surface of your daily personality.</p>

<p>It is what the ancients referred to as your 'root' self.</p>

<p>In Jungian psychology, the unconscious self is the vast interior world that shapes everything we do, feel, and are drawn to—often without our awareness. Your Elemental Type is a visible signature of that invisible world. When we say you are a Water type, for example, we are not saying you like blue or you prefer cool tones. We are saying that something in the deep architecture of who you are resonates at the frequency of Water—depth, intuition, reflection, emotional intelligence, and the capacity to hold complexity without needing to resolve it.</p>

<p>This is why the right colors feel like coming home. It's not that they "suit" you in some superficial sense. It's that they are you—made visible. When you wear your Elemental colors, you are not decorating a surface. You are allowing your inner self to be seen.</p>

<blockquote><p>The unconscious self does not speak in words. It speaks in resonance—in the colors that calm you, the textures that feel right against your skin, the shades that make you feel most like yourself. Your element is its language.</p></blockquote>

<h3>Your Subtype: The Specific Voice of Your Unconscious</h3>
<p>If your primary element is the what—the fundamental nature of your inner self—then your subtype is the how. It is the specific way your unconscious self expresses itself in the world.</p>

<p>Two Water types, for example, can share the same elemental core—the same depth, the same intuitive pull, the same reflective quality—and yet express it in entirely different ways.</p>

<p>The Misty Shore (Water-Air) expresses their Water nature through ethereal softness and veiled mystery. The Sun-Dappled Pond (Water-Fire) expresses it through magnetic contrast and cool intensity. The Languid River (Water-Earth) expresses it through grounded richness and quiet substance. The Forest Lake (Water-Water) expresses it through pure, layered depth and reflective stillness. None of these expressions is more or less "Water" than the others. They are simply different dialects of the same inner language.</p>

<p>Your subtype is the unconscious self's chosen mode of expression—and when you honor it in how you present yourself to the world, something profound happens. You stop performing and start being. People sense it. They can't always articulate what's different about you, but they feel it: the quiet authority of someone who is aligned with their own nature.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-03-01',
    readTime: '5 min read',
    category: 'General',
    tags: ['Inner Self', 'Psychology', 'Elements', 'Subtypes', 'Jungian'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1773169258540_3f29613b.png',

    featured: true,
  },

  {
    id: 'color-theory-elements',
    title: 'The Ancient Roots of Elemental Color Theory',
    excerpt: 'Explore how ancient civilizations connected the four elements to specific color palettes, and how modern color theory validates these timeless associations.',
    content: `<p>For thousands of years, civilizations across the globe have recognized a profound connection between the four classical elements—Fire, Water, Earth, and Air—and the colors that surround us. From the warm ochres of ancient cave paintings to the cool blues of Greek temples, color has always been intertwined with elemental energy.</p>

<h3>The Historical Foundation</h3>
<p>In ancient Greece, Empedocles proposed that all matter was composed of four elements, each associated with specific qualities and colors. Fire was linked to warm reds and golds, Water to deep blues and silvers, Earth to rich browns and greens, and Air to pale yellows and whites. These associations weren't arbitrary—they reflected the natural world that these philosophers observed daily.</p>

<p>Similarly, traditional Chinese medicine connected the five elements (including Metal and Wood) to specific colors used in healing practices. Ayurvedic traditions in India linked chakra colors to elemental energies, creating a sophisticated system of color-based wellness that persists to this day.</p>

<p>Ancient Egyptian culture attributed color and symbols with the higher nature of pharoahs and dignitary. They adorned the temples with the color primarily as a way of evoking the elemental nature of the Pharaoh.</p>

<h3>Modern Color Psychology Validates Ancient Wisdom</h3>
<p>Contemporary research in color psychology has confirmed many of these ancient associations. Studies show that warm colors (reds, oranges, yellows) genuinely increase heart rate and energy levels—mirroring the qualities of Fire. Cool colors (blues, greens, purples) promote calm and introspection, echoing Water's reflective nature.</p>

<p>Earth tones have been shown to create feelings of stability and groundedness, while light, airy pastels can enhance feelings of freedom and mental clarity. These findings suggest that our ancestors intuitively understood something that science is only now beginning to quantify.</p>


<h3>Applying Elemental Color Theory Today</h3>
<p>Understanding your elemental color type isn't just about wearing flattering colors—it's about aligning your external presentation with your internal energy. When you dress in colors that resonate with your elemental nature, you create a harmonious vibration that others can sense, even if they can't articulate why you seem so "put together."</p>

<p>The key is to start with your dominant element's palette and then incorporate accent colors from your secondary element. This creates visual interest while maintaining energetic coherence—the same principle that makes a sunset (Fire meeting Water) or a mountain meadow (Earth meeting Air) so captivating to the human eye.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-01',
    readTime: '8 min read',
    category: 'General',
    tags: ['Color Theory', 'History', 'Elements', 'Psychology'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1771436182734_ae66fc54.jpg',

    featured: true,
  },
  {
    id: 'fire-type-power-dressing',
    title: 'Power Dressing for Fire Types: Ignite Your Wardrobe',
    excerpt: 'Learn how to harness the bold, dynamic energy of Fire in your everyday wardrobe with these expert styling tips for all four Fire subtypes.',
    content: `<p>Fire types radiate confidence, passion, and dynamic energy. How you express yourself should be a reflection of that inner flame—bold, intentional, and impossible to ignore. Whether you're a Pure Fire, Fire-Earth, Fire-Air, or Fire-Water subtype, there are specific strategies to make your wardrobe work as hard as you do.</p>

<h3>The Fire Type Wardrobe Foundation</h3>
<p>Every Fire type needs a strong foundation of neutrals, and Black tends to be the color many Fire types gravitate towards. Yet other darker tones such as Charcoal or Navy can work better, or the lighter shades of White, Stone, Silver, Mole and Gray can be equally as effective.</p>

<p>Like a flame, strong colors are vital for expressing your authority and conveying your intention - one of action and transformation. It's knowing the correct way for each subtype.</p>

<h3>Subtype-Specific Strategies</h3>
<p><strong>Fire-Earth:</strong> Ground your Fire energy by opting for deeper, darker and rich burnished tones. Damson or Burgundy Red reflect your Fiery and Earthy nature, while retaining that solid iron strength. Choose Charcoal or Mole as your neutral.</p>

<p><strong>Fire-Air:</strong> The light and sparkling elements of Fire influence by Air, require a true Red or Magenta Pink. Darker tones will swallow you up. Consider your colors as your neutrals, or the light of a spark - White, Silver, Mid Gray.</p>

<p><strong>Fire-Water:</strong> Your unique blend allows you to incorporate deeper, more mysterious tones. Instead of Red, opt for Ice Pink, and Stone, or Navy rather than Black. You reflect the elegance of water while conveying the power of Fire. Strong light neutrals make you stand out just as much as someone wearing head-to-toe Black, like Stone, White, Ice blue.</p>

<p><strong>Fire+Fire:</strong> Classic choices with black and white, or red and cool orange. Electric but conservative. Strong contrast is your power and you can live in Black if you chose and still hold your rank.</p>

<h3>Power Pieces Every Fire Type Needs</h3>
<p>Invest in a statement piece - your Red is the Fire type's equivalent of a little black dress. A cool-toned metallic accessory (white gold, platinum, burnished silver) instantly elevates any outfit. And never underestimate the power of a bold or strong lip color that matches your elemental palette.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-28',
    readTime: '6 min read',
    category: 'Fire',
    tags: ['Styling Tips', 'Fire Type', 'Wardrobe', 'Power Dressing'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1771438866787_44a85dfd.jpg',
  },
  {
    id: 'water-type-power-dressing',
    title: 'Power Dressing for Water Types: Command the Room with Quiet Authority',
    excerpt: 'Discover how Water types can build a wardrobe of cool-toned elegance, fluid fabrics, and signature accessories that channel depth, intuition, and understated power.',
    content: `<p>Water types possess a rare and captivating quality—depth without noise, authority without force, and elegance that lingers long after you've left the room. Your wardrobe should mirror that essence: cool, considered, and quietly commanding. Whether you're a Pure Water, Water-Earth, Water-Air, or Water-Fire subtype, understanding your specific strategy is the key to dressing with intention.</p>

<h3>The Water Type Wardrobe Foundation</h3>
<p>Every Water type needs a foundation built on cool-toned neutrals. Navy is your anchor—versatile, sophisticated, and endlessly wearable. But don't overlook Dark Blue Gray, Slate, Soft White, Silver Gray, and cool-toned Rose Brown as equally powerful base colors. Black feels too stark against Water's naturally softer energy. Navy or Darkest Blue Gray will almost always serve you better.</p>

<p>Fluid fabrics are non-negotiable for Water types. Silk, jersey, soft wool crepe, cashmere, and chiffon move with you rather than against you. Stiff, heavy fabrics fight your natural energy—look for structure through tailoring and cut rather than rigid materials. A beautifully draped blazer in soft wool will always outperform a boxy, stiff jacket on a Water type.</p>

<h3>Subtype-Specific Strategies</h3>
<p><strong>Water-Earth:</strong> Your grounding Earth influence gives you the ability to carry richer, deeper tones that pure Water types cannot. Think Sea Green, Deep Airforce Blue, and Slate Green. Your neutrals lean warmer than other Water subtypes—Rose Brown, cool-toned Taupe, and Mushroom work beautifully. Fabrics with subtle texture like brushed wool, soft suede, and matte silk honor both your Water fluidity and Earth substance.</p>

<p><strong>Water-Air:</strong> Light, luminous, and ethereal—your combination demands the softest end of the cool spectrum. Icy Blue, Pale Lavender, Soft Periwinkle, and lightest Blue Gray are your signature colors. Avoid anything too heavy or dark; it will overwhelm your subtle energy. Your neutrals are Soft White, Silver Gray, and Oxford Blue. Lightweight fabrics like chiffon, fine knit, and silk georgette let your natural lightness shine through.</p>

<p><strong>Water-Fire:</strong> This is a powerful and dynamic combination. You can handle more contrast than other Water subtypes—Cornflower Blue, Deep Berry, and cool-toned Plum reflect your intensity. Instead of soft neutrals, you can carry French Navy and Darkest Blue Gray with authority. Your Fire influence means you can wear bolder silhouettes and sharper tailoring. A structured silk blouse in Dark Plum with a Navy trouser is your power uniform.</p>

<p><strong>Water+Water:</strong> Pure Water types are the most fluid and intuitive dressers. Your palette lives in the mid-tones—not too dark, not too light. Cornflower Blue, Soft Teal, Dusty Lavender, and cool Rose are your colors. Navy and Silver Gray are your go-to neutrals. Layering is your superpower—a tonal outfit in varying shades of blue or grey creates the depth and complexity that mirrors your nature. Monochromatic dressing was made for you.</p>

<h3>Power Pieces Every Water Type Needs</h3>
<p>Invest in one exceptional piece in your signature blue—whether that's a Cornflower silk shirt, a Sky Blue cashmere knit, or a Navy tailored coat. This is your equivalent of the Fire type's red: the piece that makes people remember you. A burnished silver or white gold statement accessory—a cuff, a pendant, or elegant earrings—adds the cool metallic finish that Water types wear better than anyone. And never underestimate the power of a perfectly chosen cool-toned lip color: a berry, a soft mauve, or a blue-pink that echoes the quiet confidence of still water.</p>`,

    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-15',
    readTime: '7 min read',
    category: 'Water',
    tags: ['Styling Tips', 'Water Type', 'Wardrobe', 'Power Dressing'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1771440890401_d02a8832.jpg',

  },
  {
    id: 'earth-type-power-dressing',
    title: 'Power Dressing for Earth Types: Build Your Authority from the Ground Up',
    excerpt: 'Earth types command respect through substance, not spectacle. Discover how to build a wardrobe of warm-toned neutrals, natural fabrics, and grounded elegance that reflects your enduring strength.',
    content: `<p>Earth types are the bedrock of any room they walk into—steady, substantial, and impossible to overlook when dressed with intention. Your power doesn't shout; it resonates. It's felt in the quality of your fabric, the warmth of your palette, and the quiet confidence of someone who knows exactly who they are. Whether you're a Pure Earth, Earth-Fire, Earth-Water, or Earth-Air subtype, your wardrobe strategy should honor that grounded authority while expressing your unique elemental blend.</p>

<h3>The Earth Type Wardrobe Foundation</h3>
<p>Every Earth type needs a foundation built on warm-toned neutrals that echo the natural landscape. Warm Brown is your anchor—rich, dependable, and endlessly versatile. But your neutral palette extends far beyond a single shade: Camel, Olive, Warm Taupe, Cream, Khaki, and Chocolate all serve as powerful base colors. Black can feel too sharp and disconnected against Earth's naturally warm energy. A deep Chocolate Brown or rich Olive will almost always serve you better and feel more authentically yours.</p>

<p>Natural fabrics are non-negotiable for Earth types. Cotton, linen, wool, soft leather, suede, and cashmere connect you to the tactile, sensory world that Earth types inhabit so naturally. Synthetic fabrics feel energetically wrong on Earth types—they lack the weight, texture, and authenticity your element demands. Look for fabrics with substance and hand-feel: a beautifully structured linen blazer, a buttery soft leather jacket, or a chunky wool knit will always outperform anything flimsy or artificial on an Earth type. Your clothes should feel as solid and considered as you are.</p>

<h3>Subtype-Specific Strategies</h3>
<p><strong>Earth-Fire:</strong> Your Fire influence brings warmth, dynamism, and a boldness that pure Earth types don't naturally carry. You can handle richer, more saturated warm tones—Terracotta, Burnt Sienna, Rust, and deep Amber are your signature colors. Your neutrals run warmer and deeper than other Earth subtypes: Chocolate, Warm Charcoal, and rich Camel. You're the Earth type who can wear a statement piece without it wearing you. Fabrics with warmth and texture—brushed wool, rich suede, burnished leather—honor both your Earth substance and Fire intensity. A Terracotta silk shirt with a Chocolate wool trouser is your power combination.</p>

<p><strong>Earth-Water:</strong> This is a deeply intuitive and nuanced combination. Your Water influence softens Earth's solidity and adds a layer of emotional depth to your dressing. Your colors live where earth meets water—Moss Green, Sage, Teal-Olive, and warm Slate. Your neutrals are cooler than other Earth subtypes: Mushroom, cool-toned Taupe, and Soft Khaki. Fabrics should balance Earth's substance with Water's fluidity—think soft wool jersey, matte silk, brushed cotton, and fine-gauge cashmere. A Sage cashmere knit with an Olive wool skirt captures your dual nature perfectly.</p>

<p><strong>Earth-Air:</strong> Light, fresh, and grounded—your Air influence lifts Earth's heaviness and brings a brightness that other Earth subtypes lack. Your palette sits at the lighter end of the Earth spectrum: Sandy Beige, Soft Sage, Warm Cream, and pale Olive. Avoid anything too dark or heavy; it will weigh down your natural lightness. Your neutrals are Stone, Oatmeal, and light Warm Gray. Lightweight natural fabrics are your strength—fine linen, light cotton, soft chambray, and airy wool blends. You're the Earth type who can wear head-to-toe neutrals and look luminous rather than washed out.</p>

<p><strong>Earth+Earth:</strong> Pure Earth types are the most grounded and substantial dressers of all. Your palette lives in the rich mid-tones of the natural world—not too light, not too dark, but deeply saturated and warm. Olive Green, Warm Brown, Golden Tan, Terracotta, and Forest Green are your colors. Camel and Warm Taupe are your go-to neutrals. Texture is your superpower—layering different textures in tonal earth shades creates the richness and depth that mirrors your nature. A tonal outfit combining suede, wool, and cotton in varying shades of brown or olive is effortlessly sophisticated. Tonal textural dressing was made for you.</p>

<h3>Power Pieces Every Earth Type Needs</h3>
<p>Invest in one exceptional piece in your signature earth tone—whether that's an Olive leather jacket, a Terracotta wool coat, or a Camel cashmere wrap. This is your equivalent of the Fire type's red or the Water type's blue: the piece that anchors your entire wardrobe and makes people remember you. A warm gold or brushed bronze statement accessory—a substantial cuff, a pendant on a leather cord, or artisan earrings—adds the warm metallic finish that Earth types wear better than anyone. And never underestimate the power of a perfectly chosen warm-toned lip color: a terracotta, a warm nude, or a soft cinnamon that echoes the quiet authority of ancient stone.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-18',
    readTime: '8 min read',
    category: 'Earth',
    tags: ['Styling Tips', 'Earth Type', 'Wardrobe', 'Power Dressing'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775054489867_bd14422e.png',



  },
  {
    id: 'air-type-power-dressing',
    title: 'Power Dressing for Air Types: Elevate with Effortless Precision',
    excerpt: 'Air types communicate brilliance through lightness, not weight. Discover how to build a wardrobe of cool-toned pastels, ethereal fabrics, and signature accessories that channel intellectual elegance and creative authority.',
    content: `<p>Air types are the most misunderstood dressers of all the elements—often told to "add more color" or "make a bolder statement" when their real power lies in the opposite direction. Your authority is cerebral, not physical. It lives in the precision of your choices, the lightness of your palette, and the quiet brilliance of an outfit that looks effortless but is anything but. Whether you're a Pure Air, Air-Fire, Air-Water, or Air-Earth subtype, your wardrobe strategy should honor that intellectual elegance while expressing your unique elemental blend.</p>

<h3>The Air Type Wardrobe Foundation</h3>
<p>Every Air type needs a foundation built on subtle warm-toned lights and soft neutrals that reflect rather than absorb. Tan and beige are your anchor—clean, luminous, and endlessly versatile. But your neutral palette extends well beyond: Pale Dove, Oatmeal, Honey, Chocolate, and Bright Navy all serve as powerful base colors. Black overwhelms Air's naturally light energy and should be used sparingly, if at all. Your warmest darks will almost always serve you better, resonate with your nature and feel more authentically yours.</p>

<p>Lightweight, breathable fabrics are non-negotiable for Air types. Fine cotton, silk chiffon, linen, cashmere knit, organza, and silk crepe de chine move with the ease and fluidity that Air types embody. Heavy, stiff fabrics weigh you down energetically—they fight the very quality that makes you compelling. Look for structure through precision tailoring and impeccable cut rather than fabric weight. A perfectly cut blazer in lightweight wool crepe will always outperform a heavy, padded jacket on an Air type. Your clothes should feel like they barely exist on your body—present but never burdensome.</p>

<h3>Subtype-Specific Strategies</h3>
<p><strong>Air-Fire:</strong> Your Fire influence brings a spark of warmth and dynamism that pure Air types don't naturally expect. You can handle more vibrancy than other Air subtypes—Warm Lilac, Coral Pink, Light Apricot, and True Red are your signature colors. Your neutrals run slightly warmer: Warm Ivory, Chocolate, and Bright Navy. You're the Air type who can wear a pop of Fire without it looking out of place. Fabrics with a subtle sheen—silk charmeuse, light satin, fine metallic knit—honor both your Air lightness and Fire luminosity. A Soft Coral silk blouse with a Chocolate tailored trouser is your power combination.</p>

<p><strong>Air-Water:</strong> This is the most ethereal and intuitive combination in the entire elemental system. Your Water influence deepens Air's lightness and adds an emotional resonance to your dressing. Your colors live where sky meets sea—Pale Periwinkle, Violet, Soft Aqua, Aquamarine, True Blue. Your neutrals are the coolest of all Air subtypes: Dove Gray, Oxford Blue, Bright Navy and Soft White. Fabrics should balance Air's weightlessness with Water's fluidity—think silk chiffon, fine jersey, lightweight cashmere, and organza. A Pale Periwinkle cashmere knit with a Silver Gray silk skirt captures your dual nature perfectly.</p>

<p><strong>Air-Earth:</strong> Grounded yet light—your Earth influence gives Air a substance and warmth that other Air subtypes lack. Your palette sits where sky meets landscape: Apple Green, Warm Cream, Banana, Cinnamon, and Warm Geranium Pink. Avoid anything too dark or too saturated; it will feel heavy against your natural lightness. Your neutrals are Oatmeal, Beige, and Tan. Natural fabrics with a refined finish are your strength—fine linen, light cotton poplin, soft chambray, and brushed silk. You're the Air type who can wear earth-inspired tones and make them look fresh and modern rather than heavy.</p>

<p><strong>Air+Air:</strong> Pure Air types are the lightest and most precise dressers of all. Your palette lives in the warm pastels and soft mid-tones—never too dark, never too cold, always luminous. Oatmeal, Soft Periwinkle, Shocking Pink, Light Warm Jade, and Bright Blue are your colors. Cream and Dove Grey are your go-to neutrals. Tonal dressing is your superpower—an outfit in varying shades of blue, green or pink in your light warm brights creates the refined, almost otherworldly quality that mirrors your nature. Where Earth types layer texture and Water types layer depth, you layer lightness upon lightness. Monochromatic pastel dressing was made for you.</p>

<h3>Power Pieces Every Air Type Needs</h3>
<p>Invest in one exceptional piece in your signature pastel—whether that's a Warm Lavender silk shirt, an Aqua Blue cashmere coat, or a Soft Banana tailored blazer. This is your equivalent of the Fire type's red, the Water type's blue, or the Earth type's olive: the piece that makes people remember you without being able to pinpoint exactly why. A fine gold or rose gold statement accessory—a delicate chain, an architectural ring, or minimalist earrings—adds the warm metallic precision that Air types wear better than anyone. And never underestimate the power of a perfectly chosen warm-toned lip color: a soft warm pink, a sheer neutral nude, or a touch of warm Red.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-18',
    readTime: '8 min read',
    category: 'Air',
    tags: ['Styling Tips', 'Air Type', 'Wardrobe', 'Power Dressing'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1771444618203_42bdab27.jpg',

  },




  {
    id: 'water-type-flow-fashion',
    title: 'Flow Fashion: Dressing Your Water Type Energy',
    excerpt: 'Discover how Water types can create fluid, elegant outfits that honor their intuitive and reflective nature while making a lasting impression.',
    content: `<p>Water types possess a natural elegance that comes from their deep, intuitive connection to emotion and beauty. Your style should flow like water itself—graceful, adaptable, and mesmerizing. Here's how to translate that inner fluidity into your wardrobe.</p>

<h3>The Art of Layering</h3>
<p>Water types excel at layering, which mirrors the depth and complexity of their nature. A sheer overlay on a solid base, a draped cardigan over a fitted dress, or a flowing scarf with a structured coat—these combinations create the visual depth that Water types naturally embody.</p>

<h3>Layers of Color</h3>
<p>Wearing color that reflects different shades and blends, like moving water capturing light or dark shadows, is another way of creating a layered effect. Rather than blocks of color, instead shades that flow together, are the way to create elemental harmony.</p>

<h3>Seasonal Adaptations</h3>
<p>Water types shine in winter and early spring when their cool-toned palette is naturally reflected in the environment. In summer, shift toward lighter aquatic tones—seafoam, pale lavender, and icy mint keep you cool both literally and energetically.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-25',
    readTime: '7 min read',
    category: 'Water',
    tags: ['Styling Tips', 'Water Type', 'Fashion', 'Elegance'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },

  {
    id: 'earth-type-grounded-style',
    title: 'Grounded Style: The Earth Type\'s Guide to Timeless Fashion',
    excerpt: 'Earth types thrive in quality, natural materials and timeless silhouettes. Learn how to build a sustainable, beautiful wardrobe that lasts.',
    content: `<p>Earth types are the foundation of the elemental system—stable, reliable, and deeply connected to the physical world. Your approach to fashion should mirror these qualities: invest in quality over quantity, choose natural materials that reflect nature, and build a wardrobe that stands the test of time, as you do.</p>

<h3>Quality Over Quantity</h3>
<p>Earth types naturally gravitate toward well-made pieces, that appear crafted or well-made. This instinct serves you well. A single cashmere sweater in your perfect shade of sage green will bring you more joy and wear than ten fast-fashion alternatives in artificial fabrics that come off the production line by the thousands. Trust your Earth-type instinct to invest wisely.</p>

<h3>Natural Materials Are Your Allies</h3>
<p>Cotton, linen, wool, leather, and silk—these natural materials resonate with Earth energy. They age beautifully, develop character over time, and feel authentic against your skin. The more you wear them, the more they mould to you and feel part of your nature. Synthetic fabrics can feel energetically discordant to Earth types and leave you feeling out of place.</p>

<h3>The Earth Palette in Practice</h3>
<p>Your palette is drawn from the landscape itself: terracotta, sage, olive, warm brown, cream, rust, and forest green. These colors create a sense of warmth and approachability that puts others at ease, which is a natural gift of Earth types. You also have a palette that consists of the most vital and active colors of spectrum, Green being the life force of nature.</p>

<p>For Earth-Fire subtypes, add warm metallics and deeper reds. Earth-Water subtypes can incorporate teal blue and rich turquoise green. Earth-Air subtypes look stunning in lighter sage and sandy tones that bridge earth and sky.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-22',
    readTime: '6 min read',
    category: 'Earth',
    tags: ['Styling Tips', 'Earth Type', 'Sustainable Fashion', 'Timeless Style'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775054565672_96b43562.png',

  },

  {
    id: 'air-type-ethereal-dressing',
    title: 'Ethereal Dressing: Styling Secrets for Air Types',
    excerpt: 'Air types embody lightness, creativity, and intellectual elegance. Discover how to create outfits that capture your free-spirited, visionary nature.',
    content: `<p>Air types are the visionaries of the elemental system—creative, intellectual, and endlessly curious. Your style should reflect this lightness of being while still feeling grounded enough for the physical world. Here's how to dress your Air-type energy.</p>

<h3>The Air Type Signature</h3>
<p>Air types are drawn to unusual combinations, unexpected textures, and pieces that tell a story. You're the type most likely to pair vintage with modern, high with low, and create looks that are uniquely your own. Embrace this—your style is your creative expression.</p>

<h3>Colors of the Sky</h3>
<p>Your palette spans the full range of the sky: the warmth of a pale dawn pink, midday whites, sunset corals, twilight lavenders, and warming turquoise blue. Soft, desaturated tones work beautifully for Air types, creating an ethereal quality that matches your energy.</p>

<p>Air-Fire subtypes can push toward warmer pastels and light golds. Air-Water subtypes shine in pale blues and silver-lavender. Air-Earth subtypes look grounded yet airy in soft apple green and warm cream.</p>

<h3>Fabric and Movement</h3>
<p>Lightweight fabrics that catch the breeze are quintessentially Air—think gauze, organza, light cotton, and fine knits. Even in structured pieces, look for breathable materials that don't feel heavy or confining. Air types need to feel free in their clothing, like they can breathe.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-20',
    readTime: '5 min read',
    category: 'Air',
    tags: ['Styling Tips', 'Air Type', 'Ethereal Fashion', 'Creative Dressing'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1772032002776_6420dca9.png',
  },

  {
    id: 'spring-color-guide-2026',
    title: 'Spring 2026 Color Guide: Elemental Trends for Every Type',
    excerpt: 'This season\'s hottest colors decoded through the elemental lens. Find out which spring trends align perfectly with your elemental type.',
    content: `<h3>The Season's Key Colors</h3>
<p>This spring, designers are embracing what we call "elemental authenticity"—colors that feel genuine, unforced, and connected to the natural world. Gone are the neon brights of recent seasons; in their place, we see rich, saturated naturals that speak to each element.</p>

<blockquote><p>"Celebrating self-expression and individualism, NYFW Spring / Summer 2026 gives us a very new way of putting colors together."<br/><strong>— Leatrice Eiseman, Executive Director of the Pantone Color Institute.</strong></p></blockquote>

<h3>Fire Types This Spring</h3>
<p>Acid Coral or Electric Damson are your colors this season. Rather than wearing the warmer tones of these 'plus' colors, you resonate with the cooler versions of these colors which still convey warmth. Cool aubergine, Ice coral complement your Fire energy. The trending "sunset ombré" effect in fabrics was practically made for Fire types.</p>

<h3>Water Types This Spring</h3>
<p>Periwinkle blue is everywhere this spring, and it's a Water type's dream. This soft blue-violet has a maritime feel with a white yacht moored nearby. Sea Green adds depth and balance in blocks of color or pattern.</p>

<h3>Earth Types This Spring</h3>
<p>Sage green continues its reign as the "it" neutral, and Earth types can embrace it a soft neutral. More acidic limes add some shock factor, emphasizing the more extreme sides of nature. Terracotta tones provide a modern earth-toned look.</p>

<h3>Air Types This Spring</h3>
<p>Lavender and soft lilac are the Air type's spring colors. These ethereal tones capture the quality of spring light and look stunning on Air types. All the nude tones present a fresh, modern aesthetic creating that lightweight feel of an Air type.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-05',
    readTime: '9 min read',
    category: 'General',
    tags: ['Seasonal Guide', 'Spring 2026', 'Trends', 'Color Palette'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1771435794880_c7795edc.jpg',
    featured: true,
  },
  {
    id: 'fire-makeup-tutorial',
    title: 'Smoky Ember: A Fire Type Makeup Tutorial',
    excerpt: 'Fire types are not here to blend in. Your makeup is your armor, not a mask. Master the art of cool-toned intensity with this step-by-step guide for all four Fire subtypes.',
    content: `<h3>THE FIRE PHILOSOPHY: Makeup as Armor, Not Mask</h3>

<blockquote><p><em>You are not here to blend in. You are here to command attention.</em></p></blockquote>

<p>If you're a Fire type—Electric Arc, Blue Flame, Forged Iron, or Joyful Spark—your makeup shouldn't "soften" you or make you "more approachable." Your makeup should amplify your natural intensity and give your energy a visible form.</p>

<p>Here is how to translate your Fire energy into makeup, by subtype.</p>

<p>Fire types are not here to blend in, but to command attention. So, when it comes to make-up, there has to be some intensity and declaration. Your make-up shouldn't be about being approachable. It is your armor and not a mask.</p>

<p>Choose make-up with cool undertones.</p>

<h3>Prep & Prime</h3>
<p>Because you can wear such clear, distinct and saturated colors, the canvas (your skin) is a crucial part of your routine. Spend the majority of your budget on skin care products that create a perfect canvas upon which to apply your make-up.</p>

<h3>Foundation & Concealer</h3>
<p>Choose a foundation with cool or neutral undertones. The biggest mistake Fire types make is choosing a foundation that's too warm which will mute their natural coloring. Test on your forehead in natural light,  it should disappear into your skin seamlessly.</p>

<h3>The Smoky Ember Eye</h3>
<p>This is where the magic happens. Start with a cool nude pink or champagne shade across the entire lid. Then, using a fluffy brush, blend a sparkly mid grey into the crease. Layer a strong charcoal or indigo into the outer corner, blending upward and outward. Finish with a silver shimmer on the center of the lid and inner corner. Finish with dark liner on the waterline, top and bottom, or/and use a brush to add the darkest eyeshadow along the outer upper and bottom for effect.</p>

<h3>Lips & Cheeks</h3>
<p>For cheeks, a cool neutral red blush placed on the apples of your cheeks creates a natural, blush glow. For lips, choose a lip oil from the cool spectrum: true red, burgundy red, fuchsia. Avoid warm browns.</p>

<h3>Setting & Finishing</h3>
<p>Set with a finely-milled powder that has a slight cool base to it. Finish with a neutral highlighter on the high points of your face—cheekbones, bridge of nose, and cupid's bow. Fire types were made to glow.</p>

<h3>Fire Subtypes - Making Adjustments</h3>

<p><strong>The Electric Arc = Precision. Power. No excess.</strong><br/>Opt for high contrast - the darkest charcoal, the lightest silver.</p>

<p><strong>The Blue Flame = Cool intensity. Architectural stillness.</strong><br/>Opt for lighter contrasts with darker liner.</p>

<p><strong>The Forged Iron = Smoldering depth.</strong><br/>Opt for one block of matt charcoal. You are the smokiest.</p>

<p><strong>The Illuminating Spark = Playful color.</strong><br/>Opt for white sparkle, silver/bright colored liner.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-18',
    readTime: '10 min read',
    category: 'Fire',
    tags: ['Makeup Tutorial', 'Fire Type', 'Beauty', 'Cool Tones'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1772156797456_770a440d.jpg',
  },
  {
    id: 'air-makeup-tutorial',
    title: 'Ethereal Glow: An Air Type Makeup Tutorial',
    excerpt: 'Air types radiate lightness, clarity, and an otherworldly luminosity. Your makeup should never weigh you down—it should make you look like light itself has settled on your skin. A step-by-step guide for all four Air subtypes.',
    content: `<h3>THE AIR PHILOSOPHY: Makeup as Light, Not Weight</h3>

<blockquote><p><em>You are not here to be heavy. You are here to illuminate.</em></p></blockquote>

<p>If you're an Air type—Morning Breeze, Storm Wind, Gentle Zephyr, or Clear Sky—your makeup should never feel like a mask or a shield. It should feel like light landing on your skin. Where Fire types use makeup as armor, Air types use makeup as radiance. Your goal is luminosity, softness, and an almost otherworldly glow that makes people look twice—not because you're loud, but because you're luminous.</p>

<p>Here is how to translate your Air energy into makeup, by subtype.</p>

<p>Air types are not here to compete with bold color or heavy coverage. Your power is in the whisper, not the shout. When it comes to makeup, think diffused, light-touched, and effortlessly beautiful. Your makeup should look like it barely exists—and yet transform everything.</p>

<p>Choose makeup with warm, soft undertones and light-reflecting finishes.</p>

<h3>Prep & Prime</h3>
<p>Air types need a base that glows from within. Your skin prep is everything. Invest in hydrating serums, lightweight moisturizers, and a luminous primer that creates a lit-from-within canvas. Avoid anything mattifying—matte finishes flatten Air's natural radiance. A dewy, hydrated base is your foundation before foundation. Think of your skincare as creating a surface that catches and reflects light, like morning dew on a petal.</p>

<h3>Foundation & Concealer</h3>
<p>Less is more for Air types. Choose a sheer-to-light coverage foundation, tinted moisturizer, or skin tint with warm or neutral undertones. The biggest mistake Air types make is applying too much coverage, which kills the natural luminosity that is your greatest asset. Apply with fingertips or a damp sponge for the most skin-like finish. Conceal only where needed—under eyes, around the nose—and leave the rest of your natural skin visible. Your skin should look like skin, not like product.</p>

<h3>The Ethereal Glow Eye</h3>
<p>This is where Air types truly shine. Start with a soft champagne or pale pink shimmer across the entire lid—this creates your base of light. Using a fluffy brush, blend a warm soft lilac or dusty rose into the crease with a feather-light hand. The key word is <em>diffused</em>—there should be no hard lines anywhere. Layer a pale gold or soft peach shimmer on the center of the lid to catch light. For the inner corner, use a luminous champagne or white gold highlight. Skip heavy liner entirely—instead, use a soft taupe or warm brown pencil, gently smudged along the upper lash line only. Finish with a coat of lengthening mascara in brown or soft black. The effect should be wide-eyed, open, and glowing.</p>

<h3>Lips & Cheeks</h3>
<p>For cheeks, a soft warm pink or light peach blush is your signature. Apply with a large, fluffy brush to the apples of your cheeks and blend upward toward the temples—the placement should look like a natural flush, as if you've just stepped in from a walk in fresh spring air. Cream blush formulas work beautifully for Air types as they melt into the skin seamlessly. For lips, choose sheer, light-reflecting formulas: tinted lip oils, sheer balms, or glossy lipsticks in soft pink, warm nude, peach, or pale coral. Avoid heavy matte formulas—your lips should look soft, hydrated, and kissed with color rather than painted.</p>

<h3>Setting & Finishing</h3>
<p>Set with the lightest possible touch—a finely-milled translucent powder on the T-zone only, leaving the rest of your face dewy. Better yet, skip powder entirely and use a light setting mist that locks everything in while maintaining your glow. Finish with a warm-toned highlighter on the high points of your face—cheekbones, brow bone, bridge of nose, and cupid's bow. Choose a highlighter with a soft, diffused shimmer rather than chunky glitter. The effect should be a gentle, all-over luminosity. Air types were made to glow like morning light.</p>

<h3>Air Subtypes - Making Adjustments</h3>

<p><strong>The Morning Breeze = Soft warmth. Fresh luminosity. First light.</strong><br/>Opt for the warmest tones in the Air palette—soft peach on the lids, a warm pink flush on cheeks, and a peachy nude lip. Your look should evoke the golden-pink light of early morning. Use a warm gold highlighter and keep everything sun-kissed and gentle. You are the softest glow.</p>

<p><strong>The Storm Wind = Dynamic contrast. Electric clarity.</strong><br/>You can handle slightly more intensity than other Air subtypes. Opt for a deeper lilac or soft violet in the crease, paired with a brighter champagne shimmer on the lid. A slightly more defined brow and a touch more mascara give you the edge that Storm Wind carries. Your lip can push toward a warm rose or soft berry. You are the Air type closest to drama—but it's still whispered, never shouted.</p>

<p><strong>The Gentle Zephyr = Barely-there beauty. Invisible perfection.</strong><br/>Opt for the most minimal application of all Air subtypes. A single wash of champagne shimmer across the lid, the softest pink flush, and a tinted lip balm may be all you need. Your power is in looking like you're wearing nothing at all while radiating an effortless, natural beauty. Cream products applied with fingertips are your best tools. You are the whisper.</p>

<p><strong>The Clear Sky = Bright clarity. Open luminosity.</strong><br/>Opt for the lightest, brightest tones—white gold on the inner corners, a clear soft pink on the lid, and a fresh coral on the cheeks. Your look should feel open, bright, and crystal clear, like a cloudless sky. A touch of white or pale blue liner on the waterline opens the eyes beautifully. You are pure light.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-22',
    readTime: '10 min read',
    category: 'Air',
    tags: ['Makeup Tutorial', 'Air Type', 'Beauty', 'Ethereal Glow', 'Soft Glam'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1772158337514_97bc8315.jpg',
  },
  {

    id: 'water-makeup-luminous',
    title: 'Luminous Depths: Makeup for Water Types',
    excerpt: 'Water types possess a natural luminosity that demands dewy, light-reflecting makeup. Master the art of cool-toned radiance with this step-by-step guide for all four Water subtypes—The Misty Shore, The Sun-Dappled Pond, The Languid River, and The Forest Lake.',
    content: `<h3>THE WATER PHILOSOPHY: Makeup as Reflection, Not Decoration</h3>

<blockquote><p><em>You are not here to dazzle. You are here to captivate—quietly, deeply, and unforgettably.</em></p></blockquote>

<p>If you're a Water type—The Misty Shore, The Sun-Dappled Pond, The Languid River, or The Forest Lake—your makeup should never compete with your natural depth. It should reveal it. Where Fire types use makeup as armor and Air types use it as radiance, Water types use makeup as reflection. Your goal is luminosity that comes from within, a cool-toned glow that mirrors the captivating quality of still water catching light—mesmerizing, shifting, and impossible to look away from.</p>




<h3>Prep & Prime</h3>
<p>Water types need a base that glows like light on water. Your skin prep is the most critical step in your entire routine. Invest in deeply hydrating serums—hyaluronic acid layered with a cool-toned facial oil creates the perfect canvas. Follow with a rich but non-greasy moisturizer that plumps the skin and creates that coveted "glass skin" effect. Your primer should be luminous and hydrating—look for primers with light-reflecting micro-pearls in cool silver or icy pink tones. Avoid anything mattifying; matte finishes deaden Water's natural reflective quality. Think of your skincare as creating the surface of a still lake—smooth, reflective, and luminous from every angle.</p>

<h3>Foundation & Concealer</h3>
<p>Water types look best with a dewy, skin-like finish that lets your natural luminosity show through. Choose a hydrating foundation, skin tint, or tinted moisturizer with cool or neutral undertones. Medium coverage works well for Water types—enough to even the skin without masking its natural quality. The biggest mistake Water types make is choosing a foundation that's too warm or too matte, which kills the cool, reflective quality that is your greatest asset. Apply with a damp beauty sponge, pressing and bouncing rather than wiping, to maintain the dewy finish. For concealer, choose a shade with cool pink or lavender undertones and apply only where needed—under the eyes, around the nose, and on any redness. Blend with a fingertip for the most seamless, skin-like result. Your skin should look like polished porcelain—flawless but never flat.</p>

<h3>The Luminous Depths Eye</h3>
<p>This is where Water types truly come alive. Start with a cool taupe or soft silver-grey as your transition shade, swept into the crease with a fluffy blending brush—the key is to build depth gradually, like water deepening from shore to center. On the lid, apply a dusky mauve or cool plum with a shimmer finish; this creates the mysterious, shifting quality that defines Water energy. Layer a silver, icy blue, or pearl shimmer on the center of the lid—this is your "light on water" moment, the point where light catches and reflects. For the inner corner, use a cool champagne or icy pink highlight to open the eye and create luminosity. Line with a deep navy, charcoal, or cool-toned plum—never harsh black. Use a pencil or gel liner and smudge slightly along the upper lash line for a soft, smoky definition. On the lower lash line, sweep a touch of the same cool taupe or soft plum, blending outward for depth without harshness. Finish with two coats of volumizing mascara in black—Water types can handle more lash definition than Air types. The effect should be deep, luminous, and quietly magnetic.</p>

<h3>Lips & Cheeks</h3>
<p>For cheeks, a cool pink, soft mauve, or muted berry blush is your signature. Apply with a medium-sized brush to the apples of your cheeks and blend upward and back toward the cheekbones—the placement should create a sculpted, reflective quality rather than a round, youthful flush. Cream and liquid blush formulas work beautifully for Water types, as they melt into the dewy base and maintain the seamless, lit-from-within quality. For lips, choose formulas with depth and dimension: satin lipsticks, tinted lip oils, or sheer glosses in berry, mauve, cool pink, plum, or blue-toned red. Water types can carry more pigment on the lips than Air types—your cool coloring provides the perfect backdrop for richer lip colors. A sheer berry balm for daytime or a satin mauve lipstick for evening are both quintessentially Water. Avoid warm browns, oranges, or anything with a yellow base—these fight your natural coolness.</p>

<h3>Setting & Finishing</h3>
<p>Set with the lightest possible hand—a finely-milled translucent powder on the T-zone only, and only if absolutely necessary. Many Water types do better skipping powder entirely and using a cool-toned setting mist that locks everything in while maintaining the dewy, reflective finish. Your highlighter is arguably the most important product in your entire routine. Choose a cool-toned highlighter—silver, icy pink, pearl, or cool lavender—and apply to the high points of your face: cheekbones, bridge of nose, brow bone, and cupid's bow. The finish should be a smooth, reflective sheen rather than chunky glitter. Think moonlight on water, not disco ball. For an extra touch of Water magic, a subtle touch of the same highlighter on the collarbone and décolletage creates a cohesive, luminous effect. Water types were made to glow like moonlight reflected on a still lake.</p>

<h3>Water Subtypes - Making Adjustments</h3>

<p>Remember: your subtype is not a minor variation. It is the specific voice of your unconscious self—the way your inner Water nature chooses to express itself in the visible world. Honouring your subtype in your makeup is not vanity. It is alignment.</p>

<p><strong>The Misty Shore (Water-Air) = Soft luminosity. Veiled beauty. Ethereal cool.</strong><br/>Your unconscious self speaks in whispers. The Air influence in your Water nature creates an inner world that is dreamy, intuitive, and almost otherworldly—and your makeup should honour that ethereal quality rather than trying to ground it. You are the lightest and most ethereal of the Water subtypes. Opt for the softest end of the cool spectrum—pale lavender on the lids, the lightest silver shimmer, and a sheer icy pink on the lips. Your blush should be barely-there: a whisper of cool pink that looks like it appeared naturally. Avoid anything too deep or saturated; it will overwhelm your delicate, misty quality. Your highlighter should be the finest, most diffused pearl—almost invisible but transformative. Cream products applied with fingertips suit your subtlety. You are the veil between water and air—your makeup should look like morning mist settling on your skin. When you get this right, people won't comment on your makeup. They'll comment on <em>you</em>—on something luminous and indefinable that they can sense but not name. That is your inner self, made visible.</p>

<p><strong>The Sun-Dappled Pond (Water-Fire) = Cool depth with warm flashes. Magnetic contrast.</strong><br/>Your unconscious self has a dual nature—deep Water stillness with flashes of Fire intensity beneath the surface. This creates an inner world of magnetic contrasts: calm on the surface, passionate underneath. Your makeup should honour both. Your Fire influence gives you the ability to carry more intensity and contrast than other Water subtypes. You can push toward deeper plums and berries on the eyes, and your lip color can venture into cool-toned red and deep berry territory with authority. Where The Misty Shore whispers, you speak—still cool, still reflective, but with a warmth that flickers beneath the surface like sunlight penetrating deep water. Your blush can be a richer berry or cool-toned rose. Use a slightly more defined liner—a deep navy or cool plum, applied with more precision. Your highlighter can have a subtle warm-cool shift, like a duochrome pearl. You are the Water type closest to drama—but your drama is magnetic, not loud. When your makeup captures this interplay of depth and intensity, you express the full complexity of your inner nature—the part of you that feels deeply and burns quietly.</p>

<p><strong>The Languid River (Water-Earth) = Grounded depth. Rich, still beauty. Cool warmth.</strong><br/>Your unconscious self is anchored. The Earth influence in your Water nature creates an inner world that is deep but substantial—you don't just feel, you <em>hold</em>. Where other Water types might be swept along by emotion, you contain it. Your makeup should reflect that grounded depth. Your Earth influence adds a richness and groundedness that pure Water types don't carry. You can handle deeper, more saturated cool tones—think deep teal on the lids, rich cool-toned plum in the crease, and a muted berry on the lips. Your blush leans toward dusty rose or muted mauve rather than bright pink. Textures with more substance suit you—a satin-finish eyeshadow rather than a sheer shimmer, a cream lipstick rather than a gloss. Your neutrals are richer too: cool-toned taupe, mushroom, and slate replace the icy silvers of other Water subtypes. Your highlighter should be a warm pearl or soft champagne with cool undertones—reflective but grounded. You are the deepest, most substantial Water type—your makeup should feel like looking into a river that runs slow and deep. When you honour this in your appearance, you communicate something rare: emotional depth with quiet strength. Your inner self is not fragile. It is ancient.</p>

<p><strong>The Forest Lake (Water-Water) = Pure depth. Reflective stillness. Cool mystery.</strong><br/>Your unconscious self is undiluted Water—pure depth, pure reflection, pure intuition. There is no secondary element tempering or redirecting your inner nature. This makes you the most deeply intuitive and emotionally complex of all the subtypes, and your makeup should honour that unfiltered depth. Pure Water types are the most intuitive and reflective of all. Your palette lives in the cool mid-tones—not too light, not too dark, but endlessly deep. Cornflower blue, soft teal, dusty lavender, and cool rose are your eye colors. Your blush is a true cool pink or soft mauve—nothing warm, nothing bright, just perfectly balanced coolness. For lips, a satin mauve or sheer berry is your signature. Tonal makeup is your superpower—an eye look built in varying shades of cool plum and silver, or layers of blue-grey and lavender, creates the depth and complexity that mirrors your nature. Where other subtypes might add contrast, you add layers. Your highlighter is pure silver or icy pearl, placed with precision on the highest points. Monochromatic cool-toned makeup was made for you. You are still water that runs infinitely deep. When your makeup is layered and tonal rather than contrasting, it mirrors the way your inner self works—not through opposition, but through ever-deepening layers of the same essential truth. You don't need drama. You <em>are</em> depth.</p>

<h3>A Final Reflection</h3>

<p>The purpose of understanding your Water type makeup is not to follow rules. It is to come home to yourself. Every time you choose a cool-toned highlighter over a warm one, every time you reach for a dewy finish instead of matte, every time you layer silver over plum instead of gold over bronze—you are not making a cosmetic choice. You are making an act of self-recognition. You are saying: <em>I see my inner self, and I honour it.</em></p>

<p>In a world that constantly asks us to be louder, brighter, warmer, and more—Water types offer a radical alternative. You remind us that depth is its own kind of beauty. That stillness is its own kind of power. And that the most captivating thing a person can do is simply, quietly, be who they truly are.</p>

<p>Let your makeup reflect that.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',

    date: '2026-02-24',
    readTime: '12 min read',
    category: 'Water',
    tags: ['Makeup Tutorial', 'Water Type', 'Beauty', 'Dewy Skin', 'Cool Tones', 'Inner Self'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1772158803277_e715c186.jpg',
  },


  {
    id: 'earth-natural-beauty',
    title: 'Natural Radiance: Earth Type Beauty Essentials',
    excerpt: 'Earth types embody beauty in its most authentic form—warm, grounded, and effortlessly radiant. Your makeup should honour your natural warmth and depth, not compete with it. A step-by-step guide for all four Earth subtypes: The Mountain Stone, The Forest Floor, The Velvet Moss, and The Golden Harvest.',
    content: `<h3>THE EARTH PHILOSOPHY: Makeup as Enhancement, Not Transformation</h3>

<blockquote><p><em>You are not here to become someone else. You are here to become more of who you already are.</em></p></blockquote>

<p>If you're an Earth type—The Mountain Stone, The Forest Floor, The Velvet Moss, or The Golden Harvest—your makeup should never fight your natural warmth or try to cool it down. It should amplify it. Where Fire types use makeup as armor and Water types use it as reflection, Earth types use makeup as enrichment. Your goal is a warm, healthy, natural radiance that looks like your skin at its absolute best—glowing, nourished, and alive with colour drawn from the landscape itself.</p>

<p>Here is how to translate your Earth energy into makeup, by subtype.</p>

<p>Earth types are not here to chase trends or create dramatic transformations. Your power is in authenticity—the quiet confidence of someone who looks exactly like themselves, only more so. When it comes to makeup, think warm, textured, and effortlessly polished. Your makeup should look like you've spent the morning outdoors in golden light—sun-kissed, healthy, and radiantly natural.</p>

<p>Choose makeup with warm undertones and natural, skin-like finishes.</p>

<h3>Prep & Prime</h3>
<p>Earth types need a base that looks like healthy, nourished skin. Your skin prep should focus on hydration and warmth. Invest in rich, nourishing serums—vitamin C and rosehip oil create the warm, healthy glow that Earth types radiate naturally. Follow with a moisturiser that has substance—not too light, not too heavy, but deeply nourishing. Your primer should be hydrating with a satin or natural finish—look for primers with warm-toned light-reflecting particles in gold or soft bronze. Avoid anything too dewy or glassy; Earth types look best with a satin finish that has warmth and substance rather than a wet, reflective sheen. Think of your skincare as preparing rich, fertile soil—healthy, warm, and ready to receive colour beautifully.</p>

<h3>Foundation & Concealer</h3>
<p>Earth types look best with a natural, skin-like finish that lets your warmth show through. Choose a medium-coverage foundation, skin tint, or tinted moisturiser with warm or golden undertones. The biggest mistake Earth types make is choosing a foundation that's too cool or too pink, which drains the natural warmth from your complexion and makes you look flat and tired. Test on your jawline in natural light—it should melt into your skin and enhance your natural warmth, not neutralise it. Apply with a damp beauty sponge or a dense buffing brush for the most natural, skin-like finish. For concealer, choose a shade with warm peach or golden undertones and apply only where needed—under the eyes, around the nose, and on any redness. Earth types can handle slightly more coverage than Air types without it looking heavy, but the goal is always "your skin but better," never "mask." Your skin should look healthy, warm, and alive—like you've been nourished from the inside out.</p>

<h3>The Natural Radiance Eye</h3>
<p>This is where Earth types come into their own. Start with a warm nude or soft champagne-gold as your base shade, swept across the entire lid—this creates your canvas of warmth. Using a fluffy blending brush, sweep a warm brown, soft terracotta, or golden bronze into the crease, building depth gradually with a gentle hand. The key is warmth and dimension without harshness—every shade should look like it belongs on your skin naturally. On the lid, apply a warm bronze, golden olive, or soft copper with a satin or soft shimmer finish; this creates the rich, textured quality that defines Earth energy. Layer a soft gold or warm champagne shimmer on the centre of the lid to catch light naturally. For the inner corner, use a warm gold or soft peach highlight to open the eye with warmth. Line with a warm brown, bronze, or soft chocolate—never harsh black. Use a pencil or gel liner and smudge gently along the upper lash line for soft, natural definition. On the lower lash line, sweep a touch of the same warm brown or bronze, blending softly for warmth without heaviness. Finish with two coats of volumising mascara in brown or warm black—Earth types look stunning in brown mascara, which enhances the eyes without the starkness of pure black. The effect should be warm, dimensional, and naturally beautiful.</p>

<h3>Lips & Cheeks</h3>
<p>For cheeks, a warm peach, soft terracotta, or warm rose blush is your signature. Apply with a medium-sized brush to the apples of your cheeks and blend outward toward the hairline—the placement should create a natural, sun-kissed warmth rather than a sculpted contour. Earth types are the one element that truly benefits from bronzer: a warm-toned matte or satin bronzer applied to the hollows of your cheeks, temples, and jawline creates the natural warmth and dimension that Earth types radiate. Cream and powder blush formulas both work beautifully for Earth types—cream for a more natural finish, powder for a longer-lasting warmth. For lips, choose formulas with warmth and substance: satin lipsticks, tinted lip oils, or creamy lip colours in warm nude, peach, terracotta, soft brown, warm rose, or cinnamon. Earth types can carry richer, more pigmented lip colours than Air types—your warm colouring provides the perfect backdrop for earthy, saturated tones. A warm nude balm for daytime or a satin terracotta lipstick for evening are both quintessentially Earth. Avoid cool pinks, blue-toned reds, or anything with a cool or icy base—these fight your natural warmth and make you look washed out.</p>

<h3>Setting & Finishing</h3>
<p>Set with a warm-toned translucent or finely-milled setting powder—Earth types can handle more powder than Water or Air types without looking flat, as your natural warmth prevents the powdered-down effect. Apply to the T-zone and anywhere you want longevity, but leave the high points of your face powder-free to maintain a natural, healthy finish. A warm-toned setting mist adds a final layer of warmth and locks everything in beautifully. Your highlighter should be warm-toned—soft gold, warm bronze, champagne, or warm peach—and applied to the high points of your face: cheekbones, bridge of nose, brow bone, and cupid's bow. The finish should be a warm, natural-looking sheen rather than a cool or icy shimmer. Think golden hour sunlight on skin, not metallic shine. For an extra touch of Earth warmth, a subtle dusting of bronzer on the neck and décolletage creates a cohesive, sun-kissed effect. Earth types were made to glow like late afternoon light on a golden landscape.</p>

<h3>Earth Subtypes - Making Adjustments</h3>

<p><strong>The Mountain Stone (Earth-Fire) = Warm intensity. Burnished depth. Grounded power.</strong><br/>Your Fire influence gives you the ability to carry the richest, most saturated warm tones of all Earth subtypes. You can push toward deeper terracotta on the lids, richer bronze in the crease, and a more defined liner in warm chocolate or deep bronze. Your blush can be a richer warm rose or deep peach, and your lip colour can venture into warm brick, deep terracotta, or rich cinnamon with authority. Where The Golden Harvest whispers warmth, you declare it—still grounded, still natural, but with an intensity that smoulders beneath the surface like embers in stone. Your highlighter can be a richer gold or warm bronze. Use slightly more product than other Earth subtypes—your Fire influence means you can carry more pigment without it looking heavy. You are the Earth type closest to drama—but your drama is warm and commanding, never cool or contrived.</p>

<p><strong>The Forest Floor (Earth-Earth) = Pure warmth. Rich authenticity. Natural abundance.</strong><br/>Pure Earth types are the most grounded and naturally beautiful of all. Your palette lives in the rich, warm mid-tones of the natural world—not too light, not too dark, but deeply saturated and warm. Olive green, warm brown, golden bronze, and soft terracotta are your eye colours. Your blush is a true warm peach or soft terracotta—nothing cool, nothing bright, just perfectly balanced warmth. For lips, a satin warm nude or creamy peach is your signature. Textural makeup is your superpower—an eye look built in varying shades of warm brown and bronze, layered with different finishes from matte to satin to shimmer, creates the richness and depth that mirrors your nature. Where other subtypes might add contrast, you add texture. Your highlighter is warm gold or soft champagne, placed with a generous hand on the highest points. Tonal warm makeup was made for you. You are rich earth that nurtures everything it touches.</p>

<p><strong>The Velvet Moss (Earth-Water) = Grounded depth. Cool-warm richness. Quiet complexity.</strong><br/>Your Water influence adds a depth and emotional resonance that pure Earth types don't carry. You can handle cooler-warm tones—think moss green on the lids, warm teal in the crease, and muted olive-bronze on the centre of the lid. Your blush leans toward dusty rose or warm mauve rather than bright peach. Textures with more fluidity suit you—a cream eyeshadow rather than a pressed powder, a liquid blush rather than a powder formula. Your neutrals are richer and slightly cooler than other Earth subtypes: mushroom, warm taupe, and soft khaki replace the golden browns. Your highlighter should be a warm champagne or soft rose gold with a subtle shift—reflective but grounded. Cream and liquid formulas applied with fingertips or a damp sponge honour both your Earth substance and Water fluidity. You are the most nuanced Earth type—your makeup should feel like looking at moss on ancient stone: warm, complex, and endlessly layered.</p>

<p><strong>The Golden Harvest (Earth-Air) = Light warmth. Fresh radiance. Sunlit simplicity.</strong><br/>Your Air influence lifts Earth's richness and brings a lightness and freshness that other Earth subtypes lack. You sit at the lighter end of the Earth spectrum—soft gold on the lids, warm sand in the crease, and a light champagne shimmer on the centre. Avoid anything too deep or too saturated; it will feel heavy against your natural brightness. Your blush is a light warm peach or soft apricot—the lightest, freshest flush of all Earth subtypes. For lips, a sheer peach balm or light warm nude is your signature. Your neutrals are lighter too: oatmeal, soft sand, and warm cream replace the deeper browns. Your highlighter should be a light gold or warm champagne—bright and warm but never heavy. Lightweight formulas are your strength—tinted moisturisers, cream shadows, and sheer lip oils let your natural lightness shine through. You are the Earth type who can wear minimal makeup and look radiant rather than bare. Less is genuinely more for you. You are golden light on a wheat field—warm, bright, and effortlessly beautiful.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-02-25',
    readTime: '10 min read',
    category: 'Earth',
    tags: ['Makeup Tutorial', 'Earth Type', 'Natural Beauty', 'Warm Tones', 'Nude Makeup'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1772159357840_b1c2606e.jpg',
  },

  {
    id: 'color-confidence-workplace',
    title: 'Color Confidence: Wearing Your Element to Work',
    excerpt: 'How to incorporate your elemental color identity into professional attire without sacrificing workplace appropriateness or personal expression.',
    content: `<p>One of the most common questions we receive is: "How do I wear my elemental color identity to work?" The answer lies in understanding the difference between wearing your colors and being overwhelmed by them. Professional settings require subtlety, but that doesn't mean sacrificing your elemental identity.</p>

<h3>The 60-30-10 Rule</h3>
<p>In professional settings, apply the 60-30-10 color rule: 60% neutral (your element's neutral tones), 30% your primary elemental color in a muted shade, and 10% accent in a brighter elemental tone. This creates a polished look that still honors your nature.</p>

<h3>Elemental Neutrals for the Office</h3>
<p>Each element has its own set of "neutrals" that read as professional while maintaining elemental energy. Some examples are Fire types: charcoal, dark navy, steel grey, mole or taupe. Water types: cool grey, navy, slate. Earth types: warm brown, olive, khaki. Air types: soft grey, cream, Oxford blue.</p>

<h3>Strategic Color Placement</h3>
<p>Place your boldest elemental color identity where they'll have the most impact with the least risk. A Fire type's cool coral blouse under a neutral blazer. A Water type's sapphire earrings against a grey suit. An Earth type's terracotta bag with a cream outfit. An Air type's hyacinth scarf with a cinnamon shirt.</p>

<h3>Building a Capsule Work Wardrobe</h3>
<p>Start with 5 neutral pieces in your elemental neutrals, add 3 pieces in your primary elemental color (muted), and 2 accent pieces in brighter tones. This 10-piece capsule creates dozens of combinations that are all authentically you.</p>`,
    author: 'Sarah J Engen',
    authorRole: 'Elemental Colorist',
    date: '2026-01-08',
    readTime: '8 min read',
    category: 'General',
    tags: ['Workplace Style', 'Professional', 'Capsule Wardrobe', 'Color Confidence'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
  },

];

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  Fire: { icon: <Flame className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  Water: { icon: <Droplets className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  Earth: { icon: <Mountain className="w-4 h-4" />, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  Air: { icon: <Wind className="w-4 h-4" />, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  General: { icon: <Sparkles className="w-4 h-4" />, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
};

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [shareArticle, setShareArticle] = useState<BlogArticle | null>(null);
  const [copiedInline, setCopiedInline] = useState<string | null>(null);

  const categories = ['All', 'Fire', 'Water', 'Earth', 'Air', 'General'];

  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredArticles = blogArticles.filter(a => a.featured);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Quick share helpers for inline article view buttons
  const getShareUrl = (article: BlogArticle) => {
    return `${window.location.origin}${window.location.pathname}?article=${article.id}`;
  };

  const handleQuickCopy = async (article: BlogArticle) => {
    try {
      await navigator.clipboard.writeText(getShareUrl(article));
      setCopiedInline(article.id);
      setTimeout(() => setCopiedInline(null), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = getShareUrl(article);
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedInline(article.id);
      setTimeout(() => setCopiedInline(null), 2000);
    }
  };

  const handleQuickTwitter = (article: BlogArticle) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(getShareUrl(article))}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleQuickFacebook = (article: BlogArticle) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(article))}&quote=${encodeURIComponent(article.title)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleQuickEmail = (article: BlogArticle) => {
    const subject = encodeURIComponent(`Check out: ${article.title}`);
    const body = encodeURIComponent(`I thought you'd enjoy this article from Elemental Color Identity:\n\n${article.title}\n\n${article.excerpt}\n\nRead more: ${getShareUrl(article)}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Full Article View
  if (selectedArticle) {
    const cat = categoryConfig[selectedArticle.category];
    return (
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Blog</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cat.bg} ${cat.color} border ${cat.border}`}>
                {cat.icon}
                {selectedArticle.category}
              </span>
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedArticle.author}</p>
                  <p className="text-xs text-gray-500">{selectedArticle.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedArticle.date)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {selectedArticle.readTime}
              </div>

              {/* Share Buttons - Inline in Article Header */}
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-xs text-gray-400 mr-1 hidden sm:inline">Share:</span>
                <button
                  onClick={() => handleQuickCopy(selectedArticle)}
                  className={`p-2 rounded-lg transition-all ${
                    copiedInline === selectedArticle.id
                      ? 'bg-green-100 text-green-600'
                      : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                  }`}
                  title="Copy link"
                >
                  {copiedInline === selectedArticle.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleQuickTwitter(selectedArticle)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
                  title="Share on X/Twitter"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleQuickFacebook(selectedArticle)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#1877F2] transition-all"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleQuickEmail(selectedArticle)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-amber-600 transition-all"
                  title="Share via email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShareArticle(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors ml-1"
                  title="More sharing options"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Hero Image */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className={`rounded-2xl overflow-hidden mb-10 ${
            selectedArticle.id === 'naming-and-creating-identity'
              ? 'bg-[#f5f0e8] flex items-center justify-center py-8'
              : 'aspect-[21/9]'
          }`}>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className={
                selectedArticle.id === 'naming-and-creating-identity'
                  ? 'max-h-[400px] w-auto object-contain'
                  : 'w-full h-full object-cover'
              }
            />
          </div>


          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
          />

          {/* Share CTA Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5">
              <div>
                <p className="font-medium text-gray-900 text-sm">Enjoyed this article?</p>
                <p className="text-xs text-gray-500 mt-0.5">Share it with friends who might find it helpful</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickCopy(selectedArticle)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    copiedInline === selectedArticle.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {copiedInline === selectedArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Link
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleQuickTwitter(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-medium transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X
                </button>
                <button
                  onClick={() => handleQuickFacebook(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-medium transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button
                  onClick={() => handleQuickEmail(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-medium transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>
                <button
                  onClick={() => setShareArticle(selectedArticle)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Card
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {selectedArticle.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedArticle(null);
                    setSearchQuery(tag);
                    setActiveCategory('All');
                  }}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogArticles
                .filter(a => a.id !== selectedArticle.id && (a.category === selectedArticle.category || a.tags.some(t => selectedArticle.tags.includes(t))))
                .slice(0, 2)
                .map(article => {
                  const relCat = categoryConfig[article.category];
                  return (
                    <button
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${relCat.bg} ${relCat.color}`}>
                          {relCat.icon}
                          {article.category}
                        </span>
                        <h4 className="font-serif text-lg text-gray-900 mt-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{article.readTime}</p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </button>
          </div>
        </div>

        {/* Share Modal */}
        {shareArticle && (
          <BlogShareModal
            article={shareArticle}
            onClose={() => setShareArticle(null)}
          />
        )}
      </div>
    );
  }

  // Blog Listing View
  return (
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Elemental Color Identity Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
            Insights & Inspiration
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore color theory, elemental subtypes tips, insights on the inner self.
          </p>
        </div>
      </div>


      {/* Search & Filters */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xs font-medium">Clear</span>
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {categories.map(cat => {
                const config = cat !== 'All' ? categoryConfig[cat] : null;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {config?.icon}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Articles (only show when no filter/search active) */}
        {activeCategory === 'All' && searchQuery === '' && featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Featured
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map(article => {
                const cat = categoryConfig[article.category];
                return (
                  <div key={article.id} className="relative group">
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left w-full relative rounded-2xl overflow-hidden aspect-[16/10] shadow-lg hover:shadow-xl transition-all"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white mb-3`}>
                          {cat.icon}
                          {article.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:text-gray-100 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{article.author}</span>
                          <span>·</span>
                          <span>{formatDate(article.date)}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </button>
                    {/* Share button overlay on featured cards */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareArticle(article);
                      }}
                      className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:bg-black/50 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Share this article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results Count */}
        {(searchQuery || activeCategory !== 'All') && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {searchQuery && <span> for "<strong className="text-gray-700">{searchQuery}</strong>"</span>}
              {activeCategory !== 'All' && <span> in <strong className="text-gray-700">{activeCategory}</strong></span>}
            </p>
          </div>
        )}

        {/* All Articles Grid */}
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-6">
            {activeCategory === 'All' && searchQuery === '' ? 'All Articles' : 'Results'}
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const cat = categoryConfig[article.category];
                const articleCard = (
                  <div key={article.id} className="relative group">
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left w-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cat.bg} ${cat.color} border ${cat.border}`}>
                            {cat.icon}
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <User className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-700">{article.author}</p>
                              <p className="text-xs text-gray-400">{formatDate(article.date)}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </button>
                    {/* Share button overlay on article cards */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareArticle(article);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:bg-white hover:text-gray-800 shadow-sm hover:shadow transition-all opacity-0 group-hover:opacity-100"
                      title="Share this article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                );

                return articleCard;
              })}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <NewsletterSignup source="blog" />

      </div>

      {/* Share Modal */}
      {shareArticle && (
        <BlogShareModal
          article={shareArticle}
          onClose={() => setShareArticle(null)}
        />
      )}
    </div>
  );
};

export default Blog;
