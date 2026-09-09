export interface TeamSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  teamRole: string;
  teamRoleDescription: string;
  collaborationWithFire: string;
  collaborationWithWater: string;
  collaborationWithEarth: string;
  collaborationWithAir: string;
  strengthInTeams: string;
  challengeInTeams: string;
}

export interface TeamElement {
  element: string;
  elementId: string;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: TeamSubtype[];
}

export interface FrictionPair {
  pair: [string, string];
  pairNames: [string, string];
  frictionPoint: string;
  resolution: string;
}

export const teamDynamicsData: TeamElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'The Ignition Engine',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        teamRole: 'The Catalyst',
        teamRoleDescription: 'You are the team\'s ignition switch. When energy is low, momentum has stalled, or the group is trapped in analysis paralysis, you are the one who says "Let\'s go" and means it. Your role is not to do everything—it is to start everything. You generate the initial burst of energy that gets projects off the ground, meetings moving, and decisions made. Without you, the team deliberates endlessly. With you, they act.',
        collaborationWithFire: 'Two Fire-dominant types together create explosive momentum but risk burning through resources without reflection. You need a shared agreement: one of you drives, the other monitors fuel. Take turns being the accelerator and the dashboard.',
        collaborationWithWater: 'Water tempers your intensity without extinguishing it. They see the emotional and relational implications you miss. Let them be your conscience—not your brake, but your depth gauge. When they say "slow down," they mean "go deeper," not "stop."',
        collaborationWithEarth: 'Earth gives your fire something to build on. They transform your impulse into infrastructure. Respect their pace—it is not slowness, it is thoroughness. Your job is to light the spark; their job is to build the furnace that sustains it.',
        collaborationWithAir: 'Air feeds your fire with ideas and perspective. They expand your vision beyond the immediate. But beware: too much Air can scatter your flame. Agree on a single direction before you both start generating options.',
        strengthInTeams: 'You bring urgency, decisiveness, and the courage to act when others hesitate. You are the reason projects launch on time.',
        challengeInTeams: 'You can dominate conversations, rush past important details, and make others feel their contributions are too slow. Practice the discipline of listening for 60 seconds before responding.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        teamRole: 'The Strategic Depth-Finder',
        teamRoleDescription: 'You are the team member who sees beneath the surface of every discussion. While others debate tactics, you are reading the room—sensing who is aligned, who is resistant, and what the real conversation is beneath the official one. Your role is to bring depth to speed, to ensure the team is not just moving fast but moving wisely. You are the one who says "Wait—there is something we are not seeing" and is almost always right.',
        collaborationWithFire: 'Pure Fire types respect your intensity but may be impatient with your reflective pauses. Frame your insights as strategic advantages: "If we address this now, we avoid a crisis later." Speak in terms of outcomes, not feelings.',
        collaborationWithWater: 'You share Water\'s emotional intelligence but add Fire\'s decisiveness. Together, you create a powerful combination of empathy and action. Be careful not to form an exclusive emotional alliance that excludes more analytical team members.',
        collaborationWithEarth: 'Earth appreciates your strategic thinking and grounds your intuitions in practical reality. They are your best implementation partner. Share your vision; let them build the roadmap.',
        collaborationWithAir: 'Air challenges your intuitions with data and logic. This can feel dismissive but is actually invaluable. Let them pressure-test your perceptions—the ones that survive are the ones worth acting on.',
        strengthInTeams: 'You bring emotional intelligence combined with strategic vision. You prevent the team from making technically correct but emotionally tone-deaf decisions.',
        challengeInTeams: 'You can withdraw into observation mode, withholding insights until you feel certain. The team needs your 70% confidence observations, not just your 95% conclusions.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        teamRole: 'The Reliable Engine',
        teamRoleDescription: 'You are the team\'s workhorse with a heart. You combine Fire\'s drive with Earth\'s endurance, making you the person who not only starts projects but finishes them. Your role is to be the steady, dependable force that keeps the team moving through the messy middle—the phase where enthusiasm has faded but the finish line is not yet visible. You are the one who shows up every day and does the work.',
        collaborationWithFire: 'Pure Fire types admire your stamina but may try to redirect your energy toward their latest priority. Hold your ground. Your commitment to finishing what you started is more valuable than their excitement about what comes next.',
        collaborationWithWater: 'Water softens your edges and helps you attend to the relational aspects of teamwork you might otherwise overlook. Let them handle the emotional temperature; you handle the operational temperature.',
        collaborationWithEarth: 'Two Earth-influenced types together create an unstoppable execution machine. The risk is that you both focus so heavily on doing that you forget to question whether you are doing the right thing. Schedule regular "why" check-ins.',
        collaborationWithAir: 'Air brings the perspective you sometimes lack—the ability to step back and see the whole board. They can feel impractical to you, but their big-picture thinking prevents you from building the wrong thing beautifully.',
        strengthInTeams: 'You bring reliability, endurance, and the rare combination of passion and patience. You are the reason projects actually get completed.',
        challengeInTeams: 'You can become so focused on execution that you resist changes in direction, even when the data supports a pivot. Practice asking: "Is my resistance based on evidence or on attachment?"'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        teamRole: 'The Energizer',
        teamRoleDescription: 'You are the team\'s creative spark and morale booster. Your role is to generate ideas, lift spirits, and keep the team\'s creative energy flowing. You are the person who turns a boring brainstorm into an exciting exploration, who finds the fun in difficult work, and who reminds the team why they chose this profession in the first place. You make work feel like play—and play, done well, produces the best work.',
        collaborationWithFire: 'Together you create a high-energy partnership that can be incredibly productive or incredibly chaotic. Agree on one shared priority before you start riffing. Your combined energy needs a channel, not just a stage.',
        collaborationWithWater: 'Water grounds your enthusiasm with emotional reality. They remind you that not everyone processes at your speed. Let them be your pacing partner—they ensure the team can absorb your ideas before you generate the next batch.',
        collaborationWithEarth: 'Earth is your essential counterweight. They take your best ideas and make them real. Resist the urge to keep generating when they need time to build. Your patience with their process is the price of your ideas becoming reality.',
        collaborationWithAir: 'Two Air-influenced types together can generate a dazzling array of ideas but struggle to land on one. Appoint one of you as the "selector" for each session—the person who chooses which idea to pursue. Alternate the role.',
        strengthInTeams: 'You bring creative energy, optimism, and the ability to reframe challenges as opportunities. You are the reason the team stays inspired.',
        challengeInTeams: 'You can generate so many ideas that the team feels overwhelmed. Practice the discipline of presenting your top three ideas, not your top thirty. Curation is a creative act.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'The Connective Tissue',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        teamRole: 'The Emotional Translator',
        teamRoleDescription: 'You are the team\'s interpreter of human dynamics. When two team members are talking past each other, you hear what each one actually means. When a client\'s feedback feels contradictory, you sense the underlying need. Your role is to translate between different communication styles, emotional frequencies, and unspoken expectations. You are the reason the team understands each other, not just hears each other.',
        collaborationWithFire: 'Fire\'s directness can feel abrasive to you, but their clarity is a gift. They say what others are thinking. Your role is to receive their directness without taking it personally and to help the rest of the team do the same.',
        collaborationWithWater: 'Two Water types together create a deeply empathic partnership but risk becoming an echo chamber of feelings. Ensure you balance emotional processing with action. Set a timer: 20 minutes to feel, then 10 minutes to decide.',
        collaborationWithEarth: 'Earth\'s practicality grounds your emotional intelligence in tangible outcomes. They help you turn your relational insights into operational improvements. Share your observations; let them design the solutions.',
        collaborationWithAir: 'Air shares your perceptiveness but processes it intellectually rather than emotionally. Together, you create a comprehensive understanding of any situation—they see the patterns, you feel the currents. Compare notes regularly.',
        strengthInTeams: 'You bring empathy, communication skills, and the ability to resolve conflicts before they escalate. You are the reason the team stays cohesive.',
        challengeInTeams: 'You can absorb the team\'s emotional stress, leading to burnout. Practice energetic boundaries: you can understand someone\'s feelings without carrying them. Debrief with yourself after intense meetings.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        teamRole: 'The Depth Sounder',
        teamRoleDescription: 'You are the team\'s access point to deeper truth. While others engage with the surface of problems—timelines, budgets, deliverables—you sense the undercurrents that will determine whether the project truly succeeds or merely completes. Your role is to ask the questions no one else is asking: "Does the client actually want what they asked for?" "Is the team genuinely committed or just compliant?" "What are we not talking about that we should be?"',
        collaborationWithFire: 'Fire\'s speed can overwhelm your need for depth. Negotiate a rhythm: they drive the pace, you set the depth checkpoints. At agreed intervals, the team pauses for your assessment of what is happening beneath the surface.',
        collaborationWithWater: 'Two deep Water types can create profound understanding but may struggle to surface their insights in accessible language. Practice translating your perceptions into concrete observations that action-oriented team members can use.',
        collaborationWithEarth: 'Earth respects your depth but needs it delivered in practical terms. Instead of saying "Something feels off," try "I\'ve noticed three behaviors that suggest the team is not fully aligned." Give them data they can act on.',
        collaborationWithAir: 'Air can help you articulate what you sense but cannot yet name. They provide the frameworks and language for your intuitions. Seek them out when you have a strong feeling but cannot explain it—they will help you find the words.',
        strengthInTeams: 'You bring profound insight into human dynamics and organizational undercurrents. You are the reason the team addresses root causes, not just symptoms.',
        challengeInTeams: 'You can become so immersed in the emotional depths that you lose sight of practical timelines. Set personal deadlines for surfacing your insights—the team needs your perceptions while they are still actionable.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        teamRole: 'The Culture Keeper',
        teamRoleDescription: 'You are the team\'s memory and conscience. You remember the original vision when everyone else has gotten lost in the details. You recall the values the team agreed to when they were at their best, and you gently remind them when they are drifting. Your role is to be the keeper of "who we are"—the person who ensures that how the team works is as important as what the team produces.',
        collaborationWithFire: 'Fire\'s forward momentum can feel like it tramples the team\'s history and values. Your role is not to slow them down but to ensure the team\'s identity travels with them. Say: "I love the direction—let me make sure our values are reflected in the approach."',
        collaborationWithWater: 'Together you create a powerful emotional foundation for the team. Be careful not to become the "feelings police"—your role is to protect culture, not to control emotional expression.',
        collaborationWithEarth: 'Earth shares your appreciation for tradition and consistency. Together, you create stability. The risk is rigidity—ensure you are preserving the spirit of the culture, not just its rituals.',
        collaborationWithAir: 'Air challenges your attachment to tradition with fresh perspectives. This tension is productive—they prevent your culture-keeping from becoming culture-freezing. Welcome their disruption as evolution, not threat.',
        strengthInTeams: 'You bring continuity, values alignment, and emotional warmth. You are the reason the team feels like a team, not just a group of individuals.',
        challengeInTeams: 'You can resist necessary cultural evolution by clinging to "how things used to be." Practice asking: "Am I protecting a value or a habit?" Values endure; habits should evolve.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        teamRole: 'The Quiet Backbone',
        teamRoleDescription: 'You are the team member who holds everything together without anyone noticing. You are the one who remembers to book the meeting room, who follows up on action items, who notices when a colleague is struggling and quietly offers help. Your role is infrastructural—you are the plumbing of the team, invisible when working perfectly and catastrophically missed when absent. You do not seek credit; you seek function.',
        collaborationWithFire: 'Fire types may overlook your contributions because they are not flashy. Advocate for yourself by making your work visible: send weekly summaries, flag the tasks you completed that others forgot. Your competence deserves recognition.',
        collaborationWithWater: 'Together you create a deeply supportive partnership. The risk is that you both over-give and under-receive. Check in with each other: "Are you getting what you need, or just giving what others need?"',
        collaborationWithEarth: 'Two grounded types together create an incredibly reliable unit. Ensure you also make space for creativity and risk—your combined stability can become stagnation if you do not intentionally introduce novelty.',
        collaborationWithAir: 'Air\'s big-picture thinking can feel disconnected from your operational reality. Bridge the gap by asking: "That\'s an interesting idea—what would it look like in practice?" This grounds their vision without dismissing it.',
        strengthInTeams: 'You bring reliability, care, and operational excellence. You are the reason the team\'s logistics actually work.',
        challengeInTeams: 'You can become invisible, doing essential work that no one acknowledges. Practice making your contributions visible—not for ego, but because the team needs to understand the true cost of the work you do.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'The Foundation Layer',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        teamRole: 'The Anchor',
        teamRoleDescription: 'You are the team\'s center of gravity. When chaos erupts—a client crisis, a leadership change, a market shift—you are the person who remains calm, steady, and decisive. Your role is to absorb the team\'s anxiety and convert it into structured action. You do not panic, and because you do not panic, others find it easier not to panic. You are the rock the team clings to in the storm.',
        collaborationWithFire: 'Pure Fire types respect your strength but may test your boundaries. Hold firm without becoming rigid. Say: "I hear your urgency. Here is what we can do right now, and here is what needs to wait." Your calm authority is your greatest asset.',
        collaborationWithWater: 'Water softens your commanding presence and helps you attend to the emotional needs of the team. Let them be your emotional intelligence partner—they sense what you might miss in your focus on action.',
        collaborationWithEarth: 'Two Earth types together create an immovable foundation. The risk is that you both resist change even when it is necessary. Appoint one of you as the "change advocate" who actively looks for what needs to evolve.',
        collaborationWithAir: 'Air brings the strategic perspective you need. While you focus on the immediate crisis, they see the longer-term implications. Listen to their analysis—it will make your decisions more durable.',
        strengthInTeams: 'You bring stability, decisiveness under pressure, and protective strength. You are the reason the team survives crises intact.',
        challengeInTeams: 'You can become so focused on stability that you suppress necessary disruption. Practice asking: "Is this change a threat to the team, or a threat to my comfort zone?"'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        teamRole: 'The Implementer',
        teamRoleDescription: 'You are the team\'s translation layer between strategy and reality. When the visionaries have finished their grand plans, you are the one who asks: "How do we actually build this?" Your role is to take abstract ideas and convert them into concrete steps, timelines, and resource plans. You are not the dreamer—you are the builder. And without builders, dreams remain dreams.',
        collaborationWithFire: 'Fire generates the energy and direction; you provide the structure and execution. This is a powerful partnership when both roles are respected. Resist the urge to dismiss their enthusiasm as impractical—channel it instead.',
        collaborationWithWater: 'Water helps you consider the human factors in your implementation plans. They remind you that processes serve people, not the other way around. Include their perspective in your planning—it prevents the kind of technically perfect plans that fail because they ignore human nature.',
        collaborationWithEarth: 'Two pure implementers can build anything but may struggle to innovate. Intentionally seek input from creative team members before finalizing your approach. The best implementation plan is one that leaves room for discovery.',
        collaborationWithAir: 'Air provides the "why" behind your "how." They help you prioritize which things to build first by connecting execution to strategy. Their abstraction frustrates you, but it is the compass that ensures you are building in the right direction.',
        strengthInTeams: 'You bring execution excellence, practical problem-solving, and the ability to make ideas real. You are the reason strategies become results.',
        challengeInTeams: 'You can dismiss ideas that seem impractical before fully exploring them. Practice saying "How might we make this work?" before saying "That won\'t work." The first question opens possibilities; the second closes them.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        teamRole: 'The Environment Designer',
        teamRoleDescription: 'You are the team\'s advocate for the physical and sensory conditions that enable great work. You notice what others ignore: the lighting is too harsh, the chairs are uncomfortable, the meeting room is too cold, the office kitchen is depressing. Your role is to ensure that the team\'s workspace supports their output rather than depleting it. You understand that human beings are not brains on sticks—they are embodied creatures whose environment directly affects their cognition.',
        collaborationWithFire: 'Fire\'s urgency can override your environmental concerns. Frame your advocacy in terms they understand: "If we fix the lighting in the war room, the team can sustain longer sprints without fatigue." Connect comfort to performance.',
        collaborationWithWater: 'Water shares your sensitivity and appreciates your attention to the physical environment. Together, you create spaces that are both emotionally and physically nurturing. Be careful not to over-optimize—sometimes "good enough" is good enough.',
        collaborationWithEarth: 'Two Earth types focused on the physical world can create beautiful, functional spaces. Ensure you also attend to the intangible aspects of team culture—environment is more than furniture.',
        collaborationWithAir: 'Air may dismiss your environmental focus as trivial. Educate them with data: studies on productivity and workspace design, the impact of natural light on cognitive function. When you speak their language, they become your strongest allies.',
        strengthInTeams: 'You bring environmental intelligence, attention to human comfort, and the understanding that great work requires great conditions. You are the reason the team\'s workspace actually works.',
        challengeInTeams: 'You can be perceived as focused on "soft" issues when the team is under pressure. Learn to triage: in a crisis, focus on the essentials (hydration, breaks, clear communication). Save the ergonomic chair campaign for calmer times.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        teamRole: 'The Quality Guardian',
        teamRoleDescription: 'You are the team\'s standard-bearer. Your role is to ensure that everything the team produces meets a level of quality that reflects well on everyone involved. You are not a perfectionist—you are a curator. You know the difference between "done" and "done well," and you quietly refuse to let the team settle for the former when the latter is achievable. Your presence elevates the team\'s output because mediocrity is simply not in your vocabulary.',
        collaborationWithFire: 'Fire\'s speed can conflict with your quality standards. Negotiate upfront: "I need 24 hours for a quality review before anything goes to the client." This gives them their speed and you your standards.',
        collaborationWithWater: 'Water appreciates your attention to quality and adds emotional resonance to your aesthetic excellence. Together, you create work that is both beautiful and meaningful.',
        collaborationWithEarth: 'Two quality-focused Earth types can produce exceptional work but may struggle with deadlines. Agree on a "good enough" threshold for each project tier—not everything requires your highest standard.',
        collaborationWithAir: 'Air shares your appreciation for excellence but applies it to ideas rather than execution. Together, you create work that is both intellectually rigorous and beautifully presented. This is a powerful combination.',
        strengthInTeams: 'You bring aesthetic excellence, attention to detail, and the ability to elevate everyone\'s work. You are the reason the team\'s output looks and feels professional.',
        challengeInTeams: 'You can slow the team down with excessive refinement. Practice distinguishing between quality that adds value and polish that adds time. Ask: "Will the client notice this improvement?" If not, ship it.'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'The Perspective Layer',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        teamRole: 'The Diagnostic Instrument',
        teamRoleDescription: 'You are the team\'s objective analyst. When emotions are running high, politics are clouding judgment, and everyone has an opinion, you are the one who says: "Let\'s look at what the data actually tells us." Your role is to cut through noise—emotional, political, and cognitive—and reveal the underlying reality. You are not cold; you are clear. And clarity, in a world of noise, is one of the most valuable things a team member can provide.',
        collaborationWithFire: 'Fire\'s passion can feel irrational to you, but their energy is the fuel that drives execution. Provide them with clear analysis and let them translate it into action. Your data plus their drive is an unstoppable combination.',
        collaborationWithWater: 'Water\'s emotional intelligence complements your analytical rigor. They see the human factors you might miss. Invite their perspective explicitly: "I have the data analysis—what are the people implications?" This creates comprehensive decision-making.',
        collaborationWithEarth: 'Earth translates your analysis into practical plans. They are your implementation partner. Share your conclusions clearly and let them design the execution. Your "what" plus their "how" is powerful.',
        collaborationWithAir: 'Two analytical types can create rigorous analysis but may struggle to move to action. Set analysis deadlines: "We have until Friday to gather data. Monday, we decide." This prevents analysis paralysis.',
        strengthInTeams: 'You bring objectivity, analytical rigor, and the courage to follow evidence regardless of politics. You are the reason the team makes data-driven decisions.',
        challengeInTeams: 'You can dismiss emotional input as irrational, missing valuable information that does not fit neatly into a spreadsheet. Practice treating others\' feelings as data points—they are signals, even if they are not quantifiable.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        teamRole: 'The Cross-Pollinator',
        teamRoleDescription: 'You are the team\'s innovation engine. Your mind naturally connects ideas from different domains, industries, and disciplines, producing solutions that no one else would have considered. Your role is to bring the unexpected—the insight from a completely different field that solves the problem everyone has been staring at. You are the reason the team avoids groupthink and discovers novel approaches.',
        collaborationWithFire: 'Together you create a high-energy creative partnership. The risk is that you generate ideas faster than anyone can evaluate them. Appoint a "filter"—a team member who selects the top three ideas from each brainstorm for further development.',
        collaborationWithWater: 'Water helps you understand the emotional impact of your ideas. Before proposing a radical change, ask a Water type: "How will the team feel about this?" Their answer will help you frame your innovation in a way that gets adopted, not just admired.',
        collaborationWithEarth: 'Earth is your essential grounding partner. They take your wildest ideas and find the kernel of practicality. Respect their "that won\'t work" feedback—it is not rejection, it is refinement. The ideas that survive their scrutiny are the ones worth building.',
        collaborationWithAir: 'Two innovative Air types can generate extraordinary ideas but may struggle to converge. Use structured brainstorming: diverge for 20 minutes (generate freely), then converge for 20 minutes (select and refine). This harnesses your creativity without losing focus.',
        strengthInTeams: 'You bring creative range, unexpected connections, and the ability to see solutions where others see walls. You are the reason the team innovates.',
        challengeInTeams: 'You can overwhelm the team with too many ideas and too little follow-through. Practice the discipline of "one idea, fully developed" before introducing the next. Depth is as valuable as breadth.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        teamRole: 'The Consensus Builder',
        teamRoleDescription: 'You are the team\'s social architect. Your role is to find the language, the framing, and the approach that allows diverse stakeholders to align around a shared direction. You do not manipulate—you translate. You understand that most disagreements are not about substance but about perspective, and you have the rare gift of helping people see their own interests reflected in a collective plan. You are the reason the team achieves alignment, not just agreement.',
        collaborationWithFire: 'Fire\'s directness can feel blunt to you, but their clarity about what they want makes your consensus-building easier. Ask them: "What is your non-negotiable?" Then build the consensus around it.',
        collaborationWithWater: 'Water shares your relational intelligence and adds emotional depth to your diplomatic skill. Together, you create an environment where people feel both heard and guided. Be careful not to over-process—sometimes the team needs a decision, not a discussion.',
        collaborationWithEarth: 'Earth provides the practical framework for your consensus. Once you\'ve achieved alignment, they build the implementation plan. Your diplomacy plus their execution creates durable outcomes.',
        collaborationWithAir: 'Two socially intelligent Air types can create powerful alignment but may avoid necessary confrontation. Ensure that your consensus is genuine, not just polite. Ask: "Is everyone truly committed, or just being agreeable?"',
        strengthInTeams: 'You bring social intelligence, diplomatic skill, and the ability to unite diverse perspectives. You are the reason the team moves forward together.',
        challengeInTeams: 'You can prioritize harmony over honesty, creating a false consensus that collapses under pressure. Practice "compassionate truth-telling"—say what needs to be said, but say it with care.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        teamRole: 'The Early Warning System',
        teamRoleDescription: 'You are the team\'s canary in the coal mine. You sense shifts in morale, client sentiment, market conditions, and organizational politics before they become visible to others. Your role is to provide early warnings—to say "I sense something changing" before the change becomes a crisis. You are not paranoid; you are perceptive. And your perceptions, when trusted and acted upon, save the team from preventable disasters.',
        collaborationWithFire: 'Fire may dismiss your subtle perceptions as vague. Learn to present your intuitions with supporting evidence: "I\'ve noticed three things that suggest the client is pulling back." Specificity earns their respect.',
        collaborationWithWater: 'Together you create an extraordinarily perceptive partnership. The risk is that you both sense problems without acting on them. Assign one of you to be the "voice"—the person who surfaces the perception to the broader team.',
        collaborationWithEarth: 'Earth provides the practical response to your early warnings. When you sense a shift, bring it to an Earth type: "I think something is changing. Can you help me figure out what to do about it?" They convert your perception into action.',
        collaborationWithAir: 'Two perceptive Air types can create a comprehensive sensing network. Ensure you also develop the confidence to act on your perceptions. Sensing a problem is valuable; preventing a problem is invaluable.',
        strengthInTeams: 'You bring intuitive perception, subtle awareness, and the ability to detect problems before they materialize. You are the reason the team avoids preventable crises.',
        challengeInTeams: 'You can become anxious, sensing problems everywhere and struggling to distinguish between genuine signals and background noise. Develop a validation practice: check your perceptions with a trusted colleague before raising them with the team.'
      }
    ]
  }
];

