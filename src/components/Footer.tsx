import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <Leaf className="h-5 w-5" />
            FreshBite
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Healthy food, delivered with care. © 2026 FreshBite. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
