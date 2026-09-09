import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, Shield, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface LeadershipSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  leadershipStyle: string;
  defaultApproach: string;
  blindSpots: string;
  developmentPath: string;
  scenario: string;
  practicalAdvice: string;
}

interface LeadershipElement {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: LeadershipSubtype[];
}

const leadershipData: LeadershipElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Leading Through Ignition',
    subtypes: [
      {
        subtype: 'Pure Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        leadershipStyle: 'The Commander',
        defaultApproach: 'You lead by rapid decision-making and unshakable conviction. Your instinct is to assess a situation in seconds, declare the direction, and expect the team to mobilize. You are the leader people follow into the unknown because your certainty is contagious. You don\'t deliberate—you decide. And your decisions are usually right, because your pattern recognition operates at a speed most people cannot match.',
        blindSpots: 'Your speed can outrun your team\'s comprehension. You may announce a direction change and assume everyone understands the reasoning, when in fact they are still processing the previous plan. You can mistake silence for agreement, when it is actually confusion or suppressed dissent. Your impatience with "process" can mean you skip the buy-in phase, leading to technically correct decisions that fail because the team never emotionally committed to them.',
        developmentPath: 'Learn to distinguish between decisions that require speed and decisions that require consensus. Not every situation is a fire to be extinguished. Practice the discipline of the "two-minute pause"—after making a decision internally, wait two minutes before announcing it. Use that time to ask: "Who needs to understand this before I declare it?" This does not slow you down; it increases your execution rate because the team moves with you instead of behind you.',
        scenario: 'Your team is behind on a critical deadline. Your instinct is to reassign tasks, cut scope, and drive harder. Instead, call a 15-minute stand-up where you share your assessment transparently: "Here is what I see. Here is what I think we should do. What am I missing?" You will likely still end up with your original plan—but now the team owns it.',
        practicalAdvice: 'Before your next major decision, write down your conclusion, then spend 10 minutes asking three team members for their perspective. You don\'t have to change your mind—but the act of asking transforms your authority from autocratic to consultative, and your team\'s loyalty will deepen.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        leadershipStyle: 'The Strategic Sage',
        defaultApproach: 'You lead through deep analysis delivered with quiet authority. You are the leader who listens for the first 80% of the meeting, then speaks a single paragraph that reframes the entire conversation. Your leadership is not loud—it is gravitational. People orbit your judgment because it is consistently more nuanced and accurate than anyone else\'s in the room. You lead by being the person everyone privately consults before making their own decisions.',
        blindSpots: 'Your preference for observation over participation can be misread as disengagement or indifference. Junior team members may not know you are leading because your leadership is invisible to those who expect authority to be performative. You may also hold back critical insights too long, waiting for the "perfect moment" to speak, while the team makes avoidable mistakes in real time.',
        developmentPath: 'Make your engagement visible without forcing extroversion. Develop a set of "signal behaviors" that communicate your attention: taking notes publicly, asking clarifying questions early in meetings (even before you have your full analysis), and offering interim observations like "I\'m still forming my view, but here is what I\'m noticing so far." This gives the team a thread to follow while you complete your thinking.',
        scenario: 'You are in a strategy meeting where the team is debating two approaches. You can see that both are flawed, but your full analysis isn\'t ready. Instead of waiting, say: "I want to flag something. I think there is a third option we haven\'t considered. I need another day to develop it fully, but I want to make sure we don\'t commit to either path until I can present it." This is leadership through intellectual honesty.',
        practicalAdvice: 'At your next team meeting, commit to speaking within the first 15 minutes—not with your conclusion, but with a question or observation. This trains your team to recognize your engagement and creates space for your deeper insights to land with more impact when they arrive.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        leadershipStyle: 'The Steadfast Guardian',
        defaultApproach: 'You lead through unwavering reliability and protective loyalty. You are the leader who shows up every day with the same steady competence, who remembers every commitment, and who shields your team from organizational chaos. Your leadership is not about vision—it is about trust. People follow you because they know you will never abandon them, never cut corners, and never sacrifice the team for personal advancement. You are the leader who builds things that last.',
        blindSpots: 'Your loyalty to existing systems and people can make you resistant to necessary change. You may defend underperforming team members too long because you feel personally responsible for them. You can also be so focused on protecting the team from disruption that you inadvertently shield them from growth opportunities. Your definition of "stability" can become "stagnation" if you are not careful.',
        developmentPath: 'Distinguish between protective loyalty and enabling loyalty. Protective loyalty shields the team from unnecessary harm. Enabling loyalty shields the team from necessary discomfort. Practice asking: "Am I protecting my team from something harmful, or from something that would help them grow?" Develop a quarterly "sacred disruption" practice where you intentionally introduce one change—a new process, a rotated responsibility, a stretch assignment—to keep the team adaptive.',
        scenario: 'A reorganization is announced that will split your team. Your instinct is to fight it, to protect the unit you\'ve built. Instead, meet with each team member individually and ask: "What does this change make possible for you that wasn\'t possible before?" You may discover that some of your people are ready for new challenges, and your role is to launch them, not hold them.',
        practicalAdvice: 'Identify one team member who has been in the same role for over a year. Have a candid conversation about their growth trajectory. Ask them what they want to learn next, and actively create an opportunity for them—even if it means temporarily weakening your team\'s current output.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        leadershipStyle: 'The Inspirational Catalyst',
        defaultApproach: 'You lead through infectious enthusiasm and creative vision. You are the leader who walks into a demoralized room and, within 20 minutes, has the team laughing, brainstorming, and believing that the impossible is merely difficult. Your leadership is energetic—you don\'t just set direction, you generate the emotional fuel for the journey. You are the leader who makes people want to do their best work because the work itself feels exciting.',
        blindSpots: 'Your enthusiasm can overwhelm your follow-through. You may launch five initiatives with genuine passion and then struggle to sustain attention on any single one long enough for it to mature. Your team may experience "initiative fatigue"—the exhaustion of constantly pivoting to your latest inspiration. You can also underestimate the operational complexity of your ideas, leaving the implementation burden on others while you move on to the next vision.',
        developmentPath: 'Pair every inspiration with an implementation partner. Before announcing a new idea to the team, identify one person who will own the execution and have a private conversation with them first. If no one can own it, the idea waits. Develop a "one in, one out" discipline: for every new initiative you launch, you must formally close or pause an existing one. This forces prioritization without killing your creative energy.',
        scenario: 'You have a brilliant idea for a new product feature. Before bringing it to the team meeting, write a one-page brief that includes: the idea, the resource cost, what it replaces or delays, and who would own it. Present the brief, not just the excitement. Your team will take your ideas more seriously when they see you\'ve already thought through the implications.',
        practicalAdvice: 'Keep a "parking lot" document where you capture every new idea without immediately acting on it. Review it weekly. You\'ll find that 70% of your ideas lose their urgency within a week—and the 30% that survive are the ones worth pursuing. This protects your team from whiplash while preserving your creative genius.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Leading Through Connection',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        leadershipStyle: 'The Empathic Facilitator',
        defaultApproach: 'You lead by creating the conditions for others to lead themselves. Your instinct is not to direct but to cultivate—to ask the question that unlocks someone else\'s insight, to notice the person who hasn\'t spoken and gently draw them in, to sense the emotional undercurrent of a meeting and name it before it becomes a problem. You are the leader who makes every person in the room feel seen, heard, and capable.',
        blindSpots: 'Your desire for harmony can make you conflict-avoidant. You may smooth over legitimate disagreements rather than letting them surface and resolve. You can also over-facilitate—spending so much energy managing the emotional climate that you neglect to assert your own perspective. Your team may respect you deeply but feel uncertain about your actual position on critical issues. They need your opinion, not just your empathy.',
        developmentPath: 'Practice "compassionate directness." This means delivering your honest assessment while maintaining emotional safety. Develop a formula: "I care about this team, and because I care, I need to say something that might be uncomfortable." Learn to distinguish between destructive conflict (personal attacks, power plays) and productive conflict (honest disagreement about ideas). Your job is to eliminate the former and protect the latter.',
        scenario: 'Two team members have a simmering disagreement that is affecting the whole team. Your instinct is to mediate privately with each person. Instead, bring them together and say: "I\'ve noticed tension between you two, and I believe it\'s because you both care deeply about different aspects of this project. I\'d like us to have an honest conversation about it right now. I\'ll make sure it stays respectful." Then hold the space.',
        practicalAdvice: 'At your next team meeting, after facilitating the discussion, explicitly state your own position on the topic before the meeting ends. Say: "I\'ve heard everyone\'s perspective, and here is where I stand." Your team needs to know that you have convictions, not just compassion.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        leadershipStyle: 'The Intuitive Oracle',
        defaultApproach: 'You lead through profound understanding of human nature and organizational dynamics. You are the leader who perceives the real conversation happening beneath the official one—who knows that the budget debate is actually a power struggle, that the "process improvement" initiative is actually a trust deficit, that the star performer\'s sudden disengagement is actually a cry for recognition. You lead by understanding what is actually happening, not what appears to be happening.',
        blindSpots: 'Your depth of perception can become paralysis of action. You may understand the full complexity of a situation so thoroughly that you cannot simplify it enough to make a decision. You can also become so attuned to the emotional undercurrents that you absorb them, leading to decision-making that is driven by the team\'s anxiety rather than strategic clarity. Your empathy, unchecked, can become a liability when it prevents you from making unpopular but necessary choices.',
        developmentPath: 'Develop a "perception-to-action" pipeline. When you perceive a complex dynamic, force yourself to translate it into a concrete action within 48 hours. The action doesn\'t have to solve the whole problem—it just has to move the situation forward. Practice the discipline of "good enough" decisions. Your 70% solution, implemented today, is more valuable than your 95% solution, delivered next month. Trust that your intuition has already done most of the analysis.',
        scenario: 'You sense that your team is burning out, but no one has said anything. Instead of waiting for someone to break, proactively schedule a team retrospective focused on workload. Say: "I want to check in on how everyone is doing—not on the project, but on themselves. Let\'s be honest about what\'s sustainable and what isn\'t." Then make one concrete change based on what you hear.',
        practicalAdvice: 'Keep a "perception journal" where you write down the dynamics you observe each week. Next to each observation, write one small action you could take. Review the journal monthly. You\'ll start to see patterns—and your actions will become more strategic and less reactive.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        leadershipStyle: 'The Cultural Steward',
        defaultApproach: 'You lead through the preservation and enrichment of organizational culture. You are the leader who remembers why the company was founded, who tells the stories of early struggles and triumphs, who ensures that new hires understand not just what the company does but who the company is. You lead by connecting people to purpose—not abstract mission statements, but living, breathing narratives that make the work feel meaningful.',
        blindSpots: 'Your attachment to tradition can make you resistant to evolution. You may interpret necessary cultural shifts as betrayals of the founding vision, when in fact they are its natural maturation. You can also idealize the past, creating a narrative of "the good old days" that makes current team members feel like they are living in a diminished version of the organization. Your nostalgia, unchecked, can become a barrier to the very culture you are trying to protect.',
        developmentPath: 'Distinguish between the essence of a culture and its artifacts. The essence—values, purpose, ways of relating—can be preserved even as the artifacts—processes, structures, rituals—evolve. Practice asking: "What is the principle behind this tradition?" and then find new expressions of that principle that resonate with the current team. Become the bridge between legacy and innovation, not the wall between them.',
        scenario: 'The company is rebranding, and you feel the new direction loses something essential. Instead of opposing the change, ask to lead the "heritage integration" workstream. Your role: ensure that the new brand carries forward the core values and stories that define the organization\'s identity. This gives you influence over the change rather than resistance to it.',
        practicalAdvice: 'Create a "culture document" that captures the three to five non-negotiable values of your team or organization. Share it with new hires during onboarding. Update it annually with input from the whole team. This makes culture a living practice rather than a nostalgic memory.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        leadershipStyle: 'The Operational Heart',
        defaultApproach: 'You lead through service—quiet, competent, and indispensable. You are the leader who ensures that the meeting room is booked, the agenda is distributed, the follow-up items are tracked, and the team\'s needs are anticipated before they are articulated. You don\'t lead from the front; you lead from the center, holding everything together with a care and competence that most people don\'t notice until you\'re absent. Then everything falls apart, and they realize you were the infrastructure all along.',
        blindSpots: 'Your service orientation can become self-erasure. You may be so focused on supporting others that you neglect your own development, visibility, and advancement. You can also enable dysfunction by compensating for other people\'s failures—picking up slack so consistently that underperformers never face consequences. Your competence can become a trap: the better you are at holding things together, the less incentive anyone has to fix the underlying problems.',
        developmentPath: 'Learn to make your contributions visible without self-promotion. Develop the practice of the "weekly summary"—a brief email or message to your manager that outlines what you accomplished, what you enabled, and what you need. This is not bragging; it is professional communication. Also, practice strategic incompetence: occasionally let a ball drop that someone else should be catching. The temporary discomfort will reveal the true workload distribution and create pressure for systemic improvement.',
        scenario: 'You realize you\'ve been covering for a colleague who consistently misses deadlines. Instead of continuing to compensate, have a private conversation: "I\'ve been picking up some of your deliverables because I care about the team\'s success. But I need to focus on my own work, and I think you\'re capable of handling yours. How can I support you in getting back on track without doing it for you?"',
        practicalAdvice: 'For one month, track every task you do that is not in your job description. At the end of the month, categorize them: which ones are genuinely your responsibility, which ones are someone else\'s, and which ones shouldn\'t exist at all. Present this analysis to your manager as a workload conversation, not a complaint.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Leading Through Substance',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        leadershipStyle: 'The Sovereign Protector',
        defaultApproach: 'You lead through sheer force of presence and uncompromising standards. You are the leader who walks into a room and the temperature changes—not because you demand attention, but because you radiate a calm, immovable authority that makes people feel simultaneously challenged and safe. You set the bar high and hold it there, not through micromanagement but through the gravitational pull of your own example. People perform better around you because mediocrity feels physically uncomfortable in your presence.',
        blindSpots: 'Your commanding presence can suppress the voices of those who are intimidated by authority. You may create a culture where people perform well but don\'t innovate, because the cost of failure feels too high. Your high standards, while admirable, can become perfectionism that paralyzes your team. You may also struggle to delegate meaningfully, because your internal standard is so specific that no one else\'s work quite meets it.',
        developmentPath: 'Distinguish between standards and control. Your standards should define the "what"—the quality of the outcome. But you must release control of the "how"—the process by which your team achieves it. Practice saying: "Here is what excellence looks like. How you get there is your decision. I trust you." Then actually trust them. When their approach differs from yours but achieves the standard, celebrate it publicly. This teaches your team that you value competence, not compliance.',
        scenario: 'A team member delivers a project that meets all requirements but used a completely different methodology than you would have chosen. Your instinct is to critique the approach. Instead, say: "This is excellent work. I would have done it differently, but your approach achieved the same standard. Tell me about your reasoning—I want to learn from it." This transforms your authority from intimidating to developmental.',
        practicalAdvice: 'Identify one project this quarter where you will define the outcome standard but completely delegate the methodology. Check in on progress, not process. At the end, evaluate only the result. This exercise will reveal whether your team is as capable as you suspect—and will build their confidence in ways your direct guidance never could.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        leadershipStyle: 'The Master Builder',
        defaultApproach: 'You lead through execution. While others are still debating strategy, you are already building the first prototype. You are the leader who translates vision into reality—who takes the CEO\'s ambitious keynote and turns it into a project plan with milestones, dependencies, and resource allocations. You don\'t inspire through words; you inspire through results. Your team trusts you because you have never promised something you couldn\'t deliver, and you have never delivered something that didn\'t work.',
        blindSpots: 'Your focus on execution can make you dismissive of strategic thinking. You may view "big picture" conversations as impractical and push to "just start building" before the direction is fully validated. This can lead to beautifully executed solutions to the wrong problems. You can also undervalue the emotional and relational aspects of leadership, treating team management as a logistics problem rather than a human one.',
        developmentPath: 'Develop the discipline of "strategic patience." Before starting to build, spend time understanding not just what needs to be built, but why. Ask: "If we execute this perfectly, what does success look like in 12 months? In 36 months?" This connects your execution excellence to strategic outcomes. Also, schedule regular one-on-one conversations with your team members that are explicitly not about work—ask about their career aspirations, their challenges, their lives. This builds the relational foundation that makes your operational leadership sustainable.',
        scenario: 'Leadership asks you to build a new system. Before opening your project management tool, schedule a 30-minute conversation with the stakeholder who requested it. Ask: "What problem are we solving? How will we know it\'s solved? What happens if we don\'t build this?" These questions may change the scope, the timeline, or the entire approach—and they will make your execution dramatically more valuable.',
        practicalAdvice: 'For your next project, create two documents before you start building: a one-page "Why" document (the strategic rationale) and a one-page "How" document (the execution plan). Share both with your team. This practice ensures that your legendary execution is always pointed in the right direction.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        leadershipStyle: 'The Environmental Architect',
        defaultApproach: 'You lead by creating the physical and sensory conditions for peak performance. You are the leader who notices that the team\'s productivity dropped when they moved to the open-plan office, who advocates for better lighting in the meeting rooms, who ensures that the retreat venue has comfortable chairs and good coffee. You understand something that most leaders miss: human beings are physical creatures, and the quality of their environment directly determines the quality of their output.',
        blindSpots: 'Your sensitivity to environment can make you seem overly focused on comfort at the expense of urgency. In crisis situations, your instinct to create optimal conditions can feel tone-deaf when the team needs speed, not ambiance. You may also project your own sensory needs onto others, assuming that everyone requires the same environmental conditions to perform well. Your advocacy for "human-centered design" can be dismissed as "fussiness" by leaders who prioritize speed over sustainability.',
        developmentPath: 'Learn to calibrate your environmental advocacy to the organizational context. In a crisis, shift from "let\'s optimize the environment" to "let\'s make sure people have what they need to sustain this pace"—water, breaks, clear communication. In normal operations, build the business case for environmental investment by connecting it to measurable outcomes: retention rates, sick days, productivity metrics. When you can show that a $5,000 investment in ergonomic chairs saved $50,000 in turnover costs, your advocacy becomes strategic, not aesthetic.',
        scenario: 'The team is working long hours on a critical launch. Instead of advocating for a slower pace (which isn\'t possible), focus on sustainability: arrange meal delivery so people don\'t skip lunch, ensure the workspace has good lighting for late nights, and schedule mandatory 15-minute breaks every two hours. Say: "We need to sprint, but we can sprint smart." This is environmental leadership in action.',
        practicalAdvice: 'Conduct an informal "environment audit" of your team\'s workspace. Ask each person: "What one thing about your physical workspace, if changed, would make you more productive?" Compile the responses and present them to leadership with cost estimates. You\'ll likely find that most improvements are inexpensive and have outsized impact.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        leadershipStyle: 'The Excellence Curator',
        defaultApproach: 'You lead by raising the standard of everything you touch. You are the leader whose presentations are always the most polished, whose team\'s deliverables are always the most refined, and whose projects have an unmistakable quality that others try to replicate but cannot. You don\'t just meet expectations—you redefine them. Your leadership is aspirational: people want to work with you because your standards elevate their own work. You make everyone around you better by making "good enough" feel insufficient.',
        blindSpots: 'Your pursuit of excellence can become perfectionism that delays delivery and exhausts your team. You may spend hours refining a presentation that was already effective, or request multiple revisions on work that met the brief but didn\'t meet your aesthetic standard. Your team may feel that nothing they produce is ever quite good enough, leading to demoralization disguised as high performance. You can also undervalue speed and iteration, preferring to launch one perfect thing rather than three good things that improve over time.',
        developmentPath: 'Develop a "tiered excellence" framework. Not everything requires your highest standard. Categorize work into three tiers: Tier 1 (client-facing, high-stakes—apply full excellence), Tier 2 (internal, important—apply professional quality), and Tier 3 (operational, routine—apply functional adequacy). Communicate these tiers to your team so they know when to polish and when to ship. This preserves your reputation for excellence while preventing the burnout that comes from applying maximum effort to everything.',
        scenario: 'Your team submits an internal report that is accurate and complete but visually unpolished. Your instinct is to send it back for redesign. Instead, ask: "Is this going to a client or staying internal?" If internal, approve it with a note: "Great content. For client-facing work, I\'d want to elevate the presentation, but for internal purposes, this is exactly what we need." This teaches discernment, not just standards.',
        practicalAdvice: 'Create a "quality checklist" for your team that has three levels: Essential (must have), Professional (should have), and Exceptional (nice to have). For each project, specify which level applies. This gives your team clear guidance and prevents the anxiety of trying to guess your standard.'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Leading Through Insight',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        leadershipStyle: 'The Analytical Architect',
        defaultApproach: 'You lead through intellectual clarity and evidence-based decision-making. You are the leader who cuts through emotional noise, political maneuvering, and cognitive bias to reveal what the data actually says. Your meetings are efficient, your analyses are rigorous, and your recommendations are defensible. You don\'t lead by charisma—you lead by being right, consistently, and by making the reasoning transparent so others can verify it independently.',
        blindSpots: 'Your analytical rigor can feel cold and dismissive to team members who process information emotionally. You may present a logically perfect argument that fails to persuade because you didn\'t account for the human factors—fear of change, attachment to existing methods, personal investment in alternative approaches. You can also over-analyze, requesting more data when the decision is already clear, because the act of analysis feels safer than the act of commitment.',
        developmentPath: 'Learn to "translate" your analysis into emotional language without diluting it. Before presenting a data-driven recommendation, ask yourself: "How will this make people feel?" Then address those feelings explicitly. Say: "I know this data suggests a direction that feels uncomfortable. Let me explain why I believe the discomfort is worth it." Also, set decision deadlines for yourself. When you have 80% of the information you want, decide. The remaining 20% rarely changes the conclusion, and the cost of delay usually exceeds the cost of imperfection.',
        scenario: 'You\'ve analyzed the data and the conclusion is clear: a popular but underperforming product line should be discontinued. Before presenting your recommendation, meet individually with the three people most emotionally invested in the product. Share your analysis privately, listen to their concerns, and incorporate their perspective into your presentation—not to change your conclusion, but to demonstrate that you\'ve considered the human impact.',
        practicalAdvice: 'For your next major presentation, add one slide that addresses the emotional implications of your recommendation. Title it "What This Means for Our Team" and include specific actions you\'ll take to support people through the transition. This single addition will dramatically increase the persuasive power of your analysis.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        leadershipStyle: 'The Innovation Architect',
        defaultApproach: 'You lead through creative disruption and cross-pollination. You are the leader who reads a book about marine biology and sees a solution to a supply chain problem, who attends a jazz concert and redesigns the team\'s workflow based on improvisational principles. Your mind makes connections that no one else can see, and your enthusiasm for these connections is genuinely infectious. You lead by expanding the team\'s cognitive range—by making them think in ways they never would have on their own.',
        blindSpots: 'Your creative range can feel chaotic to team members who need structure and predictability. You may introduce so many new ideas, frameworks, and references that your team cannot distinguish between a passing thought and a strategic direction. Your enthusiasm for novelty can also make you dismissive of incremental improvement—you may overlook the value of refining what already works in favor of replacing it with something entirely new. Your team may feel intellectually stimulated but operationally confused.',
        developmentPath: 'Develop a "signal-to-noise" discipline. Before sharing an idea with your team, categorize it: is this a "thought" (interesting but not actionable), a "hypothesis" (worth testing), or a "direction" (commit resources)? Communicate the category explicitly. Say: "I had a thought I want to share—this is not a direction, just something to consider." This gives your team permission to engage with your creativity without the anxiety of wondering if everything is a new mandate.',
        scenario: 'You\'ve just returned from a conference with 12 new ideas. Instead of presenting all of them at the next team meeting, write them down and let them sit for a week. Then select the two that still feel compelling and present them as hypotheses: "I\'d like us to spend one sprint testing this idea. If it works, we\'ll invest more. If it doesn\'t, we\'ll learn something." This channels your creativity through a filter of discipline.',
        practicalAdvice: 'Create a "Innovation Board" (physical or digital) where you post ideas without discussion. Team members can add comments, questions, or votes over the course of a week. At the end of each month, the top-voted idea gets a formal exploration sprint. This harnesses your creative energy while giving the team agency over what gets pursued.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        leadershipStyle: 'The Diplomatic Unifier',
        defaultApproach: 'You lead through social intelligence and consensus-building. You are the leader who can sit in a room with five stakeholders who have five different agendas and, within an hour, craft a proposal that each person feels reflects their priorities. You don\'t manipulate—you translate. You understand that most disagreements are not about substance but about language, and you have the rare gift of finding the words that allow everyone to say "yes" without feeling they\'ve compromised.',
        blindSpots: 'Your desire for consensus can lead to decisions that are palatable to everyone but optimal for no one. You may craft solutions that avoid conflict at the expense of clarity, producing agreements that are so diplomatically worded that no one is quite sure what was actually decided. You can also exhaust yourself trying to please all parties, neglecting your own needs and boundaries in the process. Your warmth, while genuine, can become a performance if you don\'t protect your own energy.',
        developmentPath: 'Learn to distinguish between alignment and agreement. Alignment means everyone understands the direction and commits to supporting it, even if they would have chosen differently. Agreement means everyone prefers the direction. You need alignment, not agreement. Practice saying: "I hear that you would prefer a different approach. Can you commit to supporting this direction even though it\'s not your first choice?" This is honest leadership, not people-pleasing.',
        scenario: 'You\'re facilitating a decision between two departments with competing priorities. Instead of finding a compromise that satisfies neither, present both options clearly, state the trade-offs, and then make a recommendation: "Based on our strategic priorities, I recommend Option A. I understand this is not what Department B prefers, and here is how we\'ll mitigate the impact on your team." This is diplomacy with backbone.',
        practicalAdvice: 'Before your next stakeholder meeting, write down your own preferred outcome—not the consensus position, but what you actually think is best. Use this as your anchor during the discussion. You can still build consensus, but now you\'re building it around a position you believe in, not around the path of least resistance.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        leadershipStyle: 'The Perceptive Navigator',
        defaultApproach: 'You lead through intuitive perception and subtle influence. You are the leader who senses a shift in team morale before anyone has said a word, who notices that a client\'s tone has changed in ways that predict a contract renegotiation, who feels the organizational weather shifting weeks before the official announcement. Your leadership is anticipatory—you don\'t react to problems, you sense them forming and intervene before they materialize. You are the early warning system that every organization needs but few know how to value.',
        blindSpots: 'Your intuitive perceptions can be difficult to communicate in environments that demand evidence and logic. You may sense that a hire is wrong, a strategy is flawed, or a partnership is toxic—but struggle to articulate why in terms that others find convincing. This can lead to frustration when your warnings go unheeded and later prove correct. You may also doubt your own perceptions, second-guessing your intuition because it doesn\'t fit neatly into a spreadsheet.',
        developmentPath: 'Develop a "translation practice" for your intuitions. When you sense something, take 24 hours to find the observable evidence that supports your perception. Your intuition is almost certainly picking up on real signals—micro-expressions, tonal shifts, behavioral patterns—that you can learn to identify and articulate. Instead of saying "I have a feeling this won\'t work," say: "I\'ve noticed three things that concern me: the client\'s response time has doubled, their questions have shifted from strategic to tactical, and they cancelled the last two check-ins. I think we may be losing their confidence."',
        scenario: 'You sense that a new team member is struggling but hasn\'t said anything. Instead of waiting for the problem to become visible, schedule a casual coffee chat. Say: "I wanted to check in—not about any specific issue, just to see how you\'re settling in. What\'s been easier than expected? What\'s been harder?" Your intuition opened the door; now let them walk through it.',
        practicalAdvice: 'Start keeping an "intuition log." When you have a strong perception about a person, situation, or decision, write it down with the date. Include any observable evidence you can identify. Review the log quarterly. You\'ll build a track record that validates your perceptions and gives you confidence to voice them earlier and more assertively.'
      }
    ]
  }
];

