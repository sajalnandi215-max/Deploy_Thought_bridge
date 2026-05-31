export const interests = [
  { id: "tech", name: "Technology", emoji: "💻", color: "from-blue-500 to-cyan-500" },
  { id: "programming", name: "Programming", emoji: "⌨️", color: "from-violet-500 to-purple-500" },
  { id: "college", name: "College Life", emoji: "🎓", color: "from-pink-500 to-rose-500" },
  { id: "startups", name: "Startups", emoji: "🚀", color: "from-orange-500 to-red-500" },
  { id: "travel", name: "Travel", emoji: "✈️", color: "from-teal-500 to-emerald-500" },
  { id: "gaming", name: "Gaming", emoji: "🎮", color: "from-indigo-500 to-blue-500" },
  { id: "books", name: "Books", emoji: "📚", color: "from-amber-500 to-yellow-500" },
  { id: "movies", name: "Movies", emoji: "🎬", color: "from-fuchsia-500 to-pink-500" },
  { id: "relationships", name: "Relationships", emoji: "💞", color: "from-rose-500 to-pink-500" },
  { id: "career", name: "Career", emoji: "💼", color: "from-slate-500 to-zinc-500" },
  { id: "wellness", name: "Mental Wellness", emoji: "🧘", color: "from-green-500 to-teal-500" },
  { id: "science", name: "Science", emoji: "🔬", color: "from-cyan-500 to-sky-500" },
];

export const rooms = [
  { id: "late-night", name: "Late Night Thoughts", description: "When sleep escapes and minds wander.", active: 1284, vibe: "🌙" },
  { id: "engineering", name: "Engineering Students", description: "Assignments, internships, and survival tips.", active: 932, vibe: "⚙️" },
  { id: "founders", name: "Startup Founders", description: "Building, breaking, and shipping in public.", active: 421, vibe: "🚀" },
  { id: "travel", name: "Travel Stories", description: "Trade itineraries and untold journeys.", active: 658, vibe: "🌍" },
  { id: "books", name: "Book Club", description: "What you're reading and what's reading you.", active: 312, vibe: "📖" },
  { id: "career", name: "Career Guidance", description: "Resumes, raises, and reinventions.", active: 547, vibe: "💼" },
  { id: "gaming", name: "Gaming Lounge", description: "Co-op nights, lore deep dives, and tier lists.", active: 1841, vibe: "🎮" },
];

export const thoughts = [
  { id: "1", author: "Stranger #482", avatar: "🦊", time: "2m", content: "Sometimes the loudest minds belong to the quietest people. Anyone else feel like their best ideas come at 3am?", likes: 142, comments: 23, tag: "Late Night" },
  { id: "2", author: "Stranger #119", avatar: "🐙", time: "8m", content: "Just shipped my first product after 11 months of building in silence. No followers, no launch — just a tiny 'Pay $5' button that someone clicked. I cried.", likes: 891, comments: 142, tag: "Startups" },
  { id: "3", author: "Stranger #027", avatar: "🦉", time: "15m", content: "Hot take: the best part of solo travel isn't the places, it's becoming a stranger to yourself.", likes: 327, comments: 41, tag: "Travel" },
  { id: "4", author: "Stranger #908", avatar: "🐢", time: "22m", content: "Reading 'The Pragmatic Programmer' again. Hits differently 5 years into a career. Half of it I already learned the hard way.", likes: 218, comments: 34, tag: "Books" },
  { id: "5", author: "Stranger #553", avatar: "🦋", time: "1h", content: "Therapy taught me that 'I'm fine' is a complete sentence — but rarely a true one.", likes: 1204, comments: 187, tag: "Wellness" },
  { id: "6", author: "Stranger #341", avatar: "🐉", time: "2h", content: "Replaying Hollow Knight for the third time. Some games age into different people every playthrough.", likes: 412, comments: 58, tag: "Gaming" },
];

export const trending = [
  { tag: "#3amThoughts", posts: "12.4k" },
  { tag: "#FirstJob", posts: "8.1k" },
  { tag: "#SoloTravel", posts: "6.7k" },
  { tag: "#IndieHackers", posts: "4.9k" },
  { tag: "#BookTok", posts: "3.2k" },
];

export const aiSuggestions = [
  "What's a belief you held strongly 5 years ago that you've completely changed your mind on?",
  "Describe a small moment from this week that you can't stop thinking about.",
  "If you could send one anonymous message to your past self, what would it be?",
];

export const notifications = [
  { id: "1", type: "message", title: "Stranger #482 sent you a message", time: "Just now", unread: true },
  { id: "2", type: "room", title: "You were invited to 'Late Night Thoughts'", time: "12m ago", unread: true },
  { id: "3", type: "reply", title: "3 people replied to your thought", time: "1h ago", unread: true },
  { id: "4", type: "friend", title: "Anonymous Friend request from #119", time: "3h ago", unread: false },
  { id: "5", type: "message", title: "New message in 'Startup Founders'", time: "5h ago", unread: false },
  { id: "6", type: "reply", title: "Your thought reached 100 likes", time: "Yesterday", unread: false },
];

export const chatMessages = [
  { id: "1", from: "stranger", text: "hey", time: "12:01" },
  { id: "2", from: "stranger", text: "what brings you here tonight?", time: "12:01" },
  { id: "3", from: "me", text: "couldn't sleep. you?", time: "12:02" },
  { id: "4", from: "stranger", text: "same. been thinking about quitting my job for the past month", time: "12:03" },
  { id: "5", from: "me", text: "what's holding you back?", time: "12:04" },
  { id: "6", from: "stranger", text: "honestly? the silence after. like, what do i do with all that freedom", time: "12:05" },
];
