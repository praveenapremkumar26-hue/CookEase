import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChefHat, Truck, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: UtensilsCrossed, title: "Custom Meals", desc: "Personalized food for every dietary need — diabetic, vegan, gluten-free, and more." },
  { icon: ChefHat, title: "Hire a Cook", desc: "Book professional chefs by the hour or full day for your events." },
  { icon: Truck, title: "Utensil Rental", desc: "Rent plates, glasses, and serving equipment for any occasion." },
  { icon: ShieldCheck, title: "Health First", desc: "Detailed allergy notes, medical conditions, and custom instructions." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Leaf className="h-4 w-4" /> Fresh • Healthy • Customized
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Food made for{" "}
              <span className="text-primary">your body</span>,{" "}
              not just your taste.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Order meals tailored to your health needs, rent event utensils, or hire a professional cook — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu">
                <Button size="lg" className="gap-2 text-base px-8">
                  Browse Menu <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/hire-cook">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Hire a Cook
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground">Everything you need</h2>
          <p className="mt-3 text-muted-foreground">One platform for food, equipment, and culinary talent.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-xl border bg-card p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to eat healthy?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Browse our menu and customize every meal to fit your exact dietary needs.
          </p>
          <Link to="/menu">
            <Button size="lg" variant="secondary" className="text-base px-8 gap-2">
              Order Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
