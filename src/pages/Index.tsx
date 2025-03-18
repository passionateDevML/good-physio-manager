
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

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
          onClick={() => navigate('/dashboard')}
        >
          Se connecter
        </Button>
      </header>

      <main className="flex-1 flex flex-col-reverse md:flex-row">
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-center items-start animate-fade-in animate-slide-up">
          <div className="max-w-lg">
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
                className="bg-physio-500 hover:bg-physio-600 btn-premium shadow-soft"
                onClick={() => navigate('/dashboard')}
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-premium">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-gradient-to-br from-physio-400 to-physio-600 p-6 md:p-12 flex items-center justify-center">
          <div className="glass-dark p-6 rounded-xl shadow-glass-lg max-w-lg w-full animate-fade-in animate-zoom-in">
            <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl font-medium">
                Interface intuitive
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 aspect-square flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className="text-sm text-center">Suivi des patients</span>
              </div>
              <div className="bg-white/10 rounded-lg p-4 aspect-square flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6" />
                </div>
                <span className="text-sm text-center">Gestion des RDV</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
