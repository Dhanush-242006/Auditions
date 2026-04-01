import * as React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Bookmark, 
  Search, 
  Filter, 
  MoreVertical,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  ExternalLink
} from "lucide-react";
import { Sidebar } from "@/src/components/ui/Sidebar";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { BackButton } from "@/src/components/ui/BackButton";
import { Badge } from "@/src/components/ui/Badge";

export function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks] = React.useState<{ id: string; title: string; production: string; location: string; deadline: string; type: string; image: string }[]>([]);
  const isEmpty = bookmarks.length === 0;

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <Sidebar />
      
      <main className="flex-grow md:ml-64 p-6 md:p-10 space-y-10">
        <div className="flex items-center">
          <BackButton />
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-display">My <span className="text-primary">Bookmarks</span></h1>
            <p className="text-white/50 text-sm">Auditions you've saved to apply for later.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input placeholder="Search bookmarks..." className="pl-10 h-10 text-sm w-64 rounded-xl" />
            </div>
            <Button variant="outline" className="rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </header>

        {isEmpty ? (
          <Card variant="outline" className="p-12 md:p-16 text-center border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No bookmarks yet</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
              When you browse Talent, use the bookmark icon to save auditions here. Then come back to apply when you're ready.
            </p>
            <Button className="rounded-xl" onClick={() => navigate("/auditions")}>
              Browse Talent
            </Button>
          </Card>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((book) => (
            <Card key={book.id} variant="outline" className="overflow-hidden group border-white/5 hover:border-primary/30 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="glass" className="backdrop-blur-md border-none">{book.type}</Badge>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-white/40">{book.production}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center space-x-4 text-[10px] text-white/30">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{book.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{book.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        )}
      </main>
    </div>
  );
}
