export interface CommunicationSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  communicationArchetype: string;
  preferredMedium: string;
  preferredMediumDetail: string;
  emailStyle: string;
  meetingStyle: string;
  givingFeedback: string;
  receivingFeedback: string;
  presentationStrengths: string;
  howToReachThem: string;
}

export interface CommunicationElement {
  element: string;
  elementId: string;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: CommunicationSubtype[];
}

export interface CrossElementTemplate {
  from: string;
  fromId: string;
  to: string;
  toId: string;
  principle: string;
  doThis: string;
  avoidThis: string;
  emailTemplate: string;
  meetingTip: string;
}

export const communicationData: CommunicationElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Communicating Through Impact',
    subtypes: [
      {
        subtype: 'Pure Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        communicationArchetype: 'The Direct Charge',
        preferredMedium: 'Verbal',
        preferredMediumDetail: 'Face-to-face or phone calls. You process at the speed of speech and lose patience with the delay of written communication. You want to hear tone, gauge reaction, and make decisions in real time. Emails feel like putting a race car in first gear.',
        emailStyle: 'Short, decisive, and action-oriented. Your emails read like telegrams: subject line is the decision, body is the rationale in three sentences or fewer, and the closing is a deadline. You rarely use greetings beyond a first name. You respond within minutes—or not at all. There is no middle ground. Your inbox is either at zero or at 500, because you process in bursts of volcanic efficiency.',
        meetingStyle: 'You arrive with a position already formed and want to test it against the room. You speak early, speak often, and speak with conviction. You are impatient with preamble, context-setting, and "going around the room." You want to identify the decision, debate it, make it, and leave. A 30-minute meeting that could have been a 5-minute conversation is your personal definition of suffering.',
        givingFeedback: 'Direct, immediate, and unvarnished. You give feedback the moment you observe the behavior, which means your feedback is always timely but sometimes lacks diplomatic packaging. You say "This isn\'t working" before you say "Here\'s what I appreciate." Your intention is always constructive, but your delivery can feel like a controlled explosion. You assume others want the same directness you crave.',
        receivingFeedback: 'You want it fast, honest, and without emotional padding. Don\'t build up to it—just say it. You respect people who can look you in the eye and tell you what\'s wrong. You lose respect for people who soften their message so much that you can\'t find the actual feedback inside the compliment sandwich. Give it to you straight, and you\'ll act on it immediately. Hedge, and you\'ll dismiss it.',
        presentationStrengths: 'Commanding presence, infectious energy, and the ability to make complex decisions feel simple and urgent. You don\'t present information—you present a call to action. Your slides are minimal, your eye contact is intense, and your closing always includes a clear "here\'s what we do next." Audiences leave your presentations knowing exactly what is expected of them.',
        howToReachThem: 'Lead with the conclusion. State what you need, why it matters, and what the deadline is—in that order. Skip the background unless asked. Use bullet points, not paragraphs. If you need a meeting, make it 15 minutes and have an agenda. Respect their time by being prepared, concise, and ready to decide.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        communicationArchetype: 'The Considered Authority',
        preferredMedium: 'Written (Strategic)',
        preferredMediumDetail: 'You prefer written communication for complex topics because it allows you to craft your message with the precision your thinking demands. But for relationship-building and sensitive conversations, you shift to one-on-one verbal exchanges. You never communicate important things in group settings if a private conversation would be more effective.',
        emailStyle: 'Measured, precise, and layered. Your emails are the ones people read twice because the first reading reveals the information and the second reveals the insight. You use paragraphs deliberately—each one builds on the last. You rarely use exclamation points. Your tone is warm but authoritative, like a professor who genuinely cares about the student but will not lower the standard.',
        meetingStyle: 'You listen for the first two-thirds, then speak with a synthesis that reframes the entire conversation. You ask questions that expose assumptions others didn\'t know they were making. You are comfortable with silence and use it strategically—a pause after someone speaks that invites them to go deeper. You rarely dominate a meeting, but you almost always define its conclusion.',
        givingFeedback: 'Thoughtful, private, and contextualized. You never give significant feedback in public. You schedule a conversation, create a comfortable setting, and begin by acknowledging the person\'s strengths before addressing the growth area. Your feedback is specific, evidence-based, and always includes a path forward. People leave your feedback conversations feeling challenged but not diminished.',
        receivingFeedback: 'You need time to process. Don\'t expect an immediate response—you will take the feedback in, sit with it, analyze it against your own self-assessment, and then respond with a thoughtful plan. If you are pushed for an immediate reaction, you will become defensive. Give you 48 hours, and you will come back with a nuanced response that demonstrates genuine reflection.',
        presentationStrengths: 'Depth of analysis, narrative structure, and the ability to make complex ideas accessible without oversimplifying them. Your presentations feel like intellectual journeys—each slide builds on the last, and the conclusion feels inevitable rather than imposed. You use data to support narrative, not replace it.',
        howToReachThem: 'Provide context before making your request. Explain the "why" behind the "what." Send a written summary before a meeting so they can prepare their thinking. In conversation, ask for their analysis rather than their opinion—they will give you both, but the framing matters. Never ambush them with a request for an immediate decision on something complex.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        communicationArchetype: 'The Reliable Signal',
        preferredMedium: 'Verbal (Structured)',
        preferredMediumDetail: 'You prefer structured verbal communication—regular check-ins, standing meetings, and scheduled one-on-ones. You value consistency over spontaneity. An unscheduled "Can we talk?" triggers your protective instincts. You communicate best when you know the format, the frequency, and the expectations in advance.',
        emailStyle: 'Thorough, organized, and reliable. Your emails include numbered lists, clear action items, and explicit ownership assignments. You always follow up on previous threads and reference earlier commitments. Your inbox is meticulously organized. You respond to every email, even if just to acknowledge receipt. Nothing falls through the cracks with you.',
        meetingStyle: 'You come prepared with notes, questions, and a mental checklist of items to cover. You are uncomfortable with free-form brainstorming and prefer structured agendas. You speak when you have something substantive to contribute, not to fill silence. You are the person who remembers what was decided last time and holds the team accountable to it.',
        givingFeedback: 'Consistent, fair, and grounded in observable behavior. You don\'t give feedback based on feelings—you give it based on facts. "You missed the deadline three times this quarter" is your style, not "I feel like you\'re not committed." You pair every critique with a concrete suggestion for improvement and follow up to check progress. Your feedback is never a surprise because you address issues as they arise.',
        receivingFeedback: 'You want it to be specific, fair, and backed by evidence. Vague feedback like "You need to be more flexible" frustrates you because you can\'t act on it. Tell you exactly what behavior to change, in what context, and what the expected outcome is. You will implement it with the same reliability you bring to everything else—but only if you believe it is justified.',
        presentationStrengths: 'Credibility, thoroughness, and the ability to inspire trust through preparation. Your presentations may not be the most dynamic, but they are the most trustworthy. Every claim is supported, every number is verified, and every recommendation is grounded in reality. Audiences trust your presentations because they know you have done the work.',
        howToReachThem: 'Be consistent and follow through. If you say you\'ll send something by Friday, send it by Friday. Use structured formats—agendas, numbered lists, clear timelines. Don\'t change plans at the last minute without explanation. Show them you are as reliable as they are, and they will give you their full trust and attention.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        communicationArchetype: 'The Energizing Storyteller',
        preferredMedium: 'Visual + Verbal',
        preferredMediumDetail: 'You communicate best through a combination of visual aids and enthusiastic verbal delivery. Whiteboards, sketches, diagrams, and animated presentations are your native language. You think in images and metaphors, and you need to externalize your ideas visually to fully develop them. A blank whiteboard is your happy place.',
        emailStyle: 'Enthusiastic, idea-rich, and occasionally overwhelming. Your emails tend to be longer than necessary because you are thinking out loud on the page. You use bold text, bullet points, and sometimes embed images or links to illustrate your points. You often send follow-up emails with "One more thing!" because your mind keeps generating connections after you hit send.',
        meetingStyle: 'You are the energy source of any meeting. You brainstorm out loud, build on others\' ideas with visible excitement, and frequently jump to the whiteboard to draw connections. You can be impatient with detailed analysis and prefer to "figure it out as we go." You are the person who turns a routine status update into an impromptu strategy session.',
        givingFeedback: 'Enthusiastic and future-focused. You lead with what excites you about the person\'s potential, then frame the growth area as an opportunity rather than a deficiency. "Imagine if you could also do X—you\'d be unstoppable" is more your style than "You need to improve X." Your feedback is motivating but can sometimes lack the specificity needed for actionable change.',
        receivingFeedback: 'You receive feedback best when it is framed as a creative challenge rather than a correction. "Here\'s a constraint that could make your work even better" lands better than "Here\'s what\'s wrong." You process feedback quickly and want to brainstorm solutions immediately. Give you a problem, and you\'ll have three ideas for solving it before the conversation ends.',
        presentationStrengths: 'Energy, storytelling, and the ability to make any topic feel exciting and relevant. You use metaphors, analogies, and real-world examples that make abstract concepts tangible. Your slides are visual, your delivery is dynamic, and your audience leaves feeling inspired and energized. You are the presenter people remember.',
        howToReachThem: 'Match their energy. Be enthusiastic, visual, and open to tangents. Use metaphors and stories rather than pure data. If you need to deliver critical information, frame it as a creative challenge. Keep written communication concise but vivid. If you need their focused attention, suggest a whiteboard session rather than a formal meeting.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Communicating Through Resonance',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        communicationArchetype: 'The Empathic Translator',
        preferredMedium: 'Verbal (Intimate)',
        preferredMediumDetail: 'You prefer one-on-one conversations in comfortable, private settings. You communicate through the full spectrum of human expression—words, tone, facial expressions, body language, and the quality of silence between sentences. Group emails and Slack messages feel like trying to have a meaningful conversation through a megaphone.',
        emailStyle: 'Warm, considerate, and carefully worded. You spend more time on the tone of your emails than the content, because you know that how something is said matters as much as what is said. You use softening language ("I wonder if...", "It might be worth considering...") not because you lack conviction, but because you want to create space for the reader to engage rather than react.',
        meetingStyle: 'You read the room before you speak. You notice who is uncomfortable, who has something to say but hasn\'t found the opening, and who is performing confidence they don\'t feel. You facilitate naturally—drawing out quiet voices, validating contributions, and naming the emotional undercurrent when it needs to be addressed. You are the person who makes meetings feel safe.',
        givingFeedback: 'Gentle, empathic, and deeply personalized. You tailor your feedback to the individual\'s emotional state and communication style. You begin by genuinely acknowledging what is working, then introduce the growth area with care and specificity. You check in during the conversation: "How does this land for you?" Your feedback feels like a conversation, not a verdict.',
        receivingFeedback: 'You need emotional safety to receive feedback well. If the delivery is harsh or public, you will shut down and process the hurt before you can process the content. Give feedback in private, with warmth, and with evidence that you see your strengths as well as your growth areas. You will absorb it deeply and make meaningful changes—but only if you feel respected in the process.',
        presentationStrengths: 'Emotional intelligence, audience connection, and the ability to make every person in the room feel spoken to personally. Your presentations feel like conversations rather than lectures. You use stories, pauses, and eye contact to create intimacy at scale. Audiences trust you because you are visibly authentic.',
        howToReachThem: 'Begin with connection before content. Ask how they are doing—and mean it. Use "we" language rather than "you" language. Frame requests as collaborative rather than directive. In written communication, include a personal note before the business content. Never deliver difficult news via email if a conversation is possible.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        communicationArchetype: 'The Deep Listener',
        preferredMedium: 'Written (Reflective)',
        preferredMediumDetail: 'You prefer written communication because it allows you to compose your thoughts with the depth and nuance they require. You are an exceptional writer—your emails and documents have a literary quality that others notice. You also value silence as a form of communication and are comfortable with long pauses in conversation that would make others anxious.',
        emailStyle: 'Thoughtful, nuanced, and sometimes poetic. Your emails are the ones people save because they contain insights that are worth rereading. You take time to respond—not because you are slow, but because you are thorough. You consider the reader\'s perspective, the context, and the long-term implications of your words before sending. Your emails are never reactive.',
        meetingStyle: 'You observe more than you speak, and when you speak, the room quiets because people have learned that your contributions are worth hearing. You are uncomfortable with rapid-fire debate and prefer reflective discussion. You may ask for time to think before responding to a complex question. You are the person who sends a follow-up email after the meeting with the insight that crystallized overnight.',
        givingFeedback: 'Deeply considered, compassionate, and transformative. You don\'t just address the behavior—you address the pattern behind the behavior. Your feedback often reveals something the person didn\'t know about themselves, delivered with such care that it feels like a gift rather than a critique. You may write feedback in a letter or document rather than delivering it verbally, because the written form allows you to express the full depth of your observation.',
        receivingFeedback: 'You absorb feedback at a level most people don\'t reach. You will take it in, sit with it for days, and emerge with a profound understanding of what needs to change and why. Do not expect an immediate response. Do not interpret silence as disagreement. Give you space and time, and you will return with a response that demonstrates deeper self-awareness than the feedback itself contained.',
        presentationStrengths: 'Depth, authenticity, and the ability to create moments of genuine reflection in an audience. Your presentations are not performances—they are invitations to think differently. You use silence, pacing, and carefully chosen words to create an atmosphere of contemplation. Audiences leave your presentations changed, not just informed.',
        howToReachThem: 'Give them time. Send your message or question in advance so they can prepare a thoughtful response. Don\'t fill silences—they are processing, not disengaging. Use written communication for complex topics. In meetings, explicitly invite their perspective: "I\'d value your thoughts on this when you\'re ready." Never pressure them for an immediate answer on something important.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        communicationArchetype: 'The Narrative Weaver',
        preferredMedium: 'Verbal (Storytelling)',
        preferredMediumDetail: 'You communicate through stories, anecdotes, and shared memories. You are the organizational historian—the person who remembers how the company handled a similar crisis five years ago, who can trace the origin of a cultural norm to a specific decision. You prefer verbal communication because stories need voice, rhythm, and the responsiveness of a live audience.',
        emailStyle: 'Warm, narrative, and rich with context. Your emails often begin with a brief story or reference to a shared experience before arriving at the point. You include personal touches—remembering a colleague\'s recent vacation, referencing a conversation from weeks ago. Your emails feel personal even when they are professional, because you treat every communication as a relationship touchpoint.',
        meetingStyle: 'You bring historical context and cultural awareness to every discussion. When the team is debating a new direction, you are the one who says "We tried something similar in 2019—here\'s what we learned." You connect current challenges to past experiences, creating a sense of continuity and wisdom. You are uncomfortable with decisions that ignore organizational history.',
        givingFeedback: 'Contextual, warm, and story-based. You might say "This reminds me of when I was in your position and made a similar choice—here\'s what I learned." Your feedback is delivered through shared experience rather than evaluation. You create a sense of mentorship rather than management. People feel guided, not judged.',
        receivingFeedback: 'You receive feedback best when it is delivered with warmth and context. You want to understand not just what to change, but why it matters in the larger story of your career and the organization. Feedback that feels transactional or impersonal bounces off you. Feedback that feels like genuine mentorship transforms you.',
        presentationStrengths: 'Storytelling, cultural resonance, and the ability to connect the present to the past in ways that illuminate the future. Your presentations feel like fireside chats—warm, engaging, and rich with meaning. You use organizational stories and cultural references that make abstract strategies feel grounded and real.',
        howToReachThem: 'Connect your message to the bigger story. Reference shared history, organizational values, or cultural context. Use warm, personal language. Begin conversations by acknowledging the relationship before introducing the topic. In written communication, include context and narrative rather than just bullet points.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        communicationArchetype: 'The Quiet Coordinator',
        preferredMedium: 'Written (Operational)',
        preferredMediumDetail: 'You prefer written communication because it creates a record, ensures nothing is forgotten, and allows you to organize information with the care it deserves. You are the master of the follow-up email, the shared document, and the project tracker. Your communication is functional, thorough, and quietly indispensable.',
        emailStyle: 'Organized, thorough, and service-oriented. Your emails include clear action items, deadlines, and ownership assignments. You always close the loop—if someone asked you to do something, they will receive confirmation when it is done. Your emails are not flashy, but they are the ones that keep projects moving and teams aligned.',
        meetingStyle: 'You take notes, track action items, and ensure follow-through. You may not speak the most in meetings, but you are the reason meetings actually produce results. You notice when a decision is made without clear ownership and gently ask: "Who is responsible for this, and by when?" You are the operational conscience of every meeting you attend.',
        givingFeedback: 'Practical, supportive, and focused on improvement. You frame feedback in terms of process and systems rather than personality. "Here\'s a way to streamline this" rather than "You\'re doing this wrong." You offer to help implement the change, because your instinct is always to serve rather than to judge.',
        receivingFeedback: 'You accept feedback graciously and implement it quietly. You don\'t need emotional processing time—you need a clear action plan. Tell you what to change and how, and it will be done. You may struggle with feedback that is vague or emotional, because you need concrete steps to work with.',
        presentationStrengths: 'Clarity, organization, and the ability to make complex processes understandable. Your presentations are well-structured, thoroughly documented, and always include clear next steps. You may not be the most dynamic presenter, but you are the most reliable—every fact is checked, every slide is purposeful.',
        howToReachThem: 'Be organized and specific. Use clear action items, deadlines, and ownership assignments. Follow through on your commitments—they notice when you don\'t. Express appreciation for their behind-the-scenes work. In meetings, acknowledge their contributions to process and coordination. They rarely seek recognition, but they deeply value being seen.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Communicating Through Substance',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        communicationArchetype: 'The Authoritative Anchor',
        preferredMedium: 'Verbal (Commanding)',
        preferredMediumDetail: 'You prefer face-to-face communication where your physical presence and vocal authority can reinforce your message. You communicate with a weight and gravitas that written words cannot fully convey. When you speak, the room listens—not because you are loud, but because you are substantial.',
        emailStyle: 'Concise, authoritative, and decisive. Your emails carry the weight of finality—when you write "This is the direction," people understand that the discussion is over. You don\'t over-explain or justify. You state the decision, provide the essential context, and move on. Your emails are respected because they are rare and always significant.',
        meetingStyle: 'You set the tone by your presence alone. You speak with deliberation—every word chosen for impact. You are comfortable with silence after making a statement, allowing it to land. You don\'t fill space with unnecessary words. When you ask a question, it is because the answer genuinely matters to the decision. You end meetings with clear directives.',
        givingFeedback: 'Direct, substantial, and delivered with the expectation that it will be acted upon. You don\'t sugarcoat, but you also don\'t attack. Your feedback has the quality of a master craftsman evaluating an apprentice\'s work—exacting but not cruel. You point to the specific flaw, explain why it matters, and expect improvement. You follow up to verify the change was made.',
        receivingFeedback: 'You respect feedback that comes from competence. If the person giving feedback has demonstrated mastery in the relevant area, you will listen carefully and act decisively. If the feedback comes from someone you don\'t respect professionally, you will hear it but may not internalize it. Earn your respect first, then your feedback becomes powerful.',
        presentationStrengths: 'Authority, gravitas, and the ability to make decisions feel inevitable. Your presentations are not about persuasion—they are about declaration. You present the facts, the analysis, and the conclusion with such confidence that the audience feels they are witnessing a truth being revealed rather than an argument being made.',
        howToReachThem: 'Be substantive and prepared. Don\'t waste their time with small talk or unnecessary context. Present your case with evidence and confidence. If you disagree with them, do so with respect and data—they admire courage but dismiss bluster. Follow through on every commitment you make to them. Their trust is earned through consistent competence.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        communicationArchetype: 'The Methodical Builder',
        preferredMedium: 'Written (Documentation)',
        preferredMediumDetail: 'You prefer comprehensive written documentation—project plans, specifications, process documents, and detailed emails. You believe that if it isn\'t written down, it doesn\'t exist. Your communication creates the institutional memory that organizations depend on but rarely appreciate until it is absent.',
        emailStyle: 'Detailed, structured, and comprehensive. Your emails include background, analysis, options, recommendations, and next steps—all clearly labeled and organized. You reference previous communications and decisions to maintain continuity. Your emails are long but never wasteful—every sentence serves a purpose.',
        meetingStyle: 'You come with documentation, data, and a clear agenda. You are frustrated by meetings without structure and will often create an agenda if one doesn\'t exist. You track decisions, action items, and deadlines with precision. You are the person who, three months later, can produce the email that proves what was actually agreed upon.',
        givingFeedback: 'Evidence-based, systematic, and fair. You document patterns over time rather than reacting to single incidents. Your feedback includes specific examples, dates, and measurable outcomes. You present feedback as data, not opinion, which makes it difficult to dismiss. You always include a clear improvement plan with milestones.',
        receivingFeedback: 'You want evidence. Show you the data, the specific instances, and the measurable impact. Vague feedback like "You need to be more collaborative" is meaningless to you without specific examples. Once you see the evidence, you will create a systematic plan to address it and track your own progress with the same rigor you apply to everything else.',
        presentationStrengths: 'Thoroughness, credibility, and the ability to build an airtight case. Your presentations are meticulously researched and documented. Every claim is supported, every risk is acknowledged, and every recommendation is grounded in evidence. Audiences trust your presentations because they know the work behind them is impeccable.',
        howToReachThem: 'Come prepared with data, documentation, and a clear structure. Don\'t improvise—plan. Follow up in writing after verbal conversations. Reference previous agreements and decisions. Be consistent and reliable in your communication cadence. They value predictability and thoroughness above all else.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        communicationArchetype: 'The Sensory Communicator',
        preferredMedium: 'In-Person (Environmental)',
        preferredMediumDetail: 'You communicate best in environments that feel right—comfortable spaces, good lighting, appropriate temperature. You are sensitive to the physical context of communication and believe that where and how a conversation happens matters as much as what is said. You prefer walking meetings, coffee conversations, and settings that engage the senses.',
        emailStyle: 'Warm, detailed, and aesthetically considered. You pay attention to formatting, spacing, and visual clarity. Your emails are pleasant to read—not just informative but well-crafted. You include sensory details and environmental context that others might consider unnecessary but that make your communications feel human and grounded.',
        meetingStyle: 'You notice and respond to the physical environment of every meeting. You adjust the lighting, suggest moving to a more comfortable space, or bring refreshments. You communicate through the quality of the space you create as much as through your words. You are the person who makes meetings feel like gatherings rather than obligations.',
        givingFeedback: 'Gentle, embodied, and environmentally conscious. You choose the setting for feedback conversations carefully—a quiet corner, a walk outside, a comfortable room. You believe the container matters as much as the content. Your feedback is delivered with physical warmth—appropriate eye contact, open body language, and a pace that allows the other person to breathe.',
        receivingFeedback: 'You need a comfortable, private setting. Feedback delivered in a harsh environment—a cold conference room, a rushed hallway conversation—will not land well regardless of its content. Create the right conditions, and you will receive even difficult feedback with grace. You process feedback somatically—you feel it in your body before you understand it in your mind.',
        presentationStrengths: 'Atmosphere creation, sensory engagement, and the ability to make information feel tangible. Your presentations engage multiple senses—you might bring physical samples, use rich imagery, or create an immersive environment. Audiences remember your presentations because they experienced them, not just watched them.',
        howToReachThem: 'Pay attention to the environment. Suggest a comfortable setting for important conversations. Use sensory language—describe how things look, feel, and function rather than just what they mean. Bring something tangible to meetings—a prototype, a sample, a visual. Show them you care about the quality of the interaction, not just its efficiency.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        communicationArchetype: 'The Polished Curator',
        preferredMedium: 'Visual (Refined)',
        preferredMediumDetail: 'You communicate through beautifully crafted visual materials—polished presentations, elegant documents, and refined design. You believe that the quality of the medium reflects the quality of the thinking. A sloppy presentation signals sloppy analysis, regardless of the actual content. You invest in the aesthetic dimension of communication because you understand its persuasive power.',
        emailStyle: 'Polished, precise, and aesthetically refined. Your emails are well-formatted, grammatically perfect, and visually clean. You use white space, clear headers, and purposeful formatting. You proofread multiple times before sending. Your emails reflect the same standard of excellence you apply to everything else—they are not just functional, they are crafted.',
        meetingStyle: 'You come with polished materials and a clear narrative arc. You are frustrated by disorganized meetings and poorly prepared presentations. You set a high standard for the quality of discussion and are not afraid to redirect conversations that have become unfocused. You end meetings with clear, well-articulated conclusions.',
        givingFeedback: 'Precise, constructive, and focused on raising the standard. You frame feedback in terms of excellence—"Here\'s how to make this even better" rather than "Here\'s what\'s wrong." You provide specific examples of what excellence looks like and offer resources for development. Your feedback is aspirational—it makes people want to improve, not just comply.',
        receivingFeedback: 'You receive feedback best when it is specific, well-articulated, and focused on craft rather than personality. Vague praise is as unsatisfying as vague criticism. Tell you exactly what worked and what didn\'t, with the specificity of a design critique. You will use the feedback to refine your work with the same precision you apply to everything.',
        presentationStrengths: 'Visual excellence, narrative precision, and the ability to elevate any topic through the quality of its presentation. Your slides are beautiful, your handouts are impeccable, and your delivery is polished. Audiences are impressed not just by what you say, but by how you say it. You set the standard for professional communication.',
        howToReachThem: 'Match their standard of quality. Proofread your emails, format your documents well, and come to meetings prepared. Present information with visual clarity and narrative structure. Acknowledge the quality of their work specifically—they value precise recognition over generic praise. If you need to give them feedback, be specific about craft, not vague about feelings.'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Communicating Through Clarity',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        communicationArchetype: 'The Analytical Clarifier',
        preferredMedium: 'Written (Analytical)',
        preferredMediumDetail: 'You prefer written communication because it allows you to structure your thoughts with logical precision. You are the master of the well-organized document—clear headers, numbered arguments, and evidence-based conclusions. You distrust verbal communication for important decisions because it is too susceptible to emotional influence and imprecise language.',
        emailStyle: 'Logical, structured, and evidence-based. Your emails read like well-organized arguments—premise, evidence, conclusion. You use numbered lists, clear headers, and precise language. You avoid emotional language and hedging words. Your emails are efficient—every sentence advances the argument. You expect the same clarity in responses.',
        meetingStyle: 'You come with data, analysis, and a clear framework for decision-making. You are frustrated by meetings that are driven by opinion rather than evidence. You ask clarifying questions that expose logical gaps and challenge assumptions with data. You are the person who says "What evidence do we have for that?" when the room is running on enthusiasm.',
        givingFeedback: 'Logical, specific, and data-driven. You present feedback as an analysis rather than a judgment. "The data shows that approach A produced 30% better results than approach B" is more your style than "I think you should try a different approach." Your feedback is objective and defensible, which makes it difficult to dismiss but sometimes difficult to receive emotionally.',
        receivingFeedback: 'You want logic and evidence. If the feedback is well-reasoned and supported by data, you will accept it immediately and adjust your approach. If it is based on feelings, impressions, or authority rather than evidence, you will push back—not out of defensiveness, but out of intellectual integrity. Convince your mind, and your behavior will follow.',
        presentationStrengths: 'Logical clarity, data visualization, and the ability to make complex information understandable. Your presentations are models of clear thinking—every slide has a purpose, every chart is readable, and every conclusion follows from the evidence. Audiences trust your presentations because they can follow the reasoning independently.',
        howToReachThem: 'Lead with data and logic. Structure your communication clearly—premise, evidence, conclusion. Avoid emotional appeals and vague language. If you disagree, present counter-evidence rather than counter-feelings. Respect their need for precision by being precise yourself. Send written summaries of verbal conversations so they have a clear record to reference.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        communicationArchetype: 'The Creative Connector',
        preferredMedium: 'Verbal (Dynamic)',
        preferredMediumDetail: 'You prefer dynamic verbal communication—brainstorming sessions, rapid-fire idea exchanges, and conversations that bounce between topics with creative energy. You think out loud and need the stimulation of another mind to develop your ideas fully. Written communication feels constraining because it forces linear thinking on your naturally associative mind.',
        emailStyle: 'Energetic, idea-rich, and sometimes scattered. Your emails jump between topics, include links to articles you found interesting, and often end with a question that opens a new thread of discussion. You use parenthetical asides, dashes, and exclamation points liberally. Your emails are stimulating to read but sometimes require a second pass to extract the action items.',
        meetingStyle: 'You are the idea generator. You make unexpected connections, reference diverse sources, and propose novel approaches that no one else would have considered. You can be impatient with detailed execution planning and prefer to stay in the creative space. You are the person who says "What if we approached this completely differently?" just when the team thought they had reached a conclusion.',
        givingFeedback: 'Creative, reframing, and possibility-focused. You don\'t just tell people what to fix—you show them a completely different way to think about the problem. Your feedback often takes the form of a question: "What if instead of improving X, you replaced it with Y?" You make feedback feel like a creative collaboration rather than an evaluation.',
        receivingFeedback: 'You receive feedback best when it is delivered as a creative challenge. "Here\'s a constraint—how would you work within it?" is more effective than "Here\'s what you did wrong." You process feedback by generating alternatives, so give you space to brainstorm solutions rather than prescribing them. You may resist feedback that feels like it is limiting your creative freedom.',
        presentationStrengths: 'Creativity, cross-pollination, and the ability to make any topic feel fresh and exciting. Your presentations are full of unexpected connections, provocative questions, and ideas that challenge conventional thinking. Audiences leave your presentations with their minds buzzing with new possibilities.',
        howToReachThem: 'Be open to tangents and unexpected connections. Frame requests as creative challenges rather than tasks. Use diverse references and analogies. In meetings, give them space to think out loud without immediately evaluating their ideas. In written communication, ask questions that spark their creativity rather than requesting reports that constrain it.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        communicationArchetype: 'The Diplomatic Bridge',
        preferredMedium: 'Verbal (Relational)',
        preferredMediumDetail: 'You prefer verbal communication because it allows you to read social cues, adjust your message in real time, and build the relational capital that makes your communication effective. You are a natural translator—able to take one person\'s idea and reframe it in language that another person can hear. You communicate through connection.',
        emailStyle: 'Warm, inclusive, and diplomatically crafted. Your emails acknowledge multiple perspectives, use "we" language, and always include a personal touch. You CC people who need to feel included and BCC people who need to be informed without being spotlighted. Your emails build bridges—they make people feel considered and respected.',
        meetingStyle: 'You are the natural facilitator. You notice when someone is being talked over and create space for them. You reframe contentious statements in more collaborative language. You find the common ground between opposing positions and articulate it in a way that both sides can accept. You are the person who turns arguments into agreements.',
        givingFeedback: 'Diplomatic, balanced, and relationally aware. You consider not just what needs to be said, but how the person needs to hear it. You adjust your delivery based on the individual—more direct with some, more gentle with others. You always frame feedback within the context of the relationship: "I\'m telling you this because I believe in your potential."',
        receivingFeedback: 'You receive feedback well when it is delivered with relational warmth and genuine care. You are sensitive to the intention behind the feedback—if you sense it comes from a place of support, you will embrace it. If you sense it comes from a place of judgment or power, you will deflect it. The relationship determines the receptivity.',
        presentationStrengths: 'Inclusivity, audience awareness, and the ability to make every person in the room feel that the presentation was designed for them. You adjust your language, examples, and pace based on the audience. You are the presenter who makes complex stakeholder dynamics feel manageable and collaborative.',
        howToReachThem: 'Invest in the relationship before making requests. Use inclusive language and acknowledge their perspective. In meetings, ask for their help in facilitating difficult conversations—they will feel valued and contribute their best. In written communication, be warm and personal. Never be transactional with them—they will disengage.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        communicationArchetype: 'The Intuitive Perceiver',
        preferredMedium: 'Written (Reflective) + Verbal (Intimate)',
        preferredMediumDetail: 'You toggle between written reflection and intimate verbal conversation depending on the depth of the topic. For surface-level communication, you prefer efficient written messages. For anything that matters—strategy, relationships, difficult decisions—you need the full bandwidth of a private, unhurried conversation where you can sense the other person\'s energy.',
        emailStyle: 'Perceptive, layered, and subtly influential. Your emails often contain observations that others miss—a gentle note about team morale, a question that reveals an unexamined assumption, or a suggestion that seems simple but is actually strategically profound. You write between the lines, and the most important part of your email is often what you chose not to say.',
        meetingStyle: 'You observe the dynamics beneath the discussion. You notice who is aligned, who is resistant, and who is performing agreement they don\'t feel. You speak sparingly but with precision—your comments often redirect the entire conversation because they address what everyone was thinking but no one was saying. You are the person who names the elephant in the room with such grace that it feels like a relief rather than a confrontation.',
        givingFeedback: 'Intuitive, perceptive, and transformative. You don\'t just address the behavior—you address the underlying pattern, the unspoken fear, or the hidden assumption that is driving it. Your feedback often surprises people with its accuracy: "I think the reason you\'re struggling with this project isn\'t the workload—it\'s that you don\'t believe in the direction." You see what others cannot.',
        receivingFeedback: 'You need authenticity. You can sense when feedback is performative, politically motivated, or insincere—and you will dismiss it regardless of its content. Give feedback that comes from genuine observation and care, and you will receive it with profound openness. You process feedback intuitively—you may not be able to articulate your response immediately, but you will integrate it at a deep level.',
        presentationStrengths: 'Perception, subtlety, and the ability to reveal hidden truths that transform understanding. Your presentations don\'t just inform—they illuminate. You have a gift for framing familiar information in a way that makes people see it for the first time. Audiences leave your presentations with a shifted perspective, not just new information.',
        howToReachThem: 'Be authentic. They can sense inauthenticity instantly and will disengage. Share your genuine thoughts and concerns, not your polished position. In meetings, ask for their perception of the dynamics: "What are you sensing about this situation?" In written communication, be honest and direct about what you actually think. They value truth over diplomacy.'
      }
    ]
  }
];

