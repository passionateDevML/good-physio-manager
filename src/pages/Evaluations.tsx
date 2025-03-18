
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

export default function Evaluations() {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Évaluations</h1>
          <p className="text-muted-foreground">
            Gérez toutes les évaluations initiales et réévaluations des patients
          </p>
        </div>
        <Button className="bg-physio-500 hover:bg-physio-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle évaluation
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une évaluation par patient, date ou type..."
            className="pl-8 w-full lg:w-[400px]"
          />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="completed">Complétées</TabsTrigger>
          <TabsTrigger value="all">Toutes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 3}).map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle>Évaluation initiale</CardTitle>
                  <CardDescription>Patient: Jean Dupont</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Date programmée:</span>
                      <span>15 Mar 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thérapeute:</span>
                      <span>Dr. Martin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 2}).map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle>Réévaluation</CardTitle>
                  <CardDescription>Patient: Marie Lambert</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Date complétée:</span>
                      <span>10 Mar 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thérapeute:</span>
                      <span>Dr. Bernard</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-medium text-green-600">85/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 5}).map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle>{i % 2 === 0 ? 'Évaluation initiale' : 'Réévaluation'}</CardTitle>
                  <CardDescription>
                    Patient: {i % 2 === 0 ? 'Jean Dupont' : 'Marie Lambert'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {i < 3 ? 'Date programmée:' : 'Date complétée:'}
                      </span>
                      <span>{i < 3 ? '15 Mar 2025' : '10 Mar 2025'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thérapeute:</span>
                      <span>{i % 2 === 0 ? 'Dr. Martin' : 'Dr. Bernard'}</span>
                    </div>
                    {i >= 3 && (
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-medium text-green-600">
                          {i === 3 ? '85/100' : '72/100'}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