export const frictionPairs: FrictionPair[] = [
  {
    pair: ['fire-fire', 'water-water'],
    pairNames: ['The Electric Arc', 'The Forest Lake'],
    frictionPoint: 'The Electric Arc\'s need for immediate action collides with The Forest Lake\'s need for deep reflection. Fire-Fire sees Water-Water as paralyzed by overthinking; Water-Water sees Fire-Fire as recklessly impulsive. Neither is wrong—they are operating on fundamentally different timescales.',
    resolution: 'Establish a "decision protocol": quick decisions (reversible, low-stakes) follow Fire\'s timeline. Deep decisions (irreversible, high-stakes) follow Water\'s timeline. Agree on the categorization upfront, and the friction dissolves.'
  },
  {
    pair: ['fire-air', 'earth-earth'],
    pairNames: ['The Illuminating Spark', 'The Forest Floor'],
    frictionPoint: 'The Illuminating Spark generates ideas at a rate that overwhelms The Forest Floor\'s capacity to evaluate and implement them. Earth-Earth feels like they are constantly being asked to build on shifting sand; Fire-Air feels like Earth-Earth is a creativity killer.',
    resolution: 'Create an "idea funnel": Fire-Air generates freely into a shared document. Earth-Earth reviews weekly and selects the top two ideas for feasibility analysis. This gives Fire-Air creative freedom and Earth-Earth implementation clarity.'
  },
  {
    pair: ['air-air', 'water-fire'],
    pairNames: ['The Clear Morning Sky', 'The Sun-Dappled Pond'],
    frictionPoint: 'The Clear Morning Sky\'s data-driven objectivity can feel cold and dismissive to The Sun-Dappled Pond\'s values-driven approach. Air-Air sees Water-Fire as sentimental; Water-Fire sees Air-Air as soulless. Both are essential—one provides direction, the other provides meaning.',
    resolution: 'Frame decisions with both lenses: "What does the data say?" (Air-Air\'s question) AND "What do our values say?" (Water-Fire\'s question). When both questions are answered, the decision is both smart and right.'
  },
  {
    pair: ['earth-fire', 'air-water'],
    pairNames: ['The Mountain Stone', 'The First Whisper'],
    frictionPoint: 'The Mountain Stone\'s commanding presence can silence The First Whisper\'s subtle perceptions. Earth-Fire\'s certainty can make Air-Water doubt their own intuitions. Air-Water may stop sharing early warnings because they feel their input is not valued by the dominant personality.',
    resolution: 'Create a structured "sensing round" at the start of each meeting where Air-Water shares observations without interruption. Earth-Fire practices active listening—not to evaluate, but to receive. The team benefits from both strength and sensitivity.'
  },
  {
    pair: ['fire-earth', 'water-air'],
    pairNames: ['The Forged Iron', 'The Misty Shore'],
    frictionPoint: 'The Forged Iron\'s task-focused reliability can feel emotionally tone-deaf to The Misty Shore\'s relational sensitivity. Fire-Earth focuses on what needs to be done; Water-Air focuses on how people feel about what is being done. Neither perspective is complete without the other.',
    resolution: 'Pair them intentionally on projects: Fire-Earth owns the execution plan, Water-Air owns the communication plan. Every deliverable has both a "what" (Fire-Earth) and a "how we talk about it" (Water-Air). This ensures the work is both excellent and well-received.'
  },
  {
    pair: ['earth-air', 'fire-water'],
    pairNames: ['The Golden Harvest', 'The Blue Flame'],
    frictionPoint: 'The Golden Harvest\'s pursuit of aesthetic perfection can frustrate The Blue Flame\'s strategic urgency. Earth-Air wants everything polished before it ships; Fire-Water wants it shipped before the strategic window closes. Both are right—the question is timing.',
    resolution: 'Define "quality tiers" together: Tier 1 (client-facing, high-stakes) gets Earth-Air\'s full treatment. Tier 2 (internal, time-sensitive) gets Fire-Water\'s strategic speed. Agree on the tier before starting, and both can operate in their zone of genius.'
  },
  {
    pair: ['water-earth', 'air-fire'],
    pairNames: ['The Languid River', 'The Playful Breeze'],
    frictionPoint: 'The Languid River\'s quiet, service-oriented approach can feel invisible to The Playful Breeze\'s high-energy innovation style. Air-Fire may not notice the operational infrastructure Water-Earth provides, and Water-Earth may feel overwhelmed by Air-Fire\'s constant stream of new ideas that create more operational work.',
    resolution: 'Make the invisible visible: Water-Earth creates a "support log" that shows the operational work behind each initiative. Air-Fire reviews it before proposing new ideas, asking: "Do we have the operational capacity for this?" This creates mutual respect and realistic planning.'
  },
  {
    pair: ['earth-water', 'fire-fire'],
    pairNames: ['The Velvet Moss', 'The Electric Arc'],
    frictionPoint: 'The Velvet Moss\'s focus on environmental comfort and human-centered design can seem trivial to The Electric Arc\'s action-oriented intensity. Fire-Fire wants to move fast; Earth-Water wants to move sustainably. Fire-Fire sees ergonomic concerns as distractions; Earth-Water sees burnout as the inevitable result of ignoring them.',
    resolution: 'Frame environmental improvements as performance investments: "Better lighting reduces error rates by 15%." When Earth-Water speaks Fire-Fire\'s language (results, speed, performance), their advocacy becomes strategic rather than aesthetic.'
  }
];

