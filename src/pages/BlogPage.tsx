import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/ui/Footer";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { BackButton } from "@/src/components/ui/BackButton";

const FEATURED_POST = {
  id: "featured",
  title: "The Future of Casting: How AI is Transforming Talent Discovery",
  excerpt: "Explore how artificial intelligence is revolutionizing the way casting directors find the perfect talent for their productions, making the process faster and more inclusive than ever before.",
  author: "Priya Sharma",
  date: "Mar 1, 2026",
  readTime: "8 min read",
  category: "Industry Trends",
  image: "https://picsum.photos/seed/blog-featured/800/400",
};

const BLOG_POSTS = [
  {
    id: "1",
    title: "10 Tips for Nailing Your Self-Tape Audition",
    excerpt: "Master the art of self-tape auditions with these professional tips from casting directors.",
    author: "Rahul Verma",
    date: "Feb 25, 2026",
    readTime: "5 min read",
    category: "Audition Tips",
    image: "https://picsum.photos/seed/blog1/400/250",
  },
  {
    id: "2",
    title: "Building Your Acting Portfolio: A Complete Guide",
    excerpt: "Everything you need to know about creating a compelling portfolio that gets you noticed.",
    author: "Ananya Desai",
    date: "Feb 20, 2026",
    readTime: "7 min read",
    category: "Career Advice",
    image: "https://picsum.photos/seed/blog2/400/250",
  },
  {
    id: "3",
    title: "Understanding Casting Calls: Red Flags to Watch For",
    excerpt: "Learn how to identify legitimate casting opportunities and avoid scams in the industry.",
    author: "Vikram Singh",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    category: "Safety",
    image: "https://picsum.photos/seed/blog3/400/250",
  },
  {
    id: "4",
    title: "The Rise of Regional Cinema: Opportunities Beyond Bollywood",
    excerpt: "Discover the booming regional film industries and how to break into them.",
    author: "Meera Nair",
    date: "Feb 10, 2026",
    readTime: "9 min read",
    category: "Industry Trends",
    image: "https://picsum.photos/seed/blog4/400/250",
  },
  {
    id: "5",
    title: "Voice Acting 101: Breaking Into the World of Dubbing",
    excerpt: "A comprehensive guide to starting your career in voice acting and dubbing.",
    author: "Arjun Kapoor",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    category: "Career Advice",
    image: "https://picsum.photos/seed/blog5/400/250",
  },
  {
    id: "6",
    title: "Networking in the Film Industry: Do's and Don'ts",
    excerpt: "Build meaningful connections that can advance your acting career.",
    author: "Priya Sharma",
    date: "Jan 30, 2026",
    readTime: "5 min read",
    category: "Career Advice",
    image: "https://picsum.photos/seed/blog6/400/250",
  },
];

const CATEGORIES = ["All", "Audition Tips", "Career Advice", "Industry Trends", "Safety", "Success Stories"];

export function BlogPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="secondary" className="mb-4">Our Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Insights & <span className="text-primary">Stories</span>
          </h1>
          <p className="text-lg text-white/60">
            Tips, trends, and stories from the world of entertainment and casting.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card variant="outline" className="overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img 
                  src={FEATURED_POST.image} 
                  alt={FEATURED_POST.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">{FEATURED_POST.category}</Badge>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {FEATURED_POST.title}
                </h2>
                <p className="text-white/60 mb-6">{FEATURED_POST.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {FEATURED_POST.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {FEATURED_POST.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {FEATURED_POST.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input 
              placeholder="Search articles..." 
              className="pl-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Badge 
                key={cat}
                variant={selectedCategory === cat ? "primary" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="outline" className="overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/50 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-xl">
            Load More Articles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
