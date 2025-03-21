
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { isAuthenticated } from '@/utils/auth';

export default function Index() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white py-4 px-6 border-b border-border/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-physio-400 to-physio-600 flex items-center justify-center text-white font-bold">
            GP
          </div>
          <span className="text-lg font-semibold text-foreground">Good Physio</span>
        </div>
        <Button 
          className="bg-physio-500 hover:bg-physio-600"
          onClick={() => navigate(authenticated ? '/dashboard' : '/login')}
        >
          {authenticated ? 'Accéder au tableau de bord' : 'Se connecter'}
        </Button>
      </header>

      <main className="flex-1 flex flex-col p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Une gestion efficace pour votre clinique
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Good Physio simplifie la gestion des patients, des rendez-vous et des traitements pour les professionnels de la physiothérapie.
          </p>
          
          <div className="mt-8 space-y-4">
            {[
              "Dossiers patients centralisés",
              "Planification simplifiée des rendez-vous",
              "Suivi de progression visuel",
              "Facturation intégrée"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-physio-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex gap-4">
            <Button 
              className="bg-physio-500 hover:bg-physio-600 shadow-soft"
              onClick={() => navigate(authenticated ? '/dashboard' : '/login')}
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={scrollToAbout}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </main>

      <div ref={aboutSectionRef} className="bg-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">À propos de Good Physio</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Notre mission</h3>
              <p className="text-muted-foreground">
                Good Physio a été créé pour simplifier le quotidien des physiothérapeutes et améliorer
                l'expérience des patients. Notre plateforme permet aux cliniques de toutes tailles
                de gérer efficacement leurs opérations quotidiennes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Pourquoi nous choisir</h3>
              <p className="text-muted-foreground">
                Notre solution combine facilité d'utilisation et fonctionnalités puissantes,
                le tout dans une interface intuitive. Nous nous engageons à fournir un support
                de qualité et des mises à jour régulières.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
