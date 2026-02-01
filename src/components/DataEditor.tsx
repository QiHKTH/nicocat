import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { WeightRecord } from '@/hooks/useWeightData';

interface DataEditorProps {
  records: WeightRecord[];
  onAdd: (weight: number, date: string) => void;
  onDelete: (date: string) => void;
}

export function DataEditor({ records, onAdd, onDelete }: DataEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date>();
  const [newWeight, setNewWeight] = useState('');
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editWeight, setEditWeight] = useState('');

  const handleAddRecord = () => {
    const weight = parseFloat(newWeight);
    if (!newDate || isNaN(weight) || weight <= 0) return;
    
    const dateStr = format(newDate, 'yyyy-MM-dd');
    onAdd(weight, dateStr);
    setNewDate(undefined);
    setNewWeight('');
  };

  const handleUpdateRecord = (date: string) => {
    const weight = parseFloat(editWeight);
    if (isNaN(weight) || weight <= 0) return;
    
    onAdd(weight, date);
    setEditingDate(null);
    setEditWeight('');
  };

  const startEditing = (record: WeightRecord) => {
    setEditingDate(record.date);
    setEditWeight(record.weight.toString());
  };

  const cancelEditing = () => {
    setEditingDate(null);
    setEditWeight('');
  };

  // Sort records by date descending for display
  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Data
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="font-serif">Edit Records</SheetTitle>
          <SheetDescription>
            Add new records or edit existing weight entries.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Add New Record */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <h4 className="label-premium mb-4 flex items-center gap-2">
              <Plus className="h-3 w-3" />
              Add New Record
            </h4>
            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[160px] justify-start text-left font-normal",
                      !newDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDate ? format(newDate, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="number"
                step="0.1"
                min="0"
                placeholder="Weight (kg)"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="w-[120px]"
              />
              <Button onClick={handleAddRecord} disabled={!newDate || !newWeight}>
                Add
              </Button>
            </div>
          </div>

          {/* Existing Records */}
          <div>
            <h4 className="label-premium mb-3">
              Existing Records ({records.length})
            </h4>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {sortedRecords.map((record) => (
                  <div
                    key={record.date}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 hover:border-border transition-colors"
                  >
                    {editingDate === record.date ? (
                      <>
                        <span className="text-sm font-medium">
                          {format(new Date(record.date), "MMM d, yyyy")}
                        </span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            value={editWeight}
                            onChange={(e) => setEditWeight(e.target.value)}
                            className="w-[80px] h-8"
                          />
                          <span className="text-sm text-muted-foreground">kg</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateRecord(record.date)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">
                            {format(new Date(record.date), "MMM d, yyyy")}
                          </span>
                          <span className="text-lg font-semibold">
                            {record.weight} kg
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => startEditing(record)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDelete(record.date)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {records.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No records yet. Add your first record above.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
