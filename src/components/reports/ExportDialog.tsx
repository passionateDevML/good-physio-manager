
import { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { exportToPdf, exportToCsv, exportToExcel } from '@/utils/exportUtils';

type ExportFormat = 'pdf' | 'csv' | 'excel';

interface ExportDialogProps {
  onClose: () => void;
  data: any;
}

export function ExportDialog({ onClose, data }: ExportDialogProps) {
  const [exportTab, setExportTab] = useState<string>('simple');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [filename, setFilename] = useState('rapport-' + new Date().toISOString().split('T')[0]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeStats, setIncludeStats] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'name', 'date', 'status', 'type', 'value'
  ]);

  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(c => c !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleExport = () => {
    try {
      const exportOptions = {
        filename,
        includeCharts,
        includeStats,
        selectedColumns,
        data
      };

      if (exportFormat === 'pdf') {
        exportToPdf(exportOptions);
      } else if (exportFormat === 'csv') {
        exportToCsv(exportOptions);
      } else if (exportFormat === 'excel') {
        exportToExcel(exportOptions);
      }

      toast.success(`Export en ${exportFormat.toUpperCase()} réussi`);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Une erreur s'est produite lors de l'export");
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Exporter le rapport</DialogTitle>
        <DialogDescription>
          Configurez les options d'exportation pour votre rapport
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="simple" onValueChange={setExportTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Export simple</TabsTrigger>
          <TabsTrigger value="advanced">Options avancées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simple" className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Format
              </Label>
              <Select 
                value={exportFormat} 
                onValueChange={(value: string) => setExportFormat(value as ExportFormat)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Choisir un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filename" className="text-right">
                Nom du fichier
              </Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Inclure</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="charts" 
                    checked={includeCharts}
                    onCheckedChange={() => setIncludeCharts(!includeCharts)}
                  />
                  <Label htmlFor="charts">Graphiques</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="stats" 
                    checked={includeStats}
                    onCheckedChange={() => setIncludeStats(!includeStats)}
                  />
                  <Label htmlFor="stats">Statistiques</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Colonnes</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {['name', 'date', 'status', 'type', 'value', 'category', 'details'].map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`col-${column}`}
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => handleColumnToggle(column)}
                    />
                    <Label htmlFor={`col-${column}`} className="capitalize">{column}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button className="bg-physio-500 hover:bg-physio-600" onClick={handleExport}>
          Exporter
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