export const crossElementTemplates: CrossElementTemplate[] = [
  {
    from: 'Fire',
    fromId: 'fire',
    to: 'Water',
    toId: 'water',
    principle: 'Slow down your delivery and lead with empathy before action.',
    doThis: 'Begin with how the situation affects people, then move to the decision. Use "I\'d like your perspective" before "Here\'s what we\'re doing." Allow silence after important statements.',
    avoidThis: 'Rapid-fire directives, skipping emotional context, treating urgency as more important than understanding, dismissing their need for processing time.',
    emailTemplate: 'Hi [Name], I wanted to share some thoughts on [topic] and get your perspective before we move forward. I know this affects [relevant concern], and I want to make sure we handle it thoughtfully. Here\'s what I\'m thinking: [concise summary]. I\'d value your input—take the time you need to consider this. [Your name]',
    meetingTip: 'Start with a check-in question. Give them advance notice of topics. Allow pauses after you speak. Ask "How does this land for you?" before moving to next steps.'
  },
  {
    from: 'Fire',
    fromId: 'fire',
    to: 'Earth',
    toId: 'earth',
    principle: 'Provide structure, evidence, and follow-through with your message.',
    doThis: 'Include specific data, timelines, and action items. Reference previous agreements. Follow up in writing after verbal conversations. Be consistent in your communication cadence.',
    avoidThis: 'Changing direction without explanation, making promises you don\'t track, skipping documentation, treating their need for process as resistance to progress.',
    emailTemplate: 'Hi [Name], Following up on our discussion about [topic]. Here\'s the plan: 1) [Action item + owner + deadline] 2) [Action item + owner + deadline] 3) [Action item + owner + deadline]. This aligns with what we agreed on [date]. Let me know if I\'ve missed anything. [Your name]',
    meetingTip: 'Send an agenda in advance. Bring data to support your positions. End with clear action items and deadlines. Follow up with written notes within 24 hours.'
  },
  {
    from: 'Fire',
    fromId: 'fire',
    to: 'Air',
    toId: 'air',
    principle: 'Frame your message as a creative challenge, not a directive.',
    doThis: 'Present the problem and invite their perspective. Use questions like "What if we..." and "How might we..." Share diverse references and analogies. Give them space to think out loud.',
    avoidThis: 'Shutting down tangents too quickly, demanding immediate commitment to a single approach, dismissing ideas that seem impractical before they\'re fully developed.',
    emailTemplate: 'Hi [Name], I\'m working on [challenge] and I think your perspective could open up some interesting possibilities. Here\'s the constraint: [brief context]. Here\'s my current thinking: [summary]. But I suspect there\'s an angle I\'m not seeing. Would love to brainstorm—coffee this week? [Your name]',
    meetingTip: 'Allow 10 minutes of open brainstorming before narrowing. Ask "What connections do you see?" Use a whiteboard. Separate idea generation from idea evaluation.'
  },
  {
    from: 'Water',
    fromId: 'water',
    to: 'Fire',
    toId: 'fire',
    principle: 'Lead with the conclusion and keep it concise.',
    doThis: 'State your recommendation first, then provide supporting context only if asked. Use bullet points. Include a clear call to action with a deadline. Be direct about what you need.',
    avoidThis: 'Long preambles, excessive context-setting, hedging language, asking for their feelings when they want to discuss actions, burying the point in narrative.',
    emailTemplate: 'Hi [Name], Recommendation: [clear statement]. Key reasons: 1) [reason] 2) [reason]. Next step: [specific action needed from them] by [date]. Happy to discuss if you have questions. [Your name]',
    meetingTip: 'Open with your conclusion. Keep it under 15 minutes. Have a clear ask. Be prepared for rapid follow-up questions. Don\'t take directness personally—it\'s respect.'
  },
  {
    from: 'Water',
    fromId: 'water',
    to: 'Earth',
    toId: 'earth',
    principle: 'Ground your insights in observable evidence and practical steps.',
    doThis: 'Translate your intuitive observations into specific examples and data points. Provide documentation. Include a clear implementation plan alongside your insights.',
    avoidThis: 'Leading with feelings without evidence, making requests without clear timelines, changing your mind without explanation, being vague about expectations.',
    emailTemplate: 'Hi [Name], I\'ve been observing [specific situation] and wanted to share some data: [evidence]. Based on this, I recommend: [specific action]. Timeline: [dates]. I\'ve documented the full analysis here: [link]. Let me know your thoughts. [Your name]',
    meetingTip: 'Bring printed materials or a shared document. Reference specific examples rather than general impressions. End with clear action items. Follow up in writing.'
  },
  {
    from: 'Water',
    fromId: 'water',
    to: 'Air',
    toId: 'air',
    principle: 'Frame emotional insights as intellectual observations worth exploring.',
    doThis: 'Present your perceptions as hypotheses to test rather than feelings to validate. Use frameworks and models. Invite their analytical perspective on relational dynamics.',
    avoidThis: 'Expecting them to respond emotionally to emotional content, dismissing their analytical reframing as "cold," taking their questions as challenges to your perception.',
    emailTemplate: 'Hi [Name], I\'ve noticed an interesting pattern in [situation] that I think is worth analyzing. My hypothesis: [observation framed analytically]. I\'d value your perspective on whether the data supports this. Could we discuss? [Your name]',
    meetingTip: 'Frame relational observations as data points. Ask for their analytical framework. Use "I\'ve observed" rather than "I feel." Welcome their reframing—it often strengthens your insight.'
  },
  {
    from: 'Earth',
    fromId: 'earth',
    to: 'Fire',
    toId: 'fire',
    principle: 'Compress your thoroughness into decisive, action-oriented communication.',
    doThis: 'Lead with the recommendation, not the analysis. Keep emails to five sentences or fewer for routine matters. Save your detailed documentation for an appendix or attachment.',
    avoidThis: 'Sending long emails when a short one will do, requiring them to read extensive background before understanding your point, mistaking their speed for carelessness.',
    emailTemplate: 'Hi [Name], Quick update: [one-sentence summary]. Recommendation: [clear action]. Full details attached if needed. Decision needed by [date]. [Your name]',
    meetingTip: 'Start with the bottom line. Have your detailed analysis ready but don\'t present it unless asked. Match their pace. Make decisions in the room when possible.'
  },
  {
    from: 'Earth',
    fromId: 'earth',
    to: 'Water',
    toId: 'water',
    principle: 'Add warmth and relational context to your structured communication.',
    doThis: 'Begin with a personal acknowledgment before the business content. Ask about their perspective and feelings, not just their analysis. Create comfortable settings for important conversations.',
    avoidThis: 'Jumping straight to action items without connection, treating every interaction as transactional, dismissing their emotional observations as irrelevant to the task.',
    emailTemplate: 'Hi [Name], I hope you\'re doing well. Before I get into the details, I wanted to check in—how are you feeling about [relevant project/situation]? Here\'s where we stand: [organized update]. I\'d love to hear your thoughts, especially on [area where their perspective matters]. [Your name]',
    meetingTip: 'Start with a genuine check-in. Choose a comfortable setting. Allow time for reflection. Don\'t rush to action items—let the conversation breathe.'
  },
  {
    from: 'Earth',
    fromId: 'earth',
    to: 'Air',
    toId: 'air',
    principle: 'Present your work as a foundation for their ideas, not a finished product.',
    doThis: 'Share your analysis as a starting point for discussion. Ask questions that invite their creative perspective. Be open to reframing your conclusions based on their insights.',
    avoidThis: 'Presenting your work as final and unchangeable, dismissing their creative suggestions as impractical, treating their questions as criticism of your thoroughness.',
    emailTemplate: 'Hi [Name], I\'ve put together an analysis of [topic] that I think could be a good foundation for discussion. Here\'s what the data shows: [summary]. But I suspect there are angles I haven\'t considered. Would love your creative perspective on this. [Your name]',
    meetingTip: 'Present your data, then explicitly invite their reinterpretation. Say "What patterns do you see that I might be missing?" Be open to having your framework expanded.'
  },
  {
    from: 'Air',
    fromId: 'air',
    to: 'Fire',
    toId: 'fire',
    principle: 'Distill your analysis into clear recommendations with urgency.',
    doThis: 'Lead with the "so what"—the actionable implication of your analysis. Use confident language. Include a clear timeline and decision framework. Be prepared to defend your reasoning concisely.',
    avoidThis: 'Presenting analysis without recommendations, using hedging language that undermines your credibility, requesting more data when the decision is already clear.',
    emailTemplate: 'Hi [Name], Based on my analysis, here\'s what we should do: [clear recommendation]. The data supports this because: [two key points]. I recommend we decide by [date]. I\'m confident in this direction. [Your name]',
    meetingTip: 'Open with your recommendation, not your methodology. Be prepared for rapid questions. Show confidence in your analysis. Match their decisiveness with your own.'
  },
  {
    from: 'Air',
    fromId: 'air',
    to: 'Water',
    toId: 'water',
    principle: 'Acknowledge the human dimension of your analysis.',
    doThis: 'Include how your recommendations affect people, not just processes. Ask about their emotional read on the situation. Use warmer language without sacrificing precision.',
    avoidThis: 'Presenting purely logical arguments that ignore emotional impact, dismissing their intuitive observations, treating their concern for people as inefficiency.',
    emailTemplate: 'Hi [Name], I\'ve been thinking about [topic] and wanted to share my analysis while also getting your read on how the team is feeling about it. Here\'s what the data suggests: [summary]. But I know numbers don\'t tell the whole story. What are you sensing from the team? [Your name]',
    meetingTip: 'Start by asking about the human dynamics before presenting your analysis. Use "people" language alongside "data" language. Acknowledge that their emotional intelligence is a form of data.'
  },
  {
    from: 'Air',
    fromId: 'air',
    to: 'Earth',
    toId: 'earth',
    principle: 'Ground your ideas in practical implementation steps.',
    doThis: 'Include a concrete action plan alongside your analysis. Provide documentation and evidence. Be specific about timelines, resources, and responsibilities.',
    avoidThis: 'Presenting abstract ideas without implementation paths, changing your framework frequently, dismissing their need for process as lack of vision.',
    emailTemplate: 'Hi [Name], Here\'s my analysis of [topic] with a proposed implementation plan: Analysis: [key findings]. Recommendation: [specific action]. Implementation: 1) [step + timeline] 2) [step + timeline] 3) [step + timeline]. I\'ve documented the full methodology here: [link]. [Your name]',
    meetingTip: 'Pair every insight with a practical next step. Bring documentation. Be specific about who does what by when. Respect their process orientation—it\'s what makes ideas real.'
  }
];