export const teamBuildingStrategies = [
  {
    title: 'The Balanced Quartet',
    description: 'The ideal team contains at least one representative from each element. Fire provides drive, Water provides empathy, Earth provides execution, and Air provides perspective. When all four are present, the team has access to the full spectrum of human intelligence.',
    advice: 'If your team is missing an element, you do not need to hire for it—you need to develop it. Identify the team member whose secondary element fills the gap and give them explicit permission to express it.'
  },
  {
    title: 'The Complementary Pair',
    description: 'The most productive partnerships are often between complementary elements: Fire + Water (drive + depth) and Earth + Air (execution + vision). These pairings create natural tension that, when managed well, produces outcomes neither element could achieve alone.',
    advice: 'Pair complementary types on critical projects. Give them explicit language for their differences: "You are the accelerator; they are the depth gauge. Both are essential." This reframes friction as function.'
  },
  {
    title: 'The Creative Collision',
    description: 'Innovation requires controlled friction. Teams that are too harmonious produce predictable work. Intentionally include at least one "disruptive" voice—typically a Fire or Air type—who challenges assumptions and introduces unexpected perspectives.',
    advice: 'Designate a "challenger" role that rotates each sprint. This person\'s job is to question every assumption, propose alternatives, and stress-test the plan. When the role is formalized, the friction becomes productive rather than personal.'
  },
  {
    title: 'The Stability Core',
    description: 'Every team needs a stability core—typically Earth types—who ensure that creative energy is channeled into durable outcomes. Without this core, the team generates brilliant ideas that never become real products, services, or results.',
    advice: 'Protect your Earth types from being overwhelmed by the creative output of Fire and Air types. Give them the authority to say "not yet" and the respect to be heard when they say it.'
  },
  {
    title: 'The Emotional Infrastructure',
    description: 'Teams that ignore emotional dynamics eventually fail, regardless of their technical competence. Water types provide the emotional infrastructure—the trust, empathy, and relational safety—that allows the team to take risks, make mistakes, and learn together.',
    advice: 'Schedule regular "check-in" meetings that are explicitly about people, not projects. Let Water types facilitate these sessions. The investment in emotional infrastructure pays dividends in team resilience and retention.'
  }
];

