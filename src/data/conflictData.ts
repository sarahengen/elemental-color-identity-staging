export interface ConflictSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  conflictArchetype: string;
  defaultResponse: 'fight' | 'flight' | 'freeze' | 'fawn';
  defaultResponseDetail: string;
  triggers: string[];
  escalationPattern: string;
  deEscalationPattern: string;
  blindSpotInConflict: string;
  conflictStrength: string;
  whatTheyNeedToHear: string;
  recoveryStyle: string;
}

export interface ConflictElement {
  element: string;
  elementId: string;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  coreConflictNature: string;
  subtypes: ConflictSubtype[];
}

export interface MediationGuide {
  partyA: string;
  partyAId: string;
  partyAElement: string;
  partyB: string;
  partyBId: string;
  partyBElement: string;
  frictionSource: string;
  stepByStepMediation: string[];
  scriptForA: string;
  scriptForB: string;
  commonGround: string;
  warningSign: string;
  resolutionKey: string;
}

export const conflictData: ConflictElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Conflict as Combustion',
    coreConflictNature: 'Fire types experience conflict as an energetic event—a surge of intensity that demands immediate expression. They do not simmer; they ignite. Their conflicts are loud, fast, and often resolved quickly because they cannot tolerate the tension of unresolved friction. The danger is not that Fire types fight—it is that they fight before they understand what the fight is actually about.',
    subtypes: [
      {
        subtype: 'Pure Fire',
        subtypeId: 'fire-fire',
        name: 'The Controlled Detonation',
        conflictArchetype: 'The Direct Confronter',
        defaultResponse: 'fight',
        defaultResponseDetail: 'You meet conflict head-on with immediate, forceful directness. You do not circle around issues or wait for the "right moment"—the right moment is now. Your instinct is to name the problem, state your position, and demand resolution. You experience conflict as a clarifying fire: it burns away pretense and reveals truth. You would rather have a loud, honest argument than a quiet, dishonest peace. Your fight response is not aggression—it is radical honesty delivered at high volume.',
        triggers: [
          'Dishonesty or deception of any kind',
          'Passive-aggressive behavior instead of direct communication',
          'Incompetence disguised as effort',
          'Being ignored or dismissed when you have a valid point',
          'Slow decision-making when urgency is required',
          'People who avoid conflict and let problems fester'
        ],
        escalationPattern: 'You escalate rapidly and linearly. First, you state the issue directly. If met with deflection, you repeat it louder. If met with denial, you provide evidence with increasing intensity. If met with silence, you interpret it as contempt and escalate to ultimatums. Your escalation is fast—minutes, not days. You can go from calm to confrontational in a single sentence if you perceive dishonesty.',
        deEscalationPattern: 'You de-escalate when the other person matches your directness. If they say "You\'re right, I dropped the ball, here\'s what I\'ll do differently," you can shift from combative to collaborative in seconds. You also de-escalate when given space to express your frustration fully—once you\'ve said everything you need to say, the fire burns out naturally. Physical movement helps: a walk, a change of scenery, or even a brief separation.',
        blindSpotInConflict: 'You assume everyone processes conflict at your speed. You don\'t realize that your "clearing the air" feels like an ambush to Water types, an attack on their competence to Earth types, and an irrational outburst to Air types. Your directness, which feels like honesty to you, can feel like violence to others.',
        conflictStrength: 'You never let problems fester. Issues are addressed immediately, which prevents the slow rot of unspoken resentment. Your willingness to be uncomfortable in service of truth is genuinely courageous.',
        whatTheyNeedToHear: '"I hear you, and I\'m not going to run from this conversation. Let me respond directly: here\'s where I agree with you, and here\'s where I see it differently. Can we work through this right now?"',
        recoveryStyle: 'Fast and complete. Once the conflict is resolved, you move on entirely. You do not hold grudges. You may not even remember the details of the argument a week later. For you, conflict is weather—it passes, and then the sky is clear.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Strategic Withdrawal',
        conflictArchetype: 'The Calculated Responder',
        defaultResponse: 'freeze',
        defaultResponseDetail: 'You experience an initial surge of Fire intensity followed by a Water-driven pause. Your first instinct is to fight, but your Water influence causes you to freeze momentarily—assessing, calculating, determining whether this conflict is worth the energy. You appear calm on the surface while internally processing at high speed. When you do respond, it is with devastating precision: every word chosen for maximum impact. You don\'t fight impulsively; you fight strategically.',
        triggers: [
          'Being emotionally manipulated or guilt-tripped',
          'Having your intelligence underestimated',
          'Witnessing cruelty or unfairness toward others',
          'Being forced into a position without consultation',
          'Superficial people who lack depth or authenticity',
          'Betrayal of trust, especially by someone you respected'
        ],
        escalationPattern: 'You escalate slowly but with increasing precision. First, you withdraw to assess. Then you return with a carefully constructed argument that addresses not just the surface issue but the underlying pattern. If dismissed, you escalate by revealing observations about the other person\'s behavior that they didn\'t know you had noticed. Your escalation is surgical, not explosive.',
        deEscalationPattern: 'You de-escalate when given time to process and when the other person demonstrates genuine understanding of the deeper issue—not just the surface complaint. A sincere, private conversation where both parties can be vulnerable works best. You need to feel emotionally safe before you can release the conflict.',
        blindSpotInConflict: 'Your strategic withdrawal can be perceived as cold manipulation. Others may feel you are "keeping score" or weaponizing your observations. Your precision can feel cruel even when your intention is clarity.',
        conflictStrength: 'You see the full picture—both the emotional and logical dimensions of conflict. You can articulate what others are feeling but cannot express, making you an exceptional mediator when you are not personally involved.',
        whatTheyNeedToHear: '"I want to understand your perspective fully. I\'m not going to rush you—take the time you need to share what\'s really going on beneath the surface."',
        recoveryStyle: 'Slow and thorough. You need to process the conflict emotionally before you can move on. You may need a day or two of quiet reflection. Once resolved, you integrate the lesson and adjust the relationship accordingly.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Immovable Force',
        conflictArchetype: 'The Principled Stand',
        defaultResponse: 'fight',
        defaultResponseDetail: 'You fight, but not with Fire\'s explosive spontaneity—you fight with Earth\'s immovable determination. Your conflict style is to plant your feet, state your position with absolute conviction, and refuse to move. You don\'t raise your voice; you lower it. You don\'t argue faster; you argue with more weight. Your "fight" is not a sprint—it is a siege. You will outlast anyone in a conflict of principle.',
        triggers: [
          'Violations of fairness or established agreements',
          'Disrespect toward your competence or track record',
          'Chaos or disorder that threatens stability',
          'People who change the rules without warning',
          'Laziness or lack of accountability in others',
          'Being asked to compromise your core values'
        ],
        escalationPattern: 'You escalate through increasing firmness rather than increasing volume. First, you state your position calmly. If challenged, you provide evidence from past agreements or established precedent. If pushed further, you become immovable—your tone becomes final, your words become declarations rather than discussions. At maximum escalation, you simply stop engaging and act unilaterally.',
        deEscalationPattern: 'You de-escalate when the other person acknowledges the validity of your position and offers a concrete plan to address it. Abstract apologies don\'t work—you need specific commitments with timelines. You also respond well to appeals to shared values and long-term goals.',
        blindSpotInConflict: 'Your immovability can become stubbornness. You may hold a position long after new information should have changed your mind, because changing your mind feels like losing. Your determination to be "right" can prevent you from being effective.',
        conflictStrength: 'You bring stability and principle to conflict. You don\'t get swept up in emotion or manipulation. Your consistency makes you trustworthy even in disagreement—people know exactly where you stand.',
        whatTheyNeedToHear: '"I respect your position and I can see the principle behind it. Here\'s what I can commit to concretely, and here\'s the timeline. Can we agree on this?"',
        recoveryStyle: 'Methodical. You need to see evidence that the resolution is being implemented before you fully release the conflict. Trust is rebuilt through consistent follow-through, not words.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Flash Point',
        conflictArchetype: 'The Passionate Debater',
        defaultResponse: 'fight',
        defaultResponseDetail: 'You fight with creative intensity—your conflicts are animated, idea-rich, and sometimes theatrical. You don\'t just argue your position; you argue multiple positions simultaneously, exploring the conflict from every angle at high speed. Your fight response is intellectual as much as emotional: you want to win the argument AND discover the truth. You can be genuinely enjoying a heated debate while the other person thinks you\'re attacking them.',
        triggers: [
          'Being told "that\'s not possible" without explanation',
          'Rigid thinking that refuses to consider alternatives',
          'Boredom or stagnation in any form',
          'People who dismiss creative ideas as impractical',
          'Micromanagement or excessive control',
          'Hypocrisy—especially in leaders who don\'t practice what they preach'
        ],
        escalationPattern: 'You escalate through increasing creative intensity. First, you propose alternative solutions with enthusiasm. If rejected, you argue more passionately, bringing in analogies, examples, and "what if" scenarios. If still blocked, you become provocative—deliberately challenging assumptions to force movement. At maximum escalation, you may make dramatic gestures or statements designed to shock the system into change.',
        deEscalationPattern: 'You de-escalate when someone engages with your ideas rather than dismissing them. If someone says "That\'s an interesting angle—let\'s explore it," your combative energy transforms into collaborative excitement instantly. You also de-escalate through humor and creative reframing.',
        blindSpotInConflict: 'You can be so focused on the intellectual excitement of the argument that you miss the emotional damage you\'re causing. Your rapid-fire debating style can feel overwhelming and dismissive to others. You may not realize when you\'ve "won" the argument but lost the relationship.',
        conflictStrength: 'You bring creative solutions to conflicts that others see as binary. Your ability to reframe problems opens up resolution paths that no one else would have considered.',
        whatTheyNeedToHear: '"I love the energy you\'re bringing to this. Let\'s channel it—what if we approached this problem from a completely different angle together?"',
        recoveryStyle: 'Quick and forward-looking. You recover by generating new ideas and possibilities. You don\'t dwell on what went wrong—you focus on what could go right next.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Conflict as Undertow',
    coreConflictNature: 'Water types experience conflict as an emotional disturbance that threatens their inner equilibrium. They do not seek conflict—they absorb it, often taking on the emotional weight of both sides. Their conflicts are internal before they are external, and by the time a Water type expresses their grievance, it has been building for far longer than anyone realizes. The danger is not that Water types avoid conflict—it is that they endure it silently until the dam breaks.',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Gentle Deflection',
        conflictArchetype: 'The Empathic Absorber',
        defaultResponse: 'fawn',
        defaultResponseDetail: 'Your instinct in conflict is to soothe, accommodate, and restore harmony—even at the cost of your own needs. You absorb the other person\'s emotions, validate their perspective, and find ways to make them feel heard before you even consider expressing your own position. Your fawn response is not weakness—it is an empathic reflex that prioritizes relational safety above personal truth. The problem is that your own needs go underground, where they accumulate pressure.',
        triggers: [
          'Harsh or aggressive communication styles',
          'Being put on the spot in public settings',
          'Feeling emotionally unsafe or judged',
          'Witnessing others being treated unkindly',
          'Having your emotional observations dismissed as "too sensitive"',
          'Environments where vulnerability is punished'
        ],
        escalationPattern: 'You escalate through withdrawal rather than confrontation. First, you accommodate and absorb. Then you become quieter, more distant, less available. If the pattern continues, you develop passive resistance—agreeing verbally but disengaging emotionally. At maximum escalation, you disappear entirely—cutting off contact without explanation, leaving the other person confused about what happened.',
        deEscalationPattern: 'You de-escalate when the other person creates genuine emotional safety. A soft tone, a genuine apology, and a willingness to listen without judgment will bring you back. You need to feel that your emotions are welcome before you can engage with the conflict content.',
        blindSpotInConflict: 'Your accommodation can enable harmful behavior. By absorbing conflict rather than addressing it, you may inadvertently teach others that their behavior has no consequences. Your eventual withdrawal can feel like abandonment to others who had no idea anything was wrong.',
        conflictStrength: 'You create emotional safety that allows others to be vulnerable. In mediation, your ability to hold space for both parties\' emotions is unmatched. You see the human being behind the position.',
        whatTheyNeedToHear: '"Your feelings matter here too. I want to hear what you need—not just what you think I need to hear. This is a safe space for you to be honest."',
        recoveryStyle: 'Gradual and relational. You recover through gentle reconnection—a kind word, a shared moment, a demonstration that the relationship is still safe. You need reassurance that the conflict has not damaged the bond.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Deep Withdrawal',
        conflictArchetype: 'The Silent Processor',
        defaultResponse: 'freeze',
        defaultResponseDetail: 'You freeze in conflict—not from fear, but from the sheer depth of your emotional processing. When conflict arises, you go inward, diving into the depths of the situation to understand it fully before responding. You may appear unresponsive or detached, but internally you are processing at a level most people cannot fathom. Your freeze is not avoidance—it is deep analysis. The problem is that others interpret your silence as indifference or agreement.',
        triggers: [
          'Being rushed to respond before you\'ve finished processing',
          'Superficial conflict resolution that doesn\'t address root causes',
          'Loud, aggressive confrontation styles',
          'Having your depth or complexity dismissed',
          'Environments that reward speed over thoughtfulness',
          'Being forced to choose sides in others\' conflicts'
        ],
        escalationPattern: 'You escalate through deepening silence. First, you pause to process. Then you withdraw into extended reflection—hours or days of internal analysis. If pressured to respond prematurely, you may deliver a devastating observation that reveals the deepest truth of the conflict—one that the other person was not prepared to hear. At maximum escalation, you sever the connection entirely, retreating into your depths where no one can reach you.',
        deEscalationPattern: 'You de-escalate when given unlimited time and space to process. A written communication that you can read and respond to at your own pace works better than a face-to-face confrontation. You need the other person to demonstrate patience and genuine interest in your perspective.',
        blindSpotInConflict: 'Your extended processing time can feel like punishment to others. Your silence, which feels like wisdom to you, can feel like abandonment or passive aggression to others. You may process so deeply that you never actually express your needs.',
        conflictStrength: 'You understand conflict at a level others cannot reach. Your insights, when finally expressed, often reveal the true nature of the disagreement that everyone else was missing. You bring profound wisdom to resolution.',
        whatTheyNeedToHear: '"Take all the time you need. I\'m not going anywhere. When you\'re ready to share your thoughts, I\'ll be here to listen—no rush, no judgment."',
        recoveryStyle: 'Deep and transformative. You don\'t just recover from conflict—you integrate it. The resolution changes you at a fundamental level. You emerge with a deeper understanding of yourself and the relationship.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Simmering Depth',
        conflictArchetype: 'The Passionate Protector',
        defaultResponse: 'fight',
        defaultResponseDetail: 'Unlike other Water types, your Fire influence gives you the capacity for direct confrontation—but it is always in service of emotional truth. You fight when someone you care about is being hurt, when an injustice needs to be named, or when your deepest values are violated. Your fight is not cold or strategic—it is hot, emotional, and deeply personal. You fight with tears as much as words.',
        triggers: [
          'Injustice or cruelty toward vulnerable people',
          'Emotional dishonesty—people pretending to feel something they don\'t',
          'Being told your emotions are "too much" or "too intense"',
          'Betrayal by someone you trusted deeply',
          'Environments that suppress emotional expression',
          'People who use logic to dismiss legitimate emotional concerns'
        ],
        escalationPattern: 'You escalate through increasing emotional intensity. First, you express your feelings clearly and passionately. If dismissed, you become more insistent, bringing historical context and emotional evidence. If still unheard, you may become dramatic—expressing the full depth of your hurt in ways that can feel overwhelming to others. At maximum escalation, you may say things you later regret, driven by the intensity of your emotional truth.',
        deEscalationPattern: 'You de-escalate when someone meets your emotional intensity with genuine empathy. If they say "I can see how deeply this affects you, and I\'m sorry," you can shift from combative to collaborative quickly. You need emotional validation before you can engage with practical solutions.',
        blindSpotInConflict: 'Your emotional intensity can overwhelm others and make them defensive. You may interpret their defensive reaction as further evidence of their wrongdoing, creating a cycle of escalation. Your passion, while authentic, can make it difficult for others to respond thoughtfully.',
        conflictStrength: 'You bring emotional courage to conflicts that others avoid. Your willingness to name what everyone is feeling but no one is saying creates breakthroughs in stalled situations.',
        whatTheyNeedToHear: '"I can feel how important this is to you, and I want to honor that. Help me understand what you need—I\'m listening with my whole heart."',
        recoveryStyle: 'Emotional and relational. You recover through deep conversation, shared vulnerability, and renewed emotional connection. You need to feel that the relationship has been strengthened, not just repaired.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Quiet Endurance',
        conflictArchetype: 'The Patient Resolver',
        defaultResponse: 'fawn',
        defaultResponseDetail: 'You accommodate and serve your way through conflict. Your instinct is to find the practical solution that makes everyone comfortable—often by taking on extra work yourself. You smooth over disagreements by being the person who "just handles it." Your fawn response is grounded in genuine care and a desire for harmony, but it can lead to chronic self-sacrifice and quiet resentment that builds over years.',
        triggers: [
          'Being taken for granted after years of quiet service',
          'Chaos or disorder that disrupts established routines',
          'People who create drama unnecessarily',
          'Having your behind-the-scenes contributions overlooked',
          'Being asked to do something that conflicts with your values',
          'Sudden changes imposed without consideration for impact'
        ],
        escalationPattern: 'You escalate through quiet withdrawal of service. First, you accommodate as usual. Then you begin to do less—not dramatically, but noticeably. If the pattern continues, you become passively resistant, doing the minimum required. At maximum escalation, you deliver a calm, devastating summary of every unacknowledged contribution you\'ve made, every time you were taken for granted—a ledger of quiet resentment that shocks everyone because they had no idea you were keeping track.',
        deEscalationPattern: 'You de-escalate when someone genuinely acknowledges your contributions and asks what you need. A simple "I\'ve noticed how much you do, and I want to make sure you\'re being taken care of too" can dissolve years of accumulated tension.',
        blindSpotInConflict: 'Your quiet endurance teaches others to take you for granted. By never expressing your needs, you create a dynamic where others genuinely don\'t know you have needs. Your eventual eruption feels unfair to them because they had no warning.',
        conflictStrength: 'You bring patience and practical wisdom to conflict resolution. You see the long-term implications of decisions and can guide others toward sustainable solutions rather than quick fixes.',
        whatTheyNeedToHear: '"I see everything you do, and I\'m grateful. Now tell me—what do you need? Not what you think I need to hear, but what you actually need."',
        recoveryStyle: 'Practical and incremental. You recover through small, consistent acts of mutual care. You need to see sustained change in behavior, not just a one-time apology.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Conflict as Earthquake',
    coreConflictNature: 'Earth types experience conflict as a threat to stability—a seismic event that disrupts the carefully constructed order they depend on. They do not seek conflict, but when their foundations are threatened, they respond with formidable force. Earth conflicts are slow to build but powerful when they arrive, like tectonic pressure that accumulates over years before releasing in a single, ground-shaking event.',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Volcanic Eruption',
        conflictArchetype: 'The Authoritative Enforcer',
        defaultResponse: 'fight',
        defaultResponseDetail: 'You fight with the full weight of your authority and experience. Your conflict style is not impulsive—it is deliberate and devastating. When you decide to engage in conflict, you bring evidence, precedent, and the moral authority of someone who has earned their position through consistent competence. Your fight response is rare, which makes it terrifying when it appears. People who have only seen your calm, steady exterior are shocked by the volcanic force beneath.',
        triggers: [
          'Disrespect toward your authority or expertise',
          'People who cut corners or compromise quality',
          'Betrayal of trust after you\'ve invested in someone',
          'Threats to the stability of your team or organization',
          'Incompetence in positions of responsibility',
          'Being undermined publicly or behind your back'
        ],
        escalationPattern: 'You escalate through increasing gravity. First, you address the issue privately with firm directness. If unresolved, you escalate to formal channels with documentation. If still unresolved, you use your authority to impose consequences. At maximum escalation, you become the immovable force—cutting off access, removing responsibilities, or ending relationships with finality.',
        deEscalationPattern: 'You de-escalate when the other person demonstrates genuine competence and accountability. Show you that you\'ve learned from the mistake, present a concrete plan to prevent recurrence, and follow through consistently. Respect is the currency of de-escalation with you.',
        blindSpotInConflict: 'Your authority can become authoritarianism. You may use your position to end conflicts rather than resolve them, which creates compliance without understanding. Your rare but powerful eruptions can damage relationships beyond repair.',
        conflictStrength: 'You bring gravitas and finality to conflict. When you speak, people listen because they know you don\'t engage in conflict frivolously. Your decisions carry weight because they are backed by experience and evidence.',
        whatTheyNeedToHear: '"I respect your experience and your standards. Here\'s what I\'ve done to address this, and here\'s my plan going forward. I\'d value your assessment."',
        recoveryStyle: 'Conditional. You recover when you see evidence of changed behavior over time. Trust is rebuilt through demonstrated competence, not words.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Tectonic Shift',
        conflictArchetype: 'The Systematic Objector',
        defaultResponse: 'freeze',
        defaultResponseDetail: 'You freeze in the sense of becoming immovable. When conflict arises, you don\'t react—you assess. You gather data, review precedent, and construct a comprehensive understanding of the situation before responding. Your freeze is not paralysis—it is the geological patience of tectonic plates. When you finally move, the ground shifts for everyone.',
        triggers: [
          'Disorganization or lack of process',
          'Decisions made without adequate data or analysis',
          'People who don\'t follow through on commitments',
          'Arbitrary changes to established systems',
          'Being asked to lower your standards',
          'Waste—of time, resources, or potential'
        ],
        escalationPattern: 'You escalate through documentation. First, you note the issue and monitor it. Then you compile evidence over time. When you finally raise the concern, you present a comprehensive case that is difficult to dismiss. If dismissed anyway, you become rigidly procedural—following every rule to the letter in a way that exposes the dysfunction you\'ve been trying to address.',
        deEscalationPattern: 'You de-escalate when presented with a systematic solution. Show you a process improvement, a documented plan, or a structural change that addresses the root cause, and you will engage constructively. You need solutions, not apologies.',
        blindSpotInConflict: 'Your methodical approach can feel cold and impersonal. Others may feel you are treating a human problem like a systems problem. Your documentation habit can feel like surveillance to colleagues.',
        conflictStrength: 'You bring irrefutable evidence to conflicts. Your cases are so well-documented that they are nearly impossible to dismiss. You see patterns that others miss because you track data over time.',
        whatTheyNeedToHear: '"You\'re right that this is a systemic issue, not a one-time event. Let\'s design a process together that prevents this from recurring. I want your input on the structure."',
        recoveryStyle: 'Systematic. You recover when the system is fixed, not just the symptom. You need to see structural change before you can trust that the conflict is truly resolved.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Quiet Erosion',
        conflictArchetype: 'The Gentle Boundary-Setter',
        defaultResponse: 'fawn',
        defaultResponseDetail: 'You accommodate initially, smoothing over conflict with warmth and practical helpfulness. But unlike pure fawning, your Earth foundation gives you a quiet firmness that eventually surfaces. You set boundaries not through confrontation but through gradual, persistent redirection—like water wearing away stone. Your fawn response is temporary; your Earth nature ensures you eventually stand your ground, just more gently than other Earth types.',
        triggers: [
          'Being taken advantage of after offering genuine help',
          'Harsh or insensitive treatment of anyone',
          'Environments that prioritize efficiency over humanity',
          'Having your careful, thoughtful work dismissed',
          'People who mistake your gentleness for weakness',
          'Being rushed through processes that require care'
        ],
        escalationPattern: 'You escalate through gentle but persistent boundary-setting. First, you accommodate while subtly redirecting. Then you become more explicit about your limits, still with warmth. If pushed past your boundary, you become quietly firm—your warmth withdraws, and what remains is pure Earth immovability wrapped in polite language.',
        deEscalationPattern: 'You de-escalate when someone approaches you with genuine warmth and acknowledges the impact of their behavior. A heartfelt conversation in a comfortable setting, where both parties can be honest without aggression, is your ideal resolution environment.',
        blindSpotInConflict: 'Your gentleness can delay necessary confrontations. By the time you set a firm boundary, the other person may have developed habits that are much harder to change. Your accommodation period can create confusion about where you actually stand.',
        conflictStrength: 'You create resolution environments where everyone feels safe enough to be honest. Your combination of warmth and firmness makes you an exceptional mediator.',
        whatTheyNeedToHear: '"I appreciate your patience with this situation. I want to make sure we find a solution that honors your needs too. What would feel right to you?"',
        recoveryStyle: 'Warm and gradual. You recover through renewed connection and shared positive experiences. You need to feel that the relationship has been restored to its natural warmth.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Refined Objection',
        conflictArchetype: 'The Diplomatic Challenger',
        defaultResponse: 'flight',
        defaultResponseDetail: 'Your first instinct is to remove yourself from conflict—not from fear, but from a refined distaste for disorder. You prefer to address issues through polished, indirect communication rather than direct confrontation. Your flight response is elegant: you don\'t run, you redirect. You change the subject, reframe the issue, or suggest a "better time" to discuss it. When you must engage, you do so with such diplomatic precision that the other person may not realize they\'ve been challenged.',
        triggers: [
          'Crudeness or lack of refinement in communication',
          'Public confrontation or embarrassment',
          'Mediocrity presented as excellence',
          'People who don\'t appreciate quality or craftsmanship',
          'Disorganized or poorly presented arguments',
          'Being forced into binary choices when nuance is required'
        ],
        escalationPattern: 'You escalate through increasingly pointed diplomacy. First, you redirect with grace. Then you offer "constructive feedback" with precise, elegant criticism. If pushed further, you become coolly devastating—your words become more polished and more cutting simultaneously. At maximum escalation, you deliver a perfectly crafted assessment that is so accurate and so beautifully expressed that it cannot be dismissed.',
        deEscalationPattern: 'You de-escalate when the other person raises their standard of communication. If they approach you with a well-prepared, thoughtfully presented case, you will engage with genuine respect. Quality of engagement matters more to you than the content of the disagreement.',
        blindSpotInConflict: 'Your diplomatic approach can feel evasive or dishonest to more direct types. Your elegant criticism can be so subtle that the other person doesn\'t realize they\'ve been criticized. Your distaste for direct conflict can prevent necessary confrontations.',
        conflictStrength: 'You bring refinement and nuance to conflict resolution. Your ability to frame disagreements in constructive, aspirational terms makes people want to improve rather than defend.',
        whatTheyNeedToHear: '"I\'d like to discuss this with the care it deserves. Could we set aside time for a thoughtful conversation? I want to present my perspective properly and hear yours fully."',
        recoveryStyle: 'Refined and aesthetic. You recover through the restoration of quality and order. A beautifully prepared reconciliation—a handwritten note, a carefully chosen gesture—means more to you than a casual "we good?"'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Conflict as Turbulence',
    coreConflictNature: 'Air types experience conflict as intellectual turbulence—a disruption in the flow of ideas and communication that they find genuinely disorienting. They prefer to resolve conflicts through reason, reframing, and creative problem-solving rather than emotional confrontation. The danger is not that Air types avoid emotion in conflict—it is that they try to think their way out of situations that require feeling their way through.',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Logical Detachment',
        conflictArchetype: 'The Analytical Dissector',
        defaultResponse: 'flight',
        defaultResponseDetail: 'You flee into analysis. When conflict arises, your instinct is to step back, observe the situation objectively, and analyze it as if it were a problem to be solved rather than an emotion to be felt. Your flight is intellectual—you don\'t leave the room, but you leave the emotional dimension of the conversation. You become increasingly rational, data-driven, and detached, which can feel dismissive to emotionally engaged parties.',
        triggers: [
          'Irrational arguments or logical fallacies',
          'Emotional manipulation or guilt-tripping',
          'Being asked to accept something without evidence',
          'Groupthink or pressure to conform without reason',
          'Intellectual dishonesty or cherry-picked data',
          'People who refuse to consider alternative perspectives'
        ],
        escalationPattern: 'You escalate through increasing analytical precision. First, you calmly present counter-evidence. Then you systematically dismantle the other person\'s argument, point by point. If they respond emotionally, you become more analytical—creating a widening gap between your logical approach and their emotional response. At maximum escalation, you deliver a comprehensive logical takedown that is intellectually devastating but emotionally tone-deaf.',
        deEscalationPattern: 'You de-escalate when someone presents a well-reasoned counter-argument. If they can show you evidence that challenges your position, you will genuinely reconsider. You also de-escalate when someone explicitly names the emotional dimension: "I know this isn\'t just about the data—there\'s a trust issue here too."',
        blindSpotInConflict: 'Your analytical detachment can feel like emotional abandonment. Others may feel you don\'t care about the relationship, only about being right. Your logical precision can invalidate legitimate emotional concerns that don\'t fit neatly into your framework.',
        conflictStrength: 'You bring clarity and objectivity to emotionally charged situations. Your ability to separate the problem from the person allows you to find solutions that others miss because they\'re too emotionally involved.',
        whatTheyNeedToHear: '"I appreciate your analysis, and I want to add another data point: here\'s how this situation is affecting people emotionally. Can we factor that into our solution?"',
        recoveryStyle: 'Intellectual. You recover by understanding what happened and why. You need a clear, logical narrative of the conflict and its resolution before you can move on.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Creative Disruption',
        conflictArchetype: 'The Provocative Innovator',
        defaultResponse: 'fight',
        defaultResponseDetail: 'You fight with ideas. Your conflict style is to challenge, provoke, and disrupt conventional thinking—not out of malice, but out of a genuine belief that conflict is a creative force. You see arguments as brainstorming sessions and disagreements as opportunities for innovation. Your fight response is energetic and idea-driven: you don\'t attack the person, you attack the assumption.',
        triggers: [
          'Stagnation or "we\'ve always done it this way" thinking',
          'Being told to stay in your lane or limit your thinking',
          'Bureaucracy that prevents innovation',
          'People who are threatened by new ideas',
          'Conformity pressure that suppresses individuality',
          'Slow, incremental approaches when bold action is needed'
        ],
        escalationPattern: 'You escalate through increasing provocation. First, you challenge the assumption gently. Then you propose increasingly radical alternatives. If met with resistance, you become deliberately provocative—pushing boundaries to force people out of their comfort zones. At maximum escalation, you may burn bridges by saying something so challenging that it cannot be taken back.',
        deEscalationPattern: 'You de-escalate when someone engages with your ideas rather than defending against them. "That\'s a wild idea—let\'s explore it" is the magic phrase. You also de-escalate through humor and creative collaboration.',
        blindSpotInConflict: 'Your provocative style can feel like disrespect to people who value stability and tradition. You may not realize that your "creative disruption" is experienced as chaos by Earth types and emotional assault by Water types.',
        conflictStrength: 'You bring innovation to stale conflicts. Your ability to reframe problems creates resolution paths that no one else would have imagined.',
        whatTheyNeedToHear: '"Your ideas are pushing us in an important direction. Let\'s find a way to test them that doesn\'t require burning everything down first. What\'s the smallest experiment we could run?"',
        recoveryStyle: 'Creative and forward-looking. You recover by channeling the conflict energy into a new project or idea. You don\'t look back—you look ahead.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Diplomatic Bridge',
        conflictArchetype: 'The Relational Mediator',
        defaultResponse: 'fawn',
        defaultResponseDetail: 'You fawn in the most sophisticated way possible—through diplomacy. Your instinct in conflict is to find the middle ground, validate both perspectives, and craft a compromise that everyone can accept. You are genuinely distressed by interpersonal conflict and will invest enormous energy in maintaining harmony. Your fawn response is not about self-erasure—it is about relational preservation. You believe that every conflict has a win-win solution if you can just find the right framing.',
        triggers: [
          'People who refuse to compromise or see other perspectives',
          'Conflict that threatens important relationships',
          'Being forced to choose sides between people you care about',
          'Aggressive or hostile communication styles',
          'Situations where someone is being excluded or marginalized',
          'Binary thinking that refuses to acknowledge nuance'
        ],
        escalationPattern: 'You escalate through increasing diplomatic pressure. First, you mediate gently. Then you become more assertive in your bridge-building, actively reframing both positions. If neither party budges, you may become frustrated and express disappointment—not anger, but a genuine sadness that people can\'t find common ground. At maximum escalation, you withdraw your diplomatic services entirely, which often causes the conflict to worsen and demonstrates how much your mediation was holding things together.',
        deEscalationPattern: 'You de-escalate when both parties show willingness to understand each other. Even a small gesture of goodwill from one side gives you enough material to build a bridge. You thrive when people say "Help me understand their perspective."',
        blindSpotInConflict: 'Your commitment to harmony can prevent necessary conflict. Some disagreements need to be fully expressed before they can be resolved, and your premature bridge-building can short-circuit that process. You may sacrifice truth for peace.',
        conflictStrength: 'You see the humanity in every position. Your ability to translate one person\'s concerns into language another person can hear is a rare and valuable gift.',
        whatTheyNeedToHear: '"You\'re doing important work holding this together. But I want to make sure your own needs are being met too. What do you need from this situation?"',
        recoveryStyle: 'Relational and inclusive. You recover when the relationship network is restored to harmony. You need to see people reconnecting and communicating again.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The Perceptive Withdrawal',
        conflictArchetype: 'The Intuitive Observer',
        defaultResponse: 'flight',
        defaultResponseDetail: 'You flee into perception. When conflict arises, you step back and observe—not just the words being said, but the dynamics beneath them. You see who is really angry, who is performing anger, who is afraid, and who is using the conflict to advance a hidden agenda. Your flight is perceptive: you leave the active conflict to gain the vantage point of the observer. From there, you can see the entire landscape of the disagreement with startling clarity.',
        triggers: [
          'Inauthenticity—people saying things they don\'t mean',
          'Political maneuvering disguised as genuine concern',
          'Being pressured to take a position before you\'ve fully perceived the situation',
          'Environments where perception is dismissed in favor of action',
          'People who are unaware of their own motivations',
          'Conflicts driven by ego rather than genuine disagreement'
        ],
        escalationPattern: 'You escalate through increasingly pointed observations. First, you withdraw and observe. Then you offer a gentle insight about the underlying dynamic. If dismissed, you become more direct in naming what you see—"This isn\'t really about the budget, is it? This is about trust." At maximum escalation, you deliver a perception so accurate and so uncomfortable that it forces everyone to confront what they\'ve been avoiding.',
        deEscalationPattern: 'You de-escalate when someone demonstrates genuine self-awareness. If they say "You\'re right—I realize I\'m not really upset about X, I\'m upset about Y," you will engage with profound empathy and insight. Authenticity is the key to your engagement.',
        blindSpotInConflict: 'Your perceptive withdrawal can feel like judgment. Others may feel you are watching them like a specimen rather than engaging with them as a person. Your observations, while accurate, can feel invasive if delivered without warmth.',
        conflictStrength: 'You see the truth beneath the surface of every conflict. Your perceptions, when shared with care, can unlock resolutions that address the real issue rather than the presenting symptom.',
        whatTheyNeedToHear: '"I trust your read on this situation. What are you seeing that the rest of us are missing? And what do you think we should do about it?"',
        recoveryStyle: 'Reflective and authentic. You recover through honest conversation about what really happened—not the surface events, but the underlying dynamics. You need truth before you can restore trust.'
      }
    ]
  }
];

