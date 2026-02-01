import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Download, Trash2 } from 'lucide-react';
import { DataEditor } from '@/components/DataEditor';
import type { WeightRecord } from '@/hooks/useWeightData';

interface ToolBarProps {
  onExport: () => void;
  onClear: () => void;
  hasData: boolean;
  records: WeightRecord[];
  onAddRecord: (weight: number, date: string) => void;
  onDeleteRecord: (date: string) => void;
}

export function ToolBar({ onExport, onClear, hasData, records, onAddRecord, onDeleteRecord }: ToolBarProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        disabled={!hasData}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
      
      <DataEditor
        records={records}
        onAdd={onAddRecord}
        onDelete={onDeleteRecord}
      />
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasData}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear Data
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">Clear All Data</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all weight records. We recommend exporting your data first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClear}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