export const teamChemistryRules: Record<string, Record<string, { chemistry: string; score: number; dynamic: string }>> = {
  fire: {
    fire: { chemistry: 'Explosive Energy', score: 75, dynamic: 'High momentum but risk of burnout. Two fires create intense heat—powerful for short sprints, unsustainable without cooling periods.' },
    water: { chemistry: 'Steam Power', score: 90, dynamic: 'The most productive elemental pairing. Fire provides drive, Water provides depth. Together they create steam—energy with direction and meaning.' },
    earth: { chemistry: 'Forged Strength', score: 85, dynamic: 'Fire\'s vision meets Earth\'s execution. This pairing builds things that last. The key is mutual respect: Fire respects Earth\'s pace, Earth respects Fire\'s urgency.' },
    air: { chemistry: 'Wildfire Spread', score: 80, dynamic: 'Air feeds Fire with ideas and perspective, creating rapid expansion. The risk is losing control—agree on boundaries before the brainstorm begins.' }
  },
  water: {
    fire: { chemistry: 'Steam Power', score: 90, dynamic: 'Fire provides drive, Water provides depth. Together they create steam—energy with direction and meaning.' },
    water: { chemistry: 'Deep Current', score: 70, dynamic: 'Profound understanding but risk of emotional saturation. Two Waters create depth but may struggle to surface into action. Need an external catalyst.' },
    earth: { chemistry: 'Fertile Ground', score: 85, dynamic: 'Water nourishes Earth\'s practical nature, creating conditions for growth. This pairing excels at sustainable, human-centered work.' },
    air: { chemistry: 'Weather System', score: 80, dynamic: 'Water\'s emotional intelligence meets Air\'s analytical clarity. Together they create comprehensive understanding—feeling and thinking in harmony.' }
  },
  earth: {
    fire: { chemistry: 'Forged Strength', score: 85, dynamic: 'Earth provides the foundation for Fire\'s ambition. This pairing builds empires—slowly, deliberately, and durably.' },
    water: { chemistry: 'Fertile Ground', score: 85, dynamic: 'Water softens Earth\'s rigidity and Earth grounds Water\'s fluidity. Together they create environments where things grow.' },
    earth: { chemistry: 'Bedrock Alliance', score: 70, dynamic: 'Incredibly reliable but risk of stagnation. Two Earths build solid foundations but may resist necessary change. Need an external disruptor.' },
    air: { chemistry: 'Landscape Design', score: 80, dynamic: 'Air provides the vision, Earth provides the execution. This pairing creates beautiful, functional outcomes—ideas made real.' }
  },
  air: {
    fire: { chemistry: 'Wildfire Spread', score: 80, dynamic: 'Air feeds Fire with oxygen and ideas. Together they create rapid innovation. The risk is burning too bright—pace yourselves.' },
    water: { chemistry: 'Weather System', score: 80, dynamic: 'Air\'s clarity meets Water\'s depth. Together they create nuanced understanding that neither achieves alone.' },
    earth: { chemistry: 'Landscape Design', score: 80, dynamic: 'Air dreams, Earth builds. This pairing turns vision into reality. The key is Air respecting Earth\'s process and Earth trusting Air\'s direction.' },
    air: { chemistry: 'Clear Skies', score: 70, dynamic: 'Brilliant analysis and innovation but risk of remaining theoretical. Two Airs need an Earth or Fire partner to ground their ideas in action.' }
  }
};