export const mediationGuides: MediationGuide[] = [
  {
    partyA: 'Pure Fire',
    partyAId: 'fire-fire',
    partyAElement: 'fire',
    partyB: 'Pure Water',
    partyBId: 'water-water',
    partyBElement: 'water',
    frictionSource: 'Fire\'s explosive directness overwhelms Water\'s need for processing time. Fire interprets Water\'s silence as agreement or indifference; Water experiences Fire\'s intensity as emotional violence.',
    stepByStepMediation: [
      'Separate the parties. Give Water 24 hours of written communication before any face-to-face meeting.',
      'Ask Fire to write down their three core concerns in order of priority. This channels their energy into structure.',
      'Share Fire\'s written concerns with Water. Ask Water to respond in writing when ready—no deadline.',
      'When Water responds, schedule a meeting in a comfortable, private setting. Begin with Water speaking first.',
      'Ask Fire to listen without interrupting for 5 full minutes. Use a timer if necessary.',
      'After Water finishes, ask Fire to summarize what they heard before responding. This ensures Fire actually listened.',
      'Guide both parties toward identifying one concrete action each will take. Fire needs action; Water needs intention.',
      'Schedule a follow-up in one week to check progress. This gives Water ongoing safety and Fire a deadline.'
    ],
    scriptForA: '"I know you want to resolve this quickly, and I respect that urgency. But [Water\'s name] processes differently than you do—not slower, just deeper. If you give them the space they need, you\'ll get a response that addresses the real issue, not just the surface. Can you commit to patience here? The payoff will be worth it."',
    scriptForB: '"I know [Fire\'s name]\'s intensity can feel overwhelming. But their directness comes from a genuine desire to fix things, not to hurt you. They\'re not attacking you—they\'re attacking the problem. Can you help them understand what you need by telling them directly? They will respect your honesty more than your accommodation."',
    commonGround: 'Both types value authenticity. Fire expresses it through directness; Water expresses it through depth. Help them see that they are both pursuing truth—just through different channels.',
    warningSign: 'If Fire starts raising their voice and Water goes completely silent, intervene immediately. This is the escalation spiral: Fire reads silence as dismissal and gets louder; Water reads volume as aggression and goes deeper into withdrawal.',
    resolutionKey: 'The resolution is not compromise—it is translation. Fire needs to learn that Water\'s silence is processing, not rejection. Water needs to learn that Fire\'s intensity is caring, not attacking.'
  },
  {
    partyA: 'Fire + Air',
    partyAId: 'fire-air',
    partyAElement: 'fire',
    partyB: 'Earth + Earth',
    partyBId: 'earth-earth',
    partyBElement: 'earth',
    frictionSource: 'Fire-Air\'s rapid-fire ideas and desire for change clash with Pure Earth\'s need for documentation, process, and evidence. Fire-Air sees Earth as obstructionist; Earth sees Fire-Air as reckless.',
    stepByStepMediation: [
      'Acknowledge both perspectives as valid: innovation needs structure, and structure needs innovation.',
      'Ask Fire-Air to present their top idea with a basic implementation sketch—even rough is fine.',
      'Ask Earth to identify the three biggest risks in that idea, with specific evidence for each concern.',
      'Challenge Fire-Air to address each risk creatively rather than dismissing them.',
      'Challenge Earth to identify one element of the idea they genuinely find promising.',
      'Co-create a small pilot or experiment that satisfies Fire-Air\'s need for action and Earth\'s need for data.',
      'Set clear metrics for evaluating the pilot—this gives Earth the data they need and Fire-Air the freedom to experiment.',
      'Schedule a review meeting with documented results. Both types will respect evidence of what actually happened.'
    ],
    scriptForA: '"Your ideas have real potential, and I don\'t want to lose that energy. But [Earth\'s name] isn\'t trying to kill your ideas—they\'re trying to make them survive contact with reality. If you can work with their process, your ideas will be stronger, not weaker. Can you channel your creativity into addressing their concerns?"',
    scriptForB: '"I know change feels risky, and your instinct to protect what works is valuable. But [Fire-Air\'s name] is seeing possibilities that could genuinely improve things. Your role isn\'t to block ideas—it\'s to stress-test them. Can you engage with the potential here, not just the risk?"',
    commonGround: 'Both types want excellence—Fire-Air through innovation, Earth through reliability. Help them see that the best outcomes combine both: innovative ideas implemented with rigorous quality.',
    warningSign: 'If Fire-Air starts making dramatic statements ("Fine, we\'ll just keep doing things the way we\'ve always done them!") and Earth becomes rigidly procedural ("That\'s not how we do things here"), the conversation has become positional rather than productive.',
    resolutionKey: 'Create a structured innovation process: a framework that gives Fire-Air permission to experiment within boundaries that give Earth confidence. The pilot approach is almost always the answer.'
  },
  {
    partyA: 'Water + Air',
    partyAId: 'water-air',
    partyAElement: 'water',
    partyB: 'Earth + Fire',
    partyBId: 'earth-fire',
    partyBElement: 'earth',
    frictionSource: 'Water-Air\'s gentle, accommodating style is perceived as weakness by Earth-Fire\'s authoritative nature. Earth-Fire may inadvertently bulldoze Water-Air, who absorbs the impact silently until they eventually withdraw entirely.',
    stepByStepMediation: [
      'Meet with Water-Air privately first. Create a safe space for them to express what they\'ve been holding back.',
      'Help Water-Air identify their three most important needs—not what they think Earth-Fire wants to hear, but what they actually need.',
      'Meet with Earth-Fire privately. Help them understand that Water-Air\'s accommodation is not agreement—it may be suppression.',
      'In the joint meeting, establish ground rules: no interrupting, equal speaking time, and a focus on needs rather than positions.',
      'Ask Water-Air to speak first, sharing their needs directly. Coach them beforehand if necessary.',
      'Ask Earth-Fire to respond to each need specifically, without dismissing or minimizing.',
      'Identify concrete changes both parties will make. Earth-Fire commits to checking in regularly; Water-Air commits to speaking up sooner.',
      'Follow up in two weeks. Water-Air needs to see sustained change; Earth-Fire needs to see Water-Air actually using their voice.'
    ],
    scriptForA: '"You\'ve been carrying more than your share, and that\'s not sustainable. [Earth-Fire\'s name] doesn\'t know what you need because you haven\'t told them—and that\'s not their fault or yours, it\'s just how your styles interact. Today, I need you to be brave enough to say what you actually need. They can handle it."',
    scriptForB: '"Your strength and decisiveness are assets, but they can inadvertently silence people who communicate differently. [Water-Air\'s name] has been accommodating you, not agreeing with you. Today, I need you to listen—really listen—to what they\'ve been holding back. Their perspective will make your decisions better."',
    commonGround: 'Both types care deeply about the people around them—Earth-Fire through protection and provision, Water-Air through emotional support and harmony. Help them see they are both trying to take care of the same people, just differently.',
    warningSign: 'If Water-Air starts saying "It\'s fine, really" with a tight smile, they are fawning, not resolving. If Earth-Fire starts making unilateral decisions "for efficiency," they are bypassing, not collaborating.',
    resolutionKey: 'Earth-Fire must learn to create space; Water-Air must learn to fill it. The resolution requires both parties to stretch beyond their comfort zones.'
  },
  {
    partyA: 'Air + Air',
    partyAId: 'air-air',
    partyAElement: 'air',
    partyB: 'Water + Fire',
    partyBId: 'water-fire',
    partyBElement: 'water',
    frictionSource: 'Air-Air\'s analytical detachment clashes with Water-Fire\'s emotional intensity. Air-Air dismisses emotions as irrational; Water-Fire experiences Air-Air\'s logic as cold and uncaring.',
    stepByStepMediation: [
      'Name the dynamic explicitly: "This conflict is partly about content and partly about communication style differences."',
      'Ask Air-Air to identify the logical core of the disagreement. Write it on a whiteboard or shared document.',
      'Ask Water-Fire to identify the emotional core of the disagreement. Write it alongside the logical core.',
      'Show both parties that the logical and emotional cores are often two expressions of the same underlying concern.',
      'Ask Air-Air: "If you were to take the emotional dimension seriously as data, what would it tell you?"',
      'Ask Water-Fire: "If you were to express your feelings as a logical argument, what would the premises be?"',
      'Guide both toward a solution that addresses both dimensions—the structural fix AND the relational repair.',
      'Close by having each person acknowledge one thing they learned from the other\'s perspective.'
    ],
    scriptForA: '"Your analysis is sharp and valuable. But there\'s a dimension of this situation that data alone can\'t capture—the human impact. [Water-Fire\'s name]\'s emotions aren\'t noise; they\'re signal. Can you treat their feelings as another form of evidence?"',
    scriptForB: '"Your passion and emotional honesty are strengths. But [Air-Air\'s name] isn\'t being cold—they\'re trying to find a solution through the lens that works best for them. Can you help them by translating your feelings into the logical framework they understand?"',
    commonGround: 'Both types are seeking truth—Air-Air through logic, Water-Fire through emotional authenticity. Help them see that complete truth requires both dimensions.',
    warningSign: 'If Air-Air starts saying "Let\'s be rational about this" and Water-Fire starts saying "You don\'t care about anyone," the conversation has split into parallel monologues. Neither is hearing the other.',
    resolutionKey: 'The resolution requires Air-Air to expand their definition of "evidence" to include emotional data, and Water-Fire to express their emotions in a structured way that Air-Air can engage with.'
  },
  {
    partyA: 'Fire + Earth',
    partyAId: 'fire-earth',
    partyAElement: 'fire',
    partyB: 'Air + Water',
    partyBId: 'air-water',
    partyBElement: 'air',
    frictionSource: 'Fire-Earth\'s immovable principles clash with Air-Water\'s perceptive but indirect style. Fire-Earth sees Air-Water as evasive; Air-Water sees Fire-Earth as rigid and unable to see the deeper dynamics at play.',
    stepByStepMediation: [
      'Begin by acknowledging Fire-Earth\'s commitment to their principles—this is not stubbornness, it is integrity.',
      'Then acknowledge Air-Water\'s perceptive insights—their observations are not evasion, they are depth.',
      'Ask Fire-Earth to state their non-negotiable principle clearly and concisely.',
      'Ask Air-Water to share what they perceive is the underlying dynamic driving this conflict.',
      'Often, Air-Water\'s perception will reveal that Fire-Earth\'s principle is being triggered by something deeper than the surface issue.',
      'Guide Fire-Earth to consider whether their principle is being applied to the right problem.',
      'Guide Air-Water to express their perception as a direct statement rather than an observation from the sidelines.',
      'Find a resolution that honors Fire-Earth\'s principle while addressing the deeper dynamic Air-Water identified.'
    ],
    scriptForA: '"Your principles are the foundation of your integrity, and I respect that deeply. But I want to make sure we\'re applying them to the right issue. [Air-Water\'s name] sees something beneath the surface that might change how we approach this. Can you hear them out?"',
    scriptForB: '"Your perception of what\'s really going on here is valuable—probably more accurate than anyone else\'s read. But [Fire-Earth\'s name] needs you to say it directly, not hint at it. Can you translate your observation into a clear statement they can engage with?"',
    commonGround: 'Both types value truth and authenticity. Fire-Earth expresses it through principled action; Air-Water expresses it through perceptive observation. Together, they can see both what should be done and why.',
    warningSign: 'If Fire-Earth becomes increasingly rigid ("This is non-negotiable") and Air-Water becomes increasingly cryptic ("There\'s more going on here than you realize"), they are retreating into their respective strengths rather than bridging the gap.',
    resolutionKey: 'Fire-Earth must be willing to examine whether their principle applies to the actual situation (not just the apparent one), and Air-Water must be willing to state their perception plainly rather than implying it.'
  },
  {
    partyA: 'Earth + Air',
    partyAId: 'earth-air',
    partyAElement: 'earth',
    partyB: 'Fire + Water',
    partyBId: 'fire-water',
    partyBElement: 'fire',
    frictionSource: 'Earth-Air\'s diplomatic, refined approach frustrates Fire-Water\'s desire for deep, authentic engagement. Fire-Water perceives Earth-Air\'s polish as superficiality; Earth-Air perceives Fire-Water\'s intensity as unnecessarily dramatic.',
    stepByStepMediation: [
      'Acknowledge the style difference: Earth-Air communicates through refinement; Fire-Water communicates through depth.',
      'Ask Earth-Air to set aside diplomatic framing and share their genuine position—not the polished version.',
      'Ask Fire-Water to express their concern without the emotional intensity—just the core issue, stated plainly.',
      'Both will find this uncomfortable, which means both are stretching toward the other\'s style.',
      'Identify the substantive disagreement beneath the style conflict. Often, the actual issue is smaller than the style friction suggests.',
      'Co-create a resolution that allows Earth-Air to maintain quality standards while giving Fire-Water the depth of engagement they need.',
      'Agree on a communication protocol: Earth-Air will be more direct; Fire-Water will be more measured.',
      'Follow up to ensure both parties are honoring the protocol and feeling heard.'
    ],
    scriptForA: '"Your attention to quality and presentation is a real strength. But [Fire-Water\'s name] needs to feel that you\'re engaging with the substance, not just the surface. Can you let them see what you really think, even if it\'s not perfectly polished?"',
    scriptForB: '"Your depth and emotional honesty are powerful. But [Earth-Air\'s name] engages best when the message is delivered with care and structure. Can you express your concern in a way that matches their communication style, without losing your authenticity?"',
    commonGround: 'Both types value excellence—Earth-Air in form, Fire-Water in substance. The best outcomes have both: deep truth delivered with care and precision.',
    warningSign: 'If Earth-Air becomes increasingly formal and Fire-Water becomes increasingly intense, they are polarizing rather than converging. Intervene by asking both to speak informally and personally.',
    resolutionKey: 'Earth-Air must risk being unpolished; Fire-Water must risk being measured. The resolution lives in the uncomfortable middle ground between refinement and rawness.'
  },
  // --- NEW GUIDES: Cross-element pairings featuring previously uncovered subtypes ---
  {
    partyA: 'Water + Earth',
    partyAId: 'water-earth',
    partyAElement: 'water',
    partyB: 'Air + Fire',
    partyBId: 'air-fire',
    partyBElement: 'air',
    frictionSource: 'Water-Earth\'s quiet, patient endurance is the polar opposite of Air-Fire\'s provocative, fast-moving energy. Water-Earth feels bulldozed by Air-Fire\'s relentless push for change; Air-Fire feels suffocated by Water-Earth\'s slow, cautious approach. Water-Earth interprets Air-Fire\'s provocations as disrespect for what already works; Air-Fire interprets Water-Earth\'s patience as passive resistance to progress.',
    stepByStepMediation: [
      'Begin by slowing the conversation to Water-Earth\'s pace—this immediately reduces their stress response and shows respect for their process.',
      'Ask Water-Earth to name one specific concern about the proposed change. Not a feeling—a concrete, practical concern.',
      'Ask Air-Fire to respond to that specific concern with a specific solution—not a new idea, not a reframe, but a direct answer.',
      'Then ask Air-Fire to name the single most important change they believe is needed and why.',
      'Ask Water-Earth to identify what about that change could work, even partially. This engages their practical wisdom rather than their resistance.',
      'Co-design a phased approach: Air-Fire gets to start the change now (satisfying their need for movement), but in a contained way that Water-Earth can monitor and adjust (satisfying their need for stability).',
      'Establish check-in points where Water-Earth can raise concerns without being seen as obstructionist, and Air-Fire can propose adjustments without being seen as reckless.',
      'Close by having Air-Fire acknowledge one thing Water-Earth\'s caution has protected, and Water-Earth acknowledge one improvement Air-Fire\'s energy has created.'
    ],
    scriptForA: '"You\'ve been holding things together quietly for a long time, and that matters more than people realize. [Air-Fire\'s name] isn\'t trying to tear down what you\'ve built—they\'re trying to build on it. Your practical wisdom is exactly what their ideas need to succeed. Can you share your concerns directly so they can address them?"',
    scriptForB: '"Your energy and vision are genuine assets. But [Water-Earth\'s name] has been sustaining things you don\'t even see—systems, relationships, processes that work because of their quiet care. If you slow down enough to learn what they know, your ideas will be ten times more effective. Can you listen before you leap?"',
    commonGround: 'Both types are deeply committed to the well-being of the people and systems they care about. Water-Earth protects through sustaining; Air-Fire protects through evolving. Both are acts of care.',
    warningSign: 'If Water-Earth goes completely silent and begins withdrawing their behind-the-scenes support, and Air-Fire starts making unilateral changes without consultation, the conflict has moved from disagreement to disengagement. Intervene before Water-Earth disappears and Air-Fire burns bridges.',
    resolutionKey: 'Water-Earth must learn that change is not a threat to what they\'ve built—it can be an extension of it. Air-Fire must learn that patience is not the enemy of progress—it is the foundation of lasting progress.'
  },
  {
    partyA: 'Earth + Water',
    partyAId: 'earth-water',
    partyAElement: 'earth',
    partyB: 'Air + Earth',
    partyBId: 'air-earth',
    partyBElement: 'air',
    frictionSource: 'Earth-Water\'s gentle boundary-setting meets Air-Earth\'s diplomatic challenge in a conflict that is almost invisible to outsiders. Both types avoid direct confrontation, which means their disagreements simmer beneath polished surfaces. Earth-Water feels that Air-Earth\'s diplomacy lacks genuine emotional engagement; Air-Earth feels that Earth-Water\'s warmth masks an unwillingness to address hard truths.',
    stepByStepMediation: [
      'Name the elephant in the room: both parties are being so careful with each other that the actual conflict is being avoided entirely.',
      'Create a structured exercise: ask each party to write down the one thing they wish the other person would say or do differently. Exchange the papers.',
      'Give both parties time to read and process. Neither type responds well to being put on the spot.',
      'Ask Earth-Water to respond first—not with accommodation, but with their honest reaction to what they read.',
      'Ask Air-Earth to respond next—not with diplomatic reframing, but with their genuine feelings about what they read.',
      'Identify the pattern: both types have been prioritizing relational harmony over honest communication, and the relationship is suffering because of it.',
      'Co-create a "honesty protocol"—a specific time and format where both parties agree to speak directly without diplomatic cushioning or accommodating deflection.',
      'Schedule regular check-ins using this protocol. Both types need structure to override their conflict-avoidant instincts.'
    ],
    scriptForA: '"Your warmth and care for this relationship are obvious. But [Air-Earth\'s name] needs to hear what you really think, not what you think will keep things comfortable. The relationship is strong enough to handle your honesty—and it needs your honesty to grow."',
    scriptForB: '"Your diplomatic skill is remarkable, but right now it\'s getting in the way. [Earth-Water\'s name] can feel that you\'re managing the conversation rather than participating in it. They need you to drop the polish and be real. What do you actually think and feel about this situation?"',
    commonGround: 'Both types value harmony and care deeply about relationships. The irony is that their shared commitment to avoiding conflict is itself creating conflict. Help them see that honest communication is the highest form of relational care.',
    warningSign: 'If both parties leave the conversation saying "That went well" but nothing has actually changed, the mediation has failed. Politeness is not resolution. Push for specific behavioral commitments.',
    resolutionKey: 'Both types must accept that genuine harmony requires occasional discomfort. Earth-Water must risk being direct; Air-Earth must risk being undiplomatic. The relationship they are both trying to protect can only be strengthened through the honesty they are both avoiding.'
  },
  {
    partyA: 'Fire + Water',
    partyAId: 'fire-water',
    partyAElement: 'fire',
    partyB: 'Air + Fire',
    partyBId: 'air-fire',
    partyBElement: 'air',
    frictionSource: 'Fire-Water\'s strategic, calculated intensity meets Air-Fire\'s spontaneous, provocative energy. Fire-Water sees Air-Fire as reckless and unfocused; Air-Fire sees Fire-Water as controlling and overly calculated. Both types have Fire in their composition, which means conflicts between them are high-energy but fundamentally different in rhythm—Fire-Water strikes with precision, Air-Fire strikes with breadth.',
    stepByStepMediation: [
      'Acknowledge the shared Fire energy: both parties are passionate, both care deeply, and both are willing to fight for what matters.',
      'Ask Fire-Water to articulate their strategic concern: what specific outcome are they trying to protect or achieve?',
      'Ask Air-Fire to articulate their creative vision: what possibility are they trying to open up?',
      'Show both parties that their goals may not be in opposition—strategy and creativity are complementary, not competing.',
      'Ask Fire-Water: "What would it look like to apply your strategic thinking to Air-Fire\'s vision rather than against it?"',
      'Ask Air-Fire: "What would it look like to channel your creative energy through Fire-Water\'s strategic framework rather than around it?"',
      'Co-create a plan that combines Air-Fire\'s vision with Fire-Water\'s execution strategy. Assign roles that play to each type\'s strength.',
      'Set a review point where both can assess whether the combined approach is working. This satisfies Fire-Water\'s need for accountability and Air-Fire\'s need for iteration.'
    ],
    scriptForA: '"Your strategic mind is an asset, and your instinct to protect against risk is valid. But [Air-Fire\'s name] is seeing possibilities that your caution might be filtering out. What if you used your strategic brilliance to make their boldest idea actually work, instead of explaining why it won\'t?"',
    scriptForB: '"Your creative energy is extraordinary, and the possibilities you see are real. But [Fire-Water\'s name] has the strategic depth to turn your best ideas into reality. What if you channeled your provocative energy into collaborating with their process instead of disrupting it?"',
    commonGround: 'Both types are driven by a deep desire to create meaningful impact. Fire-Water wants impact that lasts; Air-Fire wants impact that transforms. The most powerful outcomes combine both—transformative change that endures.',
    warningSign: 'If Fire-Water becomes coldly strategic and starts dismantling Air-Fire\'s ideas with surgical precision, and Air-Fire responds by becoming increasingly provocative and dismissive of process, the shared Fire energy is being turned against each other rather than toward a common goal.',
    resolutionKey: 'These two types are natural partners when aligned and formidable opponents when opposed. The resolution is not to moderate either type\'s intensity but to point both intensities in the same direction.'
  },
  {
    partyA: 'Water + Fire',
    partyAId: 'water-fire',
    partyAElement: 'water',
    partyB: 'Earth + Air',
    partyBId: 'earth-air',
    partyBElement: 'earth',
    frictionSource: 'Water-Fire\'s passionate, emotionally intense style collides with Earth-Air\'s refined, diplomatically measured approach. Water-Fire feels that Earth-Air is emotionally unavailable and hiding behind polish; Earth-Air feels that Water-Fire is emotionally overwhelming and lacks composure. This is a conflict between raw authenticity and cultivated refinement.',
    stepByStepMediation: [
      'Set the stage by validating both communication styles: emotional honesty and diplomatic refinement are both legitimate and valuable.',
      'Ask Water-Fire to express their core concern in three sentences or fewer. This constraint helps channel their intensity without suppressing it.',
      'Ask Earth-Air to respond without diplomatic cushioning—just their honest reaction. This is uncomfortable for them but essential.',
      'If Earth-Air defaults to polished language, gently redirect: "I heard the diplomatic version. What\'s the unfiltered version?"',
      'If Water-Fire escalates emotionally, gently redirect: "I feel your passion. Can you distill it to the single most important point?"',
      'Identify the core issue beneath the style clash. Often these two types actually agree on substance but are alienated by each other\'s delivery.',
      'Negotiate a communication bridge: Water-Fire agrees to lead with their main point before the emotional context; Earth-Air agrees to share their genuine reaction before the refined analysis.',
      'Close with each party naming one quality in the other\'s style they wish they had more of. This builds mutual respect.'
    ],
    scriptForA: '"Your emotional courage is rare and valuable—most people hide from the feelings you\'re willing to name. But [Earth-Air\'s name] receives information best when it\'s presented with some structure. You don\'t have to suppress your passion—just lead with your point, then let the emotion support it."',
    scriptForB: '"Your refinement and composure are genuine strengths. But [Water-Fire\'s name] needs to feel that you\'re emotionally present, not just intellectually engaged. You don\'t have to match their intensity—just let them see that their feelings have landed with you before you offer your analysis."',
    commonGround: 'Both types care deeply about quality in relationships. Water-Fire pursues emotional quality—depth, authenticity, vulnerability. Earth-Air pursues relational quality—respect, consideration, thoughtfulness. The richest relationships have both.',
    warningSign: 'If Water-Fire starts accusing Earth-Air of "not caring" and Earth-Air starts becoming increasingly formal and distant, the conversation has become about styles rather than substance. Redirect to the actual issue.',
    resolutionKey: 'Water-Fire must learn that Earth-Air\'s composure is not coldness—it is their form of respect. Earth-Air must learn that Water-Fire\'s intensity is not drama—it is their form of honesty. Neither needs to become the other; both need to translate.'
  },
  // --- NEW GUIDES: Intra-element conflicts (same element, different subtypes) ---
  {
    partyA: 'Pure Fire',
    partyAId: 'fire-fire',
    partyAElement: 'fire',
    partyB: 'Fire + Earth',
    partyBId: 'fire-earth',
    partyBElement: 'fire',
    frictionSource: 'Two Fire types in conflict—but with fundamentally different rhythms. Pure Fire is explosive and fast, wanting immediate resolution through direct confrontation. Fire-Earth is immovable and slow, wanting resolution through principled stands and evidence. Pure Fire\'s speed frustrates Fire-Earth\'s deliberateness; Fire-Earth\'s immovability infuriates Pure Fire\'s need for immediate action. This is the unstoppable force meeting the immovable object.',
    stepByStepMediation: [
      'Acknowledge the shared Fire nature: both parties are courageous, principled, and willing to stand their ground. This is a strength, not a problem.',
      'Ask Pure Fire to state their position in full, without interruption. Set a timer for 3 minutes. Their need is to be heard completely.',
      'Ask Fire-Earth to state their position in full, without interruption. Set a timer for 3 minutes. Their need is to present their case with evidence.',
      'Identify where the two positions actually overlap—there is almost always more agreement than either realizes.',
      'For the areas of genuine disagreement, ask Pure Fire: "What evidence would change your mind?" This engages them in Fire-Earth\'s language.',
      'Ask Fire-Earth: "What immediate action could we take right now while we gather that evidence?" This engages them in Pure Fire\'s language.',
      'Design a resolution that combines Pure Fire\'s urgency with Fire-Earth\'s thoroughness: act now on what\'s agreed, investigate what\'s disputed.',
      'Both types respect follow-through. Set a clear timeline and hold both accountable.'
    ],
    scriptForA: '"I know you want this resolved now, and that urgency is valid. But [Fire-Earth\'s name] isn\'t being slow to frustrate you—they\'re being thorough because they care about getting it right. If you give them the evidence they need, they\'ll move with you. What can you offer them right now?"',
    scriptForB: '"Your commitment to doing this right is admirable. But [Pure Fire\'s name] isn\'t being reckless—they\'re being decisive because they see a problem that needs fixing now. If you can identify one thing that can be acted on immediately while you build your case, you\'ll have their respect and their patience."',
    commonGround: 'Both types are fundamentally about action and integrity. Pure Fire acts from instinct and courage; Fire-Earth acts from evidence and principle. Both are trying to do the right thing—they just disagree on the timeline.',
    warningSign: 'If Pure Fire starts making ultimatums and Fire-Earth starts citing rules and precedents, the conflict has become a power struggle rather than a problem-solving session. Redirect by asking: "What outcome do you both actually want?"',
    resolutionKey: 'Pure Fire must learn that Fire-Earth\'s deliberateness is not obstruction—it is a different form of courage. Fire-Earth must learn that Pure Fire\'s urgency is not recklessness—it is a different form of principle. Speed and thoroughness are not opposites; they are partners.'
  },
  {
    partyA: 'Pure Water',
    partyAId: 'water-water',
    partyAElement: 'water',
    partyB: 'Water + Earth',
    partyBId: 'water-earth',
    partyBElement: 'water',
    frictionSource: 'Two Water types in conflict create an almost invisible crisis. Pure Water withdraws into deep internal processing; Water-Earth accommodates and serves while quietly building resentment. Neither type confronts directly, which means the conflict exists entirely beneath the surface—felt by both but named by neither. This is the most dangerous type of conflict because it can persist for years without ever being addressed.',
    stepByStepMediation: [
      'The first and most critical step: name the conflict. Say explicitly: "There is a conflict between you two, and we are going to address it today." Both types need external permission to engage.',
      'Create maximum emotional safety: private setting, comfortable environment, no time pressure, tissues available.',
      'Ask Water-Earth to speak first—they have likely been accommodating longer and have more accumulated tension. Ask: "What have you been carrying that you haven\'t said?"',
      'Ask Pure Water to listen without withdrawing internally. Give them a physical anchor: "Hold this pen and squeeze it when you feel the urge to retreat inward."',
      'After Water-Earth finishes, ask Pure Water: "What did you hear, and what is your honest response?" Give them as much time as they need.',
      'Ask Pure Water to share what they\'ve been processing internally. Water-Earth will likely be surprised by the depth of Pure Water\'s unspoken experience.',
      'Identify the pattern: both types have been protecting the other from their truth, and in doing so, have created the very disconnection they were trying to prevent.',
      'Co-create a simple check-in ritual: a weekly 15-minute conversation where both parties share one thing they\'re feeling but haven\'t said. Structure prevents the silence from accumulating.'
    ],
    scriptForA: '"You\'ve been processing this deeply, and your insights are valuable. But [Water-Earth\'s name] can\'t respond to what you haven\'t shared. Your silence, which feels like protection to you, feels like distance to them. Can you let them into your inner world, even a little?"',
    scriptForB: '"You\'ve been carrying so much quietly, and that\'s not fair to you. [Pure Water\'s name] doesn\'t know what you need because you\'ve been so focused on what they need. Today is about you. What do you actually need from this relationship?"',
    commonGround: 'Both types are deeply empathic and genuinely care about each other\'s wellbeing. The tragedy is that their mutual care has become mutual silence. Help them see that speaking their truth IS caring for the relationship.',
    warningSign: 'If both parties start saying "It\'s fine" or "I don\'t want to make a big deal of it," the mediation is failing. Push gently but firmly: "It\'s not fine, and it is a big deal. That\'s why we\'re here."',
    resolutionKey: 'Both types must learn that emotional honesty is not a burden on the other person—it is a gift. Pure Water must surface their processing; Water-Earth must voice their needs. The relationship can hold more truth than either of them believes.'
  },
  {
    partyA: 'Pure Earth',
    partyAId: 'earth-earth',
    partyAElement: 'earth',
    partyB: 'Earth + Water',
    partyBId: 'earth-water',
    partyBElement: 'earth',
    frictionSource: 'Two Earth types in conflict create a slow, grinding tension that manifests as procedural disagreements and quiet power struggles. Pure Earth approaches conflict through systems, documentation, and evidence; Earth-Water approaches through gentle boundaries and relational warmth. Pure Earth sees Earth-Water as too soft and insufficiently rigorous; Earth-Water sees Pure Earth as too rigid and insufficiently human.',
    stepByStepMediation: [
      'Frame the mediation in terms both types respect: "We\'re here to build a better system for working together—one that serves both the process and the people."',
      'Ask Pure Earth to present their concern with their typical evidence and documentation. Honor their process.',
      'Ask Earth-Water to present their concern with their typical warmth and relational context. Honor their approach.',
      'Identify the tension point: Pure Earth prioritizes the system; Earth-Water prioritizes the people within the system. Both are necessary.',
      'Ask Pure Earth: "How could the system be designed to better serve the people who use it?" This stretches them toward Earth-Water\'s perspective.',
      'Ask Earth-Water: "What structural changes would make it easier for people to thrive?" This stretches them toward Pure Earth\'s perspective.',
      'Co-design a solution that has Pure Earth\'s structural rigor AND Earth-Water\'s human consideration. The best systems serve people; the best care is sustainable.',
      'Document the agreement (for Pure Earth) and celebrate the renewed connection (for Earth-Water).'
    ],
    scriptForA: '"Your systems thinking is essential—without structure, nothing sustains. But [Earth-Water\'s name] is showing you the human dimension that your systems need to account for. The most robust system is one that people actually want to use. Can you design for humans, not just for efficiency?"',
    scriptForB: '"Your care for people is what makes any system worth building. But [Pure Earth\'s name] is trying to create the structure that makes your care sustainable and scalable. Without their rigor, your warmth becomes exhausting. Can you engage with the structural dimension?"',
    commonGround: 'Both types are builders. Pure Earth builds systems; Earth-Water builds relationships. The strongest organizations have both—reliable systems operated by people who feel valued.',
    warningSign: 'If Pure Earth starts citing policies and Earth-Water starts making exceptions for individuals, they are retreating into their respective corners. Redirect: "How do we build a policy that has the flexibility to honor individual needs?"',
    resolutionKey: 'Pure Earth must learn that human considerations are not exceptions to the system—they are requirements of the system. Earth-Water must learn that structure is not the enemy of care—it is the vehicle for sustainable care.'
  },
  {
    partyA: 'Pure Air',
    partyAId: 'air-air',
    partyAElement: 'air',
    partyB: 'Air + Earth',
    partyBId: 'air-earth',
    partyBElement: 'air',
    frictionSource: 'Two Air types in conflict create an intellectually sophisticated but emotionally disconnected disagreement. Pure Air retreats into analytical detachment, dissecting the conflict with clinical precision; Air-Earth retreats into diplomatic bridge-building, trying to find compromise before the conflict is fully expressed. Pure Air sees Air-Earth as conflict-avoidant and intellectually dishonest; Air-Earth sees Pure Air as emotionally cold and relationally destructive.',
    stepByStepMediation: [
      'Name the shared pattern: "You are both Air types, which means you are both more comfortable thinking about conflict than feeling it. Today, we need both."',
      'Ask Pure Air to present their analysis of the disagreement. They will do this brilliantly—let them.',
      'Ask Air-Earth to present their vision of the ideal resolution. They will do this beautifully—let them.',
      'Now the hard part. Ask Pure Air: "Setting aside your analysis—how does this conflict make you feel?" Expect discomfort. Wait through it.',
      'Ask Air-Earth: "Setting aside the ideal resolution—what are you genuinely angry or hurt about?" Expect deflection. Redirect gently.',
      'Once both parties have accessed the emotional dimension, the intellectual disagreement often resolves itself—because the real conflict was emotional, not logical.',
      'If a genuine intellectual disagreement remains, use Pure Air\'s analytical framework to evaluate Air-Earth\'s proposed compromises. The best solution will be both logically sound and relationally wise.',
      'Close by acknowledging that both types stretched beyond their comfort zone. This builds mutual respect and models a new way of engaging.'
    ],
    scriptForA: '"Your analysis is razor-sharp, and you\'re probably right about the logical dimension. But [Air-Earth\'s name] is tracking something you might be missing—the relational impact. Can you add that variable to your analysis? Not as a concession, but as additional data that makes your conclusions more complete?"',
    scriptForB: '"Your instinct to find common ground is admirable, and the relationship matters. But [Pure Air\'s name] needs you to engage with the substance of the disagreement before you bridge it. If you compromise too early, the resolution won\'t hold. Can you sit with the discomfort of disagreement a little longer?"',
    commonGround: 'Both types are committed to understanding. Pure Air understands through analysis; Air-Earth understands through empathy. Complete understanding requires both—the logical truth and the relational truth.',
    warningSign: 'If Pure Air becomes increasingly abstract and theoretical while Air-Earth becomes increasingly accommodating and conflict-avoidant, neither party is actually engaging with the conflict. They are performing engagement while avoiding it. Push for specificity and honesty.',
    resolutionKey: 'Pure Air must learn that relational data is real data. Air-Earth must learn that premature harmony is false harmony. The resolution requires both types to stay in the discomfort of genuine disagreement long enough to find genuine resolution.'
  },
  // --- Additional cross-element guides for maximum coverage ---
  {
    partyA: 'Air + Fire',
    partyAId: 'air-fire',
    partyAElement: 'air',
    partyB: 'Earth + Earth',
    partyBId: 'earth-earth',
    partyBElement: 'earth',
    frictionSource: 'Air-Fire\'s provocative innovation clashes directly with Pure Earth\'s systematic conservatism. Air-Fire sees every established process as a challenge to be disrupted; Pure Earth sees every disruption as a threat to be documented and resisted. This is the classic innovator-vs-institution conflict, and it is one of the most common and most frustrating pairings in professional settings.',
    stepByStepMediation: [
      'Acknowledge both perspectives as valid: innovation needs structure, and structure needs innovation. Neither is complete without the other.',
      'Ask Air-Fire to present their single most important idea with a basic implementation sketch—even rough is fine. Constrain them to one idea, not five.',
      'Ask Pure Earth to identify the three biggest risks in that idea, with specific evidence for each concern. Constrain them to risks, not rejections.',
      'Challenge Air-Fire to address each risk creatively rather than dismissing them. "How would you solve this specific problem?"',
      'Challenge Pure Earth to identify one element of the idea they genuinely find promising. "What part of this could actually work?"',
      'Co-create a small pilot or experiment that satisfies Air-Fire\'s need for action and Pure Earth\'s need for data.',
      'Set clear metrics for evaluating the pilot—this gives Pure Earth the data they need and Air-Fire the freedom to experiment.',
      'Schedule a review meeting with documented results. Both types will respect evidence of what actually happened.'
    ],
    scriptForA: '"Your ideas have real potential, and I don\'t want to lose that energy. But [Pure Earth\'s name] isn\'t trying to kill your ideas—they\'re trying to make them survive contact with reality. If you can work with their process, your ideas will be stronger, not weaker. Can you channel your creativity into addressing their concerns?"',
    scriptForB: '"I know change feels risky, and your instinct to protect what works is valuable. But [Air-Fire\'s name] is seeing possibilities that could genuinely improve things. Your role isn\'t to block ideas—it\'s to stress-test them. Can you engage with the potential here, not just the risk?"',
    commonGround: 'Both types want excellence—Air-Fire through innovation, Pure Earth through reliability. Help them see that the best outcomes combine both: innovative ideas implemented with rigorous quality.',
    warningSign: 'If Air-Fire starts making dramatic statements ("Fine, we\'ll just keep doing things the way we\'ve always done them!") and Pure Earth becomes rigidly procedural ("That\'s not how we do things here"), the conversation has become positional rather than productive.',
    resolutionKey: 'Create a structured innovation process: a framework that gives Air-Fire permission to experiment within boundaries that give Pure Earth confidence. The pilot approach is almost always the answer.'
  },
  {
    partyA: 'Air + Earth',
    partyAId: 'air-earth',
    partyAElement: 'air',
    partyB: 'Water + Fire',
    partyBId: 'water-fire',
    partyBElement: 'water',
    frictionSource: 'Air-Earth\'s diplomatic, bridge-building instinct meets Water-Fire\'s passionate, emotionally charged confrontation style. Air-Earth tries to mediate and find compromise; Water-Fire demands that the full emotional truth be expressed before any compromise is possible. Air-Earth feels overwhelmed by Water-Fire\'s intensity; Water-Fire feels patronized by Air-Earth\'s diplomacy.',
    stepByStepMediation: [
      'Set expectations: "This conversation will include both emotional honesty and structured problem-solving. Both are required."',
      'Give Water-Fire the floor first to express their emotional truth. Air-Earth\'s instinct will be to mediate—ask them to simply listen.',
      'After Water-Fire finishes, ask Air-Earth: "Before you offer solutions, can you reflect back what you heard emotionally?" This forces emotional engagement.',
      'Then give Air-Earth space to share their perspective, including their genuine feelings—not just their diplomatic assessment.',
      'Ask Water-Fire to listen without escalating. Their instinct will be to match intensity—ask them to receive Air-Earth\'s quieter honesty as equally valid.',
      'Once both emotional truths are on the table, Air-Earth\'s natural mediation skills become genuinely useful. Now they can build bridges based on real understanding.',
      'Co-create a resolution that honors Water-Fire\'s need for emotional acknowledgment AND Air-Earth\'s need for relational harmony.',
      'Agree that in future conflicts, emotional expression comes first, problem-solving comes second. This sequence respects both types.'
    ],
    scriptForA: '"Your ability to see all sides is a gift. But right now, [Water-Fire\'s name] doesn\'t need you to see all sides—they need you to see their side. Fully. Before you build a bridge, stand on their shore for a moment. What do you see from there?"',
    scriptForB: '"Your emotional honesty is powerful and necessary. But [Air-Earth\'s name] is not dismissing your feelings when they seek compromise—they\'re trying to honor everyone\'s feelings, including yours. Can you trust that their diplomacy comes from care, not avoidance?"',
    commonGround: 'Both types are fundamentally oriented toward connection. Water-Fire connects through emotional depth; Air-Earth connects through inclusive understanding. Both are trying to bring people closer—just through different doors.',
    warningSign: 'If Water-Fire accuses Air-Earth of "not really caring" and Air-Earth starts over-functioning as a mediator rather than a participant, the dynamic has become therapist-and-client rather than two equals in conflict. Both need to be participants.',
    resolutionKey: 'Air-Earth must learn to be a participant in conflict before being a mediator. Water-Fire must learn that diplomatic care is genuine care, even when it doesn\'t match their emotional intensity. The resolution requires both to meet in the middle—more feeling from Air-Earth, more structure from Water-Fire.'
  }
];