interface ElementalLeadershipStylesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const ElementalLeadershipStyles: React.FC<ElementalLeadershipStylesProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            Leadership is not a costume you put on. It is the natural expression of your elemental energy when given authority, 
            responsibility, and the trust of others. The question is not whether you can lead—it is whether you can lead as yourself, 
            without imitating someone else's style or suppressing your own nature.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {leadershipData.map((element) => (
          <div
            key={element.element}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.elementId)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.elementId)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                    {isUserElement(element.elementId) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.tagline}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Element Description Banner */}
            {expandedElements.includes(element.elementId) && (
              <div
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  borderColor: `${element.gradientFrom}40`
                }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.tagline} — Explore how each {element.element} subtype naturally leads, their blind spots, and how to develop authentic leadership capacity.
                  </p>
                </div>
              </div>
            )}

            {/* Subtypes Content */}
            {expandedElements.includes(element.elementId) && (
              <div className="bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 space-y-8">
                  {element.subtypes.map((subtype) => {
                    const isHighlighted = isUserSubtype(subtype.subtypeId);

                    return (
                      <div
                        key={subtype.subtype}
                        className={`relative rounded-xl p-6 md:p-8 transition-all duration-300 ${
                          isHighlighted
                            ? GUIDE_USER_SUBTYPE_CARD_CLASS
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        style={{
                          background: !isHighlighted
                            ? `linear-gradient(135deg, ${element.gradientFrom}06, ${element.gradientTo}06)`
                            : undefined
                        }}
                      >
                        {/* User's Subtype Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-3 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Your Leadership Style
                            </span>
                          </div>
                        )}

                        {/* Subtype Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                              color: element.gradientFrom
                            }}
                          >
                            {subtype.subtype}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="text-sm text-gray-500 italic">{subtype.name}</span>
                        </div>

                        {/* Leadership Style Title */}
                        <h4 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                          <Shield className="w-5 h-5" style={{ color: element.gradientFrom }} />
                          {subtype.leadershipStyle}
                        </h4>

                        {/* Default Leadership Approach */}
                        <div className="p-4 md:p-5 bg-blue-50/80 rounded-lg border border-blue-100 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-sm text-blue-700">
                              Default Leadership Approach
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.defaultApproach}
                          </p>
                        </div>

                        {/* Blind Spots */}
                        <div className="p-4 md:p-5 bg-amber-50/80 rounded-lg border border-amber-100 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="font-semibold text-sm text-amber-700">
                              Blind Spots as a Leader
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.blindSpots}
                          </p>
                        </div>

                        {/* Development Path */}
                        <div className="p-4 md:p-5 bg-emerald-50/80 rounded-lg border border-emerald-100 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold text-sm text-emerald-700">
                              Developing Your Leadership Capacity
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.developmentPath}
                          </p>
                        </div>

                        {/* Scenario */}
                        <div className="p-4 md:p-5 bg-violet-50/80 rounded-lg border border-violet-100 mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-violet-600" />
                            <span className="font-semibold text-sm text-violet-700">
                              Leadership Scenario
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700 italic">
                            {subtype.scenario}
                          </p>
                        </div>

                        {/* Practical Advice */}
                        <div
                          className="p-4 md:p-5 rounded-lg border"
                          style={{
                            background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                            borderColor: `${element.gradientFrom}25`
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Practical Advice
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.practicalAdvice}
                          </p>
                        </div>

                        {/* Decorative corner accent */}
                        <div
                          className="absolute top-0 right-0 w-20 h-20 opacity-15 rounded-tr-xl rounded-bl-full"
                          style={{
                            background: `linear-gradient(to bottom left, ${element.gradientFrom}40, transparent)`
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* The Leadership Truth */}
      <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-violet-50 rounded-2xl border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Leadership Truth</h4>
            <p className="text-gray-600 leading-relaxed">
              The most dangerous leadership myth is that there is one correct way to lead. There is not. There are 
              sixteen elemental frequencies of leadership, each with its own genius and its own shadow. Your task is 
              not to become a "better leader" by someone else's definition. Your task is to become the fullest, most 
              conscious expression of the leader you already are. When you lead from your elemental nature—aware of 
              your gifts, honest about your blind spots, and committed to growth without self-betrayal—you do not 
              just lead effectively. You lead authentically. And authentic leadership is the only kind that endures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalLeadershipStyles;
