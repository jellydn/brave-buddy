import type { AgeText, Scenario } from '../types'

const both = (text: string): AgeText => ({ '6-8': text, '9-12': text })
const age = (younger: string, older: string): AgeText => ({ '6-8': younger, '9-12': older })

export const scenarios: Scenario[] = [
  {
    id: 'friends-playground-join', world: 'friends', kind: 'misunderstanding', setting: 'Playground',
    title: 'Room in the rocket?', visual: { emoji: '🚀', label: 'Children playing a space game', accent: '#dff5e9' },
    scene: age('Two kids are playing a space game. They do not hear you ask to join.', 'Two kids are busy making rules for a space game. Your first question to join gets missed.'),
    feelings: [{ id: 'left-out', emoji: '😕', label: 'Left out' }, { id: 'angry', emoji: '😠', label: 'Angry' }, { id: 'excited', emoji: '🤩', label: 'Excited' }], likelyFeeling: 'left-out',
    choices: [
      { id: 'ask-role', label: age('Ask, “Can I be the space helper?”', 'Wait for a pause and ask, “Is there a role I can take?”'), quality: 'helpful', explanation: both('A clear, friendly question helps them notice you and gives them an easy way to include you.'), outcome: both('They look up and make you the mission navigator.'), strategy: both('Wait for a pause, then ask for a role.'), skills: { Courage: 2, Friendship: 2 } },
      { id: 'grab', label: both('Grab the rocket so they notice you.'), quality: 'unsafe', explanation: both('Grabbing can hurt someone or start a bigger problem. You can be noticed without using your hands.'), outcome: both('The game stops. Take a breath and try a calm question instead.'), skills: { Calmness: 1 } },
      { id: 'walk', label: both('Walk away without saying anything.'), quality: 'try-again', explanation: both('Leaving is always allowed, but they may not know you wanted to join. A friendly question may solve the mix-up.'), outcome: both('You still feel left out. You can try asking once more or choose another game.'), skills: { Safety: 1 } },
    ], requiresAdultHelp: false, skills: ['Courage', 'Friendship'], conversationPrompt: 'What is one friendly way to join a game that has already started?'
  },
  {
    id: 'friends-party-upstander', world: 'friends', kind: 'conflict', setting: 'Birthday Party',
    title: 'A seat for everyone', visual: { emoji: '🎈', label: 'A birthday table with an open chair', accent: '#fff0cf' },
    scene: age('You see Sami standing alone while everyone picks a party game.', 'At a party, you notice Sami hovering near the group while teams are being chosen.'),
    feelings: [{ id: 'lonely', emoji: '😔', label: 'Lonely' }, { id: 'calm', emoji: '🙂', label: 'Calm' }, { id: 'silly', emoji: '🤪', label: 'Silly' }], likelyFeeling: 'lonely',
    choices: [
      { id: 'invite', label: both('Say, “Sami, do you want to be on our team?”'), quality: 'helpful', explanation: both('Including someone directly can make it easier for them to join.'), outcome: both('Sami smiles and joins. The team makes room.'), strategy: both('Notice who is alone and offer a clear invitation.'), skills: { Kindness: 2, Friendship: 2, Courage: 1 } },
      { id: 'ignore', label: both('Do nothing because it is not your problem.'), quality: 'try-again', explanation: both('You did not cause the problem, but one kind invitation can help.'), outcome: both('Sami stays alone. You still have time to check in.'), skills: {} },
      { id: 'announce', label: both('Shout, “Everyone is leaving Sami out!”'), quality: 'try-again', explanation: both('Calling attention to Sami may feel embarrassing. A quiet invitation is kinder.'), outcome: both('Everyone stares. Try speaking to Sami directly.'), skills: { Courage: 1 } },
    ], requiresAdultHelp: false, skills: ['Kindness', 'Friendship', 'Courage'], conversationPrompt: 'How can you include someone without putting them on the spot?'
  },
  {
    id: 'problems-marker-mixup', world: 'problems', kind: 'misunderstanding', setting: 'Classroom',
    title: 'The missing marker', visual: { emoji: '🖍️', label: 'Two children near a box of art supplies', accent: '#e8ebff' },
    scene: age('Your favorite marker is gone. Noor has one that looks the same.', 'Your favorite marker is missing after art time. Noor is holding the same color and brand.'),
    feelings: [{ id: 'worried', emoji: '😟', label: 'Worried' }, { id: 'angry', emoji: '😠', label: 'Angry' }, { id: 'proud', emoji: '😌', label: 'Proud' }], likelyFeeling: 'worried',
    choices: [
      { id: 'ask-check', label: age('Say, “Mine is missing. Can we check?”', 'Say, “Mine is missing. Could we check the names or the supply box?”'), quality: 'helpful', explanation: both('Checking facts first keeps a possible mix-up from becoming a fight.'), outcome: both('Your marker is under a paper. Noor helps you find it.'), strategy: both('Before blaming, say what you noticed and check the facts.'), skills: { Calmness: 2, Friendship: 2 } },
      { id: 'accuse', label: both('Tell everyone Noor stole it.'), quality: 'unsafe', explanation: both('An accusation can hurt someone when you do not know what happened.'), outcome: both('Noor feels upset. Pause, correct what you said, and check the room.'), skills: { Calmness: 1 } },
      { id: 'snatch', label: both('Snatch the marker back.'), quality: 'unsafe', explanation: both('Taking from someone can start a physical struggle. Use words and ask an adult to help if needed.'), outcome: both('Both of you grip the marker. Let go, step back, and ask the teacher for help.'), skills: { Safety: 1 } },
    ], requiresAdultHelp: false, skills: ['Calmness', 'Friendship'], conversationPrompt: 'What can we say when we are not sure whether something was an accident?'
  },
  {
    id: 'problems-pressure-dare', world: 'problems', kind: 'unsafe', setting: 'Sports Club',
    title: 'The risky dare', visual: { emoji: '🧗', label: 'A high equipment shelf at sports club', accent: '#e1f2ff' },
    scene: age('A teammate dares you to climb a tall equipment shelf when the coach is away.', 'A teammate pressures you to climb an equipment shelf and says you must keep it secret from the coach.'),
    feelings: [{ id: 'unsafe', emoji: '😰', label: 'Unsafe' }, { id: 'bored', emoji: '🥱', label: 'Bored' }, { id: 'happy', emoji: '😊', label: 'Happy' }], likelyFeeling: 'unsafe',
    choices: [
      { id: 'no-coach', label: age('Say “No,” move away, and tell the coach.', 'Say “No,” leave the area, and tell the coach what happened.'), quality: 'helpful', explanation: both('You never have to accept an unsafe dare. Moving away and telling an adult protects everyone.'), outcome: both('The coach locks the equipment area and checks that everyone is safe.'), strategy: both('For an unsafe dare: say no, move away, and tell a trusted adult.'), skills: { Courage: 2, Safety: 3, Calmness: 1 }, getsAdultHelp: true },
      { id: 'prove', label: both('Climb it to prove you are brave.'), quality: 'unsafe', explanation: both('Risking injury is not courage. Real courage can mean saying no.'), outcome: both('The shelf wobbles. Climb down carefully if you can and call the coach now.'), skills: { Safety: 1 }, getsAdultHelp: true },
      { id: 'secret', label: both('Walk away but promise not to tell.'), quality: 'try-again', explanation: both('Walking away is good. An unsafe secret still needs a trusted adult so nobody gets hurt.'), outcome: both('Your teammate may try again. Tell the coach so the area can be made safe.'), skills: { Safety: 2 }, getsAdultHelp: true },
    ], requiresAdultHelp: true, skills: ['Courage', 'Safety'], conversationPrompt: 'Who are three trusted adults you can tell about an unsafe dare?'
  },
  {
    id: 'teasing-voice', world: 'teasing', kind: 'teasing', setting: 'Canteen',
    title: 'Copying a voice', visual: { emoji: '🥪', label: 'Children talking at a lunch table', accent: '#ffebd6' },
    scene: age('A child copies the way you say a word and laughs.', 'A classmate imitates your voice or accent at lunch to get laughs.'),
    feelings: [{ id: 'hurt', emoji: '😣', label: 'Hurt' }, { id: 'sleepy', emoji: '😴', label: 'Sleepy' }, { id: 'excited', emoji: '🤩', label: 'Excited' }], likelyFeeling: 'hurt',
    choices: [
      { id: 'boundary', label: age('Say, “Stop. I do not like that,” then move away.', 'Say calmly, “Do not copy my voice. It is not funny to me,” then move away.'), quality: 'helpful', explanation: both('A short boundary says what must stop. Moving away keeps you out of an argument.'), outcome: both('The child stops laughing. You sit near a supportive friend.'), strategy: both('Use a short boundary: “Stop. I do not like that.”'), skills: { Courage: 2, Calmness: 2, Safety: 1 } },
      { id: 'insult', label: both('Make fun of their voice back.'), quality: 'unsafe', explanation: both('Hurting them back grows the problem and can hurt other people too.'), outcome: both('Now both people are upset. Stop, move away, and reset.'), skills: { Calmness: 1 } },
      { id: 'laugh', label: both('Pretend it is funny even though it hurts.'), quality: 'try-again', explanation: both('You do not have to laugh along. Your feelings and boundary matter.'), outcome: both('They may think it is okay to continue. Try a clear boundary or get support.'), skills: { Courage: 1 } },
    ], requiresAdultHelp: false, skills: ['Courage', 'Calmness', 'Safety'], conversationPrompt: 'Practice a short boundary that feels natural to say.'
  },
  {
    id: 'teasing-appearance-upstander', world: 'teasing', kind: 'teasing', setting: 'School Bus',
    title: 'A kind upstander', visual: { emoji: '🚌', label: 'Children sitting on a school bus', accent: '#fff2ba' },
    scene: age('Someone makes an unkind comment about Jo’s looks. Jo goes quiet.', 'A student makes a shaming comment about Jo’s appearance. Jo looks uncomfortable and turns away.'),
    feelings: [{ id: 'embarrassed', emoji: '😳', label: 'Embarrassed' }, { id: 'relaxed', emoji: '😌', label: 'Relaxed' }, { id: 'curious', emoji: '🤔', label: 'Curious' }], likelyFeeling: 'embarrassed',
    choices: [
      { id: 'support', label: age('Say, “That is not kind. Jo, sit with me.”', 'Say, “Comments about someone’s appearance are not okay.” Then check in with Jo.'), quality: 'helpful', explanation: both('An upstander names the problem without another insult and supports the person targeted.'), outcome: both('Jo moves beside you. The unkind comments stop.'), strategy: both('Be an upstander: name what is not okay, then support the person.'), skills: { Courage: 2, Kindness: 3, Safety: 1 } },
      { id: 'join', label: both('Add another joke so you fit in.'), quality: 'unsafe', explanation: both('Joining in adds harm. Fitting in should not cost someone else’s safety or dignity.'), outcome: both('Jo looks more upset. Stop and choose a supportive action.'), skills: { Kindness: 1 } },
      { id: 'later', label: both('Stay quiet now but check on Jo later.'), quality: 'try-again', explanation: both('Checking later is kind. If it feels safe, a calm upstander action now can also stop the harm.'), outcome: both('Jo appreciates your check-in. Together, you can tell the bus driver if it continues.'), skills: { Kindness: 2, Safety: 1 } },
    ], requiresAdultHelp: false, skills: ['Courage', 'Kindness', 'Safety'], conversationPrompt: 'What can an upstander do without insulting or confronting anyone?'
  },
  {
    id: 'bullying-repeated-exclusion', world: 'bullying', kind: 'bullying', setting: 'Playground',
    title: 'It keeps happening', visual: { emoji: '⚽', label: 'A child beside a playground football game', accent: '#efe1ff' },
    scene: age('For many days, a group blocks you from every game and calls you names.', 'For two weeks, the same group has deliberately excluded you, called you names, and followed you when you leave.'),
    feelings: [{ id: 'unsafe', emoji: '😰', label: 'Unsafe' }, { id: 'hurt', emoji: '😣', label: 'Hurt' }, { id: 'happy', emoji: '😊', label: 'Happy' }], likelyFeeling: 'unsafe',
    choices: [
      { id: 'tell-details', label: age('Go to a trusted adult and say it keeps happening.', 'Tell a trusted adult who, what, where, and that it has happened repeatedly.'), quality: 'helpful', explanation: both('Repeated, targeted harm is bullying. An adult should help make a safety plan; you do not have to solve it alone.'), outcome: both('The adult listens, checks your safety, and plans support for break time.'), strategy: both('For repeated harm, tell a trusted adult what happened, where, and how often.'), skills: { Courage: 2, Safety: 3 }, getsAdultHelp: true },
      { id: 'fight', label: both('Plan to hurt the group back tomorrow.'), quality: 'unsafe', explanation: both('Retaliation can cause injury and more trouble. Your job is to get safe, not to punish them.'), outcome: both('Pause the plan and tell a trusted adult now.'), skills: { Safety: 1 }, getsAdultHelp: true },
      { id: 'hide', label: both('Keep it secret so nobody calls you a tattletale.'), quality: 'unsafe', explanation: both('Getting help for repeated harm is not tattling. Safe adults need to know.'), outcome: both('The problem may continue. Choose an adult who listens and tell them today.'), skills: { Courage: 1, Safety: 1 }, getsAdultHelp: true },
    ], requiresAdultHelp: true, skills: ['Courage', 'Safety'], conversationPrompt: 'Which adults could help if the first person you tell does not act?'
  },
  {
    id: 'bullying-physical-threat', world: 'bullying', kind: 'unsafe', setting: 'School Bus',
    title: 'A threat on the bus', visual: { emoji: '🚏', label: 'A bus stop with a trusted driver nearby', accent: '#eadfff' },
    scene: age('A student says they will hit you after the bus ride.', 'A student makes a physical threat and says they will wait for you after you get off the bus.'),
    feelings: [{ id: 'unsafe', emoji: '😰', label: 'Unsafe' }, { id: 'amused', emoji: '😄', label: 'Amused' }, { id: 'bored', emoji: '🥱', label: 'Bored' }], likelyFeeling: 'unsafe',
    choices: [
      { id: 'driver', label: age('Stay near the driver and tell them now.', 'Move near the driver or another safe adult and report the exact threat now.'), quality: 'helpful', explanation: both('A physical threat needs adult help right away. Stay where safe adults can see you.'), outcome: both('The driver keeps you on the bus, contacts support, and makes sure you leave safely.'), strategy: both('For a threat: move toward safety and tell an adult immediately.'), skills: { Courage: 2, Safety: 3, Calmness: 1 }, getsAdultHelp: true },
      { id: 'meet', label: both('Meet them alone to show you are not scared.'), quality: 'unsafe', explanation: both('You do not need to prove anything. Going alone could put you in danger.'), outcome: both('Do not go to the meeting place. Stay with a trusted adult and tell them.'), skills: { Safety: 1 }, getsAdultHelp: true },
      { id: 'threaten', label: both('Threaten them back.'), quality: 'unsafe', explanation: both('A threat back can increase danger. Use your energy to move toward help.'), outcome: both('End the exchange and tell the driver or another trusted adult now.'), skills: { Safety: 1 }, getsAdultHelp: true },
    ], requiresAdultHelp: true, skills: ['Courage', 'Safety', 'Calmness'], conversationPrompt: 'Where are the safe adult spaces on your usual journey?'
  },
  {
    id: 'help-online-secret', world: 'help', kind: 'unsafe', setting: 'Online World',
    title: 'An uncomfortable secret', visual: { emoji: '💬', label: 'A tablet with a warning shield', accent: '#ffe1e5' },
    scene: age('Someone online asks for a private picture and says to keep it secret.', 'An online contact asks for a private image, says you will be in trouble if you tell, and wants it kept secret.'),
    feelings: [{ id: 'unsafe', emoji: '😰', label: 'Unsafe' }, { id: 'confused', emoji: '😕', label: 'Confused' }, { id: 'proud', emoji: '😌', label: 'Proud' }], likelyFeeling: 'unsafe',
    choices: [
      { id: 'stop-tell', label: age('Do not reply. Close it and show a trusted adult.', 'Do not respond or send anything. Leave the chat and show a trusted adult immediately.'), quality: 'helpful', explanation: both('Safe adults do not ask children to keep uncomfortable secrets. You are not in trouble for telling.'), outcome: both('A trusted adult helps save the information, block the contact, and keep you safe.'), strategy: both('Online safety: do not reply, leave the chat, and show a trusted adult.'), skills: { Courage: 2, Safety: 3 }, getsAdultHelp: true },
      { id: 'send', label: both('Send it so they do not get angry.'), quality: 'unsafe', explanation: both('You never owe anyone a private picture. Stop now and tell a trusted adult; you will not be blamed here.'), outcome: both('Leave the chat and get a trusted adult right away, even if you already sent something.'), skills: { Safety: 1 }, getsAdultHelp: true },
      { id: 'delete-secret', label: both('Delete the chat and keep it secret.'), quality: 'unsafe', explanation: both('Keeping this secret can let the person continue. A trusted adult can help without blaming you.'), outcome: both('Before doing anything else, take the device to a trusted adult.'), skills: { Courage: 1, Safety: 2 }, getsAdultHelp: true },
    ], requiresAdultHelp: true, skills: ['Courage', 'Safety'], conversationPrompt: 'What should a child do if an online message feels wrong or asks for secrecy?'
  },
  {
    id: 'help-friend-self-harm', world: 'help', kind: 'unsafe', setting: 'Home',
    title: 'A friend needs help now', visual: { emoji: '☎️', label: 'A phone beside a caring adult', accent: '#ffe4e8' },
    scene: age('A friend says they might hurt themselves and makes you promise not to tell.', 'A friend messages that they may hurt themselves. They ask you to keep it secret.'),
    feelings: [{ id: 'worried', emoji: '😟', label: 'Worried' }, { id: 'relaxed', emoji: '😌', label: 'Relaxed' }, { id: 'silly', emoji: '🤪', label: 'Silly' }], likelyFeeling: 'worried',
    choices: [
      { id: 'adult-now', label: age('Tell a trusted adult right now.', 'Tell a trusted adult immediately and show them the message if you can.'), quality: 'helpful', explanation: both('When someone may hurt themselves, getting adult help now is caring. This secret is too big to hold alone.'), outcome: both('The adult takes over and gets urgent support for your friend. You did the caring thing.'), strategy: both('If someone may hurt themselves, tell a trusted adult immediately.'), skills: { Courage: 2, Kindness: 2, Safety: 3 }, getsAdultHelp: true },
      { id: 'promise', label: both('Promise to keep it secret and handle it alone.'), quality: 'unsafe', explanation: both('This needs urgent adult help. Keeping the promise could leave both of you without support.'), outcome: both('Break the secrecy promise and get a trusted adult now.'), skills: { Safety: 1 }, getsAdultHelp: true },
      { id: 'dismiss', label: both('Say they are being dramatic and ignore it.'), quality: 'unsafe', explanation: both('Always take talk of self-harm seriously. You do not need to decide whether they mean it.'), outcome: both('Find a trusted adult and tell them exactly what your friend said.'), skills: { Safety: 1 }, getsAdultHelp: true },
    ], requiresAdultHelp: true, skills: ['Courage', 'Kindness', 'Safety'], conversationPrompt: 'Why is it caring—not disloyal—to get adult help for a friend in danger?'
  },
]
