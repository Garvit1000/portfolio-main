// Blog posts data structure - Fundamentals of Motion

export const blogPosts = [
  {
    id: 1,
    slug: "mastering-ui-animation",
    title: "The Fundamentals of Motion",
    excerpt: "A deep dive into the building blocks of web animation. Understand the logic behind visibility, coordinates, and physics-based interactions.",
    author: "Garvit",
    date: "2025-12-31",
    category: "Guide",
    tags: ["Animation", "React", "Engineering", "Guide"],
    readTime: "15 min read",
    featured: true,
    coverImage: null,
    hasInteractiveBlocks: true,
    content: [
      // INTRO
      {
        type: "heading",
        level: 2,
        text: "Introduction"
      },
      {
        type: "paragraph",
        text: "Hello everyone, welcome to this blog."
      },
      {
        type: "paragraph",
        text: "In this blog, we will start from the very basics and slowly build understanding step by step. You do not need any prior knowledge. By the end, you will have a clear idea of how motion works and why it plays such an important role in creating better user experiences."
      },

      // 1. VISIBILITY
      {
        type: "heading",
        level: 2,
        text: "1. Visibility (Opacity)"
      },
      {
        type: "paragraph",
        text: "The simplest way to show or hide something is by changing its transparency, or \"opacity\". Unlike removing it completely, fading it out feels much smoother."
      },
      {
        type: "heading",
        level: 3,
        text: "Parameters Explained"
      },
      {
        type: "list",
        items: [
          "initial: Where the animation starts.",
          "animate: Where the animation ends.",
          "opacity: 0 means invisible, 1 means fully visible."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "How to Animate"
      },
      {
        type: "paragraph",
        text: "To make an element fade in, we tell it to start at 0 (invisible) and end at 1 (visible). Possible values range from 0 to 1 (e.g., 0.5 is half-transparent)."
      },
      {
        type: "code",
        language: "jsx",
        code: `<motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }}
/>`
      },
      {
        type: "liveEditor",
        title: "Practice: Fade In",
        description: "This element is barely visible (opacity: 0.3). Change the target 'animate' opacity to 1 to make it solid.",
        hint: "Set animate={{ opacity: 1 }}",
        initialCode: `<motion.div
  initial={{ opacity: 0.3 }}
  animate={{ opacity: 0.3 }}
  transition={{ duration: 1 }}
  className="w-24 h-24 bg-primary rounded-xl"
>
</motion.div>`
      },

      // 2. MOVEMENT
      {
        type: "heading",
        level: 2,
        text: "2. Coordinate Space (X & Y)"
      },
      {
        type: "paragraph",
        text: "Moving things around is done using X (horizontal) and Y (vertical) coordinates. It's like a graph from school."
      },
      {
        type: "heading",
        level: 3,
        text: "Parameters Explained"
      },
      {
        type: "list",
        items: [
          "x: Move Left (negative) or Right (positive).",
          "y: Move Up (negative) or Down (positive)."
        ]
      },
      {
        type: "heading",
        level: 3,
        text: "How to Animate"
      },
      {
        type: "paragraph",
        text: "To make an element slide up as it appears, we start it lower down (`y: 50`) and move it to its natural position (`y: 0`)."
      },
      {
        type: "liveEditor",
        title: "Practice: Slide Entrance",
        description: "The box is stuck 50px down. Bring it up to 'y: 0'.",
        hint: "Set animate={{ y: 0 }}",
        initialCode: `<motion.div
  initial={{ y: 50, opacity: 0.5 }}
  animate={{ y: 50, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="w-24 h-24 bg-primary rounded-xl"
>
</motion.div>`
      },

      // 3. SCALE
      {
        type: "heading",
        level: 2,
        text: "3. Spatial Dimensions (Scale)"
      },
      {
        type: "paragraph",
        text: "Scale lets you grow or shrink elements. This is great for drawing attention to something important."
      },
      {
        type: "heading",
        level: 3,
        text: "Parameters Explained"
      },
      {
        type: "list",
        items: [
          "scale: Multiplier of size.",
          "1: Normal size (100%).",
          "0: Invisible (0%).",
          "1.5: 50% bigger."
        ]
      },
      {
        type: "liveEditor",
        title: "Practice: Pop In",
        description: "Create a 'pop-in' effect by scaling from 0.5 to 1.",
        hint: "Use initial={{ scale: 0.5 }} and animate={{ scale: 1 }}",
        initialCode: `<motion.div
  initial={{ scale: 0.5 }}
  animate={{ scale: 0.5 }}
  transition={{ duration: 0.5 }}
  className="w-24 h-24 bg-primary rounded-xl"
>
</motion.div>`
      },

      // 4. PHYSICS
      {
        type: "heading",
        level: 2,
        text: "4. Spring Physics"
      },
      {
        type: "paragraph",
        text: "Real objects don't move in a straight robotic line. They bounce and have weight. We use 'springs' to mimic this natural feel."
      },
      {
        type: "heading",
        level: 3,
        text: "Parameters Explained"
      },
      {
        type: "list",
        items: [
          "type: Set this to 'spring'.",
          "stiffness: How stiff the spring is (higher = snappier).",
          "damping: How much it resists movement (lower = bouncier)."
        ]
      },
      {
        type: "liveEditor",
        title: "Practice: Spring Dynamics",
        description: "Adjust the spring physics to create a playful bounce.",
        hint: "Try stiffness: 300 and damping: 10",
        initialCode: `<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 100, 
    damping: 100 
  }}
  className="w-24 h-24 bg-primary rounded-xl"
>
</motion.div>`
      },

      // 5. INTERACTION
      {
        type: "heading",
        level: 2,
        text: "5. Interaction States"
      },
      {
        type: "paragraph",
        text: "Interactive apps respond to what you do. We can easily animate things when you hover or click them."
      },
      {
        type: "heading",
        level: 3,
        text: "Parameters Explained"
      },
      {
        type: "list",
        items: [
          "whileHover: Happens when cursor is over it.",
          "whileTap: Happens when you click/touch it."
        ]
      },
      {
        type: "liveEditor",
        title: "Practice: Reactive Button",
        description: "Make the button expand slightly on hover and compress on click.",
        hint: "Add whileHover={{ scale: 1.1 }}",
        initialCode: `<motion.button
  whileHover={{ scale: 1 }}
  whileTap={{ scale: 0.9 }}
  className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg"
>
  Click Me
</motion.button>`
      },

      // CONCLUSION
      {
        type: "heading",
        level: 2,
        text: "Conclusion"
      },
      {
        type: "paragraph",
        text: "That's it! You now know the core building blocks: Opacity (Visibility), X/Y (Position), Scale (Size), Springs (Physics), and Events (Interaction)."
      },
      {
        type: "paragraph",
        text: "Combine these simple blocks, and you can build almost any animation you see on the web. Have fun experimenting!"
      }
    ]
  }
];

// Helper functions (Unchanged)
export const getAllPosts = () => blogPosts;
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostBySlug = (slug) => blogPosts.find(post => post.slug === slug);
export const getPostsByCategory = (category) => blogPosts.filter(post => post.category === category);
export const getPostsByTag = (tag) => blogPosts.filter(post => post.tags.includes(tag));
export const getAllCategories = () => [...new Set(blogPosts.map(post => post.category))];
export const getAllTags = () => [...new Set(blogPosts.flatMap(post => post.tags))];
